# Changelogs
## 0.8.1
* useEzApi now calls the request again, if the path changes

## 0.8.2
* onUnauthorizedCallback added to the EzOnRails component
  * Whenever a call in any http calling hook rails with status 401, this callback is called, otherwise the error is thrown hence it can be catched
  * It is also possible to set the callback by using the setter returned by the useEzOnRails hook

## 1.2.0
* Added support for new api key functionality of EzOnRails Backends

## 1.2.1
* Added additionalHttpHeaders that are appended to the headers for each http request using the hooks and http client.
* Replaced img tag for preview in dropzone for non image files with span

# Update Steps
## From 0.8.x to 1.2.0
1.Add the apiKey parameter to calls of the functions of __EzOnRailsHttpClient__ if you have used it manually without the hooks. 
* It can be passed as null value if you don't need it
* It must be added behind the passed authInfo parameter.
* Add it to the following functions:
  * get
  * post
  * patch
  * put
  * delete
  * defaultHttpHeader
```
Example: 
...
await EzOnRailsHttpClient.get<null, TModel>(
    backendUrl,
    'some/action/path',
    null,
    authInfo,
    apiKey, <-- add this parameter
    apiVersion
);
...
```

2.Add the apiKey parameter to  __useSwr__ if you use the __EzOnRailsHttp.swr.fetcher__
* It can be passed as null value if you don't need it
```
Example:
...
const { data: result } = useSWR<TModel[]>([
    backendUrl,
    `some/action`,
    'GET',
    null,
    authInfo,
    apiKey, <-- add this parameter
    apiVersion
]);
...
```


