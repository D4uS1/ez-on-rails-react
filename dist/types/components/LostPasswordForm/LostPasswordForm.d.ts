import React from 'react';
import { DefaultFormProps } from '../shared/types/Form';
/**
 * Type for props for the LostPasswordForm component.
 */
export interface LostPasswordFormProps extends DefaultFormProps {
    invalidEmailErrorText?: string;
    emailRequiredErrorText?: string;
    labelEmail?: string;
    onLostPasswordSuccess: (email: string) => void;
    onLostPasswordError: (e: unknown) => void;
}
/**
 * Component for a form to send a password reset token.
 *
 * @param props
 * @constructor
 */
export declare const LostPasswordForm: (props: LostPasswordFormProps) => React.JSX.Element;
