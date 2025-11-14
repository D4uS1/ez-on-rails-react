import React, { useState } from 'react';
import * as Yup from 'yup';
import { Schema } from 'yup';
import { useEzOnRails } from '../../hooks';
import { EzOnRailsConfirmationInstructionsParams, EzOnRailsHttpClient } from '../../http/client/EzOnRailsHttpClient';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DefaultFormProps } from '../shared/types/Form';
import formStyles from '../shared/styles/Form.module.css';

/**
 * Type for props for the ResendConfirmationForm component.
 */
export interface ResendConfirmationFormProps extends DefaultFormProps {
    // The error text if the user types an invalid email
    invalidEmailErrorText?: string;

    // The error text if the user types no email
    emailRequiredErrorText?: string;

    // The label for the email
    labelEmail?: string;

    // Called if the request to resend confirmation instructions was successful. The email is the email the request was send to.
    onResendConfirmationSuccess: (email: string) => void;

    // Called if the request to resend confirmation instructions was successful. The error is the exception that was thrown during the request.
    onResendConfirmationError: (e: unknown) => void;
}

/**
 * Component for a form to send a resend confirmation email.
 *
 * @param props
 * @constructor
 */
export const ResendConfirmationForm = (props: ResendConfirmationFormProps) => {
    const { backendUrl, apiVersion, additionalHttpHeaders } = useEzOnRails();
    const [inProgress, setInProgress] = useState<boolean>(false);

    /**
     * Valodation scheme for the login form.
     */
    const ResendConfirmationValidationSchema: Schema<EzOnRailsConfirmationInstructionsParams> = Yup.object()
        .shape({
            email: Yup.string()
                .email(props.invalidEmailErrorText || 'Invalid email address.')
                .required(props.emailRequiredErrorText || 'An email address is required.')
        })
        .defined();

    /**
     * Tries to send a resend confirmation email request to the server by the form values.
     * If the request was successfull, the onResendConfirmationSuccess callback in the props will be called.
     * In this case the email will be passed to the callback to identify the user.
     * If the login was unsuccessfull, the onResendConfirmationError callback in the props will be called.
     * In this case the thrown error will be passed to the callback.
     *
     * @param values
     */
    const resendConfirmation = (values: EzOnRailsConfirmationInstructionsParams) => {
        setInProgress(true);

        EzOnRailsHttpClient.confirmationInstructions(backendUrl, values, apiVersion, additionalHttpHeaders)
            .then(() => {
                props.onResendConfirmationSuccess(values.email);

                setInProgress(false);
            })
            .catch((e) => {
                props.onResendConfirmationError(e);
                setInProgress(false);
            });
    };

    // initial values
    const initialFormValues: EzOnRailsConfirmationInstructionsParams = {
        email: ''
    };

    return (
        <Formik
            initialValues={initialFormValues}
            onSubmit={(values) => {
                resendConfirmation(values);
            }}
            validationSchema={ResendConfirmationValidationSchema}
        >
            {({ errors, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} className={props.containerClassName || formStyles.container}>
                    <Form.Group
                        id="email-container"
                        className={props.fieldContainerClassName || formStyles.fieldContainer}
                    >
                        <Form.Label className={props.fieldLabelClassName || formStyles.fieldLabel}>
                            {props.labelEmail || 'Email address'}
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
                                {props.labelSubmitButton || 'Submit'}
                            </Button>
                        </div>
                    )}
                </form>
            )}
        </Formik>
    );
};
