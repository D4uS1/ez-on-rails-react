import { EzOnRailsConfig } from '../../config/EzOnRailsConfig';
import { EzOnRailsHttpUtils } from '../utils/EzOnRailsUtils';
import { RailsFileBlob } from '../../components/EzOnRails/ActiveStorageDropzone/ActiveStorageDropzone';
import { EzOnRailsHttpError } from './EzOnRailsHttpError';

/**
 * Describes the header information needed to authenticate as user on an EzOnRails application.
 */
interface EzOnRailsAuthHeader {
    uid: string;
    client: string;
    expiry: string;
    'token-type': string;
    'access-token': string;
}

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
    // The email of the user
    email: string;

    // An unconfirmed email, if the user has not yet confirmed his email
    unconfirmedEmail?: string;

    // The optional username of the user
    username?: string;

    // The users avatar as blob, holding the url and signedId and filename
    avatar?: RailsFileBlob | null;
}

/**
 * Type for a updating an registered in an ez-on-rails system.
 * Used by the actions to get and update the own user.
 * The unconfirmedEmail is not needed to be submitted, since this is only used to show the user if he
 * has provided any unconfirmed email yet.
 */
export type EzOnRailsUpdateUserParams = Partial<Omit<EzOnRailsUser, 'unconfirmedEmail'>> & {
    // The  new password, must only be passed if the user wants to change the password
    password?: string;

    // The confirmed new password, must match password, must only be passed if the user wants to change the password
    passwordConfirmation?: string;
};

/**
 * Describes the parameters that are needed for signup.
 * The interface allows any data to be passed, but requires the parameters to be set that are minimum
 * needed by ez-on-rails for signUp. This makes it possible to append any data on the user model that is also saved
 * on signUp, but also gets sure that the needed data for registration process is passed.
 */
export interface EzOnRailsSignUpParams {
    // The users email
    email: string;

    // The users password
    password: string;

    // The password confirmation, this must match the password
    passwordConfirmation: string;

    // Indicates whether the user accepted the privacy policy. Needs to be true to register.
    privacyPolicyAccepted: boolean;

    // The optional username, can be anything
    username?: string;

    // Any additional data if your model has additional data on registration
    [key: string]: unknown;
}

/**
 * Descibes the parameters needed to sign in.
 */
export interface EzOnRailsSignInParams {
    // The email of the user
    email: string;

    // The users password
    password: string;
}

/**
 * Describes the parameters needed for the password reset instructions endpoint.
 */
export interface EzOnRailsPasswordResetInstructionsParams {
    // The email the instructions are send to
    email: string;
}

/**
 * Describes the parameters needed for the password reset endpoint.
 */
export interface EzOnRailsPasswordResetParams {
    // The password the user wants to set
    password: string;

    // The password confirmation of the password, must match the password
    passwordConfirmation: string;

    // The token that was send via email to the user to reset the password
    resetPasswordToken: string;
}

/**
 * Describes the parameters needed for the endpoint to resend the confirmation instructions.
 */
export interface EzOnRailsConfirmationInstructionsParams {
    // The email the instructions are requested for
    email: string;
}

/**
 * Describes the parameters needed to confirm an account using the confirmation link that was
 * send via email.
 */
export interface EzOnRailsConfirmParams {
    // The token that was send to the users email
    confirmationToken: string;
}

/**
 * Changes the specified authInfo object to an AuthHeader object, that can be passed via the
 * request to the server.
 * If undefined is passsed, the method will returned undefined, too.
 *
 * @param authInfo
 */
const authInfoToHeader = (authInfo: EzOnRailsAuthInfo | undefined): EzOnRailsAuthHeader | undefined => {
    if (!authInfo) return undefined;

    return {
        uid: authInfo.uid,
        client: authInfo.client,
        expiry: authInfo.expiry,
        'token-type': authInfo.tokenType,
        'access-token': authInfo.accessToken
    };
};

