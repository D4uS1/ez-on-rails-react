import './ResendConfirmationPage.css'
import React from 'react'
import { ResendConfirmationForm } from "ez-on-rails-react";

export const ResendConfirmationPage = () => {
    const onResendConfirmationError = (e: any) => {
        alert("Ein Fehler während der Anfrage zum erneuten Senden der Bestätigungs E-Mail ist aufgetreten. Bitte versuche es später erneut.");
    }

    const onResendConfirmationSuccess = (email: string) => {
        alert("Du hast eine neue E-Mail zur Bestätigung erhalten. Bitte rufe diese auf und logge dich ein.");
    }

    return <div className='resend-confirmation-page-container'><ResendConfirmationForm onResendConfirmationError={onResendConfirmationError}
                            onResendConfirmationSuccess={onResendConfirmationSuccess}
    /></div>
}
