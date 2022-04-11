import { RailsFileBlob } from "../../components/EzOnRails/ActiveStorageDropzone/ActiveStorageDropzone";
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
    unconfirmedEmail: string | null;
    username: string | null;
    avatar: RailsFileBlob | null;
}
/**
 * Type for a updating an registered in an ez-on-rails system.
 * Used by the actions to get and update the own user.
 */
export declare type EzOnRailsUpdateUserParams = Partial<Omit<EzOnRailsUser, 'avatar' | 'unconfirmedEmail'>> & {
    avatar?: string | null;
    password?: string | null;
    passwordConfirmation?: string | null;
};
/**
 * Error class for requesting actions via the EzOnRailsHttpClient.
 * Holds an httpStatusCode and message field that is accessible from outside.
 */
export declare class EzOnRailsHttpError extends Error {
    httpStatusCode: number;
    /**
     * Constructor expects th httpStatusCode given by the response of the request and a message.
     *
     * @param message
     * @param httpStatusCode
     */
    constructor(message: string, httpStatusCode: number);
}
/**
 * Returns the default http header needed for communication to some EzOnRails server instance.
 * If the authInfo is defined, its information will ba appended to the header of the authentication information, too.
 */
export declare const defaultHttpHeader: (authInfo?: EzOnRailsAuthInfo | undefined) => {
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
 * Checks whether the error returned by some http response from ez-on-rails is
 * an unauthorizes error.
 *
 * @param error
 */
export declare const isUnauthorizedError: (error: any) => boolean;
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
    signUp: (data: any) => Promise<any | undefined>;
    /**
     * Sends a sign in request to login the user given by the specified data.
     * The data object is automaticly converted to snake case, hence it can hold javascript conventional camel case objects.
     * The method returns an EzOnRailsAuthInfo object if the request was successfull and the server responded with authentication
     * information for the next request. This information has to be saved and used by the next request to authenticate.
     *
     * @param data
     */
    signIn: (data: any) => Promise<(any & EzOnRailsAuthInfo) | undefined>;
    /**
     * Sends a signout request for the current user to the ez_on_rails endpoint.
     */
    signOut: (authInfo: EzOnRailsAuthInfo) => Promise<void>;
    /**
     * Sends a request to send password reset instructions via email.
     *
     * @param data
     */
    passwordResetInstructions: (data: any) => Promise<void>;
    /**
     * Sends a request to reset the password to the ez_on_rails endpoint.
     * This is the request to change the password, after the user filled out the form with the new password.
     * This method also clears all auth headers.
     *
     * @param data
     */
    passwordReset: (data: any) => Promise<void>;
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
    confirmationInstructions: (data: any) => Promise<void>;
    /**
     * Sends a request to confirm the account.
     *
     * @param data
     */
    confirmation: (data: any) => Promise<void>;
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
    get: <T>(url: string, data: any, authInfo?: EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: any) => any) | undefined) => Promise<T>;
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
    post: <T_1>(url: string, data: any, authInfo?: EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: any) => any) | undefined) => Promise<T_1>;
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
    patch: <T_2>(url: string, data: any, authInfo?: EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: any) => any) | undefined) => Promise<T_2>;
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
    put: <T_3>(url: string, data: any, authInfo?: EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: any) => any) | undefined) => Promise<T_3>;
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
    delete: <T_4>(url: string, data: any, authInfo?: EzOnRailsAuthInfo | undefined, beforeRequest?: ((data: any) => any) | undefined) => Promise<T_4>;
    /**
     * Returns the default headers used to make an authorized request.
     * Can be used for custom requests without the ez-on-rails-react client..
     *
     * @param authInfo
     */
    defaultHttpHeader: (authInfo: EzOnRailsAuthInfo) => any;
};