/**
 * Extracts the authentication information from the specified header and returns
 * a resulting EzOnRailsAuthInfo object. If no auth info are provided, undefined will be
 * returned.
 *
 * @param headers
 */
const getAuthInfoFromHeader = (headers: Record<string, string>): EzOnRailsAuthInfo => {
    return {
        uid: headers['uid'],
        client: headers['client'],
        expiry: headers['expiry'],
        tokenType: headers['token-type'],
        accessToken: headers['access-token']
    };
};

/**
 * Returns the default http header needed for communication to some EzOnRails server instance.
 * If the authInfo is defined, its information will ba appended to the header of the authentication information, too.
 *
 * If the apiVersion is defined, it will be used instead of the value saved in the EzOnRailsConfig, hence this method
 * can be used to build headers that are accepted by ez-on-rails backends without using the http methods of this package.
 */
export const defaultHttpHeader = (authInfo: EzOnRailsAuthInfo | undefined = undefined, apiVersion?: string) => {
    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-version': apiVersion || EzOnRailsConfig.apiVersion(),
        ...authInfoToHeader(authInfo)
    };
};

/**
 * Describes the response object of the fetchWithThrow function.
 * TRes describes the type of the expected response body.
 */
interface FetchWithThrowResponse<TRes> {
    // The response headers
    headers: Record<string, string>;

    // The response body
    body: TRes;
}

/**
 * Uses the fetch api to execute a http request specified by the given http method, body and headers.
 * The difference between normal fetch and this method is, that an exception is thrown if the status
 * code is >= 400. The result of the request will be returned.
 * This method returns an object having the keys headers and body. Headers is the key value pair object
 * of header information from the response. Body is the json content, if given.
 *
 * @param method
 * @param url
 * @param body
 * @param headers
 */
const fetchWithThrow = async <TRes>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: string,
    body: unknown,
    headers: Record<string, string>
): Promise<FetchWithThrowResponse<TRes>> => {
    const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null
    });

    // throw if something went wrong
    if (response.status >= 400) {
        throw new EzOnRailsHttpError(JSON.stringify(response.body), response.status);
    }

    // get header and data and return result
    const responseHeaders: Record<string, string> = {};
    let responseBody = null;
    try {
        // build headers
        response.headers.forEach((value, key) => {
            responseHeaders[key] = value;
        });

        // build body
        responseBody = await response.json();
    } catch (e) {}

    return {
        headers: responseHeaders,
        body: responseBody
    };
};

/**
 * Contains some Request related Methods to some EzOnRails api.
 * EzOnRails uses the localStorage to read and write the Configuration.
 * The Storage is expected to contain the followingValues.
 */
