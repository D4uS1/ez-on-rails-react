import React from 'react';
import { EzOnRailsAuthInfo } from '../../../http/client/EzOnRailsHttpClient';
/**
 * Props for the ProtectedPage component.
 */
export interface ProtectedPageProps {
    authInfo: EzOnRailsAuthInfo | null;
    children: React.ReactNode;
    accessDeniedClassName?: string;
    accessDeniedText?: string;
}
/**
 * Protects the page given by the children prop from being accessed without authorization.
 * If the authInfo given by the props are null, only a hint will be shown that the page is
 * not accessible. Otherwise the children will be rendered.
 *
 * @param props
 * @constructor
 */
export declare const ProtectedPage: (props: ProtectedPageProps) => JSX.Element;
