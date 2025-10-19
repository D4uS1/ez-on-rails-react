import React, { ReactNode, useState } from 'react';
import * as Yup from 'yup';
import { Schema } from 'yup';
import { Formik } from 'formik';
import { useEzOnRails } from '../../hooks';
import { EzOnRailsHttpClient, EzOnRailsSignUpParams } from '../../http/client/EzOnRailsHttpClient';
import { Button, Form } from 'react-bootstrap';
import { DefaultFormProps } from '../shared/types/Form';
import formStyles from '../shared/styles/Form.module.css';

/**
 * Props for the RegistrationForm.
 * Used to customize the register form.
 */
export interface RegistrationFormProps extends DefaultFormProps {
    // The error text if the user types a too short username
    usernameToShortErrorText?: string;

    // The error text if the user types a too long username
    usernameToLongErrorText?: string;

    // The error text if the user does not provide a username
    usernameRequiredErrorText?: string;

    // The error text if the user types an invalid email
    emailInvalidErrorText?: string;

    // The error text if the user does not provide an email
    emailRequiredErrorText?: string;

    // The error text if the user types a too long email
    emailToLongErrorText?: string;

    // The error text if the user types a to short password
    passwordToShortErrorText?: string;

    // the error text if the user does not provide a password
    passwordRequiredErrorText?: string;

    // The error text if the password does not match the password confirmation
    passwordsMustMatchErrorText?: string;

    // The error text if the user did not accept the privacy policy
    privacyPolicyNotAcceptedErrorText?: string;

    // label for the Username field
    labelUsername?: string;

    // label for the Email field
    labelEmail?: string;

    // label for the Password field
    labelPassword?: string;

    // label for the PasswordConfirmation field
    labelPasswordConfirmation?: string;

    // label for the PrivacyPolicyAccedpted field
    labelPrivacyPolicyAccepted?: string | ReactNode;

    // The minimum length of the password
    minPasswordLength?: number;

    // The minimum length of the username
    minUsernameLength?: number;

    // The maximum length of the username
    maxUsernameLength?: number;

    // The maximum length of the email
    maxEmailLength?: number;

    // Called if the user successfully registered in. The email of the user will be passed.
    onRegisterSuccess: (email: string) => void;

    // Called if the user registration failed. The passed error is the exception.
    onRegisterError: (e: unknown) => void;

    // URL targeting the privacy policy
    privacyPolicyUrl?: string;

    // URL targeting the general terms and conditions
    generalTermsUrl?: string;
}

/**
 * RegistrationForm component for a default Registration form using EzOnRails.
 * Customizable with the props using css.
 *
 * @param props
 * @constructor
 */