export const EzOnRailsHttpClient = {
    /**
     * Sends a signup request to the server.
     * The specified data is the user data passed to the sign_up action of the EzOnRails endpoint.
     * The data object is automaticly converted to snake case, hence it can hold javascript conventional camel case objects.
     * Since this differs from service to service, the data is mentioned to be "any" data.
     * This is a async function, hence returning a promise of the response of the action.
     *
     * @param data
     */
    signUp: async (data: EzOnRailsSignUpParams) => {
        data = EzOnRailsHttpUtils.toSnakeCase(data);

        await fetchWithThrow('POST', EzOnRailsHttpUtils.toBaseUrl('users'), { user: data }, defaultHttpHeader());
    },

    /**
     * Sends a sign in request to login the user given by the specified data.
     * The data object is automaticly converted to snake case, hence it can hold javascript conventional camel case objects.
     * The method returns an EzOnRailsAuthInfo object if the request was successfull and the server responded with authentication
     * information for the next request. This information has to be saved and used by the next request to authenticate.
     *
     * @param data
     */
    signIn: async (data: EzOnRailsSignInParams): Promise<EzOnRailsAuthInfo> => {
        data = EzOnRailsHttpUtils.toSnakeCase(data);

        const result = await fetchWithThrow(
            'POST',
            EzOnRailsHttpUtils.toApiUrl('auth/sign_in'),
            data,
            defaultHttpHeader()
        );

        return getAuthInfoFromHeader(result.headers);
    },

    /**
     * Sends a signout request for the current user to the ez_on_rails endpoint.
     */
    signOut: async (authInfo: EzOnRailsAuthInfo) => {
        await fetchWithThrow('DELETE', EzOnRailsHttpUtils.toApiUrl('auth/sign_out'), null, defaultHttpHeader(authInfo));
    },

    /**
     * Sends a request to send password reset instructions via email.
     *
     * @param data
     */
    passwordResetInstructions: async (data: EzOnRailsPasswordResetInstructionsParams) => {
        data = EzOnRailsHttpUtils.toSnakeCase(data);

        await fetchWithThrow(
            'POST',
            EzOnRailsHttpUtils.toBaseUrl('users/password'),
            { user: data },
            defaultHttpHeader()
        );
    },

    /**
     * Sends a request to reset the password to the ez_on_rails endpoint.
     * This is the request to change the password, after the user filled out the form with the new password.
     * This method also clears all auth headers.
     *
     * @param data
     */
    passwordReset: async (data: EzOnRailsPasswordResetParams) => {
        data = EzOnRailsHttpUtils.toSnakeCase(data);

        await fetchWithThrow(
            'PUT',
            EzOnRailsHttpUtils.toBaseUrl('users/password'),
            { user: data },
            defaultHttpHeader()
        );
    },

    /**
     * Requests and returns the own user information from the server.
     *
     * @param authInfo
     */
    getUser: async (authInfo: EzOnRailsAuthInfo): Promise<EzOnRailsUser> => {
        const result = await fetchWithThrow<EzOnRailsUser>(
            'GET',
            EzOnRailsHttpUtils.toApiUrl('users/me'),
            null,
            defaultHttpHeader(authInfo)
        );

        return EzOnRailsHttpUtils.toCamelCase(result.body);
    },

    /**
     * Updates the user with the specified data on the server side and returns the updated profile.
     *
     * @param data
     * @param authInfo
     */
    updateUser: async (data: EzOnRailsUpdateUserParams, authInfo: EzOnRailsAuthInfo): Promise<EzOnRailsUser> => {
        // Only the signedId must be passed to the update action
        const avatarSignedId = data.avatar?.signedId;
        const submitData = { ...EzOnRailsHttpUtils.toSnakeCase(data), avatar: avatarSignedId };

        const result = await fetchWithThrow<EzOnRailsUser>(
            'PATCH',
            EzOnRailsHttpUtils.toApiUrl('users/me'),
            { user: submitData },
            defaultHttpHeader(authInfo)
        );

        return EzOnRailsHttpUtils.toCamelCase(result.body);
    },

    /**
     * Sends a request to resend the confirmation email to the ez_on_rails endpoint.
     * This method also clears all auth headers.
     *
     * @param data
     */
    confirmationInstructions: async (data: EzOnRailsConfirmationInstructionsParams) => {
        data = EzOnRailsHttpUtils.toSnakeCase(data);

        await fetchWithThrow(
            'POST',
            EzOnRailsHttpUtils.toBaseUrl('users/confirmation'),
            { user: data },
            defaultHttpHeader()
        );
    },

    /**
     * Sends a request to confirm the account.
     *
     * @param data
     */
    confirmation: async (data: EzOnRailsConfirmParams) => {
        let url = EzOnRailsHttpUtils.toBaseUrl('users/confirmation');
        data = EzOnRailsHttpUtils.toSnakeCase(data);
        // @ts-ignore This works because the type only is a default json object
        url = `${url}?${EzOnRailsHttpUtils.toGetParameters(data)}`;

        await fetchWithThrow('GET', url, null, defaultHttpHeader());
    },

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
    get: async <TParams, TResponse>(
        url: string,
        data: TParams,
        authInfo: EzOnRailsAuthInfo | undefined = undefined,
        beforeRequest: ((data: TParams) => TParams) | undefined = undefined
    ): Promise<TResponse> => {
        url = EzOnRailsHttpUtils.toApiUrl(url);

        if (data) {
            data = EzOnRailsHttpUtils.toSnakeCase(data);
        }

        if (beforeRequest) {
            data = beforeRequest(data);
        }

        if (data) {
            url = `${url}?${EzOnRailsHttpUtils.toGetParameters(data)}`;
        }

        const result = await fetchWithThrow<TResponse>('GET', url, null, defaultHttpHeader(authInfo));

        return EzOnRailsHttpUtils.toCamelCase(result.body);
    },

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
    post: async <TParams, TResponse>(
        url: string,
        data: TParams,
        authInfo: EzOnRailsAuthInfo | undefined = undefined,
        beforeRequest: ((data: TParams) => TParams) | undefined = undefined
    ): Promise<TResponse> => {
        if (data) {
            data = EzOnRailsHttpUtils.toSnakeCase(data);
        }

        if (beforeRequest) {
            data = beforeRequest(data);
        }

        const result = await fetchWithThrow<TResponse>(
            'POST',
            EzOnRailsHttpUtils.toApiUrl(url),
            data,
            defaultHttpHeader(authInfo)
        );

        return EzOnRailsHttpUtils.toCamelCase(result.body);
    },

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
    patch: async <TParams, TResponse>(
        url: string,
        data: TParams,
        authInfo: EzOnRailsAuthInfo | undefined = undefined,
        beforeRequest: ((data: TParams) => TParams) | undefined = undefined
    ): Promise<TResponse> => {
        if (data) {
            data = EzOnRailsHttpUtils.toSnakeCase(data);
        }

        if (beforeRequest) {
            data = beforeRequest(data);
        }

        const result = await fetchWithThrow<TResponse>(
            'PATCH',
            EzOnRailsHttpUtils.toApiUrl(url),
            data,
            defaultHttpHeader(authInfo)
        );

        return EzOnRailsHttpUtils.toCamelCase(result.body);
    },

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
    put: async <TParams, TResponse>(
        url: string,
        data: TParams,
        authInfo: EzOnRailsAuthInfo | undefined = undefined,
        beforeRequest: ((data: TParams) => TParams) | undefined = undefined
    ): Promise<TResponse> => {
        if (data) {
            data = EzOnRailsHttpUtils.toSnakeCase(data);
        }

        if (beforeRequest) {
            data = beforeRequest(data);
        }

        const result = await fetchWithThrow<TResponse>(
            'PUT',
            EzOnRailsHttpUtils.toApiUrl(url),
            data,
            defaultHttpHeader(authInfo)
        );

        return EzOnRailsHttpUtils.toCamelCase(result.body);
    },

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
    delete: async <TParams, TResponse>(
        url: string,
        data: TParams,
        authInfo: EzOnRailsAuthInfo | undefined = undefined,
        beforeRequest: ((data: TParams) => TParams) | undefined = undefined
    ): Promise<TResponse> => {
        url = EzOnRailsHttpUtils.toApiUrl(url);

        if (data) {
            data = EzOnRailsHttpUtils.toSnakeCase(data);
        }

        if (beforeRequest) {
            data = beforeRequest(data);
        }

        if (data) {
            url = `${url}?${EzOnRailsHttpUtils.toGetParameters(data)}`;
        }

        const result = await fetchWithThrow<TResponse>('DELETE', url, null, defaultHttpHeader(authInfo));

        return EzOnRailsHttpUtils.toCamelCase(result.body);
    },

    /**
     * Returns the default headers used to make an authorized request.
     * Can be used for custom requests without the ez-on-rails-react client..
     *
     * @param authInfo
     */
    defaultHttpHeader: (authInfo: EzOnRailsAuthInfo): Record<string, string> => {
        return defaultHttpHeader(authInfo);
    }
};
