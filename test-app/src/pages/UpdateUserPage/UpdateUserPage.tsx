import React from 'react'
import { LoginForm, DevelopmentHint, EzOnRailsAuthInfo, UpdateUserForm, EzOnRailsUser } from "@d4us1/ez-on-rails-react";

export const UpdateUserPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onLoginError = (e: any) => {
        alert("Login nicht erfolgreich. Sind deine E-Mail und das Passwort korrekt?");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onLoginSuccess = async (email: string, authInfo: EzOnRailsAuthInfo) => {
        alert('Login erfolgreich.')
    }

    const onUserUpdateSuccess = (user: EzOnRailsUser) => {
        alert(JSON.stringify(user));
    }

    const onUserUpdateError = (e: any) => {
        alert(JSON.stringify(e));
    }

    return <div>
        <LoginForm  onLoginSuccess={onLoginSuccess}
                    onLoginError={onLoginError} />
            <UpdateUserForm onUserUpdateSuccess={onUserUpdateSuccess}
                            onUserUpdateError={onUserUpdateError} />
        <DevelopmentHint visible={true}/>
    </div>
}
