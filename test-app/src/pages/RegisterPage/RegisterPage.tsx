import './RegisterPage.css'
import React from 'react'
import { RegistrationForm } from "@d4us1/ez-on-rails-react";

export const RegisterPage = () => {

    const onRegisterError = (e: any) => {
        alert("Ein Fehler während der Registrierung ist aufgetreten. Bitte versuche es später erneut.");
    }

    const onRegisterSuccess = (email: string) => {
        alert("Registrierung erfolgreich. Bitte Bestätige deine E-Mail Adresse und logge dich ein.");
    }

    return <div className='register-page-container'>
        <RegistrationForm onRegisterError={onRegisterError}
                          onRegisterSuccess={onRegisterSuccess}
                        generalTermsUrl="https://google.de"
                        privacyPolicyUrl="https://apple.de" /></div>
}
