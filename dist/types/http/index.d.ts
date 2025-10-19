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
        get: <TParams, TResponse>(backendUrl: string, path: string, data: TParams, authInfo?: EzOnRailsAuthInfo | null, apiKey?: string | null, apiVersion?: string, beforeRequest?: ((data: TParams) => TParams) | undefined) => Promise<TResponse>;
        post: <TParams, TResponse>(backendUrl: string, path: string, data: TParams, authInfo?: EzOnRailsAuthInfo | null, apiKey?: string | null, apiVersion?: string, beforeRequest?: ((data: TParams) => TParams) | undefined) => Promise<TResponse>;
        patch: <TParams, TResponse>(backendUrl: string, path: string, data: TParams, authInfo?: EzOnRailsAuthInfo | null, apiKey?: string | null, apiVersion?: string, beforeRequest?: ((data: TParams) => TParams) | undefined) => Promise<TResponse>;
        put: <TParams, TResponse>(backendUrl: string, path: string, data: TParams, authInfo?: EzOnRailsAuthInfo | null, apiKey?: string | null, apiVersion?: string, beforeRequest?: ((data: TParams) => TParams) | undefined) => Promise<TResponse>;
        delete: <TParams, TResponse>(backendUrl: string, path: string, data: TParams, authInfo?: EzOnRailsAuthInfo | null, apiKey?: string | null, apiVersion?: string, beforeRequest?: ((data: TParams) => TParams) | undefined) => Promise<TResponse>;
        defaultHttpHeader: (authInfo: EzOnRailsAuthInfo | null, apiKey: string | null, apiVersion: string) => Record<string, string>;
    };
    swr: {
        fetcher: <TParams, TResponse>([backendUrl, path, method, data, authInfo, apiKey, apiVersion]: [backendUrl: string, path: string, method: string, data: TParams | null, authInfo: EzOnRailsAuthInfo | undefined, apiKey: string | null, apiVersion: string]) => Promise<TResponse>;
    };
    utils: {
        cleanupUrl: (url: string) => string;
        cleanupPath: (path: string) => string;
        toBaseUrl: (backendUrl: string, path: string) => string;
        toApiUrl: (backendUrl: string, path: string) => string;
        toSnakeCase: <T>(data: T) => T;
        toSnakeCasePath: (str: string) => string;
        toCamelCase: <T>(data: T) => T;
        toGetParameters: (parameters: Record<string, string | number | boolean | null>) => string;
        toDates: (params: any) => any;
        toDateStrings: (params: any) => any;
        toBackendParams: (params: any) => any;
        toFrontendParams: (params: any) => any;
        isEzOnRailsHttpError: (err: unknown) => boolean;
    };
};
export { EzOnRailsAuthInfo, EzOnRailsUser, EzOnRailsUpdateUserParams };
export { EzOnRailsHttpError } from './client/EzOnRailsHttpError';
