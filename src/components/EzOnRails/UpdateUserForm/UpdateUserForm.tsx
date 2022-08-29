import '../EzOnRails.css'
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { SchemaOf } from "yup";
import { Formik } from 'formik';
import {
    EzOnRailsAuthInfo,
    EzOnRailsHttpClient,
    EzOnRailsUpdateUserParams,
    EzOnRailsUser
} from "../../../http/client/EzOnRailsHttpClient";
import { Button, Form } from 'react-bootstrap';
import { ActiveStorageDropzone, RailsFileBlob } from "../ActiveStorageDropzone/ActiveStorageDropzone";
import { DefaultFormProps } from "../shared/Types";

/**
 * Props for the UpdateUserForm.
 * Used to customize the register form.
 */
export interface UpdateUserFormProps extends DefaultFormProps {
    // The auth info of the specified user
    authInfo: EzOnRailsAuthInfo;

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

    // The error text if the password does not match the password confirmation
    passwordsMustMatchErrorText?: string;

    // error text for uploading too many files to avatar field
    avatarToManyFilesErrorText?: string;

    // error text for uploading a too large file to avatar
    avatarToLargeErrorText?: string;

    // error text for uploading a file having the wrong format
    avatarWrongFormatErrorText?: string;

    // The text shown before the unconfirmed email address, if given
    unconfirmedEmailText?: string;

    // The text telling the user that the password change field is optional
    passwordChangeOptionalText?: string;

    // label for the Username field
    labelUsername?: string;

    // label for the Email field
    labelEmail?: string;

    // label for the Password field
    labelPassword?: string;

    // label for the avatar field
    labelAvatar?: string;

    // label for the PasswordConfirmation field
    labelPasswordConfirmation?: string;

    // The minimum length of the password
    minPasswordLength?: number

    // The minimum length of the username
    minUsernameLength?: number;

    // The maximum length of the username
    maxUsernameLength?: number;

    // The maximum length of the email
    maxEmailLength?: number;

    // Called if the user was successfully updated
    onUserUpdateSuccess: (user: EzOnRailsUser) => void;

    // Called if the user update failed. The passed error is the exception.
    onUserUpdateError: (e: any) => void;

    // The max size of the avatar
    avatarMaxSize?: number;

    // css class for the container holding the dropzone for the avatar
    dropzoneContainerClassName?: string;

    // if set to true, the username field will not be shown and submitted, can be used to only show a set of fields to update
    hideUsername?: boolean;

    // if set to true, the email field will not be shown and submitted, can be used to only show a set of fields to update
    hideEmail?: boolean;

    // if set to true, the password and passwordConfirmation field will not be shown and submitted, can be used to only show a set of fields to update
    hidePassword?: boolean;

    // if set to true, the avatar field will not be shown and submitted, can be used to only show a set of fields to update
    hideAvatar?: boolean;

    // Ref that is assigned to the submit button, can be used to eg. trigger the submit from outside the form
    submitRef?: React.Ref<HTMLButtonElement>;
}

/**
 * Form values for the update user form.
 */
interface UpdateUserFormValues {
    email: string;
    unconfirmedEmail: string | null; // only used for display
    username: string;
    password: string;
    passwordConfirmation: string;
    avatar: RailsFileBlob | null;
}

/**
 * UpdateUserForm component for a default form using EzOnRails to update the own user.
 * The auth info needed by the component to receive the users information and update the new information
 * needs to be passed by the props.
 * Customizable with the props using css.
 *
 * @param props
 * @constructor
 */
