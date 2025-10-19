import { useCallback } from 'react';
import { EzOnRailsHttpClient } from '../http/client/EzOnRailsHttpClient';
import { EzOnRailsHttpUtils } from '../http/utils/EzOnRailsUtils';
import { HttpMethod } from './types';
import { useEzOnRails } from './useEzOnRails';
import { EzOnRailsHttpError } from '../http';

/**
 * Type for an unauthorized callback.
 */
export type OnUnauthorizedCallback = () => void;

/**
 * Describes the result of the UseEzApiClient hook.
 */
interface UseEzApiHttpClientResult {
    // The method to call any http request against the EzOnRails backend application
    call: <TRequest, TResponse>(path: string, method: HttpMethod, params?: TRequest) => Promise<TResponse>;
}

/**
 * Hook that calls returns a method to call an api request to an EzOnRails application.
 * The request path and method is specified via the method.
 * The method automaticly uses the authInfo, backendUrl and apiVersion from the context, hence nothing else must be provided.
 * If basePath is given, it will be prepended to the path.
 * The api Prefix must not be given in the path of the method or the basePath. It will be automaticly appended.
 * The provided params are automaticly converted from camelCase to snakeCase. Date objects are automaticly converted to strings.
 * The response will be automaticly converted from snakeCase to camelCase. Date strings are automaticly converted to date objects.
 *
 * @param basePath
 */
export const useEzApiHttpClient = (basePath?: string): UseEzApiHttpClientResult => {
    const { backendUrl, authInfo, apiKey, apiVersion, onUnauthorizedCallback } = useEzOnRails();

    /**
     * Calls a request to api of the EzOnRails backend application defined by the context values.
     * The /api prefix must not be given to the path, it will be appended automaticly.
     * The params and response is automaticly converted, hence no management for casing or dates is necessary.
     * If a basePath is passed by the hook, it will be prepended to the path.
     */
    const call = useCallback(
        async <TRequest, TResponse>(path: string, method: HttpMethod, params?: TRequest): Promise<TResponse> => {
            const cleanedBasePath = basePath
                ? EzOnRailsHttpUtils.cleanupPath(EzOnRailsHttpUtils.cleanupUrl(basePath))
                : null;
            const cleanedPath = EzOnRailsHttpUtils.cleanupPath(path);
            const fullPath = `${cleanedBasePath ? cleanedBasePath + '/' : ''}${cleanedPath}`;

            try {
                switch (method) {
                    case 'POST':
                        return await EzOnRailsHttpClient.post<TRequest | undefined, TResponse>(
                            backendUrl,
                            fullPath,
                            params,
                            authInfo,
                            apiKey,
                            apiVersion
                        );
                    case 'PUT':
                        return await EzOnRailsHttpClient.put<TRequest | undefined, TResponse>(
                            backendUrl,
                            fullPath,
                            params,
                            authInfo,
                            apiKey,
                            apiVersion
                        );
                    case 'PATCH':
                        return await EzOnRailsHttpClient.patch<TRequest | undefined, TResponse>(
                            backendUrl,
                            fullPath,
                            params,
                            authInfo,
                            apiKey,
                            apiVersion
                        );
                    case 'DELETE':
                        return await EzOnRailsHttpClient.delete<TRequest | undefined, TResponse>(
                            backendUrl,
                            fullPath,
                            params,
                            authInfo,
                            apiKey,
                            apiVersion
                        );
                    default:
                        return await EzOnRailsHttpClient.get<TRequest | undefined, TResponse>(
                            backendUrl,
                            fullPath,
                            params,
                            authInfo,
                            apiKey,
                            apiVersion
                        );
                }
            } catch (err: unknown) {
                // If the error is a http status 401 error and the onUnauthorized callback is available, call it
                if (
                    !EzOnRailsHttpUtils.isEzOnRailsHttpError(err) ||
                    (err as EzOnRailsHttpError).httpStatusCode !== 401 ||
                    !onUnauthorizedCallback
                ) {
                    throw err;
                }

                onUnauthorizedCallback();

                return null as TResponse;
            }
        },
        [authInfo, apiKey, apiVersion, backendUrl, basePath, onUnauthorizedCallback]
    );

    return { call: call };
};
