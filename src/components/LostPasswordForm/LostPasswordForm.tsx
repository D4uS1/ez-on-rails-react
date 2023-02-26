import React, { useState } from 'react';
import * as Yup from 'yup';
import { SchemaOf } from 'yup';
import { useEzOnRails } from '../../hooks';
import { EzOnRailsHttpClient, EzOnRailsPasswordResetInstructionsParams } from '../../http/client/EzOnRailsHttpClient';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DefaultFormProps } from '../shared/types/Form';
import formStyles from '../shared/styles/Form.module.css';

/**
 * Type for props for the LostPasswordForm component.
 */
export interface LostPasswordFormProps extends DefaultFormProps {
    // The error text if the user types an invalid email
    invalidEmailErrorText?: string;

    // The error text if the user types no email
    emailRequiredErrorText?: string;

    // The label for the email
    labelEmail?: string;

    // Called if the request to send new password instructions was successful. The email is the email the request was send to.
    onLostPasswordSuccess: (email: string) => void;

    // Called if the request to send new password instructions was successful. The error is the exception that was thrown during the request.
    onLostPasswordError: (e: unknown) => void;
}

/**
 * Component for a form to send a password reset token.
 *
 * @param props
 * @constructor
 */
export const LostPasswordForm = (props: LostPasswordFormProps) => {
    const { backendUrl, apiVersion } = useEzOnRails();
    const [inProgress, setInProgress] = useState<boolean>(false);

    /**
     * Valodation scheme for the login form.
     */
    const LostPasswordValidationSchema: SchemaOf<EzOnRailsPasswordResetInstructionsParams> = Yup.object()
        .shape({
            email: Yup.string()
                .email(props.invalidEmailErrorText || 'Ungültige E-Mail Adresse.')
                .required(props.emailRequiredErrorText || 'Die E-Mail Adresse ist erforderlich.')
        })
        .defined();

    /**
     * Tries to send a password reset request to the server by the form values.
     * If the request was successfull, the onPasswordResetSuccess callback in the props will be called.
     * In this case the email will be passed to the callback to identify the user.
     * If the login was unsuccessfull, the onPasswordResetError callback in the props will be called.
     * In this case the thrown error will be passed to the callback.
     *
     * @param values
     */
    const passwordReset = (values: EzOnRailsPasswordResetInstructionsParams) => {
        setInProgress(true);

        EzOnRailsHttpClient.passwordResetInstructions(backendUrl, values, apiVersion)
            .then(() => {
                props.onLostPasswordSuccess(values.email);

                setInProgress(false);
            })
            .catch((e) => {
                props.onLostPasswordError(e);
                setInProgress(false);
            });
    };

    // initial values
    const initialFormValues: EzOnRailsPasswordResetInstructionsParams = {
        email: ''
    };

    return (
        <Formik
            initialValues={initialFormValues}
            onSubmit={(values) => {
                passwordReset(values);
            }}
            validationSchema={LostPasswordValidationSchema}
        >
            {({ errors, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} className={props.containerClassName || formStyles.container}>
                    <Form.Group
                        id="email-container"
                        className={props.fieldContainerClassName || formStyles.fieldContainer}
                    >
                        <Form.Label className={props.fieldLabelClassName || formStyles.fieldLabel}>
                            {props.labelEmail || 'E-Mail Adresse'}
                        </Form.Label>
                        <Form.Control
                            id="email"
                            type="email"
                            onChange={handleChange}
                            className={props.fieldInputClassName || formStyles.formField}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback
                            type="invalid"
                            className={props.fieldErrorClassName || formStyles.fieldError}
                        >
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {!inProgress && (
                        <div className={props.submitButtonContainerClassName || 'ez-on-rails-form-submit-container'}>
                            <Button
                                variant="primary"
                                type="submit"
                                className={props.submitButtonClassName || formStyles.submitButton}
                            >
                                {props.labelSubmitButton || 'Passwort zurücksetzen'}
                            </Button>
                        </div>
                    )}
                </form>
            )}
        </Formik>
    );
};
