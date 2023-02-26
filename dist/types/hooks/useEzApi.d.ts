/**
 * Describes the result of an api requests using the useEzApi hook.
 */
interface UseEzApiResult<T> {
    data: T | null;
    error: unknown | null;
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
export declare const useEzApi: <TRequest, TResponse>(path: string, method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', data?: TRequest | undefined) => UseEzApiResult<TResponse>;
export {};
