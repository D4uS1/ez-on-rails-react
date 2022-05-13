import '../EzOnRails.css';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import * as Yup from 'yup';
import { SchemaOf } from 'yup';
import { EzOnRailsAuthInfo, EzOnRailsHttpClient } from '../../../http/client/EzOnRailsHttpClient';
import { DefaultFormProps } from '../shared/Types';

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
    onLoginSuccess: (email: string, authInfo: EzOnRailsAuthInfo, stayLoggedIn: boolean) => Promise<void>;

    // Called if the user login failed. The passed error is the exception.
    onLoginError: (e: any) => void;
}

/**
 * Describes the input fields for the LoginForm.
 */
interface LoginFormValues {
    email: string,
    password: string,
    stayLoggedIn: boolean
}

/**
 * Component for a default login form via EzOnRails.
 * Customizable with the props via css.
 *
 * @param props
 * @constructor
 */
export const LoginForm = (props: LoginFormProps) => {

    const [inProgress, setInProgress] = useState<boolean>(false);

    /**
     * Valodation scheme for the login form.
     */
    const LoginValidationSchema: SchemaOf<LoginFormValues> = Yup.object().shape({
        email: Yup.string().email(props.invalidEmailErrorText || 'Ungültige E-Mail Adresse.')
            .required(props.emailRequiredErrorText || 'Die E-Mail Adresse ist erforderlich.'),
        password: Yup.string().min(props.minPasswordLength || 8, props.passwordToShortErrorText || 'Das Passwort ist zu kurz. Es muss mindestens 8 Zeichen lang sein.')
            .required(props.passwordRequiredErrorText || 'Ein Passwort ist erforderlich')
    } as any).defined();

    /**
     * Tries to log in the user given by the form values.
     * If the login was successful, the onLoginSuccess callback in the props will be called.
     * In this case the email will be passed to the callback to identify the user.
     * If the login was unsuccessful, the onLoginError callback in the props will be called.
     * In this case the thrown error will be passed to the callback.
     *
     * @param values
     */
    const login = async (values: LoginFormValues) => {
        setInProgress(true);

        try {
            const authInfo = await EzOnRailsHttpClient.signIn(values);
            if (!authInfo) {
                throw 'No authentication object returned';
            }

            await props.onLoginSuccess(values.email, authInfo, values.stayLoggedIn);
        } catch (e) {
            props.onLoginError(e);
            setInProgress(false);
        }
    };

    // initial values
    const initialFormValues: LoginFormValues = {
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
            {({
                  errors,
                  handleChange,
                  handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}
                      className={props.containerClassName || 'ez-on-rails-form-container'}>
                    <Form.Group id="email-container"
                                className={props.fieldContainerClassName || 'ez-on-rails-form-field-container'}>
                        <Form.Label className={props.fieldLabelClassName || 'ez-on-rails-form-field-label'}>
                            {props.labelEmail || 'E-Mail Adresse'}
                        </Form.Label>

                        <Form.Control id="email"
                                      type="email"
                                      onChange={handleChange}
                                      className={props.fieldInputClassName || 'ez-on-rails-form-field'}
                                      isInvalid={!!errors.email}/>
                        <Form.Control.Feedback type="invalid"
                                               className={props.fieldErrorClassName || 'ez-on-rails-form-field-error'}>
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group id="password-container"
                                className={props.fieldContainerClassName || 'ez-on-rails-form-field-container'}>
                        <Form.Label className={props.fieldLabelClassName || 'ez-on-rails-form-field-label'}>
                            {props.labelPassword || 'Passwort'}
                        </Form.Label>

                        <Form.Control id="password"
                                      type="password"
                                      onChange={handleChange}
                                      className={props.fieldInputClassName || 'ez-on-rails-form-field'}
                                      isInvalid={!!errors.password}/>
                        <Form.Control.Feedback type="invalid"
                                               className={props.fieldErrorClassName || 'ez-on-rails-form-field-error'}>
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {!props.hideStayLoggedIn &&
                        <Form.Group id="stay-logged-in-container"
                                    className={props.fieldCheckboxContainerClassName || 'ez-on-rails-form-field-container'}>
                            <Form.Check id="stayLoggedIn"
                                        className={props.fieldCheckboxInputClassName || 'ez-on-rails-form-field'}
                                        type="checkbox"
                                        label={props.labelStayLoggedIn || 'Auf diesem Gerät eingeloggt bleiben'}
                                        onChange={handleChange}/>
                        </Form.Group>
                    }

                    {!inProgress && (
                        <div className={props.submitButtonContainerClassName || 'ez-on-rails-form-submit-container'}>
                            <Button variant="primary"
                                    type="submit"
                                    className={props.submitButtonClassName || 'ez-on-rails-form-submit-button'}>
                                {props.labelSubmitButton || 'Login'}
                            </Button>
                        </div>
                    )}
                </form>
            )}
        </Formik>
    );
};
