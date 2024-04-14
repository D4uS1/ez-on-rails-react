/// <reference types="react" />
import { EzOnRailsAuthInfo } from '../../http/client/EzOnRailsHttpClient';
import { OnUnauthorizedCallback } from '../../hooks/useEzApiHttpClient';
/**
 * The EzOnRails context values needed by the package.
 */
export interface EzOnRailsContextValue {
    backendUrl: string;
    authInfo: EzOnRailsAuthInfo | null;
    apiVersion: string;
    setBackendUrl: (backendUrl: string) => void;
    setAuthInfo: (authInfo: EzOnRailsAuthInfo | null) => void;
    setApiVersion: (apiVersion: string) => void;
    onUnauthorizedCallback?: OnUnauthorizedCallback;
    setOnUnauthorizedCallback: (callback: OnUnauthorizedCallback | undefined) => void;
}
export declare const EzOnRailsContext: import("react").Context<EzOnRailsContextValue>;
