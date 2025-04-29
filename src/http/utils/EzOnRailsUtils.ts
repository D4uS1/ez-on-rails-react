import { toCamel, toSnake } from 'convert-keys';
import {EzOnRailsHttpError} from "../client/EzOnRailsHttpError";

/**
 * Removes slash from path begin if exists.
 *
 * @param path
 */
const cleanupPath = (path: string) => {
    if (path.startsWith('/')) {
        return path.slice(1);
    }

    return path;
};

/**
 * Removes trailing slash from url if exists.
 *
 * @param url
 */
const cleanupUrl = (url: string) => {
    if (url.endsWith('/')) {
        return url.slice(0, -1);
    }

    return url;
};

/**
 * Returns the full url to the backend having the relative path of an EzOnRails application at the specified backendUrl.
 *
 * @param backendUrl
 * @param path
 */
const toBaseUrl = (backendUrl: string, path: string): string => {
    return `${cleanupUrl(backendUrl)}/${cleanupPath(path)}`;
};

/**
 * Returns the full url to the backend api of an EzOnRails application at the backendUrl having the relative path.
 * The backendUrl is expected not to have the api suffix.
 * The path is expected not to have the api prefix.
 *
 * @param backendUrl
 * @param path
 */
const toApiUrl = (backendUrl: string, path: string): string => {
    return `${cleanupUrl(backendUrl)}/api/${cleanupPath(path)}`;
};

/**
 * Converts the single string into snake case.
 * If the string contains :: it will be converted to slash, related to the rails conventions for namespaces and paths.
 *
 * @param str
 */
const toSnakeCasePath = (str: string) => {
    // convert A-Z to a-z_ except for the first letter, the first letter is only converted to lowercase
    str = str.replace(/[A-Z]/g, (match, index) => (index === 0 ? match.toLowerCase() : '_' + match.toLowerCase()));

    // special cases for namespaces
    str = str.replace(/::_/g, '/');
    str = str.replace(/\/_/g, '/');

    return str;
};

/**
 * Converts the object or array into snake_case.
 */
const toSnakeCase = <T>(data: T): T => {
    // Data is not interpretable
    if (!data) return data;

    return toSnake(data);
};

/**
 * Converts the object or array to camelCase.
 *
 * @param data
 */
const toCamelCase = <T>(data: T): T => {
    // Data is not interpretable
    if (!data) return data;

    return toCamel(data);
};

/**
 * Converts the given parameters object to a get Parameter string.
 */
const toGetParameters = (parameters: Record<string, string | number | boolean | null>) => {
    return Object.keys(parameters)
        .map((key) => key + '=' + parameters[key])
        .join('&');
};

/**
 * Searches for occurrences of strings having dates and date-times, converts them to date objects and returns the result.
 * This is done recursively, hence every nested objects or arrays are looked up.
 *
 * @param params
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toDates = (params: any): any => {
    if (typeof params === 'string' && /^\d{4}-\d{2}-\d{2}/.test(params)) {
        return new Date(params);
    }

    if (Array.isArray(params)) {
        return params.map((param) => toDates(param));
    }

    if (params !== null && typeof params === 'object') {
        Object.keys(params).forEach((key) => {
            params[key] = toDates(params[key]);
        });
    }

    return params;
};

/**
 * Searches for occurrences of dates, converts them to strings and returns the result.
 * This is done recursively, hence every nested objects or arrays are looked up.
 *
 * @param params
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toDateStrings = (params: any): any => {
    if (params instanceof Date) {
        return params.toISOString();
    }

    if (Array.isArray(params)) {
        return params.map((param) => toDateStrings(param));
    }

    // the !== null is needed here, because typeof returns 'object' for null, this is because
    // javascript is just HUEHUEHUEHUEHUEHUEHUEHUEHUEHUEHUEHUEHUE
    if (params !== null && typeof params === 'object') {
        Object.keys(params).forEach((key) => {
            params[key] = toDateStrings(params[key]);
        });
    }

    return params;
};

/**
 * Prepares the specified params for a request to the backend.
 * Recursively transforms the keys to underscore and the dates to iso strings.
 *
 * @param params
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toBackendParams = (params: any) => {
    return toDateStrings(toSnakeCase(params));
};

/**
 * Prepares the specified params for the usage in the frontend.
 * Recursively transforms the keys to camelCase and the date iso strings to date objects.
 *
 * @param params
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toFrontendParams = (params: any) => {
    // undefined, null, ...
    if (!params) return params;

    // no object or array
    if (typeof params !== 'object') return params;

    return toDates(toCamelCase(params));
};

/**
 * Returns true if the specified error object is an http error having a status code.
 *
 * @param err
 */
const isEzOnRailsHttpError = (err: unknown): boolean => {
    if (!err) return false;

    return err instanceof EzOnRailsHttpError;
};

/**
 * Contains utils for http access of some EzOnRails Backend.
 */
export const EzOnRailsHttpUtils = {
    cleanupUrl: cleanupUrl,
    cleanupPath: cleanupPath,
    toBaseUrl: toBaseUrl,
    toApiUrl: toApiUrl,
    toSnakeCase: toSnakeCase,
    toSnakeCasePath: toSnakeCasePath,
    toCamelCase: toCamelCase,
    toGetParameters: toGetParameters,
    toDates: toDates,
    toDateStrings: toDateStrings,
    toBackendParams: toBackendParams,
    toFrontendParams: toFrontendParams,
    isEzOnRailsHttpError: isEzOnRailsHttpError
};
