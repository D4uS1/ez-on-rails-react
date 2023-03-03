"use strict";var ot=Object.create;var ne=Object.defineProperty;var lt=Object.getOwnPropertyDescriptor;var mt=Object.getOwnPropertyNames;var dt=Object.getPrototypeOf,ct=Object.prototype.hasOwnProperty;var ut=(e,t)=>{for(var r in t)ne(e,r,{get:t[r],enumerable:!0})},Ce=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of mt(t))!ct.call(e,a)&&a!==r&&ne(e,a,{get:()=>t[a],enumerable:!(n=lt(t,a))||n.enumerable});return e};var h=(e,t,r)=>(r=e!=null?ot(dt(e)):{},Ce(t||!e||!e.__esModule?ne(r,"default",{value:e,enumerable:!0}):r,e)),ft=e=>Ce(ne({},"__esModule",{value:!0}),e);var St={};ut(St,{ActiveStorageDropzone:()=>ce,DevelopmentHint:()=>Ge,EzOnRails:()=>Pe,EzOnRailsHttp:()=>Ot,EzOnRailsHttpError:()=>K,EzOnRailsIntegrations:()=>It,LoginForm:()=>ke,LostPasswordForm:()=>Be,ProtectedPage:()=>Ke,RegistrationForm:()=>Ne,ResendConfirmationForm:()=>qe,ResetPasswordForm:()=>Je,UpdateUserForm:()=>tt,useEzApi:()=>ve,useEzApiHttpClient:()=>le,useEzOnRails:()=>P,useEzScaff:()=>Fe});module.exports=ft(St);var j=h(require("react"));var xe=require("react"),ae=(0,xe.createContext)({apiVersion:"1.0",backendUrl:"http://localhost:3000",authInfo:null,setBackendUrl:e=>{},setAuthInfo:e=>{},setApiVersion:e=>{}});var Pe=e=>{let[t,r]=(0,j.useState)(e.backendUrl),[n,a]=(0,j.useState)(e.authInfo||null),[s,l]=(0,j.useState)(e.apiVersion),u=(0,j.useMemo)(()=>{let i={backendUrl:t,authInfo:n||null,apiVersion:s,setBackendUrl:r,setAuthInfo:a,setApiVersion:l};return i.backendUrl.endsWith("/")&&(i.backendUrl=i.backendUrl.slice(0,-1)),i},[t,n,s]);return j.default.createElement(ae.Provider,{value:u},e.children)};var E=h(require("react")),B=h(require("yup")),Re=require("formik");var Y=require("react");var ye=require("react");var oe=require("convert-keys"),fe=e=>e.startsWith("/")?e.slice(1):e,pe=e=>e.endsWith("/")?e.slice(0,-1):e,pt=(e,t)=>`${pe(e)}/${fe(t)}`,gt=(e,t)=>`${pe(e)}/api/${fe(t)}`,bt=e=>e.replace(/[A-Z]/g,(t,r)=>r===0?t.toLowerCase():"_"+t.toLowerCase()),Te=e=>e&&(0,oe.toSnake)(e),_e=e=>e&&(0,oe.toCamel)(e),Et=e=>Object.keys(e).map(t=>t+"="+e[t]).join("&"),ie=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}/.test(e)?new Date(e):Array.isArray(e)?e.map(t=>ie(t)):(typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=ie(e[t])}),e),se=e=>e instanceof Date?e.toISOString():Array.isArray(e)?e.map(t=>se(t)):(typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=se(e[t])}),e),ht=e=>se(Te(e)),Ct=e=>!e||typeof e!="object"?e:ie(_e(e)),o={cleanupUrl:pe,cleanupPath:fe,toBaseUrl:pt,toApiUrl:gt,toSnakeCase:Te,toSnakeCaseString:bt,toCamelCase:_e,toGetParameters:Et,toDates:ie,toDateStrings:se,toBackendParams:ht,toFrontendParams:Ct};var K=class extends Error{httpStatusCode;constructor(t,r){super(),this.message=t,this.httpStatusCode=r}};var xt=e=>{if(e)return{uid:e.uid,client:e.client,expiry:e.expiry,"token-type":e.tokenType,"access-token":e.accessToken}},Pt=e=>({uid:e.uid,client:e.client,expiry:e.expiry,tokenType:e["token-type"],accessToken:e["access-token"]}),I=(e,t)=>({"Content-Type":"application/json",Accept:"application/json","api-version":t,...xt(e)}),k=async(e,t,r,n)=>{let a=await fetch(t,{method:e,headers:n,body:r?JSON.stringify(r):null});if(a.status>=400)throw new K(JSON.stringify(a.body),a.status);let s={},l=null;try{a.headers.forEach((u,i)=>{s[i]=u}),l=await a.json()}catch{}return{headers:s,body:l}},c={signUp:async(e,t,r)=>{t=o.toBackendParams(t),await k("POST",o.toBaseUrl(e,"users"),{user:t},I(null,r))},signIn:async(e,t,r)=>{t=o.toBackendParams(t);let n=await k("POST",o.toApiUrl(e,"auth/sign_in"),t,I(null,r));return Pt(n.headers)},signOut:async(e,t,r)=>{await k("DELETE",o.toApiUrl(e,"auth/sign_out"),null,I(t,r))},passwordResetInstructions:async(e,t,r)=>{t=o.toBackendParams(t),await k("POST",o.toBaseUrl(e,"users/password"),{user:t},I(null,r))},passwordReset:async(e,t,r)=>{t=o.toBackendParams(t),await k("PUT",o.toBaseUrl(e,"users/password"),{user:t},I(null,r))},getUser:async(e,t,r)=>{let n=await k("GET",o.toApiUrl(e,"users/me"),null,I(t,r));return o.toFrontendParams(n.body)},updateUser:async(e,t,r,n)=>{let a=t.avatar?.signedId,s={...o.toBackendParams(t),avatar:a},l=await k("PATCH",o.toApiUrl(e,"users/me"),{user:s},I(r,n));return o.toFrontendParams(l.body)},confirmationInstructions:async(e,t,r)=>{t=o.toBackendParams(t),await k("POST",o.toBaseUrl(e,"users/confirmation"),{user:t},I(null,r))},confirmation:async(e,t,r)=>{let n=o.toBaseUrl(e,"users/confirmation");t=o.toBackendParams(t),n=`${n}?${o.toGetParameters(t)}`,await k("GET",n,null,I(null,r))},get:async(e,t,r,n=null,a="1.0",s=void 0)=>{let l=o.toApiUrl(e,t);r&&(r=o.toBackendParams(r)),s&&(r=s(r)),r&&(l=`${l}?${o.toGetParameters(r)}`);let u=await k("GET",l,null,I(n,a));return o.toFrontendParams(u.body)},post:async(e,t,r,n=null,a="1.0",s=void 0)=>{let l=o.toApiUrl(e,t);r&&(r=o.toBackendParams(r)),s&&(r=s(r));let u=await k("POST",l,r,I(n,a));return o.toFrontendParams(u.body)},patch:async(e,t,r,n=null,a="1.0",s=void 0)=>{let l=o.toApiUrl(e,t);r&&(r=o.toBackendParams(r)),s&&(r=s(r));let u=await k("PATCH",l,r,I(n,a));return o.toFrontendParams(u.body)},put:async(e,t,r,n=null,a="1.0",s=void 0)=>{let l=o.toApiUrl(e,t);r&&(r=o.toBackendParams(r)),s&&(r=s(r));let u=await k("PUT",l,r,I(n,a));return o.toFrontendParams(u.body)},delete:async(e,t,r,n=null,a="1.0",s=void 0)=>{let l=o.toApiUrl(e,t);r&&(r=o.toBackendParams(r)),s&&(r=s(r)),r&&(l=`${l}?${o.toGetParameters(r)}`);let u=await k("DELETE",l,null,I(n,a));return o.toFrontendParams(u.body)},defaultHttpHeader:(e,t)=>I(e,t)};var we=require("react");var P=()=>(0,we.useContext)(ae);var le=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=P();return{call:(0,ye.useCallback)(async(s,l,u)=>{let i=e?o.cleanupPath(o.cleanupUrl(e)):null,m=o.cleanupPath(s),g=`${i?i+"/":""}${m}`;switch(l){case"POST":return c.post(t,g,u,r,n);case"PUT":return c.put(t,g,u,r,n);case"PATCH":return c.patch(t,g,u,r,n);case"DELETE":return c.delete(t,g,u,r,n);default:return c.get(t,g,u,r,n)}},[])}};var ve=(e,t="GET",r,n)=>{let{backendUrl:a,authInfo:s,apiVersion:l}=P(),[u,i]=(0,Y.useState)(null),[m,g]=(0,Y.useState)(null),[D,w]=(0,Y.useState)(!1),{call:b}=le(),F=(0,Y.useCallback)(async d=>{try{w(!0),g(null),i(null);let f=await b(e,t,d||r);return i(f),w(!1),f}catch(f){g(f),w(!1)}},[]);return(0,Y.useEffect)(()=>{(async()=>n?.skipInitialCall||await F())()},[s,a,l]),{data:u,error:m,inProgress:D,callApi:F}};var S=require("react");var Fe=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=P(),[a,s]=(0,S.useState)(null),[l,u]=(0,S.useState)(null),[i,m]=(0,S.useState)(!1),[g,D]=(0,S.useState)(null),w=(0,S.useMemo)(()=>o.toSnakeCaseString(e),[e]),b=(0,S.useCallback)(x=>{(async()=>{D(null),m(!0);try{await x(),m(!1)}catch(A){m(!1),D(A)}})()},[]),F=(0,S.useCallback)(()=>{b(async()=>{let x=await c.get(t,w,null,r,n);u(x)})},[t,r,n,w]),d=(0,S.useCallback)(x=>{b(async()=>{let A=await c.get(t,`${w}/${x}`,null,r,n);s(A)})},[t,r,n,w]),f=(0,S.useCallback)(x=>{b(async()=>{let A=await c.get(t,w,x,r,n);u(A)})},[t,r,n,w]),N=(0,S.useCallback)(x=>{b(async()=>{let A=await c.post(t,w,x,r,n);s(A)})},[t,r,n,w]),L=(0,S.useCallback)((x,A)=>{b(async()=>{let st=await c.patch(t,`${w}/${x}`,A,r,n);s(st)})},[t,r,n,w]),O=(0,S.useCallback)(x=>{b(async()=>{await c.delete(t,`${w}/${x}`,null,r,n),s(null)})},[t,r,n,w]);return{record:a,records:l,inProgress:i,error:g,getAll:F,getOne:d,search:f,create:N,update:L,remove:O}};var v=require("react-bootstrap");var ze="e39dde7a9b9effbe9bfcff91f478250e0cd51d5c069e67468eaeb6567126ee58",Tt=`._container_1c59p_1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

._fieldContainer_1c59p_8 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

._fieldLabel_1c59p_15 {
    font-size: large;
}

._formField_1c59p_19 {

}

._fieldError_1c59p_23 {

}

._fieldContainer_1c59p_8 .invalid-feedback {
    font-size: small;
    color: darkred;
}

._submitButton_1c59p_32 {

}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(ze)){var e=document.createElement("style");e.id=ze,e.textContent=Tt,document.head.appendChild(e)}})();var y={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Ne=e=>{let{backendUrl:t,apiVersion:r}=P(),[n,a]=(0,E.useState)(!1),s=async i=>{a(!0);try{await c.signUp(t,i,r),e.onRegisterSuccess(i.email),a(!1)}catch(m){e.onRegisterError(m),a(!1)}},l=B.object().shape({username:B.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must not have more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:B.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must have not more than ${e.maxEmailLength||100} characters.`),password:B.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:B.string().oneOf([B.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation must match."),privacyPolicyAccepted:B.boolean().isTrue(e.privacyPolicyNotAcceptedErrorText||"The privacy policy must be accepted.")}).defined();return E.default.createElement(Re.Formik,{initialValues:{username:"",email:"",password:"",passwordConfirmation:"",privacyPolicyAccepted:!1},validationSchema:l,onSubmit:i=>{s(i)}},({errors:i,handleChange:m,handleSubmit:g})=>E.default.createElement("form",{onSubmit:g,className:e.containerClassName||y.container},E.default.createElement(v.Form.Group,{id:"username-container",className:e.fieldContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Label,{className:e.fieldLabelClassName||y.fieldLabel},e.labelUsername||"Username"),E.default.createElement(v.Form.Control,{id:"username",className:e.fieldInputClassName||y.formField,type:"text",onChange:m,isInvalid:!!i.username}),E.default.createElement(v.Form.Control.Feedback,{className:e.fieldErrorClassName||y.fieldError,type:"invalid"},i.username)),E.default.createElement(v.Form.Group,{id:"email-container",className:e.fieldContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Label,{className:e.fieldLabelClassName||y.fieldLabel},e.labelEmail||"Email address"),E.default.createElement(v.Form.Control,{id:"email",className:e.fieldInputClassName||y.formField,type:"email",onChange:m,isInvalid:!!i.email}),E.default.createElement(v.Form.Control.Feedback,{className:e.fieldErrorClassName||y.fieldError,type:"invalid"},i.email)),E.default.createElement(v.Form.Group,{id:"password-container",className:e.fieldContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Label,{className:e.fieldLabelClassName||y.fieldLabel},e.labelPassword||"Password"),E.default.createElement(v.Form.Control,{id:"password",className:e.fieldInputClassName||y.formField,type:"password",onChange:m,isInvalid:!!i.password}),E.default.createElement(v.Form.Control.Feedback,{className:e.fieldErrorClassName||y.fieldError,type:"invalid"},i.password)),E.default.createElement(v.Form.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Label,{className:e.fieldLabelClassName||y.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),E.default.createElement(v.Form.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||y.formField,type:"password",onChange:m,isInvalid:!!i.passwordConfirmation}),E.default.createElement(v.Form.Control.Feedback,{className:e.fieldErrorClassName||y.fieldError,type:"invalid"},i.passwordConfirmation)),E.default.createElement(v.Form.Group,{id:"privacy-policy-accepted-container",className:e.fieldCheckboxContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Check,{id:"privacyPolicyAccepted",className:e.fieldCheckboxInputClassName||y.formField,type:"checkbox",label:e.labelPrivacyPolicyAccepted||E.default.createElement("span",null,"I have read and accept the"," ",E.default.createElement("a",{href:e.privacyPolicyUrl,target:"_blank",rel:"noopener noreferrer"},"privacy policy")," ","and"," ",E.default.createElement("a",{href:e.generalTermsUrl,target:"_blank",rel:"noopener noreferrer"},"terms and conditions")," ","."),onChange:m,isInvalid:!!i.privacyPolicyAccepted,feedbackType:"invalid",feedback:i.privacyPolicyAccepted})),!n&&E.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},E.default.createElement(v.Button,{className:e.submitButtonClassName||y.submitButton,type:"submit",variant:"primary"},e.labelSubmitButton||"Register"))))};var Ie=require("formik"),H=h(require("react-bootstrap/Form")),Se=h(require("react-bootstrap/Button")),z=h(require("react")),Q=h(require("yup"));var Oe="fd64e759b4678047d5dcc27a1cf26791718c859c910de441ef64a766289ca0c6",_t=`._container_1c59p_1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

._fieldContainer_1c59p_8 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

._fieldLabel_1c59p_15 {
    font-size: large;
}

._formField_1c59p_19 {

}

._fieldError_1c59p_23 {

}

._fieldContainer_1c59p_8 .invalid-feedback {
    font-size: small;
    color: darkred;
}

._submitButton_1c59p_32 {

}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Oe)){var e=document.createElement("style");e.id=Oe,e.textContent=_t,document.head.appendChild(e)}})();var U={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var ke=e=>{let{backendUrl:t,apiVersion:r,setAuthInfo:n}=P(),[a,s]=(0,z.useState)(!1),l=Q.object().shape({email:Q.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required."),password:Q.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"The password is required.")}).defined(),u=async m=>{s(!0);try{let g=await c.signIn(t,m,r);if(!g)throw"No authentication object returned";n(g),await e.onLoginSuccess(m.email,g,m.stayLoggedIn)}catch(g){e.onLoginError(g),s(!1)}};return z.default.createElement(Ie.Formik,{initialValues:{email:"",password:"",stayLoggedIn:!1},onSubmit:m=>{u(m)},validationSchema:l},({errors:m,handleChange:g,handleSubmit:D})=>z.default.createElement("form",{onSubmit:D,className:e.containerClassName||U.container},z.default.createElement(H.default.Group,{id:"email-container",className:e.fieldContainerClassName||U.fieldContainer},z.default.createElement(H.default.Label,{className:e.fieldLabelClassName||U.fieldLabel},e.labelEmail||"Email address"),z.default.createElement(H.default.Control,{id:"email",type:"email",onChange:g,className:e.fieldInputClassName||U.formField,isInvalid:!!m.email}),z.default.createElement(H.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||U.fieldError},m.email)),z.default.createElement(H.default.Group,{id:"password-container",className:e.fieldContainerClassName||U.fieldContainer},z.default.createElement(H.default.Label,{className:e.fieldLabelClassName||U.fieldLabel},e.labelPassword||"Password"),z.default.createElement(H.default.Control,{id:"password",type:"password",onChange:g,className:e.fieldInputClassName||U.formField,isInvalid:!!m.password}),z.default.createElement(H.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||U.fieldError},m.password)),!e.hideStayLoggedIn&&z.default.createElement(H.default.Group,{id:"stay-logged-in-container",className:e.fieldCheckboxContainerClassName||U.fieldContainer},z.default.createElement(H.default.Check,{id:"stayLoggedIn",className:e.fieldCheckboxInputClassName||U.formField,type:"checkbox",label:e.labelStayLoggedIn||"Stay logged in.",onChange:g})),!a&&z.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},z.default.createElement(Se.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||U.submitButton},e.labelSubmitButton||"Login"))))};var M=h(require("react")),me=h(require("yup"));var Ue=require("formik"),ee=h(require("react-bootstrap/Form")),Ae=h(require("react-bootstrap/Button"));var Le="ee976de5bda2c86db4f4670bc31e374af324780bf2714253654d657dcc1c8d39",wt=`._container_1c59p_1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

._fieldContainer_1c59p_8 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

._fieldLabel_1c59p_15 {
    font-size: large;
}

._formField_1c59p_19 {

}

._fieldError_1c59p_23 {

}

._fieldContainer_1c59p_8 .invalid-feedback {
    font-size: small;
    color: darkred;
}

._submitButton_1c59p_32 {

}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Le)){var e=document.createElement("style");e.id=Le,e.textContent=wt,document.head.appendChild(e)}})();var X={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Be=e=>{let{backendUrl:t,apiVersion:r}=P(),[n,a]=(0,M.useState)(!1),s=me.object().shape({email:me.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required.")}).defined(),l=i=>{a(!0),c.passwordResetInstructions(t,i,r).then(()=>{e.onLostPasswordSuccess(i.email),a(!1)}).catch(m=>{e.onLostPasswordError(m),a(!1)})};return M.default.createElement(Ue.Formik,{initialValues:{email:""},onSubmit:i=>{l(i)},validationSchema:s},({errors:i,handleChange:m,handleSubmit:g})=>M.default.createElement("form",{onSubmit:g,className:e.containerClassName||X.container},M.default.createElement(ee.default.Group,{id:"email-container",className:e.fieldContainerClassName||X.fieldContainer},M.default.createElement(ee.default.Label,{className:e.fieldLabelClassName||X.fieldLabel},e.labelEmail||"Email address"),M.default.createElement(ee.default.Control,{id:"email",type:"email",onChange:m,className:e.fieldInputClassName||X.formField,isInvalid:!!i.email}),M.default.createElement(ee.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||X.fieldError},i.email)),!n&&M.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},M.default.createElement(Ae.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||X.submitButton},e.labelSubmitButton||"Submit"))))};var V=h(require("react")),de=h(require("yup"));var Me=require("formik"),te=h(require("react-bootstrap/Form")),Ve=h(require("react-bootstrap/Button"));var He="96bb1c812a094f59f883d336b80259940700b742ee195792e27686700858173c",yt=`._container_1c59p_1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

._fieldContainer_1c59p_8 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

._fieldLabel_1c59p_15 {
    font-size: large;
}

._formField_1c59p_19 {

}

._fieldError_1c59p_23 {

}

._fieldContainer_1c59p_8 .invalid-feedback {
    font-size: small;
    color: darkred;
}

._submitButton_1c59p_32 {

}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(He)){var e=document.createElement("style");e.id=He,e.textContent=yt,document.head.appendChild(e)}})();var Z={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var qe=e=>{let{backendUrl:t,apiVersion:r}=P(),[n,a]=(0,V.useState)(!1),s=de.object().shape({email:de.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.")}).defined(),l=i=>{a(!0),c.confirmationInstructions(t,i,r).then(()=>{e.onResendConfirmationSuccess(i.email),a(!1)}).catch(m=>{e.onResendConfirmationError(m),a(!1)})};return V.default.createElement(Me.Formik,{initialValues:{email:""},onSubmit:i=>{l(i)},validationSchema:s},({errors:i,handleChange:m,handleSubmit:g})=>V.default.createElement("form",{onSubmit:g,className:e.containerClassName||Z.container},V.default.createElement(te.default.Group,{id:"email-container",className:e.fieldContainerClassName||Z.fieldContainer},V.default.createElement(te.default.Label,{className:e.fieldLabelClassName||Z.fieldLabel},e.labelEmail||"Email address"),V.default.createElement(te.default.Control,{id:"email",type:"email",onChange:m,className:e.fieldInputClassName||Z.formField,isInvalid:!!i.email}),V.default.createElement(te.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||Z.fieldError},i.email)),!n&&V.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},V.default.createElement(Ve.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||Z.submitButton},e.labelSubmitButton||"Submit"))))};var re=h(require("react"));var De="1a37a232d6538b666a3098b0793d592912f4208a31298523eb30dc04b75fe58b",vt=`._container_q2u8x_1 {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #28a745;
    height: 1.5em;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
}

._text_q2u8x_13 {
    color: white;
}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(De)){var e=document.createElement("style");e.id=De,e.textContent=vt,document.head.appendChild(e)}})();var ge={container:"_container_q2u8x_1",text:"_text_q2u8x_13"};var Ge=e=>{let[t,r]=(0,re.useState)(e.visible),n=()=>{r(!0)};return t?re.default.createElement("div",{onClick:()=>{r(!1),setTimeout(n,e.dismissTimeout||2e4)},className:ge.container},re.default.createElement("span",{className:ge.text},"development")):null};var C=h(require("react")),je=h(require("@rails/activestorage")),Ye=require("react"),W=h(require("react-dropzone"));var $e="156f18fcf269796d04f9c21656239f1e337ee4d186c6956fbfc3c72425b0e61f",Ft=`._dropzoneContainer_14oft_1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-width: 2px;
  border-radius: 2px;
  border-color: #eeeeee;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  width: 100%;
}

._dropzoneContainer_14oft_1 img {
  max-width: 100%;
  max-height: 100%;
}

._pastezoneContainer_14oft_19 {
  text-align: center;
  border-width: 2px;
  border-radius: 2px;
  border-color: #eeeeee;
  border-style: solid;
  border-bottom: none;
  background-color: #fafafa;
  color: #bdbdbd;
  width: 100%;
}
`;(function(){if(!(typeof document>"u")&&!document.getElementById($e)){var e=document.createElement("style");e.id=$e,e.textContent=Ft,document.head.appendChild(e)}})();var be={dropzoneContainer:"_dropzoneContainer_14oft_1",pastezoneContainer:"_pastezoneContainer_14oft_19"};var zt=(e,t)=>`rails/active_storage/blobs/${e}/${t}`,ce=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=P(),[a,s]=(0,Ye.useState)(0),l=C.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",className:"bi bi-cloud-arrow-up",viewBox:"0 0 16 16"},C.default.createElement("path",{fillRule:"evenodd",d:"M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"}),C.default.createElement("path",{d:"M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"})),u=async d=>{await c.delete(t,`active_storage/blobs/${d}`,null,r,n)},i=async(d,f)=>{await u(f);let N=[...e.files];N=N.filter(L=>f!==L.signedId),e.onChange(N),d.stopPropagation()},m=d=>{d.loaded/d.total>=.9999999},g=d=>{if(d.length){if(e.maxFiles){let f=e.maxFiles-(e.files.length+a);if(f<d.length&&e.onMaxFilesError(e.maxFiles),f<=0)return;d=d.slice(0,f)}if(e.maxSize){let f=d.filter(N=>N.size<=e.maxSize);f.length<d.length&&e.onMaxSizeError(e.maxSize),d=f}s(f=>f+d.length),d.forEach(f=>{new je.DirectUpload(f,o.toApiUrl(t,"active_storage/blobs/create_direct_upload"),{directUploadWillCreateBlobWithXHR:L=>{let O=c.defaultHttpHeader(r,n);Object.keys(O).forEach(x=>{L.setRequestHeader(x,O[x])}),L.upload.addEventListener("progress",m)}}).create((L,O)=>{if(s(x=>x-1),!L){let x={signedId:O.signed_id};f.type.includes("image")?x.path=zt(O.signed_id,O.filename):x.filename=O.filename;let A=e.files;A.push(x),e.onChange([...A])}})})}},D=d=>{if(!d.clipboardData)return;let f=d.clipboardData.items;if(f===void 0)return;let N=[];for(let L of f){if(e.accept&&!Object.keys(e.accept).some(x=>L.type.match(x)))continue;let O=L.getAsFile();O&&N.push(O)}g(N)},w=e.files.map(d=>C.default.createElement("div",{key:d.signedId,className:"card w-25 animate__animated animate__fadeIn mb-4",style:{flex:"0 0 auto"}},C.default.createElement("div",{className:"card-header p-1"},C.default.createElement("button",{onClick:f=>i(f,d.signedId||""),type:"button",className:"close","aria-label":"Close"},C.default.createElement("span",{"aria-hidden":"true"},"\xD7"))),C.default.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},C.default.createElement("img",{src:o.toBaseUrl(t,d.path||""),alt:d.filename,className:"d-block mw-100 m-auto m-0 rounded p-1"})))),b=[];for(let d=0;d<a;d++)b.push(C.default.createElement("div",{key:d,className:"card w-25 mb-4",style:{flex:"0 0 auto"}},C.default.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},C.default.createElement("div",{className:"p-4 text-center"},C.default.createElement("div",{className:"spinner-border",role:"status"},C.default.createElement("span",{className:"sr-only"},"Loading..."))))));let F=d=>{d.some(f=>f.errors[0].code===W.ErrorCode.TooManyFiles)&&e.onMaxFilesError(e.maxFiles),d.some(f=>f.errors[0].code===W.ErrorCode.FileInvalidType)&&e.onInvalidTypeError(e.accept),d.some(f=>f.errors[0].code===W.ErrorCode.FileTooLarge)&&e.onMaxSizeError(e.maxSize)};return C.default.createElement("div",null,e.pasteZone&&C.default.createElement("input",{type:"text",className:`w-100 p-2 ${be.pastezoneContainer}`,value:e.textPastezone||"Copy and paste some files here",onPaste:D,readOnly:!0}),C.default.createElement(W.default,{onDropAccepted:g,multiple:e.multiple,maxFiles:e.maxFiles,maxSize:e.maxSize,onDropRejected:F,accept:e.accept},({getRootProps:d,getInputProps:f}=(0,W.useDropzone)())=>C.default.createElement("section",null,C.default.createElement("div",{...d(),className:`${be.dropzoneContainer} p-4 ${e.className}`},C.default.createElement("input",{...f()}),C.default.createElement("p",{className:"m-0"},e.textDropzone||"Drag 'n' drop some files here, or click to select files"),w.length>0?C.default.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},w):C.default.createElement("div",{className:"m-0"},e.customIcon||l),b.length>0&&C.default.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},b)))))};var Xe=require("formik"),G=h(require("react-bootstrap/Form")),Ze=h(require("react-bootstrap/Button")),R=h(require("react")),J=h(require("yup"));var We="c445340ab02f82ab63458d5b4e52b52ff8c1de9c0953271011c608edd14eb813",Rt=`._container_1c59p_1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

._fieldContainer_1c59p_8 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

._fieldLabel_1c59p_15 {
    font-size: large;
}

._formField_1c59p_19 {

}

._fieldError_1c59p_23 {

}

._fieldContainer_1c59p_8 .invalid-feedback {
    font-size: small;
    color: darkred;
}

._submitButton_1c59p_32 {

}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(We)){var e=document.createElement("style");e.id=We,e.textContent=Rt,document.head.appendChild(e)}})();var q={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Je=e=>{let{backendUrl:t,apiVersion:r}=P(),[n,a]=(0,R.useState)(!1),s=J.object().shape({password:J.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:J.string().oneOf([J.ref("password")],e.passwordConfirmationMatchErrorText||"The password and its confirmation must match.")}).defined(),l=(0,R.useCallback)(async i=>{a(!0);try{await c.passwordReset(t,{...i,resetPasswordToken:e.resetPasswordToken},r),await e.onResetPasswordSuccess()}catch(m){e.onResetPasswordError(m),a(!1)}},[e.resetPasswordToken]);return R.default.createElement(Xe.Formik,{initialValues:{password:"",passwordConfirmation:""},onSubmit:i=>{l(i)},validationSchema:s},({errors:i,handleChange:m,handleSubmit:g})=>R.default.createElement("form",{onSubmit:g,className:e.containerClassName||q.container},R.default.createElement(G.default.Group,{id:"password-container",className:e.fieldContainerClassName||q.fieldContainer},R.default.createElement(G.default.Label,{className:e.fieldLabelClassName||q.fieldLabel},e.labelPassword||"Password"),R.default.createElement(G.default.Control,{id:"password",type:"password",onChange:m,className:e.fieldInputClassName||q.formField,isInvalid:!!i.password}),R.default.createElement(G.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||q.fieldError},i.password)),R.default.createElement(G.default.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||q.fieldContainer},R.default.createElement(G.default.Label,{className:e.fieldLabelClassName||q.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),R.default.createElement(G.default.Control,{id:"passwordConfirmation",type:"password",onChange:m,className:e.fieldInputClassName||q.formField,isInvalid:!!i.passwordConfirmation}),R.default.createElement(G.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||q.fieldError},i.passwordConfirmation)),!n&&R.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},R.default.createElement(Ze.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||q.submitButton},e.labelSubmitButton||"Submit"))))};var Ee=h(require("react"));var Ke=e=>{let{authInfo:t}=P();return Ee.default.createElement("div",null,t?e.children:Ee.default.createElement("div",{className:e.accessDeniedClassName||"ez-on-rails-protected-page-access-denied-container"},e.accessDeniedText||"You must be signed in to see this content."))};var p=h(require("react")),$=h(require("yup")),et=require("formik");var _=require("react-bootstrap");var Qe="6df8057cd074391bbca1f9ef97db5f90994e418d4542bea042883ff8fe4383bc",Nt=`._container_1c59p_1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

._fieldContainer_1c59p_8 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

._fieldLabel_1c59p_15 {
    font-size: large;
}

._formField_1c59p_19 {

}

._fieldError_1c59p_23 {

}

._fieldContainer_1c59p_8 .invalid-feedback {
    font-size: small;
    color: darkred;
}

._submitButton_1c59p_32 {

}
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Qe)){var e=document.createElement("style");e.id=Qe,e.textContent=Nt,document.head.appendChild(e)}})();var T={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var tt=e=>{let{authInfo:t,backendUrl:r,apiVersion:n}=P(),[a,s]=(0,p.useState)(!1),[l,u]=(0,p.useState)(null),[i,m]=(0,p.useState)(void 0),g=b=>{u(b),m(b.unconfirmedEmail)};(0,p.useEffect)(()=>{(async()=>t&&g(await c.getUser(r,t,n)))()},[]);let D=async b=>{if(t){s(!0);try{let F=await c.updateUser(r,b,t,n);e.onUserUpdateSuccess(F),g(F),s(!1)}catch(F){e.onUserUpdateError(F),s(!1)}}},w=$.object().shape({username:$.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must have not more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:$.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must not have more than ${e.maxEmailLength||100} characters.`),password:$.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`),passwordConfirmation:$.string().oneOf([$.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation do not match.")}).defined();return t&&p.default.createElement("div",{className:"ez-on-rails-form-outer-container"},l?p.default.createElement(et.Formik,{initialValues:l,validationSchema:w,enableReinitialize:!0,onSubmit:b=>{D(b)}},({errors:b,values:F,handleChange:d,setFieldValue:f,setFieldError:N,handleSubmit:L})=>p.default.createElement("form",{onSubmit:L,className:e.containerClassName||T.container},!e.hideUsername&&p.default.createElement(_.Form.Group,{id:"username-container",className:e.fieldContainerClassName||T.fieldContainer},p.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelUsername||"Username"),p.default.createElement(_.Form.Control,{id:"username",className:e.fieldInputClassName||T.formField,type:"text",value:F.username,onChange:d,isInvalid:!!b.username}),p.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},b.username)),!e.hideEmail&&p.default.createElement(_.Form.Group,{id:"email-container",className:e.fieldContainerClassName||T.fieldContainer},p.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelEmail||"Email address"),p.default.createElement(_.Form.Control,{id:"email",className:e.fieldInputClassName||T.formField,type:"email",value:F.email,onChange:d,isInvalid:!!b.email}),i&&p.default.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-unconfirmed-email-text"},e.unconfirmedEmailText||"The following email is not yet confirmed: "," ",i),p.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},b.email)),!e.hidePassword&&p.default.createElement(_.Form.Group,{id:"password-container",className:e.fieldContainerClassName||T.fieldContainer},p.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelPassword||"Password"),p.default.createElement(_.Form.Control,{id:"password",className:e.fieldInputClassName||T.formField,type:"password",value:F.password,onChange:d,isInvalid:!!b.password}),p.default.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-password-optional-text"},e.passwordChangeOptionalText||"You must only provide this if you want to change the password."),p.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},b.password)),!e.hidePassword&&p.default.createElement(_.Form.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||T.fieldContainer},p.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),p.default.createElement(_.Form.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||T.formField,type:"password",value:F.passwordConfirmation,onChange:d,isInvalid:!!b.passwordConfirmation}),p.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},b.passwordConfirmation)),!e.hideAvatar&&p.default.createElement(_.Form.Group,{id:"avatar-container",className:e.fieldContainerClassName||T.fieldContainer},p.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelAvatar||"Avatar"),p.default.createElement("div",{className:e.dropzoneContainerClassName||T.formField},p.default.createElement(ce,{onChange:O=>f("avatar",O.length>0?O[0]:null),files:F.avatar?[F.avatar]:[],multiple:!1,maxFiles:1,onMaxFilesError:()=>N("avatar",e.avatarToManyFilesErrorText||"Only one file is allowed"),maxSize:e.avatarMaxSize||5242880,onMaxSizeError:()=>N("avatar",e.avatarToLargeErrorText||`The file must not be larger than ${Math.round((e.avatarMaxSize||5242880)/1048576)} MB.`),onInvalidTypeError:()=>N("avatar",e.avatarWrongFormatErrorText||"Invalid file format.")})),p.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},b.avatar)),!a&&p.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},p.default.createElement(_.Button,{ref:e.submitRef,type:"submit",variant:"primary",className:e.submitButtonClassName||T.submitButton},e.labelSubmitButton||"Submit")))):p.default.createElement("div",null,"Loading..."))};var rt={fetcher:async(e,t,r="get",n=null,a=void 0,s="1.0")=>{switch(r=r.toLowerCase(),r){case"post":return c.post(e,t,n,a,s);case"put":return c.put(e,t,n,a,s);case"patch":return c.patch(e,t,n,a,s);case"delete":return c.delete(e,t,n,a,s);default:return c.get(e,t,n,a,s)}}};var Ot={client:c,swr:rt,utils:o};var nt=require("@d4us1/remawy"),at=h(require("@rails/activestorage")),he=class{uploader;authInfo;apiVersion;constructor(t,r,n){this.uploader=t,this.authInfo=r,this.apiVersion=n}directUploadWillCreateBlobWithXHR(t){let r=c.defaultHttpHeader(this.authInfo,this.apiVersion);Object.keys(r).forEach(n=>{t.setRequestHeader(n,r[n])}),t.upload.addEventListener("progress",n=>this.uploader.onDirectUploadProgress(n))}},ue=class extends nt.AbstractUploader{baseUrl;authInfo;apiVersion;constructor(t,r,n){super(),t.endsWith("/")||(t=`${t}/`),this.baseUrl=t,this.authInfo=r,this.apiVersion=n}startUpload(t){let r=new he(this,this.authInfo,this.apiVersion);return new at.DirectUpload(t,`${this.baseUrl}api/active_storage/blobs/create_direct_upload`,r).create((a,s)=>{if(a)this.onError(a);else{let l=`${this.baseUrl}rails/active_storage/blobs/${s.signed_id}/${s.filename}`,u={signedId:s.signed_id,fileName:s.filename};this.onFinish(l,t,u)}}),Promise.resolve(void 0)}onDirectUploadProgress(t){this.onProgress(t.loaded/t.total)}};var it={uploader:ue};var It={remawy:it};
//# sourceMappingURL=index.js.map
