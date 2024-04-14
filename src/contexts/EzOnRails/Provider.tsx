import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { EzOnRailsAuthInfo } from '../../http/client/EzOnRailsHttpClient';
import { EzOnRailsContext, EzOnRailsContextValue } from './Context';
import { OnUnauthorizedCallback } from '../../hooks/useEzApiHttpClient';

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

    // Called if any request using ez-on-rails results in a http 401 status code
    onUnauthorizedCallback?: () => void;
}

/**
 * Context provider for the CustomStyle value.
 */
export const EzOnRails = (props: EzOnRailsProps) => {
    const [backendUrl, setBackendUrl] = useState<string>(props.backendUrl);
    const [authInfo, setAuthInfo] = useState<EzOnRailsAuthInfo | null>(props.authInfo || null);
    const [apiVersion, setApiVersion] = useState<string>(props.apiVersion);
    const [onUnauthorizedCallback, setOnUnauthorizedCallback] = useState<OnUnauthorizedCallback | undefined>(
        () => props.onUnauthorizedCallback
    );

    /**
     * Saves the newCallback to the state.
     * This wrapper is needed because if we would pass the callback to the setOnUnauthorizedCallback function directly, react thinks
     * this is a state update function and executes it immediatly. Hence we pass a function that returns that function.
     *
     * @param newCallback
     */
    const setOnUnauthorizedCallbackWrapper = useCallback((newCallback: OnUnauthorizedCallback | undefined) => {
        setOnUnauthorizedCallback(() => newCallback);
    }, []);

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
            setApiVersion: setApiVersion,
            setOnUnauthorizedCallback: setOnUnauthorizedCallbackWrapper,
            onUnauthorizedCallback: onUnauthorizedCallback
        };

        if (result.backendUrl.endsWith('/')) {
            result.backendUrl = result.backendUrl.slice(0, -1);
        }

        return result;
    }, [backendUrl, authInfo, apiVersion, setOnUnauthorizedCallbackWrapper, onUnauthorizedCallback]);

    return <EzOnRailsContext.Provider value={value}>{props.children}</EzOnRailsContext.Provider>;
};
