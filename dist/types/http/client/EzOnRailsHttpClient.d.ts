import { RailsFileBlob } from '../../components/ActiveStorageDropzone/ActiveStorageDropzone';
/**
 * Auth information for http requests and responses.
 * If a route is protected and needs authentication, this information must be passed to the http
 * client to authenticate againsgt the EzOnRails endpoint. If the server changes the authentication
 * information, those will be send back to the client. The resulting new auth information will
 * be returned by the http client, in addition to the normal result.
 */
export interface EzOnRailsAuthInfo {
    uid: string;
    client: string;
    expiry: string;
    tokenType: string;
    accessToken: string;
}
/**
 * Type for a user registered in an ez-on-rails system.
 * Used by the actions to get and update the own user.
 */
export interface EzOnRailsUser {
    email: string;
    unconfirmedEmail?: string;
    username?: string;
    avatar?: RailsFileBlob | null;
}
/**
 * Type for a updating an registered in an ez-on-rails system.
 * Used by the actions to get and update the own user.
 * The unconfirmedEmail is not needed to be submitted, since this is only used to show the user if he
 * has provided any unconfirmed email yet.
 */
export type EzOnRailsUpdateUserParams = Partial<Omit<EzOnRailsUser, 'unconfirmedEmail'>> & {
    password?: string;
    passwordConfirmation?: string;
};
/**
 * Describes the parameters that are needed for signup.
 * The interface allows any data to be passed, but requires the parameters to be set that are minimum
 * needed by ez-on-rails for signUp. This makes it possible to append any data on the user model that is also saved
 * on signUp, but also gets sure that the needed data for registration process is passed.
 */
export interface EzOnRailsSignUpParams {
    email: string;
    password: string;
    passwordConfirmation: string;
    privacyPolicyAccepted: boolean;
    username?: string;
    [key: string]: unknown;
}
/**
 * Descibes the parameters needed to sign in.
 */
export interface EzOnRailsSignInParams {
    email: string;
    password: string;
}
/**
 * Describes the parameters needed for the password reset instructions endpoint.
 */
export interface EzOnRailsPasswordResetInstructionsParams {
    email: string;
}
/**
 * Describes the parameters needed for the password reset endpoint.
 */
export interface EzOnRailsPasswordResetParams {
    password: string;
    passwordConfirmation: string;
    resetPasswordToken: string;
}
/**
 * Describes the parameters needed for the endpoint to resend the confirmation instructions.
 */
export interface EzOnRailsConfirmationInstructionsParams {
    email: string;
}
/**
 * Describes the parameters needed to confirm an account using the confirmation link that was
 * send via email.
 */
export interface EzOnRailsConfirmParams {
    confirmationToken: string;
}
/**
 * Returns the default http header needed for communication to some EzOnRails server instance.
 */
export declare const defaultHttpHeader: (authInfo: EzOnRailsAuthInfo | null, apiKey: string | null, apiVersion: string) => {
    uid?: string | undefined;
    client?: string | undefined;
    expiry?: string | undefined;
    'token-type'?: string | undefined;
    'access-token'?: string | undefined;
    'api-key'?: string | undefined;
    'Content-Type': string;
    Accept: string;
    'api-version': string;
};
/**
 * Contains some Request related Methods to some EzOnRails api.
 * EzOnRails uses the localStorage to read and write the Configuration.
 * The Storage is expected to contain the followingValues.
 */
