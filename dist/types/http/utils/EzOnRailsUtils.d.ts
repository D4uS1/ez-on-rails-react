/**
 * Contains utils for http access of some EzOnRails Backend.
 */
export declare const EzOnRailsHttpUtils: {
    toBaseUrl: (path: string) => string;
    toApiUrl: (path: string) => string;
    toSnakeCase: <T>(data: T) => T;
    toCamelCase: <T_1>(data: T_1) => T_1;
    toGetParameters: (parameters: Record<string, string | number | boolean | null>) => string;
};
