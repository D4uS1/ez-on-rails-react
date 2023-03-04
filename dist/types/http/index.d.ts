import { EzOnRailsAuthInfo, EzOnRailsUser, EzOnRailsUpdateUserParams } from './client/EzOnRailsHttpClient';
export declare const EzOnRailsHttp: {
    client: {
        signUp: (backendUrl: string, data: import("./client/EzOnRailsHttpClient").EzOnRailsSignUpParams, apiVersion: string) => Promise<void>;
        signIn: (backendUrl: string, data: import("./client/EzOnRailsHttpClient").EzOnRailsSignInParams, apiVersion: string) => Promise<EzOnRailsAuthInfo>;
        signOut: (backendUrl: string, authInfo: EzOnRailsAuthInfo, apiVersion: string) => Promise<void>;
        passwordResetInstructions: (backendUrl: string, data: import("./client/EzOnRailsHttpClient").EzOnRailsPasswordResetInstructionsParams, apiVersion: string) => Promise<void>;
        passwordReset: (backendUrl: string, data: import("./client/EzOnRailsHttpClient").EzOnRailsPasswordResetParams, apiVersion: string) => Promise<void>;
        getUser: (backendUrl: string, authInfo: EzOnRailsAuthInfo, apiVersion: string) => Promise<EzOnRailsUser>;
        updateUser: (backendUrl: string, data: EzOnRailsUpdateUserParams, authInfo: EzOnRailsAuthInfo, apiVersion: string) => Promise<EzOnRailsUser>;
        confirmationInstructions: (backendUrl: string, data: import("./client/EzOnRailsHttpClient").EzOnRailsConfirmationInstructionsParams, apiVersion: string) => Promise<void>;
        confirmation: (backendUrl: string, data: import("./client/EzOnRailsHttpClient").EzOnRailsConfirmParams, apiVersion: string) => Promise<void>;
        get: <TParams, TResponse>(backendUrl: string, path: string, data: TParams, authInfo?: EzOnRailsAuthInfo | null, apiVersion?: string, beforeRequest?: ((data: TParams) => TParams) | undefined) => Promise<TResponse>;
        post: <TParams_1, TResponse_1>(backendUrl: string, path: string, data: TParams_1, authInfo?: EzOnRailsAuthInfo | null, apiVersion?: string, beforeRequest?: ((data: TParams_1) => TParams_1) | undefined) => Promise<TResponse_1>;
        patch: <TParams_2, TResponse_2>(backendUrl: string, path: string, data: TParams_2, authInfo?: EzOnRailsAuthInfo | null, apiVersion?: string, beforeRequest?: ((data: TParams_2) => TParams_2) | undefined) => Promise<TResponse_2>;
        put: <TParams_3, TResponse_3>(backendUrl: string, path: string, data: TParams_3, authInfo?: EzOnRailsAuthInfo | null, apiVersion?: string, beforeRequest?: ((data: TParams_3) => TParams_3) | undefined) => Promise<TResponse_3>;
        delete: <TParams_4, TResponse_4>(backendUrl: string, path: string, data: TParams_4, authInfo?: EzOnRailsAuthInfo | null, apiVersion?: string, beforeRequest?: ((data: TParams_4) => TParams_4) | undefined) => Promise<TResponse_4>;
        defaultHttpHeader: (authInfo: EzOnRailsAuthInfo | null, apiVersion: string) => Record<string, string>;
    };
    swr: {
        fetcher: <TParams_5, TResponse_5>(backendUrl: string, path: string, method?: string, data?: TParams_5 | null, authInfo?: EzOnRailsAuthInfo | undefined, apiVersion?: string) => Promise<TResponse_5>;
    };
    utils: {
        cleanupUrl: (url: string) => string;
        cleanupPath: (path: string) => string;
        toBaseUrl: (backendUrl: string, path: string) => string;
        toApiUrl: (backendUrl: string, path: string) => string;
        toSnakeCase: <T>(data: T) => T;
        toSnakeCasePath: (str: string) => string;
        toCamelCase: <T_1>(data: T_1) => T_1;
        toGetParameters: (parameters: Record<string, string | number | boolean | null>) => string;
        toDates: (params: any) => any;
        toDateStrings: (params: any) => any;
        toBackendParams: (params: any) => any;
        toFrontendParams: (params: any) => any;
    };
};
export { EzOnRailsAuthInfo, EzOnRailsUser, EzOnRailsUpdateUserParams };
export { EzOnRailsHttpError } from './client/EzOnRailsHttpError';
