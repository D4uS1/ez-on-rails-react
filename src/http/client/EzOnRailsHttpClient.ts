import { EzOnRailsConfig } from "../../config/EzOnRailsConfig";
import  { toSnake, toCamel } from 'convert-keys'
import { toApiUrl, toBaseUrl } from "../utils/EzOnRailsUtils";
import { RailsFileBlob } from "../../components/EzOnRails/ActiveStorageDropzone/ActiveStorageDropzone";

/**
 * Describes the header information needed to authenticate as user on an EzOnRails application.
 */
interface EzOnRailsAuthHeader {
    'uid': string;
    'client': string;
    'expiry': string;
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
    email: string;
    unconfirmedEmail: string | null;
    username: string | null;
    avatar: RailsFileBlob | null;
}

/**
 * Type for a updating an registered in an ez-on-rails system.
 * Used by the actions to get and update the own user.
 */
export type EzOnRailsUpdateUserParams = Partial<Omit<EzOnRailsUser, 'avatar' | 'unconfirmedEmail'>> & {
    avatar?: string | null;
    password?: string | null;
    passwordConfirmation?: string | null;
}

/**
 * Error class for requesting actions via the EzOnRailsHttpClient.
 * Holds an httpStatusCode and message field that is accessible from outside.
 */
export class EzOnRailsHttpError extends Error {
    public httpStatusCode: number;

    /**
     * Constructor expects th httpStatusCode given by the response of the request and a message.
     *
     * @param message
     * @param httpStatusCode
     */
    constructor(message: string, httpStatusCode: number) {
        super();

        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }
}

/**
 * Changes the specified authInfo object to an AuthHeader object, that can be passed via the
 * request to the server.
 * If undefined is passsed, the method will returned undefined, too.
 *
 * @param authInfo
 */
const authInfoToHeader = (authInfo: EzOnRailsAuthInfo | undefined):EzOnRailsAuthHeader | undefined => {
    if (!authInfo) return undefined;

    return {
        uid: authInfo.uid,
        client: authInfo.client,
        expiry: authInfo.expiry,
        "token-type": authInfo.tokenType,
        "access-token": authInfo.accessToken
    }
}

/**
 * Converts the object or array into snake_case.
 */
const toSnakeCase = (data: any):any => {
    // Data is not interpretable
    if (!data) return data;

   return toSnake(data);
}

/**
 * Converts the object or array to camelCase.
 *
 * @param data
 */
const toCamelCase = (data: any): any => {
    // Data is not interpretable
    if (!data) return data;

    return toCamel(data);
}

/**
 * Extracts the authentication information from the specified header and returns
 * a resulting EzOnRailsAuthInfo object. If no auth info are provided, undefined will be
 * returned.
 *
 * @param authHeader
 */
const getAuthInfoFromHeader = (headers: any): EzOnRailsAuthInfo | undefined => {
    if (headers["uid"] && headers["access-token"] && headers["client"] && headers["expiry"] && headers["token-type"] && headers["access-token"]) {
        return {
            uid: headers["uid"],
            client: headers["client"],
            expiry: headers["expiry"],
            tokenType: headers["token-type"],
            accessToken: headers["access-token"]
        }
    }

    return undefined;
}


/**
 * Returns the default http header needed for communication to some EzOnRails server instance.
 * If the authInfo is defined, its information will ba appended to the header of the authentication information, too.
 */
export const defaultHttpHeader = (authInfo: EzOnRailsAuthInfo | undefined = undefined) => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api-version': EzOnRailsConfig.apiVersion(),
        ...authInfoToHeader(authInfo)
    };
}

/**
 * Converts the given parameters object to a get Parameter string.
 */
const toGetParameters = (parameters: any) => {
    return Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&');
}

/**
 * Checks whether the error returned by some http response from ez-on-rails is
 * an unauthorizes error.
 *
 * @param error
 */
