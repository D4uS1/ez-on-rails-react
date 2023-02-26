import './LoginPage.css'
import React from 'react'
import { LoginForm } from "ez-on-rails-react";
import { DevelopmentHint, EzOnRailsAuthInfo } from "ez-on-rails-react";

/**
 * Page for holding a login form and Links to register and reset the password.
 * If the Login was successfull, the user will be redirected.
 *
 * @constructor
 */
export const LoginPage = () => {

    /**
     * Called if any error while logging in occured.
     * Displays an error message.
     *
     * @param e
     */
    const onLoginError = (e: any) => {
        alert("Login nicht erfolgreich. Sind deine E-Mail und das Passwort korrekt?");
    }

    const onLoginSuccess = async (email: string, authInfo: EzOnRailsAuthInfo) => {
        alert("Login erfolgreich.");
    }


    return <div className='login-page-container'>
        <LoginForm  onLoginSuccess={onLoginSuccess}
                    onLoginError={onLoginError} />
        <DevelopmentHint visible={true}/>
    </div>
}
