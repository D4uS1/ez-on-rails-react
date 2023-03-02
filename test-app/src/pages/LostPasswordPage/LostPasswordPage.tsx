import './LostPasswordPage.css'
import React from 'react'
import { LostPasswordForm } from "@d4us1/ez-on-rails-react";

export const LostPasswordPage = () => {
    const onLostPasswordError = (e: any) => {
        alert("Ein Fehler während der Anfrage zum Passwort zurücksetzen ist aufgetreten. Bitte versuche es später erneut.");
    }

    const onLostPasswordSuccess = (email: string) => {
        alert("Passwort zurücksetzen erfolgreich. Bitte logge dich ein.");
    }

    return <div className='lost-password-page-container'>
        <LostPasswordForm onLostPasswordError={onLostPasswordError}
                         onLostPasswordSuccess={onLostPasswordSuccess}
    /></div>

}
