import { toCamel, toSnake } from 'convert-keys';
import { EzOnRailsConfig } from '../../config/EzOnRailsConfig';

/**
 * Returns the full url to the backend having the relative path.
 * The path should not start with a slash.
 * The url starts with the base url given by the config, that was specified by calling the init function of EzOnRails before.
 *
 * @param path
 */
const toBaseUrl = (path: string): string => {
    if (path.startsWith('/')) {
        path = path.slice(1);
    }

    return `${EzOnRailsConfig.baseUrl()}${path}`;
};

/**
 * Returns the full url to the backend api having the relative path.
 * The path should not start with a slash.
 * The url starts with the base url given by the config, that was specified by calling the init function of EzOnRails before.
 *
 * @param path
 */
const toApiUrl = (path: string): string => {
    if (path.startsWith('/')) {
        path = path.slice(1);
    }

    return `${EzOnRailsConfig.apiUrl()}${path}`;
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
 * Contains utils for http access of some EzOnRails Backend.
 */
export const EzOnRailsHttpUtils = {
    toBaseUrl: toBaseUrl,
    toApiUrl: toApiUrl,
    toSnakeCase: toSnakeCase,
    toCamelCase: toCamelCase,
    toGetParameters: toGetParameters
};
