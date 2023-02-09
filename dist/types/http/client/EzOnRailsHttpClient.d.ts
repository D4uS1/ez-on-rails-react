import { RailsFileBlob } from '../../components/EzOnRails/ActiveStorageDropzone/ActiveStorageDropzone';
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
 * If the authInfo is defined, its information will ba appended to the header of the authentication information, too.
 *
 * If the apiVersion is defined, it will be used instead of the value saved in the EzOnRailsConfig, hence this method
 * can be used to build headers that are accepted by ez-on-rails backends without using the http methods of this package.
 */
export declare const defaultHttpHeader: (authInfo?: EzOnRailsAuthInfo | undefined, apiVersion?: string) => {
    uid?: string | undefined;
    client?: string | undefined;
    expiry?: string | undefined;
    'token-type'?: string | undefined;
    'access-token'?: string | undefined;
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
     * Sends a signup request to the server.
     * The specified data is the user data passed to the sign_up action of the EzOnRails endpoint.
     * The data object is automaticly converted to snake case, hence it can hold javascript conventional camel case objects.
     * Since this differs from service to service, the data is mentioned to be "any" data.
     * This is a async function, hence returning a promise of the response of the action.
     *
     * @param data
     */
    signUp: (data: EzOnRailsSignUpParams) => Promise<void>;
    /**
     * Sends a sign in request to login the user given by the specified data.
     * The data object is automaticly converted to snake case, hence it can hold javascript conventional camel case objects.
     * The method returns an EzOnRailsAuthInfo object if the request was successfull and the server responded with authentication
     * information for the next request. This information has to be saved and used by the next request to authenticate.
     *
     * @param data
     */
    signIn: (data: EzOnRailsSignInParams) => Promise<EzOnRailsAuthInfo>;
    /**
     * Sends a signout request for the current user to the ez_on_rails endpoint.
     */
    signOut: (authInfo: EzOnRailsAuthInfo) => Promise<void>;
    /**
     * Sends a request to send password reset instructions via email.
     *
     * @param data
     */
    passwordResetInstructions: (data: EzOnRailsPasswordResetInstructionsParams) => Promise<void>;
    /**
     * Sends a request to reset the password to the ez_on_rails endpoint.
     * This is the request to change the password, after the user filled out the form with the new password.
     * This method also clears all auth headers.
     *
     * @param data
     */
    passwordReset: (data: EzOnRailsPasswordResetParams) => Promise<void>;
    /**
     * Requests and returns the own user information from the server.
     *
     * @param authInfo
     */
    getUser: (authInfo: EzOnRailsAuthInfo) => Promise<EzOnRailsUser>;
    /**
     * Updates the user with the specified data on the server side and returns the updated profile.
     *
     * @param data
     * @param authInfo
     */
    updateUser: (data: EzOnRailsUpdateUserParams, authInfo: EzOnRailsAuthInfo) => Promise<EzOnRailsUser>;
    /**
     * Sends a request to resend the confirmation email to the ez_on_rails endpoint.
     * This method also clears all auth headers.
     *
     * @param data
     */
    confirmationInstructions: (data: EzOnRailsConfirmationInstructionsParams) => Promise<void>;
    /**
     * Sends a request to confirm the account.
     *
     * @param data
     */
    confirmation: (data: EzOnRailsConfirmParams) => Promise<void>;
    /**
     * Calls a http GET action to the url in the api of the current EzOnRails application.
     * The url is expected to be the path without the system and the api prefix.
     * The data object is expected to be an json object containing the body information of the request.
     * The data object is automaticly converted to snake case, hence it can hold javascript conventional camel case objects.
     * In this case, the data object will be serialized to a get parameter string and will be appended to the url.
     * The call includes the auth headers for the current user.
     * If the authInfo is passed, the request will send authentication headers to authenticate the user defined by
     * the authInfo object.
     * If the beforeRequest function is passed, those will be called after the data has been converted to snake_case and
     * before the data is send to the server. This can be used to manipulate the data right before the request.
     *
     * @param url
     * @param data
     * @param authInfo
     * @param beforeRequest
     */
    get: <TParams, TResponse>(url: string, data: TParams, authInfo?: EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: TParams) => TParams) | undefined) => Promise<TResponse>;
    /**
     * Calls a http POST action to the url in the api of the current EzOnRails application.
     * The url is expected to be the path without the system and the api prefix.
     * The data object is expected to be an json object containing the body information of the request.
     * The data object is automaticly converted to snake case, hence it can hold javascript conventional camel case objects.
     * The call includes the auth headers for the current user.
     * If the authInfo is passed, the request will send authentication headers to authenticate the user defined by
     * the authInfo object.
     * If the beforeRequest function is passed, those will be called after the data has been converted to snake_case and
     * before the data is send to the server. This can be used to manipulate the data right before the request.
     *
     * @param url
     * @param data
     * @param authInfo
     * @param beforeRequest
     */
    post: <TParams_1, TResponse_1>(url: string, data: TParams_1, authInfo?: EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: TParams_1) => TParams_1) | undefined) => Promise<TResponse_1>;
    /**
     * Calls a http PATCH action to the url in the api of the current EzOnRails application.
     * The url is expected to be the path without the system and the api prefix.
     * The data object is expected to be an json object containing the body information of the request.
     * The data object is automaticly converted to snake case, hence it can hold javascript conventional camel case objects.
     * The call includes the auth headers for the current user.
     * If the authInfo is passed, the request will send authentication headers to authenticate the user defined by
     * the authInfo object.
     * If the beforeRequest function is passed, those will be called after the data has been converted to snake_case and
     * before the data is send to the server. This can be used to manipulate the data right before the request.
     *
     * @param url
     * @param data
     * @param authInfo
     * @param beforeRequest
     */
    patch: <TParams_2, TResponse_2>(url: string, data: TParams_2, authInfo?: EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: TParams_2) => TParams_2) | undefined) => Promise<TResponse_2>;
    /**
     * Calls a http PATCH action to the url in the api of the current EzOnRails application.
     * The url is expected to be the path without the system and the api prefix.
     * The data object is expected to be an json object containing the body information of the request.
     * The data object is automaticly converted to snake case, hence it can hold javascript conventional camel case objects.
     * The call includes the auth headers for the current user.
     * If the authInfo is passed, the request will send authentication headers to authenticate the user defined by
     * the authInfo object.
     * If the beforeRequest function is passed, those will be called after the data has been converted to snake_case and
     * before the data is send to the server. This can be used to manipulate the data right before the request.
     *
     * @param url
     * @param data
     * @param authInfo
     * @param beforeRequest
     */
    put: <TParams_3, TResponse_3>(url: string, data: TParams_3, authInfo?: EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: TParams_3) => TParams_3) | undefined) => Promise<TResponse_3>;
    /**
     * Calls a http DELETE action to the url in the api of the current EzOnRails application.
     * The url is expected to be the path without the system and the api prefix.
     * The call includes the auth headers for the current user.
     * The data object is expected to be an json object containing the body information of the request.
     * The data object is automaticly converted to snake case, hence it can hold javascript conventional camel case objects.
     * In this case, the data object will be serialized to a get parameter string and will be appended to the url.
     * The call includes the auth headers for the current user.
     * If the authInfo is passed, the request will send authentication headers to authenticate the user defined by
     * the authInfo object.
     * If the beforeRequest function is passed, those will be called after the data has been converted to snake_case and
     * before the data is send to the server. This can be used to manipulate the data right before the request.
     *
     * @param url
     * @param data
     * @param authInfo
     * @param beforeRequest
     */
    delete: <TParams_4, TResponse_4>(url: string, data: TParams_4, authInfo?: EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: TParams_4) => TParams_4) | undefined) => Promise<TResponse_4>;
    /**
     * Returns the default headers used to make an authorized request.
     * Can be used for custom requests without the ez-on-rails-react client.
     * If the apiVersion is not passed, the apiVersion given by the config will be used.
     *
     * @param authInfo
     * @param apiVersion
     */
    defaultHttpHeader: (authInfo: EzOnRailsAuthInfo, apiVersion?: string) => Record<string, string>;
};
