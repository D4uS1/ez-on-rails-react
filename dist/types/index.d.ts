/// <reference types="react" />
export declare const EzOnRails: {
    config: {
        init: (options: import("./config/EzOnRailsConfig").EzOnRailsConfigOptions) => void;
        baseUrl: () => string | null;
        apiUrl: () => string | null;
        apiVersion: () => string;
    };
    http: {
        client: {
            signUp: (data: import("./http/client/EzOnRailsHttpClient").EzOnRailsSignUpParams) => Promise<void>;
            signIn: (data: import("./http/client/EzOnRailsHttpClient").EzOnRailsSignInParams) => Promise<import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo>;
            signOut: (authInfo: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo) => Promise<void>;
            passwordResetInstructions: (data: import("./http/client/EzOnRailsHttpClient").EzOnRailsPasswordResetInstructionsParams) => Promise<void>;
            passwordReset: (data: import("./http/client/EzOnRailsHttpClient").EzOnRailsPasswordResetParams) => Promise<void>;
            getUser: (authInfo: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo) => Promise<import("./http/client/EzOnRailsHttpClient").EzOnRailsUser>;
            updateUser: (data: import("./http/client/EzOnRailsHttpClient").EzOnRailsUpdateUserParams, authInfo: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo) => Promise<import("./http/client/EzOnRailsHttpClient").EzOnRailsUser>;
            confirmationInstructions: (data: import("./http/client/EzOnRailsHttpClient").EzOnRailsConfirmationInstructionsParams) => Promise<void>;
            confirmation: (data: import("./http/client/EzOnRailsHttpClient").EzOnRailsConfirmParams) => Promise<void>;
            get: <TParams, TResponse>(url: string, data: TParams, authInfo?: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: TParams) => TParams) | undefined) => Promise<TResponse>;
            post: <TParams_1, TResponse_1>(url: string, data: TParams_1, authInfo?: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: TParams_1) => TParams_1) | undefined) => Promise<TResponse_1>;
            patch: <TParams_2, TResponse_2>(url: string, data: TParams_2, authInfo?: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: TParams_2) => TParams_2) | undefined) => Promise<TResponse_2>;
            put: <TParams_3, TResponse_3>(url: string, data: TParams_3, authInfo?: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: TParams_3) => TParams_3) | undefined) => Promise<TResponse_3>;
            delete: <TParams_4, TResponse_4>(url: string, data: TParams_4, authInfo?: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: TParams_4) => TParams_4) | undefined) => Promise<TResponse_4>;
            defaultHttpHeader: (authInfo: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo, apiVersion?: string | undefined) => Record<string, string>;
        };
        swr: {
            fetcher: <TParams_5, TResponse_5>(url: string, method?: string, data?: TParams_5 | null, authInfo?: import("./http/client/EzOnRailsHttpClient").EzOnRailsAuthInfo | undefined) => Promise<TResponse_5>;
        };
        utils: {
            toBaseUrl: (path: string) => string;
            toApiUrl: (path: string) => string;
            toSnakeCase: <T>(data: T) => T;
            toCamelCase: <T_1>(data: T_1) => T_1;
            toGetParameters: (parameters: Record<string, string | number | boolean | null>) => string;
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
export { EzOnRailsConfig } from './config/EzOnRailsConfig';
export { EzOnRailsHttp, EzOnRailsHttpError } from './http/EzOnRailsHttp';
export { EzOnRailsComponents } from './components/EzOnRailsComponents';
export { ActiveStorageDropzone } from './components/EzOnRails/ActiveStorageDropzone/ActiveStorageDropzone';
export { LoginForm } from './components/EzOnRails/LoginForm/LoginForm';
export { RegistrationForm } from './components/EzOnRails/RegistrationForm/RegistrationForm';
export { LostPasswordForm } from './components/EzOnRails/LostPasswordForm/LostPasswordForm';
export { UpdateUserForm } from './components/EzOnRails/UpdateUserForm/UpdateUserForm';
export { ProtectedPage } from './components/EzOnRails/ProtectedPage/ProtectedPage';
export { ResetPasswordForm } from './components/EzOnRails/ResetPasswordForm/ResetPasswordForm';
export { ResendConfirmationForm } from './components/EzOnRails/ResendConfirmationForm/ResendConfirmationForm';
export { DevelopmentHint } from './components/EzOnRails/DevelopmentHint/DevelopmentHint';
export { defaultHttpHeader } from './http/client/EzOnRailsHttpClient';
export type { EzOnRailsAuthInfo, EzOnRailsUser, EzOnRailsUpdateUserParams } from './http/client/EzOnRailsHttpClient';
export type { RailsFileBlob } from './components/EzOnRails/ActiveStorageDropzone/ActiveStorageDropzone';
