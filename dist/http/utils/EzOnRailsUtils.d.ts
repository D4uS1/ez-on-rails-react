/**
 * Returns the full url to the backend having the relative path.
 * The path should not start with a slash.
 * The url starts with the base url given by the config, that was specified by calling the init function of EzOnRails before.
 *
 * @param path
 */
export declare const toBaseUrl: (path: string) => string;
/**
 * Returns the full url to the backend api having the relative path.
 * The path should not start with a slash.
 * The url starts with the base url given by the config, that was specified by calling the init function of EzOnRails before.
 *
 * @param path
 */
export declare const toApiUrl: (path: string) => string;
/**
 * Contains utils for http access of some EzOnRails Backend.
 */
export declare const EzOnRailsHttpUtils: {
    toBaseUrl: (path: string) => string;
    toApiUrl: (path: string) => string;
};
