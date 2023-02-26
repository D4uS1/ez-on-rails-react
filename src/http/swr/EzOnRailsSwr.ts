import { EzOnRailsAuthInfo, EzOnRailsHttpClient } from '../client/EzOnRailsHttpClient';

/**
 * SWR Fetcher for EzOnRails api calls.
 * The specified key can either be a string or an array.
 * If the key is a string, a default GET call to the configured EzOnRails api system will be executed.
 * This call includes the user information of the current user for authorization, if it is provided.
 *
 * If key is an array, it expects the following values in the right order.
 * The following parameters are needed:
 * 1. backendUrl - The base url of the EzOnRails application.
 * 2. path - The relative path of the request (without prefixed api/)
 * 3. method: string - The HTTP method
 * 4. data: object - The data passed as body json to the server
 * 5. authInfo: EzOnRailsAuthInfo - Authentication information to identify the user on the server side.
 * 6. apiVersion: string - The api version that must match the one in the backend.
 *
 * If the specified method is DELETE, the data field will be ignored.
 *
 * @param key
 */
export const EzOnRailsSwr = {
    fetcher: async <TParams, TResponse>(
        backendUrl: string,
        path: string,
        method = 'get',
        data: TParams | null = null,
        authInfo: EzOnRailsAuthInfo | undefined = undefined,
        apiVersion: string = '1.0'
    ): Promise<TResponse> => {
        method = method.toLowerCase();
        switch (method) {
            case 'post': {
                return EzOnRailsHttpClient.post<TParams | null, TResponse>(backendUrl, path, data, authInfo, apiVersion);
            }

            case 'put': {
                return EzOnRailsHttpClient.put<TParams | null, TResponse>(backendUrl, path, data, authInfo, apiVersion);
            }

            case 'patch': {
                return EzOnRailsHttpClient.patch<TParams | null, TResponse>(backendUrl, path, data, authInfo, apiVersion);
            }

            case 'delete': {
                return EzOnRailsHttpClient.delete<TParams | null, TResponse>(backendUrl, path, data, authInfo, apiVersion);
            }

            default: {
                return EzOnRailsHttpClient.get<TParams | null, TResponse>(backendUrl, path, data, authInfo, apiVersion);
            }
        }
    }
};
