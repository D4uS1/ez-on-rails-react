import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { SchemaOf } from 'yup';
import { useEzOnRails } from '../../hooks';
import { EzOnRailsAuthInfo, EzOnRailsHttpClient, EzOnRailsSignInParams } from '../../http/client/EzOnRailsHttpClient';
import { DefaultFormProps } from '../shared/types/Form';
import formStyles from '../shared/styles/Form.module.css';

/**
 * Adds the stayLoggedIn checkbox to the SignIn values. This value will not be submitted to the server, but
 * will be passed in the callback if the request to sign in was successful. Hence the token can be saved
 * for new sessions.
 */
type SignInFormValues = EzOnRailsSignInParams & { stayLoggedIn: boolean };

/**
 * Props for the LoginForm component.
 * Used to customize the login form.
 */
export interface LoginFormProps extends DefaultFormProps {
    // The label for the email field
    labelEmail?: string;

    // The label for the password field
    labelPassword?: string;

    // The label for the stay logged in field
    labelStayLoggedIn?: string;

    // The text for an invalid email
    invalidEmailErrorText?: string;

    // The text for a required email error
    emailRequiredErrorText?: string;

    // The error text for a too short password
    passwordToShortErrorText?: string;

    // The error text for the required password
    passwordRequiredErrorText?: string;

    // Indicates whether the stayLoggedIn checkbox should be invisible
    hideStayLoggedIn?: boolean;

    // The minimum length of the password
    minPasswordLength?: number;

    // Called if the user successfully logged in. The email of the user and its auth info for the next request will be passed. Passes also if the user checked the stayLoggedIn checkbox.
    onLoginSuccess?: (email: string, authInfo: EzOnRailsAuthInfo, stayLoggedIn: boolean) => Promise<void>;

    // Called if the user login failed. The passed error is the exception.
    onLoginError: (e: unknown) => void;
}

/**
 * Component for a default login form via EzOnRails.
 * Customizable with the props via css.
 *
 * @param props
 * @constructor
 */
export const LoginForm = (props: LoginFormProps) => {
    const { backendUrl, apiVersion, setAuthInfo } = useEzOnRails();
    const [inProgress, setInProgress] = useState<boolean>(false);

    /**
     * Valodation scheme for the login form.
     */
    const LoginValidationSchema: SchemaOf<EzOnRailsSignInParams> = Yup.object()
        .shape({
            email: Yup.string()
                .email(props.invalidEmailErrorText || 'Invalid email address.')
                .required(props.emailRequiredErrorText || 'The email address is required.'),
            password: Yup.string()
                .min(
                    props.minPasswordLength || 8,
                    props.passwordToShortErrorText ||
                        `The password is too short. It must have at least ${props.minPasswordLength || 8} characters.`
                )
                .required(props.passwordRequiredErrorText || 'The password is required.')
        })
        .defined();

    /**
     * Tries to log in the user given by the form values.
     * If the login was successful, the onLoginSuccess callback in the props will be called.
     * In this case the email will be passed to the callback to identify the user.
     * If the login was unsuccessful, the onLoginError callback in the props will be called.
     * In this case the thrown error will be passed to the callback.
     *
     * @param values
     */
    const login = async (values: SignInFormValues) => {
        setInProgress(true);

        try {
            const authInfo = await EzOnRailsHttpClient.signIn(backendUrl, values, apiVersion);
            if (!authInfo) throw 'No authentication object returned';

            setAuthInfo(authInfo);

            if (!props.onLoginSuccess) return;

            await props.onLoginSuccess(values.email, authInfo, values.stayLoggedIn);
        } catch (e) {
            props.onLoginError(e);
            setInProgress(false);
        }
    };

    // initial values
    const initialFormValues: SignInFormValues = {
        email: '',
        password: '',
        stayLoggedIn: false
    };

    return (
        <Formik
            initialValues={initialFormValues}
            onSubmit={(values) => {
                login(values);
            }}
            validationSchema={LoginValidationSchema}
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

                    <Form.Group
                        id="password-container"
                        className={props.fieldContainerClassName || formStyles.fieldContainer}
                    >
                        <Form.Label className={props.fieldLabelClassName || formStyles.fieldLabel}>
                            {props.labelPassword || 'Password'}
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

                    {!props.hideStayLoggedIn && (
                        <Form.Group
                            id="stay-logged-in-container"
                            className={props.fieldCheckboxContainerClassName || formStyles.fieldContainer}
                        >
                            <Form.Check
                                id="stayLoggedIn"
                                className={props.fieldCheckboxInputClassName || formStyles.formField}
                                type="checkbox"
                                label={props.labelStayLoggedIn || 'Stay logged in.'}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    )}

                    {!inProgress && (
                        <div className={props.submitButtonContainerClassName || 'ez-on-rails-form-submit-container'}>
                            <Button
                                variant="primary"
                                type="submit"
                                className={props.submitButtonClassName || formStyles.submitButton}
                            >
                                {props.labelSubmitButton || 'Login'}
                            </Button>
                        </div>
                    )}
                </form>
            )}
        </Formik>
    );
};
