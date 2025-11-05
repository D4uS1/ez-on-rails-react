import { useCallback, useEffect, useState } from 'react';
import { HttpMethod } from './types';
import { useEzApiHttpClient } from './useEzApiHttpClient';

/**
 * Describes the result of an api requests using the useEzApi hook.
 */
interface UseEzApiResult<TRequest, TResponse> {
    // The response data, if available. Null if the response was not finished yet, or got an error.
    data: TResponse | null;

    // Not null, if an error occured during request
    error: unknown | null;

    // Indicates whether the request is currently in progress
    inProgress: boolean;

    // Calls the defined request manually
    callApi: (params?: TRequest) => Promise<TResponse | undefined>;
}

/**
 * Hook that calls a http request to the backendUrl that is defined in the EzOnRails context provider,
 * using the authInfo that is also defined in the context provider.
 * The path is expected to be the relative path without the api/ prefix. The prefix will be appended automatically.
 * The result will be returned via the hooks data return value.
 * If the options skipInitialCall value is set to true, the api request will not be called initially after the hook is called.
 * In this case you can call the request by the returned callApi function manually.
 *
 * @param path
 * @param method
 * @param data
 * @param options
 */
export const useEzApi = <TRequest, TResponse>(
    path: string,
    method: HttpMethod = 'GET',
    data?: TRequest,
    options?: {
        skipInitialCall?: boolean;
    }
): UseEzApiResult<TRequest, TResponse> => {
    const [response, setResponse] = useState<TResponse | null>(null);
    const [error, setError] = useState<unknown | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const { call } = useEzApiHttpClient();

    /**
     * Calls the api path at the EzOnRails application defined by the backendUrl and passes the specified data.
     * Updates the states to make the hook like behavior work and returns the value for manually calls.
     * If params is not given, the data given by the props will be passed.
     */
    const callApi = useCallback(
        async (params?: TRequest) => {
            try {
                setInProgress(true);
                setError(null);
                setResponse(null);

                const result: TResponse = await call<TRequest, TResponse>(path, method, params || data);

                setResponse(result);
                setInProgress(false);

                return result;
            } catch (error: unknown) {
                setError(error);
                setInProgress(false);
            }
        },
        [path, call, data, method]
    );

    /**
     * Called initial and if something relevant for the request in the context changes.
     * Starts the http request.
     */
    useEffect(() => {
        (async () => {
            if (options?.skipInitialCall) return;

            await callApi();
        })();
    }, [callApi, options]);

    return {
        data: response,
        error: error,
        inProgress: inProgress,
        callApi: callApi
    };
};
