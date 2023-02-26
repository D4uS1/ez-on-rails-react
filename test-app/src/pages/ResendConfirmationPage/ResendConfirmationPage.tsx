import './ResendConfirmationPage.css'
import React from 'react'
import { ResendConfirmationForm } from "ez-on-rails-react";

/**
 * Page holding a form to resend the confirmation instructions and a link to the login form.
 *
 * @constructor
 */
export const ResendConfirmationPage = () => {
    /**
     * Callback for some error during the registration request.
     * Displays an error message.
     *
     * @param e
     */
    const onResendConfirmationError = (e: any) => {
        alert("Ein Fehler während der Anfrage zum erneuten Senden der Bestätigungs E-Mail ist aufgetreten. Bitte versuche es später erneut.");
    }

    /**
     * Callback for a successfull registration.
     * Displays an success message.
     *
     * @param email
     */
    const onResendConfirmationSuccess = (email: string) => {
        alert("Du hast eine neue E-Mail zur Bestätigung erhalten. Bitte rufe diese auf und logge dich ein.");
    }

    return <div className='resend-confirmation-page-container'><ResendConfirmationForm onResendConfirmationError={onResendConfirmationError}
                            onResendConfirmationSuccess={onResendConfirmationSuccess}
    /></div>
}