export const isUnauthorizedError = (error: any) => {
    return error?.status === 401 || error?.response?.status === 401
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
const fetchWithThrow = async (
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: string,
    body: any,
    headers: any,
): Promise<any> => {
    const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null
    });

    // throw if something went wrong
    if (response.status >= 400) {
        throw new EzOnRailsHttpError(JSON.stringify(response.body)['error'], response.status);
    }

    // get header and data and return result
    let responseHeaders = {};
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
}

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
    signUp: async (data: any): Promise<any | undefined> => {
        data = toSnakeCase(data);

        const result = await fetchWithThrow('POST', toBaseUrl('users'), { user: data }, defaultHttpHeader())

        return toCamelCase(result.body);
    },

    /**
     * Sends a sign in request to login the user given by the specified data.
     * The data object is automaticly converted to snake case, hence it can hold javascript conventional camel case objects.
     * The method returns an EzOnRailsAuthInfo object if the request was successfull and the server responded with authentication
     * information for the next request. This information has to be saved and used by the next request to authenticate.
     *
     * @param data
     */
    signIn: async (data: any): Promise<any & EzOnRailsAuthInfo | undefined>  => {
        data = toSnakeCase(data);

        const result = await fetchWithThrow('POST', toApiUrl('auth/sign_in'),  data, defaultHttpHeader());

        return { ...getAuthInfoFromHeader(result.headers), ...toCamelCase(result.body) }
    },

    /**
     * Sends a signout request for the current user to the ez_on_rails endpoint.
     */
    signOut: async (authInfo: EzOnRailsAuthInfo) => {
        await fetchWithThrow('DELETE', toApiUrl('auth/sign_out'), null, defaultHttpHeader(authInfo));
    },

    /**
     * Sends a request to send password reset instructions via email.
     *
     * @param data
     */
    passwordResetInstructions: async (data: any) => {
        data = toSnakeCase(data);

        await fetchWithThrow('POST', toBaseUrl('users/password'), { user: data }, defaultHttpHeader());
    },

    /**
     * Sends a request to reset the password to the ez_on_rails endpoint.
     * This is the request to change the password, after the user filled out the form with the new password.
     * This method also clears all auth headers.
     *
     * @param data
     */
    passwordReset: async (data: any) => {
        data = toSnakeCase(data);

        await fetchWithThrow('PUT', toBaseUrl('users/password'), { user: data }, defaultHttpHeader());
    },

    /**
     * Requests and returns the own user information from the server.
     *
     * @param authInfo
     */
    getUser: async (authInfo: EzOnRailsAuthInfo): Promise<EzOnRailsUser> => {
        const result = await fetchWithThrow('GET', toApiUrl('users/me'), null, defaultHttpHeader(authInfo));

        return toCamelCase(result.body);
    },

    /**
     * Updates the user with the specified data on the server side and returns the updated profile.
     *
     * @param data
     * @param authInfo
     */
    updateUser: async (data: EzOnRailsUpdateUserParams, authInfo: EzOnRailsAuthInfo): Promise<EzOnRailsUser> => {
        data = toSnakeCase(data);

        const result = await fetchWithThrow('PATCH', toApiUrl('users/me'), { user: data }, defaultHttpHeader(authInfo));

        return toCamelCase(result.body);
    },

    /**
     * Sends a request to resend the confirmation email to the ez_on_rails endpoint.
     * This method also clears all auth headers.
     *
     * @param data
     */
    confirmationInstructions: async (data: any) => {
        data = toSnakeCase(data);

        await fetchWithThrow('POST', toBaseUrl('users/confirmation'), { user: data }, defaultHttpHeader());
    },

    /**
     * Sends a request to confirm the account.
     *
     * @param data
     */
    confirmation: async (data: any) => {
        let url = toBaseUrl('users/confirmation');
        data = toSnakeCase(data);
        url = `${url}?${toGetParameters(data)}`;

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
    get: async <T>(
        url: string,
        data: any,
        authInfo: EzOnRailsAuthInfo | undefined = undefined,
        beforeRequest: ((data: any) => any) | undefined = undefined
    ):Promise<T> => {
        url = toApiUrl(url);

        if (data) {
            data = toSnakeCase(data);
        }

        if (beforeRequest) {
            data = beforeRequest(data)
        }

        if (data) {
            url = `${url}?${toGetParameters(data)}`;
        }

        const result = await fetchWithThrow('GET', url, null, defaultHttpHeader(authInfo));

        return  toCamelCase(result.body);
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
    post: async <T>(
        url: string,
        data: any,
        authInfo: EzOnRailsAuthInfo | undefined = undefined,
        beforeRequest: ((data: any) => any) | undefined = undefined
    ):Promise<T> =>  {
        if (data) {
            data = toSnakeCase(data);
        }

        if (beforeRequest) {
            data = beforeRequest(data)
        }

        const result = await fetchWithThrow('POST', toApiUrl(url), data, defaultHttpHeader(authInfo));

        return toCamelCase(result.body);
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
    patch: async <T>(
        url: string,
        data: any,
        authInfo: EzOnRailsAuthInfo | undefined = undefined,
        beforeRequest: ((data: any) => any) | undefined = undefined
    ):Promise<T> =>  {
        if (data) {
            data = toSnakeCase(data);
        }

        if (beforeRequest) {
            data = beforeRequest(data)
        }

        const result = await fetchWithThrow('PATCH', toApiUrl(url), data, defaultHttpHeader(authInfo));

        return toCamelCase(result.body);
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
    put: async <T>(
        url: string,
        data: any,
        authInfo: EzOnRailsAuthInfo | undefined = undefined,
        beforeRequest: ((data: any) => any) | undefined = undefined
    ):Promise<T> =>  {
        if (data) {
            data = toSnakeCase(data);
        }

        if (beforeRequest) {
            data = beforeRequest(data)
        }

        const result = await fetchWithThrow('PUT', toApiUrl(url), data, defaultHttpHeader(authInfo));

        return toCamelCase(result.body);

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
    delete: async <T>(
        url: string,
        data: any,
        authInfo: EzOnRailsAuthInfo | undefined = undefined,
        beforeRequest: ((data: any) => any) | undefined = undefined
    ):Promise<T> =>  {
        url = toApiUrl(url);

        if (data) {
            data = toSnakeCase(data);
        }

        if (beforeRequest) {
            data = beforeRequest(data)
        }

        if (data) {
            url = `${url}?${toGetParameters(data)}`;
        }

        const result = await fetchWithThrow('DELETE', url, null, defaultHttpHeader(authInfo));

        return  toCamelCase(result.body);
    },

    /**
     * Returns the default headers used to make an authorized request.
     * Can be used for custom requests without the ez-on-rails-react client..
     *
     * @param authInfo
     */
    defaultHttpHeader: (authInfo: EzOnRailsAuthInfo):any => {
        return defaultHttpHeader(authInfo);
    }
}
