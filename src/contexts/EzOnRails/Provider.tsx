import React, { ReactNode, useMemo, useState } from 'react';
import { EzOnRailsAuthInfo } from '../../http/client/EzOnRailsHttpClient';
import { EzOnRailsContext, EzOnRailsContextValue } from './Context';

/**
 * Props for the EzOnRailsContextProvider.
 */
interface EzOnRailsProps {
    // The current api version of the ez-on-rails backend, used by the http requests to the backend
    apiVersion: string;

    // The base url of the backend (without /api), used by the http requests to the backend
    backendUrl: string;

    // Initial auth info for the current user, can be set if the login values were saved somewhere
    authInfo?: EzOnRailsAuthInfo;

    // The children that can access the context value
    children: ReactNode;
}

/**
 * Context provider for the CustomStyle value.
 */
export const EzOnRails = (props: EzOnRailsProps) => {
    const [backendUrl, setBackendUrl] = useState<string>(props.backendUrl);
    const [authInfo, setAuthInfo] = useState<EzOnRailsAuthInfo | null>(props.authInfo || null);
    const [apiVersion, setApiVersion] = useState<string>(props.apiVersion);

    /**
     * Called if some value for the context changes.
     * Removes ending slash from backendUrl if it was given.
     * Returns the value for the context.
     */
    const value: EzOnRailsContextValue = useMemo(() => {
        const result = {
            backendUrl: backendUrl,
            authInfo: authInfo || null,
            apiVersion: apiVersion,
            setBackendUrl: setBackendUrl,
            setAuthInfo: setAuthInfo,
            setApiVersion: setApiVersion
        };

        if (result.backendUrl.endsWith('/')) {
            result.backendUrl = result.backendUrl.slice(0, -1);
        }

        return result;
    }, [backendUrl, authInfo, apiVersion]);

    return <EzOnRailsContext.Provider value={value}>{props.children}</EzOnRailsContext.Provider>;
};
