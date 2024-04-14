import React, { ReactNode } from 'react';
import { DefaultFormProps } from '../shared/types/Form';
/**
 * Props for the RegistrationForm.
 * Used to customize the register form.
 */
export interface RegistrationFormProps extends DefaultFormProps {
    usernameToShortErrorText?: string;
    usernameToLongErrorText?: string;
    usernameRequiredErrorText?: string;
    emailInvalidErrorText?: string;
    emailRequiredErrorText?: string;
    emailToLongErrorText?: string;
    passwordToShortErrorText?: string;
    passwordRequiredErrorText?: string;
    passwordsMustMatchErrorText?: string;
    privacyPolicyNotAcceptedErrorText?: string;
    labelUsername?: string;
    labelEmail?: string;
    labelPassword?: string;
    labelPasswordConfirmation?: string;
    labelPrivacyPolicyAccepted?: string | ReactNode;
    minPasswordLength?: number;
    minUsernameLength?: number;
    maxUsernameLength?: number;
    maxEmailLength?: number;
    onRegisterSuccess: (email: string) => void;
    onRegisterError: (e: unknown) => void;
    privacyPolicyUrl?: string;
    generalTermsUrl?: string;
}
/**
 * RegistrationForm component for a default Registration form using EzOnRails.
 * Customizable with the props using css.
 *
 * @param props
 * @constructor
 */
export declare const RegistrationForm: (props: RegistrationFormProps) => React.JSX.Element;
