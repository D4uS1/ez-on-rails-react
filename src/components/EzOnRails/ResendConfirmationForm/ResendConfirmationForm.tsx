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
    onResendConfirmationError: (e: any) => void;
}

/**
 * Describes the input fields for the ResendConfirmationForm.
 */
interface ResendConfirmationFormValues {
    email: string,
}

/**
 * Component for a form to send a resend confirmation email.
 *
 * @param props
 * @constructor
 */
export const ResendConfirmationForm = (props: ResendConfirmationFormProps) => {
    const [inProgress, setInProgress] = useState<boolean>(false)

    /**
     * Valodation scheme for the login form.
     */
    const ResendConfirmationValidationSchema: SchemaOf<ResendConfirmationFormValues> = Yup.object().shape({
        email: Yup.string().email(props.invalidEmailErrorText || 'Ungültige E-Mail Adresse.')
            .required(props.emailRequiredErrorText || 'Die E-Mail Adresse ist erforderlich.')
    } as any).defined();

    /**
     * Tries to send a resend confirmation email request to the server by the form values.
     * If the request was successfull, the onResendConfirmationSuccess callback in the props will be called.
     * In this case the email will be passed to the callback to identify the user.
     * If the login was unsuccessfull, the onResendConfirmationError callback in the props will be called.
     * In this case the thrown error will be passed to the callback.
     *
     * @param values
     */
    const resendConfirmation = (values: ResendConfirmationFormValues) => {
        setInProgress(true)

        EzOnRailsHttpClient.confirmationInstructions(values).then(() => {
            props.onResendConfirmationSuccess(values.email);

            setInProgress(false);
        }).catch((e) => {
            props.onResendConfirmationError(e);
            setInProgress(false);
        })
    }

    // initial values
    const initialFormValues: ResendConfirmationFormValues = {
        email: '',
    };
    return <div className="ez-on-rails-form-outer-container"><Formik
        initialValues={initialFormValues}
        onSubmit={(values) => {
            resendConfirmation(values)
        }}
        validationSchema={ResendConfirmationValidationSchema}
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
    </div>
}
