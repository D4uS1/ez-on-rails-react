/**
 * Describes the result of an api requests using the useEzApi hook.
 */
interface UseEzApiResult<TRequest, TResponse> {
    data: TResponse | null;
    error: unknown | null;
    inProgress: boolean;
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
export declare const useEzApi: <TRequest, TResponse>(path: string, method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', data?: TRequest | undefined, options?: {
    skipInitialCall?: boolean;
}) => UseEzApiResult<TRequest, TResponse>;
export {};
