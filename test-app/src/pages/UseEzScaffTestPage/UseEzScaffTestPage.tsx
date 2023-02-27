import { EzOnRailsAuthInfo, LoginForm, useEzScaff } from '@d4us1/ez-on-rails-react';
import { EzOnRailsRecord } from '@d4us1/ez-on-rails-react';
import React from 'react';

interface BearerTokenAccessTest extends EzOnRailsRecord {
    test: string;
}

export const UseEzScaffTestPage = () => {
    const {
        record,
        records,
        inProgress,
        error,
        getAll,
        getOne,
        search,
        create,
        update,
        remove
    } = useEzScaff<BearerTokenAccessTest>('BearerTokenAccessTests')

    const onLoginError = (e: any) => {
        alert("Login nicht erfolgreich. Sind deine E-Mail und das Passwort korrekt?");
    }

    const onLoginSuccess = async (email: string, authInfo: EzOnRailsAuthInfo) => {
        alert('Erfolgreich eingeloggt.')
    }

    const onClickNew = () => {
        const randomString = ((Math.random() * 100) / 100).toString()

        create({ test: randomString });
        getAll();
    }

    const onClickRefresh = () => {
        getAll();
    }

    const onClickGetFirst = () => {
        if (!records || records.length === 0) return;
        getOne(records[0].id);
    }

    const onClickUpdate = (record: BearerTokenAccessTest) => {
        const randomString = ((Math.random() * 100) / 100).toString()

        update(record.id, { test: randomString });
        getAll();
    }

    const onClickDelete = (record: BearerTokenAccessTest) => {
        remove(record.id);
        getAll();
    }

    const onClickSearch = () => {
        if (!record) return;

        search({ field: 'test', operator: 'eq', value: record.test });
    }

    return (
        <div>
            <LoginForm  onLoginSuccess={onLoginSuccess}
                        onLoginError={onLoginError} />

            <div>
                { inProgress && <div>In Progress</div> }
                <button onClick={onClickNew}>New</button>
                <button onClick={onClickRefresh}>Refresh</button>
                <button onClick={onClickGetFirst}>Refresh first</button>
                <button onClick={onClickSearch}>Search</button>
                <div>
                    Current single record: { JSON.stringify(record) }
                </div>
                <div>
                    Current multiple records:
                    {
                        records?.map((record) => (
                            <div key={record.id}>
                                <span>{ JSON.stringify(record)}</span>
                                <button onClick={() => onClickUpdate(record)}>Update</button>
                                <button onClick={() => onClickDelete(record)}>Delete</button>
                            </div>
                        ))
                    }
                </div>
                { error && <div>{ error.toString() }</div> }
            </div>
        </div>
    )
}