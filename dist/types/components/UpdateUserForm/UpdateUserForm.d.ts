import React from 'react';
import { EzOnRailsUser } from '../../http/client/EzOnRailsHttpClient';
import { DefaultFormProps } from '../shared/types/Form';
/**
 * Props for the UpdateUserForm.
 * Used to customize the register form.
 */
export interface UpdateUserFormProps extends DefaultFormProps {
    usernameToShortErrorText?: string;
    usernameToLongErrorText?: string;
    usernameRequiredErrorText?: string;
    emailInvalidErrorText?: string;
    emailRequiredErrorText?: string;
    emailToLongErrorText?: string;
    passwordToShortErrorText?: string;
    passwordsMustMatchErrorText?: string;
    avatarToManyFilesErrorText?: string;
    avatarToLargeErrorText?: string;
    avatarWrongFormatErrorText?: string;
    unconfirmedEmailText?: string;
    passwordChangeOptionalText?: string;
    labelUsername?: string;
    labelEmail?: string;
    labelPassword?: string;
    labelAvatar?: string;
    labelPasswordConfirmation?: string;
    minPasswordLength?: number;
    minUsernameLength?: number;
    maxUsernameLength?: number;
    maxEmailLength?: number;
    onUserUpdateSuccess: (user: EzOnRailsUser) => void;
    onUserUpdateError: (e: unknown) => void;
    avatarMaxSize?: number;
    dropzoneContainerClassName?: string;
    hideUsername?: boolean;
    hideEmail?: boolean;
    hidePassword?: boolean;
    hideAvatar?: boolean;
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
export declare const UpdateUserForm: (props: UpdateUserFormProps) => JSX.Element | null;
