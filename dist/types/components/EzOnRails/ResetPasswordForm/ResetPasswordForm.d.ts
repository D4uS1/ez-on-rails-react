/// <reference types="react" />
import { DefaultFormProps } from '../shared/types/Form';
/**
 * Props for the RequestPasswordForm component.
 * Used to customize the request password form form.
 */
export interface ResetPasswordFormProps extends DefaultFormProps {
    resetPasswordToken: string;
    labelPassword?: string;
    labelPasswordConfirmation?: string;
    passwordRequiredErrorText?: string;
    passwordToShortErrorText?: string;
    passwordConfirmationMatchErrorText?: string;
    minPasswordLength?: number;
    onResetPasswordSuccess: () => Promise<void>;
    onResetPasswordError: (e: unknown) => void;
}
/**
 * Component for a default password reset form via EzOnRails.
 * Customizable with the props via css.
 *
 * @param props
 * @constructor
 */
export declare const ResetPasswordForm: (props: ResetPasswordFormProps) => JSX.Element;
