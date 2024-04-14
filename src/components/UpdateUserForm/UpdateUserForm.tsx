import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { SchemaOf } from 'yup';
import { Formik } from 'formik';
import { useEzOnRails } from '../../hooks';
import { EzOnRailsHttpClient, EzOnRailsUpdateUserParams, EzOnRailsUser } from '../../http/client/EzOnRailsHttpClient';
import { Button, Form } from 'react-bootstrap';
import { ActiveStorageDropzone } from '../ActiveStorageDropzone/ActiveStorageDropzone';
import { DefaultFormProps } from '../shared/types/Form';
import formStyles from '../shared/styles/Form.module.css';

/**
 * Props for the UpdateUserForm.
 * Used to customize the register form.
 */
export interface UpdateUserFormProps extends DefaultFormProps {
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
    minPasswordLength?: number;

    // The minimum length of the username
    minUsernameLength?: number;

    // The maximum length of the username
    maxUsernameLength?: number;

    // The maximum length of the email
    maxEmailLength?: number;

    // Called if the user was successfully updated
    onUserUpdateSuccess: (user: EzOnRailsUser) => void;

    // Called if the user update failed. The passed error is the exception.
    onUserUpdateError: (e: unknown) => void;

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
 * UpdateUserForm component for a default form using EzOnRails to update the own user.
 * The auth info needed by the component to receive the users information and update the new information
 * needs to be passed by the props.
 * Customizable with the props using css.
 *
 * @param props
 * @constructor
 */
export const UpdateUserForm = (props: UpdateUserFormProps) => {
    const { authInfo, backendUrl, apiVersion } = useEzOnRails();
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [initialFormData, setInitialFormData] = useState<EzOnRailsUpdateUserParams | null>(null);
    const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | undefined>(undefined);

    /**
     * Sets the state values to display the form, holding the user data and unconfirmed email, by setting it
     * to the values of the specified user object.
     *
     * @param user
     */
    const setFormDataFromUser = (user: EzOnRailsUser) => {
        setInitialFormData(user);
        setUnconfirmedEmail(user.unconfirmedEmail);
    };

    /**
     * Called once if the form was rendered.
     * Requests the user data from the server and sets the initial form values to those data.
     */
    useEffect(() => {
        (async () => {
            if (!authInfo) return;

            setFormDataFromUser(await EzOnRailsHttpClient.getUser(backendUrl, authInfo, apiVersion));
        })();
    }, [backendUrl, authInfo, apiVersion]);

    /**
     * Updates the user given by the form values.
     * Calls the callback for a successfull update in the props, if the request was successfull.
     * In this case the updated data of the user will be passed as parameter.
     * Calls the callback for some error in the props, if the request was not successfull.
     * In this case the error thrown by the request will be passed as parameter.
     *
     * @param values
     */
    const updateUser = async (values: EzOnRailsUpdateUserParams) => {
        if (!authInfo) return;

        setInProgress(true);

        try {
            const updatedUser = await EzOnRailsHttpClient.updateUser(backendUrl, values, authInfo, apiVersion);
            props.onUserUpdateSuccess(updatedUser);

            // reinitialize form to show possibly unconfirmed email
            setFormDataFromUser(updatedUser);

            setInProgress(false);
        } catch (e: unknown) {
            props.onUserUpdateError(e);
            setInProgress(false);
        }
    };

    /**
     * Validation Schema for registration values.
     */
    const UpdateUserValidationSchema: SchemaOf<EzOnRailsUpdateUserParams> = Yup.object()
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
                        `The username is too long. It must have not more than ${
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
                        `The email address is too long. It must not have more than ${
                            props.maxEmailLength || 100
                        } characters.`
                ),
            password: Yup.string().min(
                props.minPasswordLength || 8,
                props.passwordToShortErrorText ||
                    `The password is too short. It must have at least ${props.minPasswordLength || 8} characters.`
            ),
            passwordConfirmation: Yup.string().oneOf(
                [Yup.ref('password')],
                props.passwordsMustMatchErrorText || 'The password and its confirmation do not match.'
            )
        })
        .defined();

    return (
        authInfo && (
            <div className="ez-on-rails-form-outer-container">
                {initialFormData ? (
                    <Formik
                        initialValues={initialFormData}
                        validationSchema={UpdateUserValidationSchema}
                        enableReinitialize={true}
                        onSubmit={(values) => {
                            updateUser(values);
                        }}
                    >
                        {({ errors, values, handleChange, setFieldValue, setFieldError, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className={props.containerClassName || formStyles.container}>
                                {!props.hideUsername && (
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
                                            value={values.username}
                                            onChange={handleChange}
                                            isInvalid={!!errors.username}
                                        />
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className={props.fieldErrorClassName || formStyles.fieldError}
                                        >
                                            {errors.username}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                )}

                                {!props.hideEmail && (
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
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                        />
                                        {unconfirmedEmail && (
                                            <div
                                                className={
                                                    props.fieldInfoClassName || 'ez-on-rails-unconfirmed-email-text'
                                                }
                                            >
                                                {props.unconfirmedEmailText ||
                                                    'The following email is not yet confirmed: '}{' '}
                                                {unconfirmedEmail}
                                            </div>
                                        )}
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className={props.fieldErrorClassName || formStyles.fieldError}
                                        >
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                )}

                                {!props.hidePassword && (
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
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={!!errors.password}
                                        />
                                        <div
                                            className={props.fieldInfoClassName || 'ez-on-rails-password-optional-text'}
                                        >
                                            {props.passwordChangeOptionalText ||
                                                'You must only provide this if you want to change the password.'}
                                        </div>
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className={props.fieldErrorClassName || formStyles.fieldError}
                                        >
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                )}

                                {!props.hidePassword && (
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
                                            value={values.passwordConfirmation}
                                            onChange={handleChange}
                                            isInvalid={!!errors.passwordConfirmation}
                                        />
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className={props.fieldErrorClassName || formStyles.fieldError}
                                        >
                                            {errors.passwordConfirmation}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                )}

                                {!props.hideAvatar && (
                                    <Form.Group
                                        id="avatar-container"
                                        className={props.fieldContainerClassName || formStyles.fieldContainer}
                                    >
                                        <Form.Label className={props.fieldLabelClassName || formStyles.fieldLabel}>
                                            {props.labelAvatar || 'Avatar'}
                                        </Form.Label>
                                        <div className={props.dropzoneContainerClassName || formStyles.formField}>
                                            <ActiveStorageDropzone
                                                onChange={(blobs) =>
                                                    setFieldValue('avatar', blobs.length > 0 ? blobs[0] : null)
                                                }
                                                files={values.avatar ? [values.avatar] : []}
                                                multiple={false}
                                                maxFiles={1}
                                                onMaxFilesError={() =>
                                                    setFieldError(
                                                        'avatar',
                                                        props.avatarToManyFilesErrorText || 'Only one file is allowed'
                                                    )
                                                }
                                                maxSize={props.avatarMaxSize || 5242880} // 5 Mb
                                                onMaxSizeError={() =>
                                                    setFieldError(
                                                        'avatar',
                                                        props.avatarToLargeErrorText ||
                                                            `The file must not be larger than ${Math.round(
                                                                (props.avatarMaxSize || 5242880) / 1048576
                                                            )} MB.`
                                                    )
                                                }
                                                onInvalidTypeError={() =>
                                                    setFieldError(
                                                        'avatar',
                                                        props.avatarWrongFormatErrorText || 'Invalid file format.'
                                                    )
                                                }
                                            />
                                        </div>
                                        <Form.Control.Feedback
                                            type="invalid"
                                            className={props.fieldErrorClassName || formStyles.fieldError}
                                        >
                                            {errors.avatar}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                )}
                                {!inProgress && (
                                    <div
                                        className={
                                            props.submitButtonContainerClassName || 'ez-on-rails-form-submit-container'
                                        }
                                    >
                                        <Button
                                            ref={props.submitRef}
                                            type="submit"
                                            variant="primary"
                                            className={props.submitButtonClassName || formStyles.submitButton}
                                        >
                                            {props.labelSubmitButton || 'Submit'}
                                        </Button>
                                    </div>
                                )}
                            </form>
                        )}
                    </Formik>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        )
    );
};
