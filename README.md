# ez-on-rails-react
This package provides a react library to interact with [ez-on-rails](https://github.com/D4uS1/ez-on-rails) backends.

EzOnRails provides a rails backend that is ez to use with all your needs to build fast applications having a frontend and a backend.
It provides many features like a built in permission system, an easy to configure administration view, built in controllers with CRUD functionality, builtin features like searching, generators for your models etc.
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

You can also pass an __onUnauthorizedCallback__ that is called if any hook doing http requests fail with a http 401 status code.
This makes it possible to have a session management and logout the user if some token is invalid.
Note that you can also set the callback by using the __setOnUnauthorizedCallback__ methode from the __useEzOnRails__ hook.
Also note that if you use the callback, a 401 error will not be thrown. It will be catched and handled by the callback.

Example App.ts:
```
import React from 'react';
import { EzOnRails } from '@d4us1/ez-on-rails-react';

function App() {
  const onUnauthorized = () => {
      ...
  };

  return (
      <EzOnRails backendUrl='http://localhost:3000' apiVersion='1.0' onUnauthorized={onUnauthorized}>
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
import { LoginForm, EzOnRailsAuthInfo, useEzOnRails } from "@d4us1/ez-on-rails-react";

export const LoginPage = () => {
    const { authInfo } = useEzOnRails();

    useEffect(() => {
      if (authInfo) {
        // User signed in, do some initialization here
      }
    }, [authInfo]);

    const onLoginError = (e: unkown) => {
        alert("Login failed");
    }

    const onLoginSuccess = async (email: string, authInfo: EzOnRailsAuthInfo, stayLoggedIn: boolean) => {
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

Note that the success callback takes the email, authInfo and a value indicating whether the user has checked the checkbox to stay logged in after app restart.
Since this method is called immediatly after the sign in, the contexts auth info may not be available. Hence if you do some further http requests here, the requests
may fail. If you want to do some initialization after sign in, it is recommended to do this by a useEffect hook monitoring the authInfo, like in the example above.

You can also save the authentication information somewhere and pass it to the context provider after app restart again.
If you dont want to show the stay logged in checkbox, pass *hideStayLoggedIn* to the component.

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
If you want to to make a custom request that is not triggered on hook call you have three possibilities.

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

#### 2. Use the useEzApiHttpClient hook
This hook can be useful if you have many different http requests in one component and dont want to define an useEzApi hook for each of them.
The hook returns only a method to call a request to the backend. The method accepts a path, the http method and the parameters and returns a promise of the response.
Hence you can decide if you want to wait for the response of call it asynchronous.

The hook accepts a base path. This must not ne given, but can be useful if you want to access actions behind some scaffold that are no CRUD actions.

Example:
```
import React from 'react';
import { useEzApiHttpClient } from '@d4us1/ez-on-rails-react';

export const SomePage = () => {
    const { call } = useEzApiHttpClient()
    const response = useState<{ someResponse: string } | null>(null)

    const onClickRequest = async () => {
      const result = await call('some/path', 'POST', { someParam: string })
      setResponse(result)
    }

    return (
        <div>
            <button onClick={ () => call('some/path', 'POST', { someParam: string }) }>Start request</button>
            { response && <div>{JSON.stringify(response)}</div> }
        </div>
    )
}
```

#### 3. Use the http client
You can call the http methods that are delivered by the package directly, but it is not recommended.

```
import React, { useState } from 'react';
import { EzOnRailsHttp, useEzOnRails } from '@d4us1/ez-on-rails-react';

export const SomePage = () => {
    const { backendUrl, apiVersion, authInfo } = useEzOnRails();
    const [response, setResponse] = useState<{ someResponse: string } | null>(null);
    
    const onClickRequest = async () => {
        const result = await EzOnRailsHttp.client.post(backendUrl, 'some/path', { someParam: 'Test' }, authInfo, apiVersion);
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
| 0.8.0   | 0.8.0                       |
| 0.8.1   | 0.8.0, 0.8.1                |
| 0.8.2   | 0.8.1                       |

## Components
There are several components you can use, especially for the user registration workflow.
Every component is customizable in its style, by passing several properties ending with *className*.
The components holding forms are customizable by passing the props described in the [DefaultFormProps](### DefaultFormProps) section.

### LoginForm
Shows a login form that automatically saves the authInfo for following api requests to the backend in the context.
The form is fully customizable in its style, labels and texts.

The component accepts the following props:
* labelEmail?: string - The label for the email field
* labelPassword?: string - The label for the password field
* labelStayLoggedIn?: string - The label for the stay logged in field
* invalidEmailErrorText?: string - The error text for an invalid email
* emailRequiredErrorText?: string - The error text for a required email error
* passwordToShortErrorText?: string - The error text for a too short password
* passwordRequiredErrorText?: string - The error text for the required password
* hideStayLoggedIn?: boolean - Indicates whether the stayLoggedIn checkbox should be invisible
* minPasswordLength?: number - The minimum length of the password
* onLoginSuccess: (email: string, authInfo: EzOnRailsAuthInfo, stayLoggedIn: boolean) => Promise<void> - Called if the user successfully logged in. The email of the user and its auth info for the next request will be passed. Passes also if the user checked the stayLoggedIn checkbox. You can use this to save the authInfo and pass it after app restart to the context provider.
* onLoginError: (e: unknown) => void - Called if the user login failed. The passed error is the exception.
* Props to customize the style of the form component. See [DefaultFormProps](### DefaultFormProps) for details.

### RegistrationForm
Shows a registration form to register a new user.

The component accepts the following props:
* usernameToShortErrorText?: string - The error text if the user types a too short username
* usernameToLongErrorText?: string - The error text if the user types a too long username
* usernameRequiredErrorText?: string - The error text if the user does not provide a username
* emailInvalidErrorText?: string - The error text if the user types an invalid email
* emailRequiredErrorText?: string - The error text if the user does not provide an email
* emailToLongErrorText?: string - The error text if the user types a too long email
* passwordToShortErrorText?: string - The error text if the user types a to short password
* passwordRequiredErrorText?: string - The error text if the user does not provide a password
* passwordsMustMatchErrorText?: string - The error text if the password does not match the password confirmation
* privacyPolicyNotAcceptedErrorText?: string - The error text if the user did not accept the privacy policy
* labelUsername?: string - Label for the Username field
* labelEmail?: string - Label for the Email field
* labelPassword?: string - Label for the Password field
* labelPasswordConfirmation?: string - Label for the PasswordConfirmation field
* labelPrivacyPolicyAccepted?: string | ReactNode - Label for the PrivacyPolicyAccedpted field. Can also be a ReactNode to eg. provide links to the privacy policy.
* minPasswordLength?: number - The minimum length of the password
* minUsernameLength?: number - The minimum length of the username
* maxUsernameLength?: number - The maximum length of the username
* maxEmailLength?: number - The maximum length of the email
* onRegisterSuccess: (email: string) => void - Called if the user successfully registered in. The email of the user will be passed.
* onRegisterError: (e: unknown) => void - Called if the user registration failed. The passed error is the exception.
* privacyPolicyUrl?: string - URL targeting the privacy policy
* generalTermsUrl?: string - URL targeting the general terms and conditions
* Props to customize the style of the form component. See [DefaultFormProps](### DefaultFormProps) for details.

### LostPasswordForm
Shows a form to request a link to reset the password via email.

The component accepts the following props:
* invalidEmailErrorText?: string - The error text if the user types an invalid email
* emailRequiredErrorText?: string - The error text if the user types no email
* labelEmail?: string - The label for the email
* onLostPasswordSuccess: (email: string) => void - Called if the request to send new password instructions was successful. The email is the email the request was send to.
* onLostPasswordError: (e: unknown) => void - Called if the request to send new password instructions was successful. The error is the exception that was thrown during the request.
* Props to customize the style of the form component. See [DefaultFormProps](### DefaultFormProps) for details.

### ResetPasswordForm
Shows a form to reset a users password by using the token that was given via a link that was sent to a password reset email.
If a user requested a password reset using the *LostPasswordForm* component and klicks the link in the email, you must provide a route targeting this link.
You should get the token that is given via the query parameter and pass it to the *ResetPasswordForm* component.

The component accepts the following props:
* resetPasswordToken: string - The token to reset the password on the backend
* labelPassword?: string - The label for the passsword field
* labelPasswordConfirmation?: string - The label for the password confirmation field
* passwordRequiredErrorText?: string - The text for a required password error
* passwordToShortErrorText?: string - The error text for a too short password
* passwordConfirmationMatchErrorText?: string - The error text if the password and passwordConfirmation do not match
* minPasswordLength?: number - The minimum length of the password
* onResetPasswordSuccess: () => Promise<void> - Called if the user successfully resetted the password.
* onResetPasswordError: (e: unknown) => void - Called if the submit failed. The passed error is the exception.

### ResendConfirmationForm
Shows a form to request a new confirmation link for a new user that was not yet activated.

The component accepts the following props:
* invalidEmailErrorText?: string - The error text if the user types an invalid email
* emailRequiredErrorText?: string - The error text if the user types no email
* labelEmail?: string - The label for the email
* onResendConfirmationSuccess: (email: string) => void - Called if the request to resend confirmation instructions was successful. The email is the email the request was send to.
* onResendConfirmationError: (e: unknown) => void - Called if the request to resend confirmation instructions was successful. The error is the exception that was thrown during the request.
* Props to customize the style of the form component. See [DefaultFormProps](### DefaultFormProps) for details.

### UpdateUserForm
Shows a form to update a users data. If your user only has the profile data that is delivered with EzOnRails, you can use this component to provide 
the ability to update the users profile.

The component accepts the following props:
* usernameToShortErrorText?: string - The error text if the user types a too short username
* usernameToLongErrorText?: string - The error text if the user types a too long username
* usernameRequiredErrorText?: string - The error text if the user does not provide a username
* emailInvalidErrorText?: string - The error text if the user types an invalid email
* emailRequiredErrorText?: string - The error text if the user does not provide an email
* emailToLongErrorText?: string - The error text if the user types a too long email
* passwordToShortErrorText?: string - The error text if the user types a to short password
* passwordsMustMatchErrorText?: string - The error text if the password does not match the password confirmation
* avatarToManyFilesErrorText?: string - Error text for uploading too many files to avatar field
* avatarToLargeErrorText?: string - Error text for uploading a too large file to avatar
* avatarWrongFormatErrorText?: string - Error text for uploading a file having the wrong format
* unconfirmedEmailText?: string - The text shown before the unconfirmed email address, if given
* passwordChangeOptionalText?: string - The text telling the user that the password change field is optional
* labelUsername?: string - Label for the Username field
* labelEmail?: string - Label for the Email field
* labelPassword?: string - Label for the Password field
* labelAvatar?: string - Label for the avatar field
* labelPasswordConfirmation?: string - Label for the PasswordConfirmation field
* minPasswordLength?: number - The minimum length of the password
* minUsernameLength?: number - The minimum length of the username
* maxUsernameLength?: number - The maximum length of the username
* maxEmailLength?: number - The maximum length of the email
* onUserUpdateSuccess: (user: EzOnRailsUser) => void - Called if the user was successfully updated
* onUserUpdateError: (e: unknown) => void - Called if the user update failed. The passed error is the exception.
* avatarMaxSize?: number - The max size of the avatar (in bytes)
* dropzoneContainerClassName?: string - Css class for the container holding the dropzone for the avatar
* hideUsername?: boolean - If set to true, the username field will not be shown and submitted, can be used to only show a set of fields to update
* hideEmail?: boolean - If set to true, the email field will not be shown and submitted, can be used to only show a set of fields to update
* hidePassword?: boolean - If set to true, the password and passwordConfirmation field will not be shown and submitted, can be used to only show a set of fields to update
* hideAvatar?: boolean - If set to true, the avatar field will not be shown and submitted, can be used to only show a set of fields to update
* submitRef?: React.Ref<HTMLButtonElement> - Ref that is assigned to the submit button, can be used to eg. trigger the submit from outside the form
* Props to customize the style of the form component. See [DefaultFormProps](### DefaultFormProps) for details.

### ProtectedPage
Component that shows the content given via its children only if some authInfo is available, hence only if the user is authenticated.

The component accepts the following props:
* children: React.ReactNode - The children that are shown if the page can be accessed
* accessDeniedClassName?: string - Optional class name to style the access denied hint
* accessDeniedText?: string - The text shown if the access was denied. If not given, some default text will be shown.

### ActiveStorageDropzone
This is a dropzone that uploads files into the active storage of your EzOnRails backend application.

The component accepts the following props:
* onChange: (files: RailsFileBlob[]) => void - Called if the uploaded files changes. You can use this value in Form Submits to the backend. If you submit the signedId values of an active storage attachment, they will be attached to the record.
* files: RailsFileBlob[] - The initial files already existing. Your backend should return RailsFileBlob objects for existing attachments. This must include a *signedId*, *path* and *filename*. You can youse the *attachment_blob_json* method in the backend to return those values.
* textDropzone?: string - The text shown in the dropzone component. Use empty string to show no text
* textPastezone?: string - The text shown in the pastezone component
* multiple: boolean - Indicates whether multiple files are allowed.
* maxFiles: number -  If multiple is true, this is the maximum number of allowed files
* onMaxFilesError: (maxFiles: number) => void - Called if the user tried to insert more files than the limit to maxFiles
* maxSize: number - The maximum size of a file allowed in bytes
* onMaxSizeError: (maxSize: number) => void - Called if the user tried to insert files having more than the limited maxSize
* accept?: Accept - Media type to filter allowed file types. An object of key value pairs, where the keys are the mime types.
* onInvalidTypeError: (accept: Accept | undefined) => void - Called if the user tried to upload a file with a type that is not accepted
* pasteZone?: boolean - Indicates if the paste zone should be available
* customIcon?: ReactNode - A custom icon shown in the dropzone
* className?: string; - className that is passed to the container, enables you to restyle the comoponent

### DevelopmentHint
Shows a sticky hint that the app is running in development mode. This can be useful if you have multiple systems looking similar, like staging or test systems.
You can click on the hint to dismiss it for a short time if something is undercovered by the hint.
Note that since environment variables in node are created during compile time, it is not possible for ez-on-rails-react to determine whether the app is currently in development mode.
Hence you have to pass the visible prop, that just indicates whether the component is shown or not.

The component accepts the following props:
* visible: boolean - Indicates whether the hint should be dispalyed
* dismissTimeout - A timeout in milliseconds that indicates after what amount of time the component should be shown again after dismiss

### DefaultFormProps
This is an interface all props of form components are extended with. It enables you to customize the form style.

It accepts the following props:
* containerClassName?: string - The css class for the container holding all form elements
* fieldContainerClassName?: string - The css class for the container holding one form field
* fieldCheckboxContainerClassName?: string - The css class for the container holding one checkbox field
* fieldLabelClassName?: string - The css class for a field label
* fieldInputClassName?: string - The css class for one field input
* fieldCheckboxInputClassName?: string - The css class for one field being a checkbox
* fieldInfoClassName?: string - The css class for some info related to the info field
* fieldErrorClassName?: string - The css class for the container holding the error text for a form field
* submitButtonContainerClassName?: string - The css class for the submit button container
* submitButtonClassName?: string - The css class for the submit button
* labelSubmitButton?: string - The text shown in the submit button

## Hooks
### useEzScaff
Accepts a pluralized model name of a scaffold you generated in the EzOnRails backend and returns methods and values to interact with the models api.

This methods include the default CRUD actions and a search action.
The hook returns the methods you can call to start the requests. 

If a request related to a single record was finished, like update, delete or show, the response will be returned by the hooks *record* result.
If a request related to multiple records was finished, like index or search, the response will be returnd by the hooks *records* result.

The hook accepts a generic type of the model. This model should inherit from the *EzOnRailsRecord* interface.

Hook Parameters:
* pluralModelName: string - The pluralized name of the model. Can be camelcase.

Hook return values:
* record: TModel | null - Result record for requests related to a single record, like show, create or update.
* records: TModel[] | null - Result records for requests related to multiple records, like index or search
* inProgress: boolean - Indicates that some request is currently in Progress
* error: unknown | null - Holds the error of the last request, if exists
* getAll: () => void - Requests the index action of the record to receive all available records
* getOne: (id: number) => void - Requests the show action of the record having the specified id.
* search: (query: SearchFilter | SearchFilterComposition) => void - Requests records matching the specified query.
* create: (properties: TProperties) => void - Requests to create a record having the specified properties. The resulting record having the id is saved in the hooks record result.
* update: (id: number, properties: Partial<TProperties>) => void - Requests to update a record having the specified id by the specified properties.
* remove: (id: number) => void - Requests to delete the record having the specified id.

### useEzApi
Calls an api request to a specified path using the specified HTTP method in the api of the EzOnRails backend.
Passes the specified data as params, if given. Returns the response of the request in the data result.

The hook returns the *callApi* method, that enables you to call the request manually.
To skip the initial request on hook load, pass the option *skipInitialCall*.

If you manually call the api, you can wait for the methods result or use the hooks data result.

The hook accepts to generic type parameters. The first describes the type of the request data, the second describes the expected type of the response data.

Hook Parameters:
* path: string - the relative path to the api to request for, you must not pass the api/ prefix here, it will be appended automatically.
* method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET' - The http method of the request
* data?: TRequest - Parameters for the request body
* options?: - An options object for the hook
  * skipInitialCall?: boolean - If set to true, the initial call of the api on hook call is skipped. In this case you have to call the api manually using the hooks *callApi* method in the result

Hook return values:
* data: TResponse | null - The response data, if available. Null if the response was not finished yet, or got an error.
* error: unknown | null - Not null, if an error occured during request
* inProgress: boolean - Indictaes whether the request is currently in progress
* callApi: (params?: TRequest) => Promise<TResponse | undefined> - Calls the defined request manually

### useEzApiHttpClient
Returns a method to call requests to the api of the EzOnRails backend.
This hook can be used if you want to make custom requests to the api without the need to pass the backendUrl, apiVersion and authInfo.
The method that is returned accepts a path, the http method and parameters. It returns a promise, hence you can wait for the response or 
do it asynchronous.

Hook Parameters:
* basePath?: string - if given, the path specified by the method call will be prefixed with this basePath

Hook return values:
* call: <TRequest, TResponse>(path: string, method: HttpMethod, params?: TRequest) => Promise<TResponse> - Method that calls a request to the api at the path of the EzOnRails application that is defined in the current context. 

### useEzOnRails
Returns the context values and setters of the EzOnRails context provider. Usually you dont need to use this, but if you want to change the context values manually for some reason, you can make use of this hook.

You may also need the context values for additional features like the [SWR Fetcher](### SWR Fetcher).

Hook return values:
* backendUrl: string - The base url of the backend (without /api), used by the http requests to the backend
* authInfo: EzOnRailsAuthInfo | null - The auth info for the http requests, if the user is signed in
* apiVersion: string - The current api version of the ez-on-rails backend, used by the http requests to the backend
* setBackendUrl: (backendUrl: string) => void - Setter for the backendUrl
* setAuthInfo: (authInfo: EzOnRailsAuthInfo | null) => void - Setter for the authInfo
* setApiVersion: (apiVersion: string) => void - Setter for the api version
* setOnUnauthorizedCallback: (callback: OnUnauthorizedCallback) => void - Setter to define a callback that is called if any http request from a hook results in a 401 http status code

## Other features
### SWR Fetcher
If you want to call requests to the EzOnRails Backend using [swr](https://github.com/vercel/swr) you mostly need to pass the correct headers for authorization.
EzOnRails provides a fetcher you can pass to SWR to do a correct request.

You can pass this fetcher to your swr configuration:
```
import { EzOnRailsHttp } from '@d4us1/ez-on-rails-react'

...
<SWRConfig value={{ fetcher: EzOnRailsHttp.swr.fetcher }}>
  ...
</SWRConfig>
...
```

If you now call swr, you must pass additional parameters the fetcher needs for the request.
Note that you must not pass the api/ prefix in the path. It will be appended automatically.

```
import useSWR from 'swr';
import { useEzOnRails } from '@d4us1/ez-on-rails-react'

...
const { backendUrl, authInfo, apiVersion } = useEzOnRails();
const { data: result } = useSWR<ExpectedResultType>([
    backendUrl,
    `path/to/api`,
    'POST',
    { someParam: 'value' },
    authInfo,
    apiVersion
]);
...
```

### ReMaWy uploader
If you use the [ReMaWy](https://github.com/D4uS1/remawy) wysiwyg editor you can enable file uploads by using the ReMaWy uploader provided by EzOnRails.

```
import React, { useMemo } from React;
import { MarkdownEditor } from "@d4us1/remawy";
import { EzOnRailsIntegrations, useEzOnRails } from "@d4us1/ez-on-rails-react";

...

const { backendUrl, authInfo, apiVersion } = useEzOnRails();

const uploader = useMemo(() => {
  if (!authInfo) return undefined;
  
  return new EzOnRailsIntegrations.remawy.uploader(backendUrl, authInfo, apiVersion);
}, [authInfo, backendUrl, apiVersion]);

<MarkdownEditor ...
                uploadInfo={uploader ? {
                    uploader: uploader
                } : undefined}/>

...
```


