import { useContext, useEffect, useState } from 'react';
import { EzOnRailsContext, EzOnRailsContextValue } from '../contexts/EzOnRails/Context';
import { EzOnRailsHttpClient } from '../http/client/EzOnRailsHttpClient';
import { useEzOnRails } from './useEzOnRails';

/**
 * Describes the result of an api requests using the useEzApi hook.
 */
interface UseEzApiResult<T> {
    // The response data, if available. Null if the response was not finished yet, or got an error.
    data: T | null;

    // Not null, if an error occured during request
    error: Error | null;

    // Indictaes whether the request is currently in progress
    inProgress: boolean;
}

/**
 * Hook that calls a http request to the backendUrl that is defined in the EzOnRails context provider,
 * using the authInfo that is also defined in the context provider.
 * The result
 * @param path
 * @param method
 * @param data
 */
export const useEzApi = <TRequest, TResponse>(
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
    data?: TRequest
): UseEzApiResult => {
    const { backendUrl, authInfo, apiVersion } = useEzOnRails();
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);

    /**
     * Called initial and if something relevant for the request in the context changes.
     * Starts the http request.
     */
    useEffect(() => {
        (async () => {
            setInProgress(true);
            setError(null);
            setResponse(null);

            let result: TResponse | null = null;
            const fullPath = `${backendUrl}/api/${path}`
            try {
                switch (method) {
                    case 'POST':
                        result = await EzOnRailsHttpClient.post<TRequest, TResponse>(fullPath, data, authInfo, apiVersion);
                        break;
                    case 'PUT':
                        result = await EzOnRailsHttpClient.put<TRequest, TResponse>(fullPath, data, authInfo, apiVersion);
                        break;
                    case 'PATCH':
                        result = await EzOnRailsHttpClient.patch<TRequest, TResponse>(fullPath, data, authInfo, apiVersion);
                        break;
                    case 'DELETE':
                        result = await EzOnRailsHttpClient.delete<TRequest, TResponse>(fullPath, data, authInfo, apiVersion);
                        break;
                    default:
                        result = await EzOnRailsHttpClient.get<TRequest, TResponse>(fullPath, data, authInfo, apiVersion);
                }

                setResponse(result);
                setInProgress(false);
            } catch (error: Error) {
                setError(error);
                setInProgress(false);
            }
        })();
    }, [authInfo, backendUrl, apiVersion]);

    return {
        data: response,
        error: error,
        inProgress: inProgress
    }
}