/// <reference types="react" />
import { EzOnRailsAuthInfo } from '../../http/client/EzOnRailsHttpClient';
/**
 * The EzOnRails context values needed by the package.
 */
export interface EzOnRailsContextValue {
    apiVersion: string;
    backendBaseUrl: string;
    authInfo?: EzOnRailsAuthInfo;
}
export declare const EzOnRailsContext: import("react").Context<EzOnRailsContextValue>;
