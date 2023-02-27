/**
 * Contains utils for http access of some EzOnRails Backend.
 */
export declare const EzOnRailsHttpUtils: {
    toBaseUrl: (backendUrl: string, path: string) => string;
    toApiUrl: (backendUrl: string, path: string) => string;
    toSnakeCase: <T>(data: T) => T;
    toSnakeCaseString: (str: string) => string;
    toCamelCase: <T_1>(data: T_1) => T_1;
    toGetParameters: (parameters: Record<string, string | number | boolean | null>) => string;
    toDates: (params: any) => any;
    toDateStrings: (params: any) => any;
    toBackendParams: (params: any) => any;
    toFrontendParams: (params: any) => any;
};
