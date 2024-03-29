/// <reference types="react" />
import { DefaultFormProps } from '../shared/types/Form';
/**
 * Type for props for the ResendConfirmationForm component.
 */
export interface ResendConfirmationFormProps extends DefaultFormProps {
    invalidEmailErrorText?: string;
    emailRequiredErrorText?: string;
    labelEmail?: string;
    onResendConfirmationSuccess: (email: string) => void;
    onResendConfirmationError: (e: unknown) => void;
}
/**
 * Component for a form to send a resend confirmation email.
 *
 * @param props
 * @constructor
 */
export declare const ResendConfirmationForm: (props: ResendConfirmationFormProps) => JSX.Element;
