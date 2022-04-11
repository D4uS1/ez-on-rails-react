/**
 * Describes the Config options.
 */
export interface EzOnRailsConfigOptions {
    baseUrl: string;
    apiVersion: string;
}
/**
  Returns an EzOnRails Object that contains some EzOnRails related configuration Methods.
  The init Method should be called before any EzOnRails Operation is used.
 */
export declare const EzOnRailsConfig: {
    /**
     * Initializes the EzOnRails Module.
     * Writes the specified parameters in the local Storage, hence EzOnRails related Methods can read
     * and use it.
     * This Method should be called before any EzOnRails Operation is called.
     *
     * @param options
     */
    init: (options: EzOnRailsConfigOptions) => void;
    /**
     * Returns the base for the EzOnRails endpoint.
     * If no saved apiUrl was found, null will be returned.
     */
    baseUrl: () => string | null;
    /**
     * Returns the apiUrl for the EzOnRails api endpoint.
     * If no saved apiUrl was found, null will be returned.
     */
    apiUrl: () => string | null;
    /**
     * Returns the api version for the EzOnRails api endpoint.
     * If no saved apiVersion was found, null will be returned.
     * If not api version is yet defined, 1.0 will be returned as default.
     */
    apiVersion: () => string;
};
