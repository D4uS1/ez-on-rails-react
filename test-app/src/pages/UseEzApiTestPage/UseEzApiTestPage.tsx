import React from 'react';
import { EzOnRailsRecord, useEzApi } from '@d4us1/ez-on-rails-react';

interface BearerTokenAccessTest extends EzOnRailsRecord {
    test: string;
}

export const UseEzApiTestPage = () => {
    const {
        inProgress,
        error,
        data
    } = useEzApi<{ test: string }, BearerTokenAccessTest[]>('bearer_token_access_tests', 'POST', { test: 'TEST' })

    return (
        <div>
            { inProgress && <div>In Progress</div> }
            { data && <div>{JSON.stringify(data)}</div> }
            { error && <div>{ error.toString() }</div> }
        </div>
    )
}