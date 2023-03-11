"use strict";var st=Object.create;var ne=Object.defineProperty;var lt=Object.getOwnPropertyDescriptor;var mt=Object.getOwnPropertyNames;var dt=Object.getPrototypeOf,ct=Object.prototype.hasOwnProperty;var ut=(e,t)=>{for(var r in t)ne(e,r,{get:t[r],enumerable:!0})},Pe=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of mt(t))!ct.call(e,a)&&a!==r&&ne(e,a,{get:()=>t[a],enumerable:!(n=lt(t,a))||n.enumerable});return e};var h=(e,t,r)=>(r=e!=null?st(dt(e)):{},Pe(t||!e||!e.__esModule?ne(r,"default",{value:e,enumerable:!0}):r,e)),ft=e=>Pe(ne({},"__esModule",{value:!0}),e);var St={};ut(St,{ActiveStorageDropzone:()=>ce,DevelopmentHint:()=>$e,EzOnRails:()=>Te,EzOnRailsHttp:()=>Ot,EzOnRailsHttpError:()=>K,EzOnRailsIntegrations:()=>It,LoginForm:()=>Le,LostPasswordForm:()=>He,ProtectedPage:()=>Qe,RegistrationForm:()=>Oe,ResendConfirmationForm:()=>De,ResetPasswordForm:()=>Ke,UpdateUserForm:()=>rt,useEzApi:()=>Fe,useEzApiHttpClient:()=>le,useEzOnRails:()=>x,useEzScaff:()=>ze});module.exports=ft(St);var j=h(require("react"));var xe=require("react"),ae=(0,xe.createContext)({apiVersion:"1.0",backendUrl:"http://localhost:3000",authInfo:null,setBackendUrl:e=>{},setAuthInfo:e=>{},setApiVersion:e=>{}});var Te=e=>{let[t,r]=(0,j.useState)(e.backendUrl),[n,a]=(0,j.useState)(e.authInfo||null),[o,l]=(0,j.useState)(e.apiVersion),u=(0,j.useMemo)(()=>{let i={backendUrl:t,authInfo:n||null,apiVersion:o,setBackendUrl:r,setAuthInfo:a,setApiVersion:l};return i.backendUrl.endsWith("/")&&(i.backendUrl=i.backendUrl.slice(0,-1)),i},[t,n,o]);return j.default.createElement(ae.Provider,{value:u},e.children)};var E=h(require("react")),B=h(require("yup")),Ne=require("formik");var Y=require("react");var ve=require("react");var se=require("convert-keys"),fe=e=>e.startsWith("/")?e.slice(1):e,pe=e=>e.endsWith("/")?e.slice(0,-1):e,pt=(e,t)=>`${pe(e)}/${fe(t)}`,gt=(e,t)=>`${pe(e)}/api/${fe(t)}`,bt=e=>(e=e.replace(/[A-Z]/g,(t,r)=>r===0?t.toLowerCase():"_"+t.toLowerCase()),e=e.replace(/::_/g,"/"),e=e.replace(/\/_/g,"/"),e),_e=e=>e&&(0,se.toSnake)(e),we=e=>e&&(0,se.toCamel)(e),Et=e=>Object.keys(e).map(t=>t+"="+e[t]).join("&"),ie=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}/.test(e)?new Date(e):Array.isArray(e)?e.map(t=>ie(t)):(e!==null&&typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=ie(e[t])}),e),oe=e=>e instanceof Date?e.toISOString():Array.isArray(e)?e.map(t=>oe(t)):(e!==null&&typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=oe(e[t])}),e),ht=e=>oe(_e(e)),Ct=e=>!e||typeof e!="object"?e:ie(we(e)),s={cleanupUrl:pe,cleanupPath:fe,toBaseUrl:pt,toApiUrl:gt,toSnakeCase:_e,toSnakeCasePath:bt,toCamelCase:we,toGetParameters:Et,toDates:ie,toDateStrings:oe,toBackendParams:ht,toFrontendParams:Ct};var K=class extends Error{httpStatusCode;constructor(t,r){super(),this.message=t,this.httpStatusCode=r}};var Pt=e=>{if(e)return{uid:e.uid,client:e.client,expiry:e.expiry,"token-type":e.tokenType,"access-token":e.accessToken}},xt=e=>({uid:e.uid,client:e.client,expiry:e.expiry,tokenType:e["token-type"],accessToken:e["access-token"]}),S=(e,t)=>({"Content-Type":"application/json",Accept:"application/json","api-version":t,...Pt(e)}),L=async(e,t,r,n)=>{let a=await fetch(t,{method:e,headers:n,body:r?JSON.stringify(r):null});if(a.status>=400)throw new K(JSON.stringify(a.body),a.status);let o={},l=null;try{a.headers.forEach((u,i)=>{o[i]=u}),l=await a.json()}catch{}return{headers:o,body:l}},c={signUp:async(e,t,r)=>{t=s.toBackendParams(t),await L("POST",s.toBaseUrl(e,"users"),{user:t},S(null,r))},signIn:async(e,t,r)=>{t=s.toBackendParams(t);let n=await L("POST",s.toApiUrl(e,"auth/sign_in"),t,S(null,r));return xt(n.headers)},signOut:async(e,t,r)=>{await L("DELETE",s.toApiUrl(e,"auth/sign_out"),null,S(t,r))},passwordResetInstructions:async(e,t,r)=>{t=s.toBackendParams(t),await L("POST",s.toBaseUrl(e,"users/password"),{user:t},S(null,r))},passwordReset:async(e,t,r)=>{t=s.toBackendParams(t),await L("PUT",s.toBaseUrl(e,"users/password"),{user:t},S(null,r))},getUser:async(e,t,r)=>{let n=await L("GET",s.toApiUrl(e,"users/me"),null,S(t,r));return s.toFrontendParams(n.body)},updateUser:async(e,t,r,n)=>{let a=t.avatar?.signedId,o={...s.toBackendParams(t),avatar:a},l=await L("PATCH",s.toApiUrl(e,"users/me"),{user:o},S(r,n));return s.toFrontendParams(l.body)},confirmationInstructions:async(e,t,r)=>{t=s.toBackendParams(t),await L("POST",s.toBaseUrl(e,"users/confirmation"),{user:t},S(null,r))},confirmation:async(e,t,r)=>{let n=s.toBaseUrl(e,"users/confirmation");t=s.toBackendParams(t),n=`${n}?${s.toGetParameters(t)}`,await L("GET",n,null,S(null,r))},get:async(e,t,r,n=null,a="1.0",o=void 0)=>{let l=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),o&&(r=o(r)),r&&(l=`${l}?${s.toGetParameters(r)}`);let u=await L("GET",l,null,S(n,a));return s.toFrontendParams(u.body)},post:async(e,t,r,n=null,a="1.0",o=void 0)=>{let l=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),o&&(r=o(r));let u=await L("POST",l,r,S(n,a));return s.toFrontendParams(u.body)},patch:async(e,t,r,n=null,a="1.0",o=void 0)=>{let l=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),o&&(r=o(r));let u=await L("PATCH",l,r,S(n,a));return s.toFrontendParams(u.body)},put:async(e,t,r,n=null,a="1.0",o=void 0)=>{let l=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),o&&(r=o(r));let u=await L("PUT",l,r,S(n,a));return s.toFrontendParams(u.body)},delete:async(e,t,r,n=null,a="1.0",o=void 0)=>{let l=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),o&&(r=o(r)),r&&(l=`${l}?${s.toGetParameters(r)}`);let u=await L("DELETE",l,null,S(n,a));return s.toFrontendParams(u.body)},defaultHttpHeader:(e,t)=>S(e,t)};var ye=require("react");var x=()=>(0,ye.useContext)(ae);var le=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=x();return{call:(0,ve.useCallback)(async(o,l,u)=>{let i=e?s.cleanupPath(s.cleanupUrl(e)):null,m=s.cleanupPath(o),g=`${i?i+"/":""}${m}`;switch(l){case"POST":return c.post(t,g,u,r,n);case"PUT":return c.put(t,g,u,r,n);case"PATCH":return c.patch(t,g,u,r,n);case"DELETE":return c.delete(t,g,u,r,n);default:return c.get(t,g,u,r,n)}},[r,n,t,e])}};var Fe=(e,t="GET",r,n)=>{let{backendUrl:a,authInfo:o,apiVersion:l}=x(),[u,i]=(0,Y.useState)(null),[m,g]=(0,Y.useState)(null),[D,w]=(0,Y.useState)(!1),{call:b}=le(),F=(0,Y.useCallback)(async d=>{try{w(!0),g(null),i(null);let f=await b(e,t,d||r);return i(f),w(!1),f}catch(f){g(f),w(!1)}},[]);return(0,Y.useEffect)(()=>{(async()=>n?.skipInitialCall||await F())()},[o,a,l]),{data:u,error:m,inProgress:D,callApi:F}};var k=require("react");var ze=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=x(),[a,o]=(0,k.useState)(null),[l,u]=(0,k.useState)(null),[i,m]=(0,k.useState)(!1),[g,D]=(0,k.useState)(null),w=(0,k.useMemo)(()=>s.toSnakeCasePath(e),[e]),b=(0,k.useCallback)(async C=>{D(null),m(!0);try{let z=await C();return m(!1),z}catch(z){return m(!1),D(z),null}},[]),F=(0,k.useCallback)(()=>b(async()=>{let C=await c.get(t,w,null,r,n);return u(C),C}),[t,r,n,w]),d=(0,k.useCallback)(C=>b(async()=>{let z=await c.get(t,`${w}/${C}`,null,r,n);return o(z),z}),[t,r,n,w]),f=(0,k.useCallback)(C=>b(async()=>{let z=await c.get(t,w,C,r,n);return u(z),z}),[t,r,n,w]),O=(0,k.useCallback)(C=>b(async()=>{let z=await c.post(t,w,C,r,n);return o(z),z}),[t,r,n,w]),U=(0,k.useCallback)((C,z)=>b(async()=>{let Ce=await c.patch(t,`${w}/${C}`,z,r,n);return o(Ce),Ce}),[t,r,n,w]),I=(0,k.useCallback)(C=>b(async()=>{await c.delete(t,`${w}/${C}`,null,r,n),o(null)}),[t,r,n,w]);return{record:a,records:l,inProgress:i,error:g,getAll:F,getOne:d,search:f,create:O,update:U,remove:I}};var v=require("react-bootstrap");var Re="0032f63724a88b833a06903c972a0a897a2b2c931019d6754c6f2e8da8d34d16",Tt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Re)){var e=document.createElement("style");e.id=Re,e.textContent=Tt,document.head.appendChild(e)}})();var y={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Oe=e=>{let{backendUrl:t,apiVersion:r}=x(),[n,a]=(0,E.useState)(!1),o=async i=>{a(!0);try{await c.signUp(t,i,r),e.onRegisterSuccess(i.email),a(!1)}catch(m){e.onRegisterError(m),a(!1)}},l=B.object().shape({username:B.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must not have more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:B.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must have not more than ${e.maxEmailLength||100} characters.`),password:B.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:B.string().oneOf([B.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation must match."),privacyPolicyAccepted:B.boolean().isTrue(e.privacyPolicyNotAcceptedErrorText||"The privacy policy must be accepted.")}).defined();return E.default.createElement(Ne.Formik,{initialValues:{username:"",email:"",password:"",passwordConfirmation:"",privacyPolicyAccepted:!1},validationSchema:l,onSubmit:i=>{o(i)}},({errors:i,handleChange:m,handleSubmit:g})=>E.default.createElement("form",{onSubmit:g,className:e.containerClassName||y.container},E.default.createElement(v.Form.Group,{id:"username-container",className:e.fieldContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Label,{className:e.fieldLabelClassName||y.fieldLabel},e.labelUsername||"Username"),E.default.createElement(v.Form.Control,{id:"username",className:e.fieldInputClassName||y.formField,type:"text",onChange:m,isInvalid:!!i.username}),E.default.createElement(v.Form.Control.Feedback,{className:e.fieldErrorClassName||y.fieldError,type:"invalid"},i.username)),E.default.createElement(v.Form.Group,{id:"email-container",className:e.fieldContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Label,{className:e.fieldLabelClassName||y.fieldLabel},e.labelEmail||"Email address"),E.default.createElement(v.Form.Control,{id:"email",className:e.fieldInputClassName||y.formField,type:"email",onChange:m,isInvalid:!!i.email}),E.default.createElement(v.Form.Control.Feedback,{className:e.fieldErrorClassName||y.fieldError,type:"invalid"},i.email)),E.default.createElement(v.Form.Group,{id:"password-container",className:e.fieldContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Label,{className:e.fieldLabelClassName||y.fieldLabel},e.labelPassword||"Password"),E.default.createElement(v.Form.Control,{id:"password",className:e.fieldInputClassName||y.formField,type:"password",onChange:m,isInvalid:!!i.password}),E.default.createElement(v.Form.Control.Feedback,{className:e.fieldErrorClassName||y.fieldError,type:"invalid"},i.password)),E.default.createElement(v.Form.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Label,{className:e.fieldLabelClassName||y.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),E.default.createElement(v.Form.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||y.formField,type:"password",onChange:m,isInvalid:!!i.passwordConfirmation}),E.default.createElement(v.Form.Control.Feedback,{className:e.fieldErrorClassName||y.fieldError,type:"invalid"},i.passwordConfirmation)),E.default.createElement(v.Form.Group,{id:"privacy-policy-accepted-container",className:e.fieldCheckboxContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Check,{id:"privacyPolicyAccepted",className:e.fieldCheckboxInputClassName||y.formField,type:"checkbox",label:e.labelPrivacyPolicyAccepted||E.default.createElement("span",null,"I have read and accept the"," ",E.default.createElement("a",{href:e.privacyPolicyUrl,target:"_blank",rel:"noopener noreferrer"},"privacy policy")," ","and"," ",E.default.createElement("a",{href:e.generalTermsUrl,target:"_blank",rel:"noopener noreferrer"},"terms and conditions")," ","."),onChange:m,isInvalid:!!i.privacyPolicyAccepted,feedbackType:"invalid",feedback:i.privacyPolicyAccepted})),!n&&E.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},E.default.createElement(v.Button,{className:e.submitButtonClassName||y.submitButton,type:"submit",variant:"primary"},e.labelSubmitButton||"Register"))))};var Se=require("formik"),H=h(require("react-bootstrap/Form")),ke=h(require("react-bootstrap/Button")),R=h(require("react")),Q=h(require("yup"));var Ie="59b12e3cd4e618fc4a2d79c80f0918bcd945e1fc2d744d827194d3c4d91c9022",_t=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ie)){var e=document.createElement("style");e.id=Ie,e.textContent=_t,document.head.appendChild(e)}})();var A={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Le=e=>{let{backendUrl:t,apiVersion:r,setAuthInfo:n}=x(),[a,o]=(0,R.useState)(!1),l=Q.object().shape({email:Q.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required."),password:Q.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"The password is required.")}).defined(),u=async m=>{o(!0);try{let g=await c.signIn(t,m,r);if(!g)throw"No authentication object returned";if(n(g),!e.onLoginSuccess)return;await e.onLoginSuccess(m.email,g,m.stayLoggedIn)}catch(g){e.onLoginError(g),o(!1)}};return R.default.createElement(Se.Formik,{initialValues:{email:"",password:"",stayLoggedIn:!1},onSubmit:m=>{u(m)},validationSchema:l},({errors:m,handleChange:g,handleSubmit:D})=>R.default.createElement("form",{onSubmit:D,className:e.containerClassName||A.container},R.default.createElement(H.default.Group,{id:"email-container",className:e.fieldContainerClassName||A.fieldContainer},R.default.createElement(H.default.Label,{className:e.fieldLabelClassName||A.fieldLabel},e.labelEmail||"Email address"),R.default.createElement(H.default.Control,{id:"email",type:"email",onChange:g,className:e.fieldInputClassName||A.formField,isInvalid:!!m.email}),R.default.createElement(H.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||A.fieldError},m.email)),R.default.createElement(H.default.Group,{id:"password-container",className:e.fieldContainerClassName||A.fieldContainer},R.default.createElement(H.default.Label,{className:e.fieldLabelClassName||A.fieldLabel},e.labelPassword||"Password"),R.default.createElement(H.default.Control,{id:"password",type:"password",onChange:g,className:e.fieldInputClassName||A.formField,isInvalid:!!m.password}),R.default.createElement(H.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||A.fieldError},m.password)),!e.hideStayLoggedIn&&R.default.createElement(H.default.Group,{id:"stay-logged-in-container",className:e.fieldCheckboxContainerClassName||A.fieldContainer},R.default.createElement(H.default.Check,{id:"stayLoggedIn",className:e.fieldCheckboxInputClassName||A.formField,type:"checkbox",label:e.labelStayLoggedIn||"Stay logged in.",onChange:g})),!a&&R.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},R.default.createElement(ke.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||A.submitButton},e.labelSubmitButton||"Login"))))};var M=h(require("react")),me=h(require("yup"));var Ae=require("formik"),ee=h(require("react-bootstrap/Form")),Be=h(require("react-bootstrap/Button"));var Ue="61d38bff320f3d687d7652f7c7abcfe4bda87d10df1ccd59e17bc1d5e0276ac1",wt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ue)){var e=document.createElement("style");e.id=Ue,e.textContent=wt,document.head.appendChild(e)}})();var X={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var He=e=>{let{backendUrl:t,apiVersion:r}=x(),[n,a]=(0,M.useState)(!1),o=me.object().shape({email:me.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required.")}).defined(),l=i=>{a(!0),c.passwordResetInstructions(t,i,r).then(()=>{e.onLostPasswordSuccess(i.email),a(!1)}).catch(m=>{e.onLostPasswordError(m),a(!1)})};return M.default.createElement(Ae.Formik,{initialValues:{email:""},onSubmit:i=>{l(i)},validationSchema:o},({errors:i,handleChange:m,handleSubmit:g})=>M.default.createElement("form",{onSubmit:g,className:e.containerClassName||X.container},M.default.createElement(ee.default.Group,{id:"email-container",className:e.fieldContainerClassName||X.fieldContainer},M.default.createElement(ee.default.Label,{className:e.fieldLabelClassName||X.fieldLabel},e.labelEmail||"Email address"),M.default.createElement(ee.default.Control,{id:"email",type:"email",onChange:m,className:e.fieldInputClassName||X.formField,isInvalid:!!i.email}),M.default.createElement(ee.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||X.fieldError},i.email)),!n&&M.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},M.default.createElement(Be.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||X.submitButton},e.labelSubmitButton||"Submit"))))};var V=h(require("react")),de=h(require("yup"));var Ve=require("formik"),te=h(require("react-bootstrap/Form")),qe=h(require("react-bootstrap/Button"));var Me="01e75d1f35baabcd0c174cd14cfbc3249ab48298c51ea2e404dd7e3b02503228",yt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Me)){var e=document.createElement("style");e.id=Me,e.textContent=yt,document.head.appendChild(e)}})();var Z={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var De=e=>{let{backendUrl:t,apiVersion:r}=x(),[n,a]=(0,V.useState)(!1),o=de.object().shape({email:de.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.")}).defined(),l=i=>{a(!0),c.confirmationInstructions(t,i,r).then(()=>{e.onResendConfirmationSuccess(i.email),a(!1)}).catch(m=>{e.onResendConfirmationError(m),a(!1)})};return V.default.createElement(Ve.Formik,{initialValues:{email:""},onSubmit:i=>{l(i)},validationSchema:o},({errors:i,handleChange:m,handleSubmit:g})=>V.default.createElement("form",{onSubmit:g,className:e.containerClassName||Z.container},V.default.createElement(te.default.Group,{id:"email-container",className:e.fieldContainerClassName||Z.fieldContainer},V.default.createElement(te.default.Label,{className:e.fieldLabelClassName||Z.fieldLabel},e.labelEmail||"Email address"),V.default.createElement(te.default.Control,{id:"email",type:"email",onChange:m,className:e.fieldInputClassName||Z.formField,isInvalid:!!i.email}),V.default.createElement(te.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||Z.fieldError},i.email)),!n&&V.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},V.default.createElement(qe.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||Z.submitButton},e.labelSubmitButton||"Submit"))))};var re=h(require("react"));var Ge="294e18349d6a89f507f41d9b4fd68125af90d308ae3d9a9e94d14d7133343e0e",vt=`._container_q2u8x_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ge)){var e=document.createElement("style");e.id=Ge,e.textContent=vt,document.head.appendChild(e)}})();var ge={container:"_container_q2u8x_1",text:"_text_q2u8x_13"};var $e=e=>{let[t,r]=(0,re.useState)(e.visible),n=()=>{r(!0)};return t?re.default.createElement("div",{onClick:()=>{r(!1),setTimeout(n,e.dismissTimeout||2e4)},className:ge.container},re.default.createElement("span",{className:ge.text},"development")):null};var P=h(require("react")),Ye=h(require("@rails/activestorage")),We=require("react"),W=h(require("react-dropzone"));var je="816c6026260587901fa41bc0f1aae9137df94cd44fd26103646eab29e302b1f1",Ft=`._dropzoneContainer_14oft_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(je)){var e=document.createElement("style");e.id=je,e.textContent=Ft,document.head.appendChild(e)}})();var be={dropzoneContainer:"_dropzoneContainer_14oft_1",pastezoneContainer:"_pastezoneContainer_14oft_19"};var zt=(e,t)=>`rails/active_storage/blobs/${e}/${t}`,ce=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=x(),[a,o]=(0,We.useState)(0),l=P.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",className:"bi bi-cloud-arrow-up",viewBox:"0 0 16 16"},P.default.createElement("path",{fillRule:"evenodd",d:"M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"}),P.default.createElement("path",{d:"M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"})),u=async d=>{await c.delete(t,`active_storage/blobs/${d}`,null,r,n)},i=async(d,f)=>{await u(f);let O=[...e.files];O=O.filter(U=>f!==U.signedId),e.onChange(O),d.stopPropagation()},m=d=>{d.loaded/d.total>=.9999999},g=d=>{if(d.length){if(e.maxFiles){let f=e.maxFiles-(e.files.length+a);if(f<d.length&&e.onMaxFilesError(e.maxFiles),f<=0)return;d=d.slice(0,f)}if(e.maxSize){let f=d.filter(O=>O.size<=e.maxSize);f.length<d.length&&e.onMaxSizeError(e.maxSize),d=f}o(f=>f+d.length),d.forEach(f=>{new Ye.DirectUpload(f,s.toApiUrl(t,"active_storage/blobs/create_direct_upload"),{directUploadWillCreateBlobWithXHR:U=>{let I=c.defaultHttpHeader(r,n);Object.keys(I).forEach(C=>{U.setRequestHeader(C,I[C])}),U.upload.addEventListener("progress",m)}}).create((U,I)=>{if(o(C=>C-1),!U){let C={signedId:I.signed_id};f.type.includes("image")?C.path=zt(I.signed_id,I.filename):C.filename=I.filename;let z=e.files;z.push(C),e.onChange([...z])}})})}},D=d=>{if(!d.clipboardData)return;let f=d.clipboardData.items;if(f===void 0)return;let O=[];for(let U of f){if(e.accept&&!Object.keys(e.accept).some(C=>U.type.match(C)))continue;let I=U.getAsFile();I&&O.push(I)}g(O)},w=e.files.map(d=>P.default.createElement("div",{key:d.signedId,className:"card w-25 animate__animated animate__fadeIn mb-4",style:{flex:"0 0 auto"}},P.default.createElement("div",{className:"card-header p-1"},P.default.createElement("button",{onClick:f=>i(f,d.signedId||""),type:"button",className:"close","aria-label":"Close"},P.default.createElement("span",{"aria-hidden":"true"},"\xD7"))),P.default.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},P.default.createElement("img",{src:s.toBaseUrl(t,d.path||""),alt:d.filename,className:"d-block mw-100 m-auto m-0 rounded p-1"})))),b=[];for(let d=0;d<a;d++)b.push(P.default.createElement("div",{key:d,className:"card w-25 mb-4",style:{flex:"0 0 auto"}},P.default.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},P.default.createElement("div",{className:"p-4 text-center"},P.default.createElement("div",{className:"spinner-border",role:"status"},P.default.createElement("span",{className:"sr-only"},"Loading..."))))));let F=d=>{d.some(f=>f.errors[0].code===W.ErrorCode.TooManyFiles)&&e.onMaxFilesError(e.maxFiles),d.some(f=>f.errors[0].code===W.ErrorCode.FileInvalidType)&&e.onInvalidTypeError(e.accept),d.some(f=>f.errors[0].code===W.ErrorCode.FileTooLarge)&&e.onMaxSizeError(e.maxSize)};return P.default.createElement("div",null,e.pasteZone&&P.default.createElement("input",{type:"text",className:`w-100 p-2 ${be.pastezoneContainer}`,value:e.textPastezone||"Copy and paste some files here",onPaste:D,readOnly:!0}),P.default.createElement(W.default,{onDropAccepted:g,multiple:e.multiple,maxFiles:e.maxFiles,maxSize:e.maxSize,onDropRejected:F,accept:e.accept},({getRootProps:d,getInputProps:f}=(0,W.useDropzone)())=>P.default.createElement("section",null,P.default.createElement("div",{...d(),className:`${be.dropzoneContainer} p-4 ${e.className}`},P.default.createElement("input",{...f()}),P.default.createElement("p",{className:"m-0"},e.textDropzone||"Drag 'n' drop some files here, or click to select files"),w.length>0?P.default.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},w):P.default.createElement("div",{className:"m-0"},e.customIcon||l),b.length>0&&P.default.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},b)))))};var Ze=require("formik"),G=h(require("react-bootstrap/Form")),Je=h(require("react-bootstrap/Button")),N=h(require("react")),J=h(require("yup"));var Xe="a2a912bd9c6bb5a70aaf5cb24d3cd99c7fe0caa360cf333e3e4a2ba5dc956ba5",Rt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Xe)){var e=document.createElement("style");e.id=Xe,e.textContent=Rt,document.head.appendChild(e)}})();var q={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Ke=e=>{let{backendUrl:t,apiVersion:r}=x(),[n,a]=(0,N.useState)(!1),o=J.object().shape({password:J.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:J.string().oneOf([J.ref("password")],e.passwordConfirmationMatchErrorText||"The password and its confirmation must match.")}).defined(),l=(0,N.useCallback)(async i=>{a(!0);try{await c.passwordReset(t,{...i,resetPasswordToken:e.resetPasswordToken},r),await e.onResetPasswordSuccess()}catch(m){e.onResetPasswordError(m),a(!1)}},[e.resetPasswordToken]);return N.default.createElement(Ze.Formik,{initialValues:{password:"",passwordConfirmation:""},onSubmit:i=>{l(i)},validationSchema:o},({errors:i,handleChange:m,handleSubmit:g})=>N.default.createElement("form",{onSubmit:g,className:e.containerClassName||q.container},N.default.createElement(G.default.Group,{id:"password-container",className:e.fieldContainerClassName||q.fieldContainer},N.default.createElement(G.default.Label,{className:e.fieldLabelClassName||q.fieldLabel},e.labelPassword||"Password"),N.default.createElement(G.default.Control,{id:"password",type:"password",onChange:m,className:e.fieldInputClassName||q.formField,isInvalid:!!i.password}),N.default.createElement(G.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||q.fieldError},i.password)),N.default.createElement(G.default.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||q.fieldContainer},N.default.createElement(G.default.Label,{className:e.fieldLabelClassName||q.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),N.default.createElement(G.default.Control,{id:"passwordConfirmation",type:"password",onChange:m,className:e.fieldInputClassName||q.formField,isInvalid:!!i.passwordConfirmation}),N.default.createElement(G.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||q.fieldError},i.passwordConfirmation)),!n&&N.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},N.default.createElement(Je.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||q.submitButton},e.labelSubmitButton||"Submit"))))};var Ee=h(require("react"));var Qe=e=>{let{authInfo:t}=x();return Ee.default.createElement("div",null,t?e.children:Ee.default.createElement("div",{className:e.accessDeniedClassName||"ez-on-rails-protected-page-access-denied-container"},e.accessDeniedText||"You must be signed in to see this content."))};var p=h(require("react")),$=h(require("yup")),tt=require("formik");var _=require("react-bootstrap");var et="a6a20e463a50f0b792c55b5cfe7e12f2f64ff7ba6f3434a2e26b4600deb4d589",Nt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(et)){var e=document.createElement("style");e.id=et,e.textContent=Nt,document.head.appendChild(e)}})();var T={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var rt=e=>{let{authInfo:t,backendUrl:r,apiVersion:n}=x(),[a,o]=(0,p.useState)(!1),[l,u]=(0,p.useState)(null),[i,m]=(0,p.useState)(void 0),g=b=>{u(b),m(b.unconfirmedEmail)};(0,p.useEffect)(()=>{(async()=>t&&g(await c.getUser(r,t,n)))()},[]);let D=async b=>{if(t){o(!0);try{let F=await c.updateUser(r,b,t,n);e.onUserUpdateSuccess(F),g(F),o(!1)}catch(F){e.onUserUpdateError(F),o(!1)}}},w=$.object().shape({username:$.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must have not more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:$.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must not have more than ${e.maxEmailLength||100} characters.`),password:$.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`),passwordConfirmation:$.string().oneOf([$.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation do not match.")}).defined();return t&&p.default.createElement("div",{className:"ez-on-rails-form-outer-container"},l?p.default.createElement(tt.Formik,{initialValues:l,validationSchema:w,enableReinitialize:!0,onSubmit:b=>{D(b)}},({errors:b,values:F,handleChange:d,setFieldValue:f,setFieldError:O,handleSubmit:U})=>p.default.createElement("form",{onSubmit:U,className:e.containerClassName||T.container},!e.hideUsername&&p.default.createElement(_.Form.Group,{id:"username-container",className:e.fieldContainerClassName||T.fieldContainer},p.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelUsername||"Username"),p.default.createElement(_.Form.Control,{id:"username",className:e.fieldInputClassName||T.formField,type:"text",value:F.username,onChange:d,isInvalid:!!b.username}),p.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},b.username)),!e.hideEmail&&p.default.createElement(_.Form.Group,{id:"email-container",className:e.fieldContainerClassName||T.fieldContainer},p.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelEmail||"Email address"),p.default.createElement(_.Form.Control,{id:"email",className:e.fieldInputClassName||T.formField,type:"email",value:F.email,onChange:d,isInvalid:!!b.email}),i&&p.default.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-unconfirmed-email-text"},e.unconfirmedEmailText||"The following email is not yet confirmed: "," ",i),p.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},b.email)),!e.hidePassword&&p.default.createElement(_.Form.Group,{id:"password-container",className:e.fieldContainerClassName||T.fieldContainer},p.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelPassword||"Password"),p.default.createElement(_.Form.Control,{id:"password",className:e.fieldInputClassName||T.formField,type:"password",value:F.password,onChange:d,isInvalid:!!b.password}),p.default.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-password-optional-text"},e.passwordChangeOptionalText||"You must only provide this if you want to change the password."),p.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},b.password)),!e.hidePassword&&p.default.createElement(_.Form.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||T.fieldContainer},p.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),p.default.createElement(_.Form.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||T.formField,type:"password",value:F.passwordConfirmation,onChange:d,isInvalid:!!b.passwordConfirmation}),p.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},b.passwordConfirmation)),!e.hideAvatar&&p.default.createElement(_.Form.Group,{id:"avatar-container",className:e.fieldContainerClassName||T.fieldContainer},p.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelAvatar||"Avatar"),p.default.createElement("div",{className:e.dropzoneContainerClassName||T.formField},p.default.createElement(ce,{onChange:I=>f("avatar",I.length>0?I[0]:null),files:F.avatar?[F.avatar]:[],multiple:!1,maxFiles:1,onMaxFilesError:()=>O("avatar",e.avatarToManyFilesErrorText||"Only one file is allowed"),maxSize:e.avatarMaxSize||5242880,onMaxSizeError:()=>O("avatar",e.avatarToLargeErrorText||`The file must not be larger than ${Math.round((e.avatarMaxSize||5242880)/1048576)} MB.`),onInvalidTypeError:()=>O("avatar",e.avatarWrongFormatErrorText||"Invalid file format.")})),p.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},b.avatar)),!a&&p.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},p.default.createElement(_.Button,{ref:e.submitRef,type:"submit",variant:"primary",className:e.submitButtonClassName||T.submitButton},e.labelSubmitButton||"Submit")))):p.default.createElement("div",null,"Loading..."))};var nt={fetcher:async(e,t,r="get",n=null,a=void 0,o="1.0")=>{switch(r=r.toLowerCase(),r){case"post":return c.post(e,t,n,a,o);case"put":return c.put(e,t,n,a,o);case"patch":return c.patch(e,t,n,a,o);case"delete":return c.delete(e,t,n,a,o);default:return c.get(e,t,n,a,o)}}};var Ot={client:c,swr:nt,utils:s};var at=require("@d4us1/remawy"),it=h(require("@rails/activestorage")),he=class{uploader;authInfo;apiVersion;constructor(t,r,n){this.uploader=t,this.authInfo=r,this.apiVersion=n}directUploadWillCreateBlobWithXHR(t){let r=c.defaultHttpHeader(this.authInfo,this.apiVersion);Object.keys(r).forEach(n=>{t.setRequestHeader(n,r[n])}),t.upload.addEventListener("progress",n=>this.uploader.onDirectUploadProgress(n))}},ue=class extends at.AbstractUploader{baseUrl;authInfo;apiVersion;constructor(t,r,n){super(),t.endsWith("/")||(t=`${t}/`),this.baseUrl=t,this.authInfo=r,this.apiVersion=n}startUpload(t){let r=new he(this,this.authInfo,this.apiVersion);return new it.DirectUpload(t,`${this.baseUrl}api/active_storage/blobs/create_direct_upload`,r).create((a,o)=>{if(a)this.onError(a);else{let l=`${this.baseUrl}rails/active_storage/blobs/${o.signed_id}/${o.filename}`,u={signedId:o.signed_id,fileName:o.filename};this.onFinish(l,t,u)}}),Promise.resolve(void 0)}onDirectUploadProgress(t){this.onProgress(t.loaded/t.total)}};var ot={uploader:ue};var It={remawy:ot};
//# sourceMappingURL=index.js.map
