import React from 'react';
import { useEzOnRails } from '../../hooks';

/**
 * Props for the ProtectedPage component.
 */
export interface ProtectedPageProps {
    // the children that are shown if the page can be accessed
    children: React.ReactNode;

    // Optional class name to style the access denied hint
    accessDeniedClassName?: string;

    // The text shown if the access was denied. If not given, some default text will be shown.
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
export const ProtectedPage = (props: ProtectedPageProps) => {
    const { authInfo } = useEzOnRails();

    return (
        <div>
            {authInfo ? (
                props.children
            ) : (
                <div className={props.accessDeniedClassName || 'ez-on-rails-protected-page-access-denied-container'}>
                    {props.accessDeniedText || 'You must be signed in to see this content.'}
                </div>
            )}
        </div>
    );
};
