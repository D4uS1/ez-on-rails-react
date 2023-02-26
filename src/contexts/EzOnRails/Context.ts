import { createContext } from 'react';
import { EzOnRailsAuthInfo } from '../../http/client/EzOnRailsHttpClient';

/**
 * The EzOnRails context values needed by the package.
 */
export interface EzOnRailsContextValue {
    // The base url of the backend (without /api), used by the http requests to the backend
    backendUrl: string;

    // The auth info for the http requests, if the user is signed in
    authInfo: EzOnRailsAuthInfo | null;

    // The current api version of the ez-on-rails backend, used by the http requests to the backend
    apiVersion: string;

    // Setter for the backendUrl
    setBackendUrl: (backendUrl: string) => void;

    // Setter for the authInfo
    setAuthInfo: (authInfo: EzOnRailsAuthInfo | null) => void;

    // Setter for the api version
    setApiVersion: (apiVersion: string) => void;
}

export const EzOnRailsContext = createContext<EzOnRailsContextValue>({
    apiVersion: '1.0',
    backendUrl: 'http://localhost:3000',
    authInfo: null,
    setBackendUrl: (backendUrl: string) => {},
    setAuthInfo: (authInfo: EzOnRailsAuthInfo | null) => {},
    setApiVersion: (apiVersion: string) => {},
});
