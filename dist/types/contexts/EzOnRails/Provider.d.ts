import React, { ReactNode } from 'react';
import { EzOnRailsAuthInfo } from '../../http/client/EzOnRailsHttpClient';
/**
 * Props for the EzOnRailsContextProvider.
 */
interface EzOnRailsProps {
    apiVersion: string;
    backendUrl: string;
    authInfo?: EzOnRailsAuthInfo;
    apiKey?: string;
    children: ReactNode;
    onUnauthorizedCallback?: () => void;
    additionalHttpHeaders?: Record<string, string>;
}
/**
 * Context provider for the CustomStyle value.
 */
export declare const EzOnRails: (props: EzOnRailsProps) => React.JSX.Element;
export {};
