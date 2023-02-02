export declare const EzOnRailsHttp: {
    client: {
        signUp: (data: import("./client/EzOnRailsHttpClient").EzOnRailsSignUpParams) => Promise<void>;
        signIn: (data: import("./client/EzOnRailsHttpClient").EzOnRailsSignInParams) => Promise<import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo>;
        signOut: (authInfo: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo) => Promise<void>;
        passwordResetInstructions: (data: import("./client/EzOnRailsHttpClient").EzOnRailsPasswordResetInstructionsParams) => Promise<void>;
        passwordReset: (data: import("./client/EzOnRailsHttpClient").EzOnRailsPasswordResetParams) => Promise<void>;
        getUser: (authInfo: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo) => Promise<import("./client/EzOnRailsHttpClient").EzOnRailsUser>;
        updateUser: (data: import("./client/EzOnRailsHttpClient").EzOnRailsUpdateUserParams, authInfo: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo) => Promise<import("./client/EzOnRailsHttpClient").EzOnRailsUser>;
        confirmationInstructions: (data: import("./client/EzOnRailsHttpClient").EzOnRailsConfirmationInstructionsParams) => Promise<void>;
        confirmation: (data: import("./client/EzOnRailsHttpClient").EzOnRailsConfirmParams) => Promise<void>;
        get: <TParams, TResponse>(url: string, data: TParams, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: TParams) => TParams) | undefined) => Promise<TResponse>;
        post: <TParams_1, TResponse_1>(url: string, data: TParams_1, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: TParams_1) => TParams_1) | undefined) => Promise<TResponse_1>;
        patch: <TParams_2, TResponse_2>(url: string, data: TParams_2, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: TParams_2) => TParams_2) | undefined) => Promise<TResponse_2>;
        put: <TParams_3, TResponse_3>(url: string, data: TParams_3, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: TParams_3) => TParams_3) | undefined) => Promise<TResponse_3>;
        delete: <TParams_4, TResponse_4>(url: string, data: TParams_4, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: TParams_4) => TParams_4) | undefined) => Promise<TResponse_4>;
        defaultHttpHeader: (authInfo: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo) => Record<string, string>;
    };
    swr: {
        fetcher: <TParams_5, TResponse_5>(url: string, method?: string, data?: TParams_5 | null, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined) => Promise<TResponse_5>;
    };
    utils: {
        toBaseUrl: (path: string) => string;
        toApiUrl: (path: string) => string;
        toSnakeCase: <T>(data: T) => T;
        toCamelCase: <T_1>(data: T_1) => T_1;
        toGetParameters: (parameters: Record<string, string | number | boolean | null>) => string;
    };
};
export { EzOnRailsHttpError } from './client/EzOnRailsHttpError';
