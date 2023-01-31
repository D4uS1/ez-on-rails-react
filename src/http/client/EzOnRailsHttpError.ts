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
