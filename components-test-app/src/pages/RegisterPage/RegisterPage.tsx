import './RegisterPage.css'
import React from 'react'
import { RegistrationForm } from "ez-on-rails-react";
import { AppRoutes } from "../../configuration/AppRoutes";

/**
 * Page holding a form to register and links to the login or resend confirmation instructions page.
 *
 * @constructor
 */
export const RegisterPage = () => {

    /**
     * Callback for some error during the registration request.
     * Displays an error message.
     *
     * @param e
     */
    const onRegisterError = (e: any) => {
        alert("Ein Fehler während der Registrierung ist aufgetreten. Bitte versuche es später erneut.");
    }

    /**
     * Callback for a successfull registration.
     * Displays an success message.
     *
     * @param email
     */
    const onRegisterSuccess = (email: string) => {
        alert("Registrierung erfolgreich. Bitte Bestätige deine E-Mail Adresse und logge dich ein.");
    }

    return <div className='register-page-container'>
        <RegistrationForm onRegisterError={onRegisterError}
                          onRegisterSuccess={onRegisterSuccess}
                        generalTermsUrl="https://google.de"
                        privacyPolicyUrl="https://apple.de" /></div>
}
