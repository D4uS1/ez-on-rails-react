import { EzOnRailsConfig } from "../../config/EzOnRailsConfig";

/**
 * Returns the full url to the backend having the relative path.
 * The path should not start with a slash.
 * The url starts with the base url given by the config, that was specified by calling the init function of EzOnRails before.
 *
 * @param path
 */
export const toBaseUrl = (path: string): string => {
    if (path.startsWith('/')) {
        path = path.slice(1)
    }

    return `${EzOnRailsConfig.baseUrl()}${path}`
}

/**
 * Returns the full url to the backend api having the relative path.
 * The path should not start with a slash.
 * The url starts with the base url given by the config, that was specified by calling the init function of EzOnRails before.
 *
 * @param path
 */
export const toApiUrl = (path: string): string => {
    if (path.startsWith('/')) {
        path = path.slice(1)
    }

    return `${EzOnRailsConfig.apiUrl()}${path}`
}

/**
 * Contains utils for http access of some EzOnRails Backend.
 */
export const EzOnRailsHttpUtils = {
    toBaseUrl: toBaseUrl,
    toApiUrl: toApiUrl
}
