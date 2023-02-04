/**
 * Error class for requesting actions via the EzOnRailsHttpClient.
 * Holds an httpStatusCode and message field that is accessible from outside.
 */
export declare class EzOnRailsHttpError extends Error {
    httpStatusCode: number;
    /**
     * Constructor expects th httpStatusCode given by the response of the request and a message.
     *
     * @param message
     * @param httpStatusCode
     */
    constructor(message: string, httpStatusCode: number);
}
