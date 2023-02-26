import { toCamel, toSnake } from 'convert-keys';

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
}

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
}

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
