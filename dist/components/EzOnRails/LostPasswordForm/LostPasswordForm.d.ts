/// <reference types="react" />
import '../EzOnRails.css';
import { DefaultFormProps } from "../shared/Types";
/**
 * Type for props for the LostPasswordForm component.
 */
export interface LostPasswordFormProps extends DefaultFormProps {
    invalidEmailErrorText?: string;
    emailRequiredErrorText?: string;
    labelEmail?: string;
    onLostPasswordSuccess: (email: string) => void;
    onLostPasswordError: (e: any) => void;
}
/**
 * Component for a form to send a password reset token.
 *
 * @param props
 * @constructor
 */
export declare const LostPasswordForm: (props: LostPasswordFormProps) => JSX.Element;