export const UpdateUserForm = (props: UpdateUserFormProps) => {
    const [inProgress, setInProgress] = useState<boolean>(false)
    const [initialFormData, setInitialFormData] = useState<UpdateUserFormValues | null>(null)

    /**
     * Converts the specified data returned by an ez-on-rails backend server to form values
     * that can be passed to the component.
     *
     * @param data
     */
    const userResponseToFormValues = (data: EzOnRailsUser): UpdateUserFormValues => {
        return {
            username: data.username || '',
            email: data.email,
            unconfirmedEmail: data.unconfirmedEmail,
            password: '',
            passwordConfirmation: '',
            avatar: data.avatar
        }
    };

    /**
     * Called once if the form was rendered.
     * Requests the user data from the server and sets the initial form values to those data.
     */
    useEffect(() => {
        (async () => {
            const initialUserData = await EzOnRailsHttpClient.getUser(props.authInfo)
            setInitialFormData(userResponseToFormValues(initialUserData))
        })();
    }, []);

    /**
     * Updates the user given by the form values.
     * Calls the callback for a successfull update in the props, if the request was successfull.
     * In this case the updated data of the user will be passed as parameter.
     * Calls the callback for some error in the props, if the request was not successfull.
     * In this case the error thrown by the request will be passed as parameter.
     *
     * @param values
     */
    const updateUser = async (values: UpdateUserFormValues) => {
        setInProgress(true)

        // build paramns
        const updateParams: EzOnRailsUpdateUserParams = {}
        if (values.email) {
            updateParams.email = values.email
        }
        if (values.username) {
            updateParams.username = values.username
        }
        if (values.password) {
            updateParams.password = values.password
            updateParams.passwordConfirmation = values.passwordConfirmation
        }
        if (values.avatar) {
            updateParams.avatar = values.avatar.signedId;
        }

        try {
            const updatedUserData = await EzOnRailsHttpClient.updateUser(updateParams, props.authInfo)
            props.onUserUpdateSuccess(updatedUserData);

            // reinitialize form to show possibly unconfirmed email
            setInitialFormData(userResponseToFormValues(updatedUserData));
            setInProgress(false);
        } catch (e: any) {
            props.onUserUpdateError(e)
            setInProgress(false);
        }
    }

    /**
     * Validation Schema for registration values.
     */
    const UpdateUserValidationSchema: SchemaOf<UpdateUserFormValues> = Yup.object().shape({
        username: Yup.string()
            .min(props.minUsernameLength || 5, props.usernameToShortErrorText || 'Der Benutzername ist zu kurz. Er muss mindestens 5 Zeichen lang sein. ')
            .max(props.maxUsernameLength || 50, props.usernameToLongErrorText || 'Der Benutzername ist zu lang. Er darf maximal 50 Zeichen lang sein.')
            .required(props.usernameRequiredErrorText || 'Der Benutzername ist erforderlich.'),
        email: Yup.string().email(props.emailInvalidErrorText || 'Ungültige E-Mail Adresse.')
            .required(props.emailRequiredErrorText || 'Die E-Mail Adresse ist erforderlich.')
            .max(props.maxEmailLength || 100, props.emailToLongErrorText || 'Die E-Mail Adresse ist zu lang. Sie darf maximal 100 Zeichen lang sein.'),
        password: Yup.string().min(props.minPasswordLength || 8, props.passwordToShortErrorText || 'Das Passwort ist zu kurz. Es muss mindestens 8 Zeichen lang sein.'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password')], props.passwordsMustMatchErrorText || 'Die Passwörter müssen übereinstimmen.')
    } as any).defined();

    return (
        <div className="ez-on-rails-form-outer-container">
            {
                initialFormData ? (
                        <Formik
                            initialValues={initialFormData}
                            validationSchema={UpdateUserValidationSchema}
                            enableReinitialize={true}
                            onSubmit={(values) => {
                                updateUser(values)
                            }}
                        >
                            {({
                                  errors,
                                  values,
                                  handleChange,
                                  setFieldValue,
                                  setFieldError,
                                  handleSubmit,
                              }) => (
                                <form onSubmit={handleSubmit}
                                      className={props.containerClassName || 'ez-on-rails-form-container'}>
                                    { !props.hideUsername && (
                                        <Form.Group
                                            id='username-container'
                                            className={props.fieldContainerClassName || 'ez-on-rails-form-field-container'}>
                                            <Form.Label className={props.fieldLabelClassName || 'ez-on-rails-form-field-label'}>
                                                {props.labelUsername || 'Benutzername'}
                                            </Form.Label>
                                            <Form.Control id='username'
                                                          className={props.fieldInputClassName || 'ez-on-rails-form-field'}
                                                          type="text"
                                                          value={values.username}
                                                          onChange={handleChange}
                                                          isInvalid={!!errors.username}/>
                                            <Form.Control.Feedback type="invalid"
                                                                   className={props.fieldErrorClassName || 'ez-on-rails-form-field-error'}>
                                                {errors.username}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    )}

                                    { !props.hideEmail && (
                                        <Form.Group
                                            id='email-container'
                                            className={props.fieldContainerClassName || 'ez-on-rails-form-field-container'}>
                                            <Form.Label className={props.fieldLabelClassName || 'ez-on-rails-form-field-label'}>
                                                {props.labelEmail || 'E-Mail Adresse'}
                                            </Form.Label>
                                            <Form.Control id='email'
                                                          className={props.fieldInputClassName || 'ez-on-rails-form-field'}
                                                          type="email"
                                                          value={values.email}
                                                          onChange={handleChange}
                                                          isInvalid={!!errors.email}/>
                                            {values.unconfirmedEmail && (
                                                <div
                                                    className={props.fieldInfoClassName || 'ez-on-rails-unconfirmed-email-text'}>
                                                    {props.unconfirmedEmailText || 'Die folgende E-Mail Adresse wurde noch nicht bestätigt: ' } {values.unconfirmedEmail}
                                                </div>
                                            )}
                                            <Form.Control.Feedback type="invalid"
                                                                   className={props.fieldErrorClassName || 'ez-on-rails-form-field-error'}>
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    )}

                                    { !props.hidePassword && (
                                        <Form.Group
                                            id='password-container'
                                            className={props.fieldContainerClassName || 'ez-on-rails-form-field-container'}>
                                            <Form.Label className={props.fieldLabelClassName || 'ez-on-rails-form-field-label'}>
                                                {props.labelPassword || 'Passwort'}
                                            </Form.Label>
                                            <Form.Control id='password'
                                                          className={props.fieldInputClassName || 'ez-on-rails-form-field'}
                                                          type="password"
                                                          value={values.password}
                                                          onChange={handleChange}
                                                          isInvalid={!!errors.password}/>
                                            <div className={props.fieldInfoClassName || 'ez-on-rails-password-optional-text'}>
                                                {props.passwordChangeOptionalText || 'Dieses Feld nur ausfüllen, wenn eine Passwort Änderung gewünscht ist.'}
                                            </div>
                                            <Form.Control.Feedback type="invalid"
                                                                   className={props.fieldErrorClassName || 'ez-on-rails-form-field-error'}>
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    )}

                                    { !props.hidePassword && (
                                        <Form.Group
                                            id='password-confirmation-container'
                                            className={props.fieldContainerClassName || 'ez-on-rails-form-field-container'}>
                                            <Form.Label
                                                className={props.fieldLabelClassName || 'ez-on-rails-form-field-label'}>
                                                {props.labelPasswordConfirmation || 'Passwort wiederholen'}
                                            </Form.Label>
                                            <Form.Control id='passwordConfirmation'
                                                          className={props.fieldInputClassName || 'ez-on-rails-form-field'}
                                                          type="password"
                                                          value={values.passwordConfirmation}
                                                          onChange={handleChange}
                                                          isInvalid={!!errors.passwordConfirmation}/>
                                            <Form.Control.Feedback type="invalid"
                                                                   className={props.fieldErrorClassName || 'ez-on-rails-form-field-error'}>
                                                {errors.passwordConfirmation}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    )}

                                    {!props.hideAvatar && (
                                        <Form.Group
                                            id='avatar-container'
                                            className={props.fieldContainerClassName || 'ez-on-rails-form-field-container'}>
                                            <Form.Label
                                                className={props.fieldLabelClassName || 'ez-on-rails-form-field-label'}>
                                                {props.labelAvatar || 'Avatar'}
                                            </Form.Label>
                                            <div
                                                className={props.dropzoneContainerClassName || 'ez-on-rails-form-field'}>
                                                <ActiveStorageDropzone authInfo={props.authInfo}
                                                                       onChange={(blobs) => setFieldValue('avatar', blobs.length > 0 ? blobs[0] : null)}
                                                                       files={values.avatar ? [values.avatar] : []}
                                                                       multiple={false}
                                                                       maxFiles={1}
                                                                       onMaxFilesError={() => setFieldError('avatar', props.avatarToManyFilesErrorText || 'Es ist nur eine Datei erlaubt.')}
                                                                       maxSize={props.avatarMaxSize || 5242880} // 5 Mb
                                                                       onMaxSizeError={() => setFieldError('avatar', props.avatarToLargeErrorText || 'Es sind maximal 5MB große Bilder erlaubt.')}
                                                                       onInvalidTypeError={() => setFieldError('avatar', props.avatarWrongFormatErrorText || 'Ungültiges Dateiformat.')}/>
                                            </div>
                                            <Form.Control.Feedback type="invalid"
                                                                   className={props.fieldErrorClassName || 'ez-on-rails-form-field-error'}>
                                                {errors.avatar}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    )}
                                    {
                                        !inProgress && (
                                            <div
                                                className={props.submitButtonContainerClassName || 'ez-on-rails-form-submit-container'}>

                                                <Button ref={props.submitRef}
                                                        type="submit"
                                                        variant="primary"
                                                        className={props.submitButtonClassName || 'ez-on-rails-form-submit-button'}>
                                                    {props.labelSubmitButton || "Speichern"}
                                                </Button>
                                            </div>
                                        )}
                                </form>
                            )}
                        </Formik>
                    ) :
                    (
                        <div>
                            Loading...
                        </div>
                    )
            }
        </div>
    )
}
