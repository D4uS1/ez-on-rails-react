import { ReactNode } from 'react';
import { EzOnRailsAuthInfo } from '../../http/client/EzOnRailsHttpClient';
/**
 * Props for the EzOnRailsContextProvider.
 */
interface EzOnRailsProps {
    apiVersion: string;
    backendUrl: string;
    authInfo?: EzOnRailsAuthInfo;
    children: ReactNode;
}
/**
 * Context provider for the CustomStyle value.
 */
export declare const EzOnRails: (props: EzOnRailsProps) => JSX.Element;
export {};
