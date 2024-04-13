# Changelogs
## 0.8.1
* useEzApi now calls the request again, if the path changes

### 0.8.2
* onUnauthorizedCallback added to the EzOnRails component
  * Whenever a call in any http calling hook rails with status 401, this callback is called, otherwise the error is thrown hence it can be catched
  * It is also possible to set the callback by using the setter returned by the useEzOnRails hook
