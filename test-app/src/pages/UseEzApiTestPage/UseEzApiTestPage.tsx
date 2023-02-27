import React from 'react';
import { EzOnRailsRecord, useEzApi } from '@d4us1/ez-on-rails-react';

interface BearerTokenAccessTest extends EzOnRailsRecord {
    test: string;
}

export const UseEzApiTestPage = () => {
    const {
        inProgress,
        error,
        data,
        callApi
    } = useEzApi<{ test: string }, BearerTokenAccessTest[]>('bearer_token_access_tests', 'POST', { test: 'TEST' }, { skipInitialCall: true })

    const onClickRequest = () => {
        callApi();
    }

    return (
        <div>
            <button onClick={onClickRequest}>Request</button>
            { inProgress && <div>In Progress</div> }
            { data && <div>{JSON.stringify(data)}</div> }
            { error && <div>{ error.toString() }</div> }
        </div>
    )
}