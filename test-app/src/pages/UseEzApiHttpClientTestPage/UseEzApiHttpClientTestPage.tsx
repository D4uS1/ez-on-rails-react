import React, { useState } from 'react';
import { EzOnRailsRecord, useEzApiHttpClient } from '@d4us1/ez-on-rails-react';

interface BearerTokenAccessTest extends EzOnRailsRecord {
    test: string;
}

export const UseEzApiHttpClientTestPage = () => {
    const { call } = useEzApiHttpClient()
    const [response, setResponse] = useState<BearerTokenAccessTest | null>(null)

    const onClickRequest = async () => {
        setResponse(await call('bearer_token_access_tests', 'POST', { test: 'TEST' }));
    }

    return (
        <div>
            <button onClick={onClickRequest}>Request</button>
            { response && <div>{JSON.stringify(response)}</div> }
        </div>
    )
}