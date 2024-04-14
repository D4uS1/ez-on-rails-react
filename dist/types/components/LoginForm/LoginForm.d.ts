import React from 'react';
import { EzOnRailsAuthInfo } from '../../http/client/EzOnRailsHttpClient';
import { DefaultFormProps } from '../shared/types/Form';
/**
 * Props for the LoginForm component.
 * Used to customize the login form.
 */
export interface LoginFormProps extends DefaultFormProps {
    labelEmail?: string;
    labelPassword?: string;
    labelStayLoggedIn?: string;
    invalidEmailErrorText?: string;
    emailRequiredErrorText?: string;
    passwordToShortErrorText?: string;
    passwordRequiredErrorText?: string;
    hideStayLoggedIn?: boolean;
    minPasswordLength?: number;
    onLoginSuccess?: (email: string, authInfo: EzOnRailsAuthInfo, stayLoggedIn: boolean) => Promise<void>;
    onLoginError: (e: unknown) => void;
}
/**
 * Component for a default login form via EzOnRails.
 * Customizable with the props via css.
 *
 * @param props
 * @constructor
 */
export declare const LoginForm: (props: LoginFormProps) => React.JSX.Element;