export declare const EzOnRailsHttpClient: {
    /**
     * Sends a signup request to the EzOnRails application at the specified backendUrl.
     * The specified data is the user data passed to the sign_up action of the EzOnRails endpoint.
     * The data object is automatically converted to snake case. Date objects are automatically converted to iso strings.
     * Since this differs from service to service, the data is mentioned to be "any" data.
     * This is a async function, hence returning a promise of the response of the action.
     * The apiVersion is the current api version at the backend that must match.
     *
     * @param backendUrl
     * @param data
     * @param apiVersion
     */
    signUp: (backendUrl: string, data: EzOnRailsSignUpParams, apiVersion: string) => Promise<void>;
    /**
     * Sends a sign in request to the EzOnRails application at the specified backendUrl.
     * The user given by the specified data.
     * The data object is automatically converted to snake case. Date objects are automatically converted to iso strings.
     * The method returns an EzOnRailsAuthInfo object if the request was successfull and the server responded with authentication
     * information for the next request. This information has to be saved and used by the next request to authenticate.
     * The apiVersion is the current api version at the backend that must match.
     *
     * @param backendUrl
     * @param data
     * @param apiVersion
     */
    signIn: (backendUrl: string, data: EzOnRailsSignInParams, apiVersion: string) => Promise<EzOnRailsAuthInfo>;
    /**
     * Sends a signout request for the current user to the EzOnRails application at the specified backendUrl.
     * The apiVersion is the current api version at the backend that must match.
     *
     * @param backendUrl
     * @param authInfo
     * @param apiVersion
     */
    signOut: (backendUrl: string, authInfo: EzOnRailsAuthInfo, apiVersion: string) => Promise<void>;
    /**
     * Sends a request to send password reset instructions via email to the EzOnRails application at the specified backendUrl.
     * The apiVersion is the current api version at the backend that must match.
     *
     * @param backendUrl
     * @param data
     * @param apiVersion
     */
    passwordResetInstructions: (backendUrl: string, data: EzOnRailsPasswordResetInstructionsParams, apiVersion: string) => Promise<void>;
    /**
     * Sends a request to reset the password to the EzOnRails application at the specified backendUrl.
     * This is the request to change the password, after the user filled out the form with the new password.
     * This method also clears all auth headers.
     * The apiVersion is the current api version at the backend that must match.
     *
     * @param backendUrl
     * @param data
     * @param apiVersion
     */
    passwordReset: (backendUrl: string, data: EzOnRailsPasswordResetParams, apiVersion: string) => Promise<void>;
    /**
     * Requests and returns the own user information from the EzOnRails application at the specified backendUrl.
     * The apiVersion is the current api version at the backend that must match.
     *
     * @param backendUrl
     * @param authInfo
     * @param apiVersion
     */
    getUser: (backendUrl: string, authInfo: EzOnRailsAuthInfo, apiVersion: string) => Promise<EzOnRailsUser>;
    /**
     * Updates the user with the specified data on the EzOnRails application at the specified backendUrl
     * side and returns the updated profile.
     * The apiVersion is the current api version at the backend that must match.
     *
     * @param backendUrl
     * @param data
     * @param authInfo
     * @param apiVersion
     */
    updateUser: (backendUrl: string, data: EzOnRailsUpdateUserParams, authInfo: EzOnRailsAuthInfo, apiVersion: string) => Promise<EzOnRailsUser>;
    /**
     * Sends a request to resend the confirmation email to the EzOnRails application at the specified backendUrl.
     * This method also clears all auth headers.
     * The apiVersion is the current api version at the backend that must match.
     *
     * @param backendUrl
     * @param data
     * @param apiVersion
     */
    confirmationInstructions: (backendUrl: string, data: EzOnRailsConfirmationInstructionsParams, apiVersion: string) => Promise<void>;
    /**
     * Sends a request to confirm the account to the EzOnRails application at the specified backendUrl.
     * The apiVersion is the current api version at the backend that must match.
     *
     * @param backendUrl
     * @param data
     * @param apiVersion
     */
    confirmation: (backendUrl: string, data: EzOnRailsConfirmParams, apiVersion: string) => Promise<void>;
    /**
     * Calls a http GET action to the api at the specified path of an EzOnRails application at the backendUrl.
     * The backendUrl and the path are expected not to have the api suffix / prefix included.
     * The data object is expected to be an json object containing the body information of the request.
     * The data object is automatically converted to snake case. Date objects are automatically converted to iso strings.
     * In this case, the data object will be serialized to a get parameter string and will be appended to the url.
     * If the authInfo is passed, the request will send authentication headers to authenticate the user defined by the authInfo object.
     * If the apiKey is passed, the request will send headers including the api key to authenticate requests that are protected by the api key.
     * The apiVersion is the current api version of the backend.
     * If the beforeRequest function is passed, those will be called after the data has been converted to snake_case and
     * before the data is send to the server. This can be used to manipulate the data right before the request.
     * The response json will be automatically converted to camelCase. ISO Date Strings will be automatically converted to date objects.
     *
     * @param backendUrl
     * @param path
     * @param data
     * @param authInfo
     * @param apiKey
     * @param apiVersion
     * @param beforeRequest
     */
    get: <TParams, TResponse>(backendUrl: string, path: string, data: TParams, authInfo?: EzOnRailsAuthInfo | null, apiKey?: string | null, apiVersion?: string, beforeRequest?: ((data: TParams) => TParams) | undefined) => Promise<TResponse>;
    /**
     * Calls a http POST action to the api at the specified path of an EzOnRails application at the backendUrl.
     * The backendUrl and the path are expected not to have the api suffix / prefix included.
     * The data object is expected to be an json object containing the body information of the request.
     * The data object is automatically converted to snake case. Date objects are automatically converted to iso strings.
     * If the authInfo is passed, the request will send authentication headers to authenticate the user defined by the authInfo object.
     * If the apiKey is passed, the request will send headers including the api key to authenticate requests that are protected by the api key.
     * The apiVersion is the current api version of the backend.
     * If the beforeRequest function is passed, those will be called after the data has been converted to snake_case and
     * before the data is send to the server. This can be used to manipulate the data right before the request.
     * The response json will be automatically converted to camelCase. ISO Date Strings will be automatically converted to date objects.
     *
     * @param backendUrl
     * @param path
     * @param data
     * @param authInfo
     * @param apiKey
     * @param apiVersion
     * @param beforeRequest
     */
    post: <TParams, TResponse>(backendUrl: string, path: string, data: TParams, authInfo?: EzOnRailsAuthInfo | null, apiKey?: string | null, apiVersion?: string, beforeRequest?: ((data: TParams) => TParams) | undefined) => Promise<TResponse>;
    /**
     * Calls a http PATCH action to the api at the specified path of an EzOnRails application at the backendUrl.
     * The backendUrl and the path are expected not to have the api suffix / prefix included.
     * The data object is expected to be an json object containing the body information of the request.
     * The data object is automatically converted to snake case. Date objects are automatically converted to iso strings.
     * If the authInfo is passed, the request will send authentication headers to authenticate the user defined by the authInfo object.
     * If the apiKey is passed, the request will send headers including the api key to authenticate requests that are protected by the api key.
     * The apiVersion is the current api version of the backend.
     * If the beforeRequest function is passed, those will be called after the data has been converted to snake_case and
     * before the data is send to the server. This can be used to manipulate the data right before the request.
     * The response json will be automatically converted to camelCase. ISO Date Strings will be automatically converted to date objects.
     *
     * @param backendUrl
     * @param path
     * @param data
     * @param authInfo
     * @param apiKey
     * @param apiVersion
     * @param beforeRequest
     */
    patch: <TParams, TResponse>(backendUrl: string, path: string, data: TParams, authInfo?: EzOnRailsAuthInfo | null, apiKey?: string | null, apiVersion?: string, beforeRequest?: ((data: TParams) => TParams) | undefined) => Promise<TResponse>;
    /**
     * Calls a http PUT action to the api at the specified path of an EzOnRails application at the backendUrl.
     * The backendUrl and the path are expected not to have the api suffix / prefix included.
     * The data object is expected to be an json object containing the body information of the request.
     * The data object is automatically converted to snake case. Date objects are automatically converted to iso strings.
     * If the authInfo is passed, the request will send authentication headers to authenticate the user defined by the authInfo object.
     * If the apiKey is passed, the request will send headers including the api key to authenticate requests that are protected by the api key.
     * The apiVersion is the current api version of the backend.
     * If the beforeRequest function is passed, those will be called after the data has been converted to snake_case and
     * before the data is send to the server. This can be used to manipulate the data right before the request.
     * The response json will be automatically converted to camelCase. ISO Date Strings will be automatically converted to date objects.
     *
     * @param backendUrl
     * @param path
     * @param data
     * @param authInfo
     * @param apiKey
     * @param apiVersion
     * @param beforeRequest
     */
    put: <TParams, TResponse>(backendUrl: string, path: string, data: TParams, authInfo?: EzOnRailsAuthInfo | null, apiKey?: string | null, apiVersion?: string, beforeRequest?: ((data: TParams) => TParams) | undefined) => Promise<TResponse>;
    /**
     * Calls a http DELETE action to the api at the specified path of an EzOnRails application at the backendUrl.
     * The backendUrl and the path are expected not to have the api suffix / prefix included.
     * The call includes the auth headers for the current user.
     * The data object is expected to be an json object containing the body information of the request.
     * The data object is automatically converted to snake case. Date objects are automatically converted to iso strings.
     * In this case, the data object will be serialized to a get parameter string and will be appended to the url.
     * If the authInfo is passed, the request will send authentication headers to authenticate the user defined by the authInfo object.
     * If the apiKey is passed, the request will send headers including the api key to authenticate requests that are protected by the api key.
     * The apiVersion is the current api version of the backend.
     * If the beforeRequest function is passed, those will be called after the data has been converted to snake_case and
     * before the data is send to the server. This can be used to manipulate the data right before the request.
     * The response json will be automatically converted to camelCase. ISO Date Strings will be automatically converted to date objects.
     *
     * @param backendUrl
     * @param path
     * @param data
     * @param authInfo
     * @param apiKey
     * @param apiVersion
     * @param beforeRequest
     */
    delete: <TParams, TResponse>(backendUrl: string, path: string, data: TParams, authInfo?: EzOnRailsAuthInfo | null, apiKey?: string | null, apiVersion?: string, beforeRequest?: ((data: TParams) => TParams) | undefined) => Promise<TResponse>;
    /**
     * Returns the default headers used to make an authorized request.
     * Can be used for custom requests without the ez-on-rails-react client.
     *
     * @param authInfo
     * @param apiKey
     * @param apiVersion
     */
    defaultHttpHeader: (authInfo: EzOnRailsAuthInfo | null, apiKey: string | null, apiVersion: string) => Record<string, string>;
};
