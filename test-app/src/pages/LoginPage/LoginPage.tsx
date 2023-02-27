import './LoginPage.css'
import React from 'react'
import { LoginForm, DevelopmentHint, EzOnRailsAuthInfo } from "@d4us1/ez-on-rails-react";

export const LoginPage = () => {

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
