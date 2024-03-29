export declare const EzOnRailsHttp: {
    client: {
        signUp: (backendUrl: string, data: import("./client/EzOnRailsHttpClient").EzOnRailsSignUpParams, apiVersion: string) => Promise<void>;
        signIn: (backendUrl: string, data: import("./client/EzOnRailsHttpClient").EzOnRailsSignInParams, apiVersion: string) => Promise<import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo>;
        signOut: (backendUrl: string, authInfo: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo, apiVersion: string) => Promise<void>;
        passwordResetInstructions: (backendUrl: string, data: import("./client/EzOnRailsHttpClient").EzOnRailsPasswordResetInstructionsParams, apiVersion: string) => Promise<void>;
        passwordReset: (backendUrl: string, data: import("./client/EzOnRailsHttpClient").EzOnRailsPasswordResetParams, apiVersion: string) => Promise<void>;
        getUser: (backendUrl: string, authInfo: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo, apiVersion: string) => Promise<import("./client/EzOnRailsHttpClient").EzOnRailsUser>;
        updateUser: (backendUrl: string, data: import("./client/EzOnRailsHttpClient").EzOnRailsUpdateUserParams, authInfo: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo, apiVersion: string) => Promise<import("./client/EzOnRailsHttpClient").EzOnRailsUser>;
        confirmationInstructions: (backendUrl: string, data: import("./client/EzOnRailsHttpClient").EzOnRailsConfirmationInstructionsParams, apiVersion: string) => Promise<void>;
        confirmation: (backendUrl: string, data: import("./client/EzOnRailsHttpClient").EzOnRailsConfirmParams, apiVersion: string) => Promise<void>;
        get: <TParams, TResponse>(backendUrl: string, path: string, data: TParams, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | null, apiVersion?: string, beforeRequest?: ((data: TParams) => TParams) | undefined) => Promise<TResponse>;
        post: <TParams_1, TResponse_1>(backendUrl: string, path: string, data: TParams_1, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | null, apiVersion?: string, beforeRequest?: ((data: TParams_1) => TParams_1) | undefined) => Promise<TResponse_1>;
        patch: <TParams_2, TResponse_2>(backendUrl: string, path: string, data: TParams_2, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | null, apiVersion?: string, beforeRequest?: ((data: TParams_2) => TParams_2) | undefined) => Promise<TResponse_2>;
        put: <TParams_3, TResponse_3>(backendUrl: string, path: string, data: TParams_3, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | null, apiVersion?: string, beforeRequest?: ((data: TParams_3) => TParams_3) | undefined) => Promise<TResponse_3>;
        delete: <TParams_4, TResponse_4>(backendUrl: string, path: string, data: TParams_4, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | null, apiVersion?: string, beforeRequest?: ((data: TParams_4) => TParams_4) | undefined) => Promise<TResponse_4>;
        defaultHttpHeader: (authInfo: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | null, apiVersion: string) => Record<string, string>;
    };
    swr: {
        fetcher: <TParams_5, TResponse_5>(backendUrl: string, path: string, method?: string, data?: TParams_5 | null, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, apiVersion?: string) => Promise<TResponse_5>;
    };
    utils: {
        toBaseUrl: (backendUrl: string, path: string) => string;
        toApiUrl: (backendUrl: string, path: string) => string;
        toSnakeCase: <T>(data: T) => T;
        toCamelCase: <T_1>(data: T_1) => T_1;
        toGetParameters: (parameters: Record<string, string | number | boolean | null>) => string;
        toDates: (params: any) => any;
        toDateStrings: (params: any) => any;
        toBackendParams: (params: any) => any;
        toFrontendParams: (params: any) => any;
    };
};
export { EzOnRailsHttpError } from './client/EzOnRailsHttpError';
