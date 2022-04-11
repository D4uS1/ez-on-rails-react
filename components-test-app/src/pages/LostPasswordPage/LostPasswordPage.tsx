import './LostPasswordPage.css'
import React from 'react'
import { LostPasswordForm } from "ez-on-rails-react";
import { AppRoutes } from "../../configuration/AppRoutes";

/**
 * Page holding a form to reset the password and a link to the login form.
 *
 * @constructor
 */
export const LostPasswordPage = () => {
    /**
     * Callback for some error during the registration request.
     * Displays an error message.
     *
     * @param e
     */
    const onLostPasswordError = (e: any) => {
        alert("Ein Fehler während der Anfrage zum Passwort zurücksetzen ist aufgetreten. Bitte versuche es später erneut.");
    }

    /**
     * Callback for a successfull registration.
     * Displays an success message.
     *
     * @param email
     */
    const onLostPasswordSuccess = (email: string) => {
        alert("Passwort zurücksetzen erfolgreich. Bitte logge dich ein.");
    }

    return <div className='lost-password-page-container'>
        <LostPasswordForm onLostPasswordError={onLostPasswordError}
                         onLostPasswordSuccess={onLostPasswordSuccess}
    /></div>

}
