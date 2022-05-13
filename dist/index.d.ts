export declare const EzOnRails: {
    config: {
        init: (options: import("./config/EzOnRailsConfig").EzOnRailsConfigOptions) => void;
        baseUrl: () => string | null;
        apiUrl: () => string | null;
        apiVersion: () => string;
    };
    http: {
        client: {
            signUp: (data: any) => Promise<any>;
            signIn: (data: any) => Promise<any>;
            signOut: (authInfo: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo) => Promise<void>;
            passwordResetInstructions: (data: any) => Promise<void>;
            passwordReset: (data: any) => Promise<void>;
            getUser: (authInfo: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo) => Promise<import("./http/client/EzOnRailsHttpClient").EzOnRailsUser>;
            updateUser: (data: import("./http/client/EzOnRailsHttpClient").EzOnRailsUpdateUserParams, authInfo: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo) => Promise<import("./http/client/EzOnRailsHttpClient").EzOnRailsUser>;
            confirmationInstructions: (data: any) => Promise<void>;
            confirmation: (data: any) => Promise<void>;
            get: <T>(url: string, data: any, authInfo?: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: any) => any) | undefined) => Promise<T>;
            post: <T_1>(url: string, data: any, authInfo?: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: any) => any) | undefined) => Promise<T_1>;
            patch: <T_2>(url: string, data: any, authInfo?: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: any) => any) | undefined) => Promise<T_2>;
            put: <T_3>(url: string, data: any, authInfo?: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: any) => any) | undefined) => Promise<T_3>;
            delete: <T_4>(url: string, data: any, authInfo?: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: any) => any) | undefined) => Promise<T_4>;
            defaultHttpHeader: (authInfo: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo) => any;
        };
        swr: {
            fetcher: <T_5>(url: string, method?: string, data?: any, authInfo?: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined) => Promise<T_5>;
        };
        utils: {
            toBaseUrl: (path: string) => string;
            toApiUrl: (path: string) => string;
        };
    };
    components: {
        ActiveStorageDropzone: (props: import("./components/EzOnRails/ActiveStorageDropzone/ActiveStorageDropzone").ActiveStorageDropzoneProps) => JSX.Element;
        DevelopmentHint: (props: import("./components/EzOnRails/DevelopmentHint/DevelopmentHint").DevelopmentHintProps) => JSX.Element | null;
        LoginForm: (props: import("./components/EzOnRails/LoginForm/LoginForm").LoginFormProps) => JSX.Element;
        LostPasswordForm: (props: import("./components/EzOnRails/LostPasswordForm/LostPasswordForm").LostPasswordFormProps) => JSX.Element;
        UpdateUserForm: (props: import("./components/EzOnRails/UpdateUserForm/UpdateUserForm").UpdateUserFormProps) => JSX.Element;
        ProtectedPage: (props: import("./components/EzOnRails/ProtectedPage/ProtectedPage").ProtectedPageProps) => JSX.Element;
        RegistrationForm: (props: import("./components/EzOnRails/RegistrationForm/RegistrationForm").RegistrationFormProps) => JSX.Element;
        ResendConfirmationForm: (props: import("./components/EzOnRails/ResendConfirmationForm/ResendConfirmationForm").ResendConfirmationFormProps) => JSX.Element;
        ResetPasswordForm: (props: import("./components/EzOnRails/ResetPasswordForm/ResetPasswordForm").ResetPasswordFormProps) => JSX.Element;
    };
};
export { EzOnRailsConfig } from "./config/EzOnRailsConfig";
export { EzOnRailsHttp, EzOnRailsHttpError } from "./http/EzOnRailsHttp";
export { EzOnRailsComponents } from "./components/EzOnRailsComponents";
export { ActiveStorageDropzone } from "./components/EzOnRails/ActiveStorageDropzone/ActiveStorageDropzone";
export { LoginForm } from "./components/EzOnRails/LoginForm/LoginForm";
export { RegistrationForm } from "./components/EzOnRails/RegistrationForm/RegistrationForm";
export { LostPasswordForm } from "./components/EzOnRails/LostPasswordForm/LostPasswordForm";
export { UpdateUserForm } from "./components/EzOnRails/UpdateUserForm/UpdateUserForm";
export { ProtectedPage } from "./components/EzOnRails/ProtectedPage/ProtectedPage";
export { ResetPasswordForm } from "./components/EzOnRails/ResetPasswordForm/ResetPasswordForm";
export { ResendConfirmationForm } from "./components/EzOnRails/ResendConfirmationForm/ResendConfirmationForm";
export { DevelopmentHint } from "./components/EzOnRails/DevelopmentHint/DevelopmentHint";
export { isUnauthorizedError } from "./http/client/EzOnRailsHttpClient";
export { defaultHttpHeader } from "./http/client/EzOnRailsHttpClient";
export type { EzOnRailsAuthInfo, EzOnRailsUser, EzOnRailsUpdateUserParams } from "./http/client/EzOnRailsHttpClient";
export type { RailsFileBlob } from "./components/EzOnRails/ActiveStorageDropzone/ActiveStorageDropzone";
