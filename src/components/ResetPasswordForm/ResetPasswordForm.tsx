import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { SchemaOf } from 'yup';
import { useEzOnRails } from '../../hooks';
import { EzOnRailsHttpClient, EzOnRailsPasswordResetParams } from '../../http/client/EzOnRailsHttpClient';
import { DefaultFormProps } from '../shared/types/Form';
import formStyles from '../shared/styles/Form.module.css';

/**
 * The form values to reset the password do not hold bthe resetPasswordToken. The token is passed
 * via the props and merged into the requests params with the provided values.
 */
type ResetPasswordFormValues = Omit<EzOnRailsPasswordResetParams, 'resetPasswordToken'>;

/**
 * Props for the RequestPasswordForm component.
 * Used to customize the request password form form.
 */
export interface ResetPasswordFormProps extends DefaultFormProps {
    // The token to reset the password on the backend
    resetPasswordToken: string;

    // The label for the passsword field
    labelPassword?: string;

    // The label for the password confirmation field
    labelPasswordConfirmation?: string;

    // The text for a required password error
    passwordRequiredErrorText?: string;

    // The error text for a too short password
    passwordToShortErrorText?: string;

    // The error text if the password and passwordConfirmation do not match
    passwordConfirmationMatchErrorText?: string;

    // The minimum length of the password
    minPasswordLength?: number;

    // Called if the user successfully resetted the password.
    onResetPasswordSuccess: () => Promise<void>;

    // Called if the submit failed. The passed error is the exception.
    onResetPasswordError: (e: unknown) => void;
}

/**
 * Component for a default password reset form via EzOnRails.
 * Customizable with the props via css.
 *
 * @param props
 * @constructor
 */
export const ResetPasswordForm = (props: ResetPasswordFormProps) => {
    const { backendUrl, apiVersion } = useEzOnRails();
    const [inProgress, setInProgress] = useState<boolean>(false);

    /**
     * Valodation scheme for the password reset form.
     */
    const PasswordResetValidationSchema: SchemaOf<EzOnRailsPasswordResetParams> = Yup.object()
        .shape({
            password: Yup.string()
                .min(
                    props.minPasswordLength || 8,
                    props.passwordToShortErrorText ||
                        'Das Passwort ist zu kurz. Es muss mindestens 8 Zeichen lang sein.'
                )
                .required(props.passwordRequiredErrorText || 'Ein Passwort ist erforderlich'),
            passwordConfirmation: Yup.string().oneOf(
                [Yup.ref('password')],
                props.passwordConfirmationMatchErrorText || 'Die Passwörter müssen übereinstimmen.'
            )
        })
        .defined();

    /**
     * Tries to reset the password on the server side.
     * If the reset was successful, the onSuccess callback in the props will be called.
     * If the reset was unsuccessful, the onError callback in the props will be called.
     * In this case the thrown error will be passed to the callback.
     *
     * @param values
     */
    const resetPassword = useCallback(
        async (values: ResetPasswordFormValues) => {
            setInProgress(true);

            try {
                await EzOnRailsHttpClient.passwordReset(
                    backendUrl,
                    {
                        ...values,
                        ...{ resetPasswordToken: props.resetPasswordToken }
                    },
                apiVersion);

                await props.onResetPasswordSuccess();
            } catch (e) {
                props.onResetPasswordError(e);
                setInProgress(false);
            }
        },
        [props.resetPasswordToken]
    );

    // initial values
    const initialFormValues: ResetPasswordFormValues = {
        password: '',
        passwordConfirmation: ''
    };

    return (
        <Formik
            initialValues={initialFormValues}
            onSubmit={(values) => {
                resetPassword(values);
            }}
            validationSchema={PasswordResetValidationSchema}
        >
            {({ errors, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} className={props.containerClassName || formStyles.container}>
                    <Form.Group
                        id="password-container"
                        className={props.fieldContainerClassName || formStyles.fieldContainer}
                    >
                        <Form.Label className={props.fieldLabelClassName || formStyles.fieldLabel}>
                            {props.labelPassword || 'Passwort'}
                        </Form.Label>

                        <Form.Control
                            id="password"
                            type="password"
                            onChange={handleChange}
                            className={props.fieldInputClassName || formStyles.formField}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback
                            type="invalid"
                            className={props.fieldErrorClassName || formStyles.fieldError}
                        >
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                        id="password-confirmation-container"
                        className={props.fieldContainerClassName || formStyles.fieldContainer}
                    >
                        <Form.Label className={props.fieldLabelClassName || formStyles.fieldLabel}>
                            {props.labelPasswordConfirmation || 'Passwort'}
                        </Form.Label>

                        <Form.Control
                            id="passwordConfirmation"
                            type="password"
                            onChange={handleChange}
                            className={props.fieldInputClassName || formStyles.formField}
                            isInvalid={!!errors.passwordConfirmation}
                        />
                        <Form.Control.Feedback
                            type="invalid"
                            className={props.fieldErrorClassName || formStyles.fieldError}
                        >
                            {errors.passwordConfirmation}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {!inProgress && (
                        <div className={props.submitButtonContainerClassName || 'ez-on-rails-form-submit-container'}>
                            <Button
                                variant="primary"
                                type="submit"
                                className={props.submitButtonClassName || formStyles.submitButton}
                            >
                                {props.labelSubmitButton || 'Passwort ändern'}
                            </Button>
                        </div>
                    )}
                </form>
            )}
        </Formik>
    );
};
