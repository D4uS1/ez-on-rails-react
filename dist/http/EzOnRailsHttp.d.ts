import { EzOnRailsHttpError } from "./client/EzOnRailsHttpClient";
export declare const EzOnRailsHttp: {
    client: {
        signUp: (data: any) => Promise<any>;
        signIn: (data: any) => Promise<any>;
        signOut: (authInfo: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo) => Promise<void>;
        passwordResetInstructions: (data: any) => Promise<void>;
        passwordReset: (data: any) => Promise<void>;
        getUser: (authInfo: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo) => Promise<import("./client/EzOnRailsHttpClient").EzOnRailsUser>;
        updateUser: (data: import("./client/EzOnRailsHttpClient").EzOnRailsUpdateUserParams, authInfo: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo) => Promise<import("./client/EzOnRailsHttpClient").EzOnRailsUser>;
        confirmationInstructions: (data: any) => Promise<void>;
        confirmation: (data: any) => Promise<void>;
        get: <T>(url: string, data: any, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: any) => any) | undefined) => Promise<T>;
        post: <T_1>(url: string, data: any, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: any) => any) | undefined) => Promise<T_1>;
        patch: <T_2>(url: string, data: any, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: any) => any) | undefined) => Promise<T_2>;
        put: <T_3>(url: string, data: any, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: any) => any) | undefined) => Promise<T_3>;
        delete: <T_4>(url: string, data: any, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: any) => any) | undefined) => Promise<T_4>;
        defaultHttpHeader: (authInfo: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo) => any;
    };
    swr: {
        fetcher: <T_5>(url: string, method?: string, data?: any, authInfo?: import("./client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined) => Promise<T_5>;
    };
    utils: {
        toBaseUrl: (path: string) => string;
        toApiUrl: (path: string) => string;
    };
};
export { EzOnRailsHttpError };
