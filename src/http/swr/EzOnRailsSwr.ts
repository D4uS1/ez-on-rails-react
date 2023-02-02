import { EzOnRailsAuthInfo, EzOnRailsHttpClient } from '../client/EzOnRailsHttpClient';

/**
 * SWR Fetcher for EzOnRails api calls.
 * The specified key can either be a string or an array.
 * If the key is a string, a default GET call to the configured EzOnRails api system will be executed.
 * This call includes the user information of the current user for authorization, if it is provided.
 *
 * If key is an array, it expects the following values in the right order.
 * Every following parameter is optional.
 * 1. url: string - The url without the base system utl and the api prefix
 * 2. method: string - The HTTP method
 * 3. data: object - The data passed as body json to the server
 * 4. authInfo: EzOnRailsAuthInfo - Authentication information to identify the user on the server side.
 *
 * If the specified method is DELETE, the data field will be ignored.
 *
 * @param key
 */
export const EzOnRailsSwr = {
    fetcher: async <TParams, TResponse>(
        url: string,
        method = 'get',
        data: TParams | null = null,
        authInfo: EzOnRailsAuthInfo | undefined = undefined
    ): Promise<TResponse> => {
        method = method.toLowerCase();
        switch (method) {
            case 'post': {
                return EzOnRailsHttpClient.post<TParams | null, TResponse>(url, data, authInfo);
            }

            case 'put': {
                return EzOnRailsHttpClient.put<TParams | null, TResponse>(url, data, authInfo);
            }

            case 'patch': {
                return EzOnRailsHttpClient.patch<TParams | null, TResponse>(url, data, authInfo);
            }

            case 'delete': {
                return EzOnRailsHttpClient.delete<TParams | null, TResponse>(url, data, authInfo);
            }

            default: {
                return EzOnRailsHttpClient.get<TParams | null, TResponse>(url, data, authInfo);
            }
        }
    }
};
