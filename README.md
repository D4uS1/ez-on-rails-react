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
    ...
}
```

The inheritance of EzOnRailsRecord adds necessary attributes like the id and timestamp fields to the record. You dont need to take care about the management of what fields to pass or not if you use the hooks of this package in combination with models defined that way.

### 4. Model REST requests
Now you can use the **useEzScaff** hook to access the default actions that are available for the scaffold.
This includes the index, show, create, update, delete and search action.


### 5. Simple api requests


### 6. Custom API requests

## Versions
Release versions are located in the branches prefixed with __v__ followed by the verison number.
You must have a look at the following compatibility list, because you must take a version that is compatible with your ez-on-rails backend.


| Version | Compatible Backend Versions |
|---------|-----------------------------|
| 0.8.0 | 0.8.0 |
| 0.8.1 | 0.8.0 |

## Components

## Hooks

