# ez-on-rails-react
This package provides a react library to interact with [ez-on-rails](https://github.com/D4uS1/ez-on-rails) backends.

EzOnRails provides a rails backend that is ez to use with all your needs to build fast applications having a frontend and a backend.
It provides many features like a built in permission system, an easy to configure administration view, built in controllers with CRUD functionality builtin features like searchin, generators for your models etc.
Have a look at the [ez-on-rails](https://github.com/D4uS1/ez-on-rails) repository to see the available features.

This package enables you to build frontend applications that interact with EzOnRails backends.

## Installation
Install the package using npm

```
npm install https://github.com/D4uS1/ez-on-rails-react#v0.8.1
```

or yarn.

```
yarn add https://github.com/D4uS1/ez-on-rails-react#v0.8.1
```

There is a branch for each released version.
See the [Versions](## Versions) section to find the newest compatible version for the backend.

## Usage
### 1. Insert Context provider
You must add the __EzOnRails__ context provider around your application that manages access tokens, api Versions, backend url etc.
Example App.ts:
```
import React from 'react';
import { EzOnRails } from '@d4us1/ez-on-rails-react';

function App() {
  return (
      <EzOnRails backendUrl='http://localhost:3000' apiVersion='1.0'>
        ...
      </EzOnRails>
  );
};

export default App;
```
Note that the apiVersion must match the defined apiVersion in the backend.

### 2. Use the login form component
Many of the actions to the EzOnRails backend must be authorized. The easiest way to accomplish this is to use the builtin components for user management.
Dont be shocked by the design of this components. The components are simple html views without many css applied, but enable you to redesign everything by just passing
the css classes of your needs. See the [Components](## Components) section for details.

```
import React from 'react'
import { LoginForm, EzOnRailsAuthInfo } from "@d4us1/ez-on-rails-react";

export const LoginPage = () => {

    const onLoginError = (e: unkown) => {
        alert("Login failed");
    }

    const onLoginSuccess = async (email: string, authInfo: EzOnRailsAuthInfo) => {
        alert("Login success.");
    }

    return (
        <LoginForm  onLoginSuccess={onLoginSuccess}
                    onLoginError={onLoginError} />
    )
}
```
For now, if a user signs into your application, the access tokens are managed by EzOnRails itself. Hence you can make use of the hooks and other components that need those tokens.

Of course there are also components for a default registration workflow, like registration, password reset, confirmations etc. Every of this component can be fully redesigned by your needs.
Have a look at the [Components](## Components) section for details.

Note that the success callback takes the email and authInfo, but you dont need to use it. This is only if you want to manage the access token yourself. Normally this is done by the package itself.

### 3. Model Type definitions
If you created a scaffold for a model in EzOnRails with the ezscaff generator, i recommend to define the model types as follows:
```
import { EzOnRailsRecord } from '@d4us1/ez-on-rails-react'

interface Article extends EzOnRailsRecord {
    author: string;
    title: string;
    ...
}
```

The inheritance of EzOnRailsRecord adds necessary attributes like the id and timestamp fields to the record. You dont need to take care about the management of what fields to pass or not if you use the hooks of this package in combination with models defined that way.

### 4. Model REST requests
Now you can use the **useEzScaff** hook to access the default actions that are available for the scaffold.
This includes the index, show, create, update, delete and search action.

Example usage:
```
import React, { useEffect } from 'react';
import { useEzScaff } from '@d4us1/ez-on-rails-react';
import { Article } from 'models/Article';

export const ArticlesPage = () => {
    const {
        records,
        inProgress,
        error,
        getAll
    } = useEzScaff<Article>('Articles')

    useEffect(() => {
        getAll();
    }, [])

    return (
        <div>
        { inProgress && <div>...</div> }
        { error && <span>{error}</span> }
        { records && (
            <div>
                { records.map((record) => <div>{ record.title }</div>) }
            </div>
        )}
    )
}
```

This example fetches all articles from the backend if the page renders.
Note that you can also show, create, update or delete one Article or search for articles the same way.
Have a look at the [useEzScaff](### useEzScaff) explanation to see whats possible.

Note that you must pass the pluralized model name to the hook. This is necessary because per convention the base route for the scaffold
is the pluralized path. The hook automaticly converts the model name to snake case, but its needed because javascript does not have a good working
builtin pluralize function.

### 5. Simple api requests
You can make api requests to your backend using the **useEzApi** hook.

```
import React from 'react';
import { useEzApi } from '@d4us1/ez-on-rails-react';

export const SomePage = () => {
    const {
        inProgress,
        error,
        data
    } = useEzApi<{ someParam: string }, { someResponse: string }>('some/path', 'POST', { someParam: 'TEST' })

    return (
        <div>
            { inProgress && <div>In Progress</div> }
            { data && <div>{JSON.stringify(data)}</div> }
            { error && <div>{ error.toString() }</div> }
        </div>
    )
}
```

This example calls the path _api/some/path_ using a http POST passing the data _{ someParam: 'TEST' }_. The response is saved in the data result of the hook.

Note that this usage triggers the request by calling the hook. It is also possible to trigger the api manually, for instance after a button click. 
See the [Custom API requests](### 6. Custom API requests) section for details.

### 6. Custom API requests
If you want to to make a custom request that is not triggered on hook call you have two possibilities.

#### 1. Use callApi that is returned by useApi (recommended)
The **useEzApi** hook also returns the function that calls the request itself. Hence it can be called manually.

Example:
```
import React from 'react';
import { useEzApi } from '@d4us1/ez-on-rails-react';

export const SomePage = () => {
    const {
        inProgress,
        error,
        data,
        callApi
    } = useEzApi<{ someParam: string }, { someResponse: string }>('some/path', 'POST', undefined, { skipInitialCall: true })

    return (
        <div>
            <button onClick={ () => callApi({ someParam: string }) }>Start request</button>
            { inProgress && <div>In Progress</div> }
            { data && <div>{JSON.stringify(data)}</div> }
            { error && <div>{ error.toString() }</div> }
        </div>
    )
}
```
As you can see here, you can pass the option *skipInitialCall* to the hook, hence the hook skips the initial request when its called.
Instead you can use the *callApi* method that is used by the hook itself, to trigger the request.
The result of the request will be returnd by the data result of the hook, as soon its available.

You can pass parameters to this function, those will be passed as parameters to the request. If you do not pass parameters, but defined some in the hook itself, they will be send instead.

The *callApi* method returns a Promise with the result. Hence, if you dont want to use the returned data attribute from the hook, you can also wait for the result.

```
const result = await callApi({ someParam: string });
```

#### 2. Use the http client
You can call the http methods that are delivered by the package directly, but it is not recommended.

```
import React, { useState } from 'react';
import { EzOnRailsHttpClient, useEzOnRails } from '@d4us1/ez-on-rails-react';

export const SomePage = () => {
    const { backendUrl, apiVersion, authInfo } = useEzOnRails();
    const [response, setResponse] = useState<{ someResponse: string } | null>(null);
    
    const onClickRequest = async () => {
        const result = await EzOnRailsHttpClient.post(backendUrl, 'some/path', { someParam: 'Test' }, authInfo, apiVersion);
        setResponse(result);
    }
    
    return (
        <div>
            <button onClick={ () => callApi({ someParam: string }) }>Start request</button>
            { response && <div>{JSON.stringify(response)}</div> }
        </div>
    )
}
```

The http client also converts the parameters from camelCase to snake_case and the response from snake_case to camelCase and does the other necessary operations for you.

Have a look at the [source](https://github.com/D4uS1/ez-on-rails-react/blob/main/src/http/client/EzOnRailsHttpClient.ts) of the http client to see the possible callable methods here.
It also contains some non standard methods related to the registration process, but as mentioned before, it is recommended to use just the components and hooks.

## Versions
Release versions are located in the branches prefixed with __v__ followed by the verison number.
You must have a look at the following compatibility list, because you must take a version that is compatible with your ez-on-rails backend.

| Version | Compatible Backend Versions |
|---------|-----------------------------|
| 0.8.0 | 0.8.0 |
| 0.8.1 | 0.8.0 |

## Components
This section will be described soon.

### ActiveStorageDropzone
### DevelopmentHint
### LoginForm
### LostPasswordForm
### ProtectedPage
### RegistrationForm
### ResendConfirmationForm
### UpdateUserForm

## Hooks
This section will be described soon.

### useEzScaff
### useEzApi
### useEzOnRails

## Other features
This section will be described soon.

### SWR Fetcher