export const RegistrationForm = (props: RegistrationFormProps) => {
    const { backendUrl, apiVersion } = useEzOnRails();
    const [inProgress, setInProgress] = useState<boolean>(false);

    /**
     * Signs up the user given by the form values.
     * Calls the callback for a successfull registration in the props, if the request was successfull.
     * In this case the email of the registered user will be passed as parameter.
     * Calls the callback for some error in the props, if the request was not successfull.
     * In this case the error thrown by the request will be passed as parameter.
     *
     * @param values
     */
    const register = async (values: EzOnRailsSignUpParams) => {
        setInProgress(true);

        try {
            await EzOnRailsHttpClient.signUp(backendUrl, values, apiVersion);
            props.onRegisterSuccess(values.email);
            setInProgress(false);
        } catch (e: unknown) {
            props.onRegisterError(e);
            setInProgress(false);
        }
    };

    /**
     * Validation Schema for registration values.
     */
    const RegistrationValidationSchema: Schema<EzOnRailsSignUpParams> = Yup.object()
        .shape({
            username: Yup.string()
                .min(
                    props.minUsernameLength || 5,
                    props.usernameToShortErrorText ||
                        `The username is too short. It must have at least ${props.minUsernameLength || 5} characters.`
                )
                .max(
                    props.maxUsernameLength || 50,
                    props.usernameToLongErrorText ||
                        `The username is too long. It must not have more than ${
                            props.maxUsernameLength || 50
                        } characters.`
                )
                .required(props.usernameRequiredErrorText || 'An username is required.'),
            email: Yup.string()
                .email(props.emailInvalidErrorText || 'Invalid email address.')
                .required(props.emailRequiredErrorText || 'An email address is required.')
                .max(
                    props.maxEmailLength || 100,
                    props.emailToLongErrorText ||
                        `The email address is too long. It must have not more than ${
                            props.maxEmailLength || 100
                        } characters.`
                ),
            password: Yup.string()
                .min(
                    props.minPasswordLength || 8,
                    props.passwordToShortErrorText ||
                        `The password is too short. It must have at least ${props.minPasswordLength || 8} characters.`
                )
                .required(props.passwordRequiredErrorText || 'A password is required.'),
            passwordConfirmation: Yup.string().oneOf(
                [Yup.ref('password')],
                props.passwordsMustMatchErrorText || 'The password and its confirmation must match.'
            ).required(props.passwordsMustMatchErrorText || 'The password and its confirmation must match.'),
            privacyPolicyAccepted: Yup.boolean().isTrue(
                props.privacyPolicyNotAcceptedErrorText || 'The privacy policy must be accepted.'
            ).required(props.privacyPolicyNotAcceptedErrorText || 'The privacy policy must be accepted.')
        })
        .defined();

    // initial values of the formular
    const initialFormValues: EzOnRailsSignUpParams = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        privacyPolicyAccepted: false
    };

    return (
        <Formik
            initialValues={initialFormValues}
            validationSchema={RegistrationValidationSchema}
            onSubmit={(values) => {
                register(values);
            }}
        >
            {({ errors, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} className={props.containerClassName || formStyles.container}>
                    <Form.Group
                        id="username-container"
                        className={props.fieldContainerClassName || formStyles.fieldContainer}
                    >
                        <Form.Label className={props.fieldLabelClassName || formStyles.fieldLabel}>
                            {props.labelUsername || 'Username'}
                        </Form.Label>
                        <Form.Control
                            id="username"
                            className={props.fieldInputClassName || formStyles.formField}
                            type="text"
                            onChange={handleChange}
                            isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback
                            className={props.fieldErrorClassName || formStyles.fieldError}
                            type="invalid"
                        >
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        id="email-container"
                        className={props.fieldContainerClassName || formStyles.fieldContainer}
                    >
                        <Form.Label className={props.fieldLabelClassName || formStyles.fieldLabel}>
                            {props.labelEmail || 'Email address'}
                        </Form.Label>
                        <Form.Control
                            id="email"
                            className={props.fieldInputClassName || formStyles.formField}
                            type="email"
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback
                            className={props.fieldErrorClassName || formStyles.fieldError}
                            type="invalid"
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
                            className={props.fieldInputClassName || formStyles.formField}
                            type="password"
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback
                            className={props.fieldErrorClassName || formStyles.fieldError}
                            type="invalid"
                        >
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                        id="password-confirmation-container"
                        className={props.fieldContainerClassName || formStyles.fieldContainer}
                    >
                        <Form.Label className={props.fieldLabelClassName || formStyles.fieldLabel}>
                            {props.labelPasswordConfirmation || 'Password confirmation'}
                        </Form.Label>
                        <Form.Control
                            id="passwordConfirmation"
                            className={props.fieldInputClassName || formStyles.formField}
                            type="password"
                            onChange={handleChange}
                            isInvalid={!!errors.passwordConfirmation}
                        />
                        <Form.Control.Feedback
                            className={props.fieldErrorClassName || formStyles.fieldError}
                            type="invalid"
                        >
                            {errors.passwordConfirmation}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                        id="privacy-policy-accepted-container"
                        className={props.fieldCheckboxContainerClassName || formStyles.fieldContainer}
                    >
                        <Form.Check
                            id="privacyPolicyAccepted"
                            className={props.fieldCheckboxInputClassName || formStyles.formField}
                            type="checkbox"
                            label={
                                props.labelPrivacyPolicyAccepted || (
                                    <span>
                                        I have read and accept the{' '}
                                        <a href={props.privacyPolicyUrl} target="_blank" rel="noopener noreferrer">
                                            privacy policy
                                        </a>{' '}
                                        and{' '}
                                        <a href={props.generalTermsUrl} target="_blank" rel="noopener noreferrer">
                                            terms and conditions
                                        </a>{' '}
                                        .
                                    </span>
                                )
                            }
                            onChange={handleChange}
                            isInvalid={!!errors.privacyPolicyAccepted}
                            feedbackType="invalid"
                            feedback={errors.privacyPolicyAccepted}
                        />
                    </Form.Group>
                    {!inProgress && (
                        <div className={props.submitButtonContainerClassName || 'ez-on-rails-form-submit-container'}>
                            <Button
                                className={props.submitButtonClassName || formStyles.submitButton}
                                type="submit"
                                variant="primary"
                            >
                                {props.labelSubmitButton || 'Register'}
                            </Button>
                        </div>
                    )}
                </form>
            )}
        </Formik>
    );
};
