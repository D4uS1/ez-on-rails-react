import '../EzOnRails.css'
import { useState } from 'react'
import * as Yup from "yup";
import { SchemaOf } from "yup";
import { EzOnRailsHttpClient } from "../../../http/client/EzOnRailsHttpClient";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { DefaultFormProps } from "../shared/Types";

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
    onLostPasswordError: (e: any) => void;
}

/**
 * Describes the input fields for the LostPasswordForm.
 */
interface LostPasswordFormValues {
    email: string,
}

/**
 * Component for a form to send a password reset token.
 *
 * @param props
 * @constructor
 */
export const LostPasswordForm = (props: LostPasswordFormProps) => {
    const [inProgress, setInProgress] = useState<boolean>(false)

    /**
     * Valodation scheme for the login form.
     */
    const LostPasswordValidationSchema: SchemaOf<LostPasswordFormValues> = Yup.object().shape({
        email: Yup.string().email(props.invalidEmailErrorText || 'Ungültige E-Mail Adresse.')
            .required(props.emailRequiredErrorText || 'Die E-Mail Adresse ist erforderlich.')
    } as any).defined();

    /**
     * Tries to send a password reset request to the server by the form values.
     * If the request was successfull, the onPasswordResetSuccess callback in the props will be called.
     * In this case the email will be passed to the callback to identify the user.
     * If the login was unsuccessfull, the onPasswordResetError callback in the props will be called.
     * In this case the thrown error will be passed to the callback.
     *
     * @param values
     */
    const passwordReset = (values: LostPasswordFormValues) => {
        setInProgress(true)

        EzOnRailsHttpClient.passwordResetInstructions(values).then(() => {
            props.onLostPasswordSuccess(values.email);

            setInProgress(false);
        }).catch((e) => {
            props.onLostPasswordError(e);
            setInProgress(false);
        })
    }

    // initial values
    const initialFormValues: LostPasswordFormValues = {
        email: '',
    };

    return (
        <Formik
            initialValues={initialFormValues}
            onSubmit={(values) => {
                passwordReset(values)
            }}
            validationSchema={LostPasswordValidationSchema}
        >
            {({
                  errors,
                  handleChange,
                  handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}
                      className={props.containerClassName || 'ez-on-rails-form-container'}>
                    <Form.Group id='email-container'
                                className={props.fieldContainerClassName || 'ez-on-rails-form-field-container'}>
                        <Form.Label className={props.fieldLabelClassName || 'ez-on-rails-form-field-label'}>
                            {props.labelEmail || 'E-Mail Adresse'}
                        </Form.Label>
                        <Form.Control id='email'
                                      type="email"
                                      onChange={handleChange}
                                      className={props.fieldInputClassName || 'ez-on-rails-form-field'}
                                      isInvalid={!!errors.email}/>
                        <Form.Control.Feedback type="invalid"
                                               className={props.fieldErrorClassName || 'ez-on-rails-form-field-error'}>
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {!inProgress && (
                        <div className={props.submitButtonContainerClassName || 'ez-on-rails-form-submit-container'}>
                            <Button variant="primary"
                                    type="submit"
                                    className={props.submitButtonClassName || 'ez-on-rails-form-submit-button'}>
                                {props.labelSubmitButton || "Passwort zurücksetzen"}
                            </Button>
                        </div>
                    )}
                </form>
            )}
        </Formik>
    );
};
