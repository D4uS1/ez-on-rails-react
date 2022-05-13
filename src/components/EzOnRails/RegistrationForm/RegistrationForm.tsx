import '../EzOnRails.css'
import { ReactNode, useState } from "react";
import * as Yup from "yup";
import { SchemaOf } from "yup";
import { Formik } from 'formik';
import { EzOnRailsHttpClient } from "../../../http/client/EzOnRailsHttpClient";
import { Button, Form } from 'react-bootstrap';
import { DefaultFormProps } from "../shared/Types";

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
    onRegisterError: (e: any) => void;

    // URL targeting the privacy policy
    privacyPolicyUrl?: string;

    // URL targeting the general terms and conditions
    generalTermsUrl?: string;
}

/**
 * Form values for the register form.
 */
interface RegisterFormValues {
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    privacyPolicyAccepted: boolean
}

/**
 * RegistrationForm component for a default Registration form using EzOnRails.
 * Customizable with the props using css.
 *
 * @param props
 * @constructor
 */
export const RegistrationForm = (props: RegistrationFormProps) => {

    const [inProgress, setInProgress] = useState<boolean>(false)

    /**
     * Signs up the user given by the form values.
     * Calls the callback for a successfull registration in the props, if the request was successfull.
     * In this case the email of the registered user will be passed as parameter.
     * Calls the callback for some error in the props, if the request was not successfull.
     * In this case the error thrown by the request will be passed as parameter.
     *
     * @param values
     */
    const register = async (values: RegisterFormValues) => {
        setInProgress(true)

        try {
            await EzOnRailsHttpClient.signUp(values)
            props.onRegisterSuccess(values.email);
            setInProgress(false);
        } catch (e: any) {
            props.onRegisterError(e);
            setInProgress(false);
        }
    }

    /**
     * Validation Schema for registration values.
     */
    const RegistrationValidationSchema: SchemaOf<RegisterFormValues> = Yup.object().shape({
        username: Yup.string()
            .min(props.minUsernameLength || 5, props.usernameToShortErrorText || 'Der Benutzername ist zu kurz. Er muss mindestens 4 Zeichen lang sein. ')
            .max(props.maxUsernameLength || 50, props.usernameToLongErrorText || 'Der Benutzername ist zu lang. Er darf maximal 50 Zeichen lang sein.')
            .required(props.usernameRequiredErrorText || 'Der Benutzername ist erforderlich.'),
        email: Yup.string().email(props.emailInvalidErrorText || 'Ungültige E-Mail Adresse.')
            .required(props.emailRequiredErrorText || 'Die E-Mail Adresse ist erforderlich.')
            .max(props.maxEmailLength || 100, props.emailToLongErrorText || 'Die E-Mail Adresse ist zu lang. Sie darf maximal 100 Zeichen lang sein.'),
        password: Yup.string().min(props.minPasswordLength || 8, props.passwordToShortErrorText || 'Das Passwort ist zu kurz. Es muss mindestens 8 Zeichen lang sein.')
            .required(props.passwordRequiredErrorText || 'Ein Passwort ist erforderlich'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password')], props.passwordsMustMatchErrorText || 'Die Passwörter müssen übereinstimmen.'),
        privacyPolicyAccepted: Yup.boolean().isTrue(props.privacyPolicyNotAcceptedErrorText || 'Die Datenschutzerklärung muss akzeptiert werden.')
    } as any).defined();

    // initial values of the formular
    const initialFormValues: RegisterFormValues = {
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
                register(values)
            }}
        >
            {({
                  errors,
                  handleChange,
                  handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}
                      className={props.containerClassName || 'ez-on-rails-form-container'}>
                    <Form.Group id='username-container'
                                className={props.fieldContainerClassName || 'ez-on-rails-form-field-container'}>
                        <Form.Label className={props.fieldLabelClassName || 'ez-on-rails-form-field-label'}>
                            {props.labelUsername || 'Benutzername'}
                        </Form.Label>
                        <Form.Control id='username'
                                      className={props.fieldInputClassName || 'ez-on-rails-form-field'}
                                      type="text"
                                      onChange={handleChange}
                                      isInvalid={!!errors.username}/>
                        <Form.Control.Feedback
                            className={props.fieldErrorClassName || 'ez-on-rails-form-field-error'}
                            type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group id='email-container'
                                className={props.fieldContainerClassName || 'ez-on-rails-form-field-container'}>
                        <Form.Label className={props.fieldLabelClassName || 'ez-on-rails-form-field-label'}>
                            {props.labelEmail || 'E-Mail Adresse'}
                        </Form.Label>
                        <Form.Control id='email'
                                      className={props.fieldInputClassName || 'ez-on-rails-form-field'}
                                      type="email"
                                      onChange={handleChange}
                                      isInvalid={!!errors.email}/>
                        <Form.Control.Feedback
                            className={props.fieldErrorClassName || 'ez-on-rails-form-field-error'}
                            type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group id='password-container'
                                className={props.fieldContainerClassName || 'ez-on-rails-form-field-container'}>
                        <Form.Label className={props.fieldLabelClassName || 'ez-on-rails-form-field-label'}>
                            {props.labelPassword || 'Passwort'}
                        </Form.Label>
                        <Form.Control id='password'
                                      className={props.fieldInputClassName || 'ez-on-rails-form-field'}
                                      type="password"
                                      onChange={handleChange}
                                      isInvalid={!!errors.password}/>
                        <Form.Control.Feedback
                            className={props.fieldErrorClassName || 'ez-on-rails-form-field-error'}
                            type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group id='password-confirmation-container'
                                className={props.fieldContainerClassName || 'ez-on-rails-form-field-container'}>
                        <Form.Label className={props.fieldLabelClassName || 'ez-on-rails-form-field-label'}>
                            {props.labelPasswordConfirmation || 'Passwort wiederholen'}
                        </Form.Label>
                        <Form.Control id='passwordConfirmation'
                                      className={props.fieldInputClassName || 'ez-on-rails-form-field'}
                                      type="password"
                                      onChange={handleChange}
                                      isInvalid={!!errors.passwordConfirmation}/>
                        <Form.Control.Feedback
                            className={props.fieldErrorClassName || 'ez-on-rails-form-field-error'}
                            type="invalid">
                            {errors.passwordConfirmation}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group id='privacy-policy-accepted-container'
                                className={props.fieldCheckboxContainerClassName || 'ez-on-rails-form-field-container'}>
                        <Form.Check id='privacyPolicyAccepted'
                                    className={props.fieldCheckboxInputClassName || 'ez-on-rails-form-field'}
                                    type="checkbox"
                                    label={props.labelPrivacyPolicyAccepted ||
                                        <span>Ich habe die <a href={props.privacyPolicyUrl} target="_blank"
                                                              rel="noopener noreferrer">Datenschutzerklärung</a> und <a
                                            href={props.generalTermsUrl} target="_blank" rel="noopener noreferrer">allgemeinen Geschäftsbedingungen</a> gelesen und akzeptiere diese.</span>}
                                    onChange={handleChange}
                                    isInvalid={!!errors.privacyPolicyAccepted}
                                    feedbackType='invalid'
                                    feedback={errors.privacyPolicyAccepted}/>
                    </Form.Group>
                    {
                        !inProgress && (
                            <div className={props.submitButtonContainerClassName || 'ez-on-rails-form-submit-container'}>
                                <Button className={props.submitButtonClassName || 'ez-on-rails-form-submit-button'}
                                        type="submit"
                                        variant="primary">
                                    {props.labelSubmitButton || "Registrieren"}
                                </Button>
                            </div>
                        )}
                </form>
            )}
        </Formik>
    )
}
