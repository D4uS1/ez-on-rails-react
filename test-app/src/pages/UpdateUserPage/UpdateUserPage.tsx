import React, { useState } from 'react'
import { LoginForm } from "ez-on-rails-react";
import { DevelopmentHint, EzOnRailsAuthInfo, UpdateUserForm, EzOnRailsUser } from "ez-on-rails-react";

/**
 * Page for holding a update user form.
 *
 * @constructor
 */
export const UpdateUserPage = () => {
    // must be set before we update, hence the user needs to login first
    const [authInfo, setAuthInfo] = useState<EzOnRailsAuthInfo | null>(null)

    /**
     * Called if any error while logging in occured.
     * Displays an error message.
     *
     * @param e
     */
    const onLoginError = (e: any) => {
        alert("Login nicht erfolgreich. Sind deine E-Mail und das Passwort korrekt?");
    }

    /**
     * Called if the login was successfull. Saves the auth info to the state to be able to test the user update form.
     * @param email
     * @param authInfo
     */
    const onLoginSuccess = async (email: string, authInfo: EzOnRailsAuthInfo) => {
        setAuthInfo(authInfo);
    }

    /**
     * Called if the update of the user was successful.
     * Shows the user information in an alert message.
     *
     * @param user
     */
    const onUserUpdateSuccess = (user: EzOnRailsUser) => {
        alert(JSON.stringify(user));
    }

    /**
     * Called if the update of the user was not successful.
     * Shows the error information in an alert message.
     *
     * @param e
     */
    const onUserUpdateError = (e: any) => {
        alert(JSON.stringify(e));
    }


    return <div>
        <LoginForm  onLoginSuccess={onLoginSuccess}
                    onLoginError={onLoginError} />
        { authInfo && <UpdateUserForm authInfo={authInfo}
                                      onUserUpdateSuccess={onUserUpdateSuccess}
                                      onUserUpdateError={onUserUpdateError} /> }
        <DevelopmentHint visible={true}/>
    </div>
}
