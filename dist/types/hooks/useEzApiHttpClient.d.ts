import { HttpMethod } from './types';
/**
 * Describes the result of the UseEzApiClient hook.
 */
interface UseEzApiHttpClientResult {
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
export declare const useEzApiHttpClient: (basePath?: string) => UseEzApiHttpClientResult;
export {};
