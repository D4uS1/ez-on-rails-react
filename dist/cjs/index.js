"use strict";var st=Object.create;var ne=Object.defineProperty;var lt=Object.getOwnPropertyDescriptor;var mt=Object.getOwnPropertyNames;var dt=Object.getPrototypeOf,ct=Object.prototype.hasOwnProperty;var ut=(e,t)=>{for(var r in t)ne(e,r,{get:t[r],enumerable:!0})},xe=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of mt(t))!ct.call(e,a)&&a!==r&&ne(e,a,{get:()=>t[a],enumerable:!(n=lt(t,a))||n.enumerable});return e};var h=(e,t,r)=>(r=e!=null?st(dt(e)):{},xe(t||!e||!e.__esModule?ne(r,"default",{value:e,enumerable:!0}):r,e)),ft=e=>xe(ne({},"__esModule",{value:!0}),e);var St={};ut(St,{ActiveStorageDropzone:()=>ce,DevelopmentHint:()=>je,EzOnRails:()=>Te,EzOnRailsHttp:()=>kt,EzOnRailsHttpError:()=>K,EzOnRailsIntegrations:()=>It,LoginForm:()=>Ue,LostPasswordForm:()=>He,ProtectedPage:()=>Qe,RegistrationForm:()=>Oe,ResendConfirmationForm:()=>De,ResetPasswordForm:()=>Ke,UpdateUserForm:()=>rt,useEzApi:()=>ze,useEzApiHttpClient:()=>le,useEzOnRails:()=>T,useEzScaff:()=>Fe});module.exports=ft(St);var G=h(require("react"));var Pe=require("react"),ae=(0,Pe.createContext)({apiVersion:"1.0",backendUrl:"http://localhost:3000",authInfo:null,setBackendUrl:e=>{},setAuthInfo:e=>{},setApiVersion:e=>{},setOnUnauthorizedCallback:e=>{}});var Te=e=>{let[t,r]=(0,G.useState)(e.backendUrl),[n,a]=(0,G.useState)(e.authInfo||null),[o,m]=(0,G.useState)(e.apiVersion),[g,i]=(0,G.useState)(e.onUnauthorizedCallback),l=(0,G.useMemo)(()=>{let p={backendUrl:t,authInfo:n||null,apiVersion:o,setBackendUrl:r,setAuthInfo:a,setApiVersion:m,setOnUnauthorizedCallback:i};return p.backendUrl.endsWith("/")&&(p.backendUrl=p.backendUrl.slice(0,-1)),p},[t,n,o]);return G.default.createElement(ae.Provider,{value:l},e.children)};var E=h(require("react")),H=h(require("yup")),Ne=require("formik");var Y=require("react");var ve=require("react");var se=require("convert-keys"),fe=e=>e.startsWith("/")?e.slice(1):e,pe=e=>e.endsWith("/")?e.slice(0,-1):e,pt=(e,t)=>`${pe(e)}/${fe(t)}`,gt=(e,t)=>`${pe(e)}/api/${fe(t)}`,bt=e=>(e=e.replace(/[A-Z]/g,(t,r)=>r===0?t.toLowerCase():"_"+t.toLowerCase()),e=e.replace(/::_/g,"/"),e=e.replace(/\/_/g,"/"),e),_e=e=>e&&(0,se.toSnake)(e),we=e=>e&&(0,se.toCamel)(e),Et=e=>Object.keys(e).map(t=>t+"="+e[t]).join("&"),ie=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}/.test(e)?new Date(e):Array.isArray(e)?e.map(t=>ie(t)):(e!==null&&typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=ie(e[t])}),e),oe=e=>e instanceof Date?e.toISOString():Array.isArray(e)?e.map(t=>oe(t)):(e!==null&&typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=oe(e[t])}),e),ht=e=>oe(_e(e)),Ct=e=>!e||typeof e!="object"?e:ie(we(e)),xt=e=>e?!!(typeof e=="object"&&e.httpStatusCode):!1,s={cleanupUrl:pe,cleanupPath:fe,toBaseUrl:pt,toApiUrl:gt,toSnakeCase:_e,toSnakeCasePath:bt,toCamelCase:we,toGetParameters:Et,toDates:ie,toDateStrings:oe,toBackendParams:ht,toFrontendParams:Ct,isEzOnRailsHttpError:xt};var K=class extends Error{httpStatusCode;constructor(t,r){super(),this.message=t,this.httpStatusCode=r}};var Pt=e=>{if(e)return{uid:e.uid,client:e.client,expiry:e.expiry,"token-type":e.tokenType,"access-token":e.accessToken}},Tt=e=>({uid:e.uid,client:e.client,expiry:e.expiry,tokenType:e["token-type"],accessToken:e["access-token"]}),S=(e,t)=>({"Content-Type":"application/json",Accept:"application/json","api-version":t,...Pt(e)}),L=async(e,t,r,n)=>{let a=await fetch(t,{method:e,headers:n,body:r?JSON.stringify(r):null});if(a.status>=400)throw new K(JSON.stringify(a.body),a.status);let o={},m=null;try{a.headers.forEach((g,i)=>{o[i]=g}),m=await a.json()}catch{}return{headers:o,body:m}},c={signUp:async(e,t,r)=>{t=s.toBackendParams(t),await L("POST",s.toBaseUrl(e,"users"),{user:t},S(null,r))},signIn:async(e,t,r)=>{t=s.toBackendParams(t);let n=await L("POST",s.toApiUrl(e,"auth/sign_in"),t,S(null,r));return Tt(n.headers)},signOut:async(e,t,r)=>{await L("DELETE",s.toApiUrl(e,"auth/sign_out"),null,S(t,r))},passwordResetInstructions:async(e,t,r)=>{t=s.toBackendParams(t),await L("POST",s.toBaseUrl(e,"users/password"),{user:t},S(null,r))},passwordReset:async(e,t,r)=>{t=s.toBackendParams(t),await L("PUT",s.toBaseUrl(e,"users/password"),{user:t},S(null,r))},getUser:async(e,t,r)=>{let n=await L("GET",s.toApiUrl(e,"users/me"),null,S(t,r));return s.toFrontendParams(n.body)},updateUser:async(e,t,r,n)=>{let a=t.avatar?.signedId,o={...s.toBackendParams(t),avatar:a},m=await L("PATCH",s.toApiUrl(e,"users/me"),{user:o},S(r,n));return s.toFrontendParams(m.body)},confirmationInstructions:async(e,t,r)=>{t=s.toBackendParams(t),await L("POST",s.toBaseUrl(e,"users/confirmation"),{user:t},S(null,r))},confirmation:async(e,t,r)=>{let n=s.toBaseUrl(e,"users/confirmation");t=s.toBackendParams(t),n=`${n}?${s.toGetParameters(t)}`,await L("GET",n,null,S(null,r))},get:async(e,t,r,n=null,a="1.0",o=void 0)=>{let m=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),o&&(r=o(r)),r&&(m=`${m}?${s.toGetParameters(r)}`);let g=await L("GET",m,null,S(n,a));return s.toFrontendParams(g.body)},post:async(e,t,r,n=null,a="1.0",o=void 0)=>{let m=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),o&&(r=o(r));let g=await L("POST",m,r,S(n,a));return s.toFrontendParams(g.body)},patch:async(e,t,r,n=null,a="1.0",o=void 0)=>{let m=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),o&&(r=o(r));let g=await L("PATCH",m,r,S(n,a));return s.toFrontendParams(g.body)},put:async(e,t,r,n=null,a="1.0",o=void 0)=>{let m=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),o&&(r=o(r));let g=await L("PUT",m,r,S(n,a));return s.toFrontendParams(g.body)},delete:async(e,t,r,n=null,a="1.0",o=void 0)=>{let m=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),o&&(r=o(r)),r&&(m=`${m}?${s.toGetParameters(r)}`);let g=await L("DELETE",m,null,S(n,a));return s.toFrontendParams(g.body)},defaultHttpHeader:(e,t)=>S(e,t)};var ye=require("react");var T=()=>(0,ye.useContext)(ae);var le=e=>{let{backendUrl:t,authInfo:r,apiVersion:n,onUnauthorizedCallback:a}=T();return{call:(0,ve.useCallback)(async(m,g,i)=>{let l=e?s.cleanupPath(s.cleanupUrl(e)):null,p=s.cleanupPath(m),O=`${l?l+"/":""}${p}`;try{switch(g){case"POST":return c.post(t,O,i,r,n);case"PUT":return c.put(t,O,i,r,n);case"PATCH":return c.patch(t,O,i,r,n);case"DELETE":return c.delete(t,O,i,r,n);default:return c.get(t,O,i,r,n)}}catch(C){throw!s.isEzOnRailsHttpError(C)||C.httpStatusCode!==401||!a||a(),C}},[r,n,t,e,a])}};var ze=(e,t="GET",r,n)=>{let{backendUrl:a,authInfo:o,apiVersion:m}=T(),[g,i]=(0,Y.useState)(null),[l,p]=(0,Y.useState)(null),[O,C]=(0,Y.useState)(!1),{call:b}=le(),z=(0,Y.useCallback)(async d=>{try{C(!0),p(null),i(null);let u=await b(e,t,d||r);return i(u),C(!1),u}catch(u){p(u),C(!1)}},[e]);return(0,Y.useEffect)(()=>{(async()=>n?.skipInitialCall||await z())()},[o,a,m,e]),{data:g,error:l,inProgress:O,callApi:z}};var U=require("react");var Fe=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=T(),[a,o]=(0,U.useState)(null),[m,g]=(0,U.useState)(null),[i,l]=(0,U.useState)(!1),[p,O]=(0,U.useState)(null),C=(0,U.useMemo)(()=>s.toSnakeCasePath(e),[e]),b=(0,U.useCallback)(async x=>{O(null),l(!0);try{let F=await x();return l(!1),F}catch(F){return l(!1),O(F),null}},[]),z=(0,U.useCallback)(()=>b(async()=>{let x=await c.get(t,C,null,r,n);return g(x),x}),[t,r,n,C]),d=(0,U.useCallback)(x=>b(async()=>{let F=await c.get(t,`${C}/${x}`,null,r,n);return o(F),F}),[t,r,n,C]),u=(0,U.useCallback)(x=>b(async()=>{let F=await c.get(t,C,x,r,n);return g(F),F}),[t,r,n,C]),k=(0,U.useCallback)(x=>b(async()=>{let F=await c.post(t,C,x,r,n);return o(F),F}),[t,r,n,C]),A=(0,U.useCallback)((x,F)=>b(async()=>{let Ce=await c.patch(t,`${C}/${x}`,F,r,n);return o(Ce),Ce}),[t,r,n,C]),I=(0,U.useCallback)(x=>b(async()=>{await c.delete(t,`${C}/${x}`,null,r,n),o(null)}),[t,r,n,C]);return{record:a,records:m,inProgress:i,error:p,getAll:z,getOne:d,search:u,create:k,update:A,remove:I}};var v=require("react-bootstrap");var Re="3b24ec1455a1c6b9b66613d607aefe2a5eedda38d3540c763b31003f03ab4414",_t=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Re)){var e=document.createElement("style");e.id=Re,e.textContent=_t,document.head.appendChild(e)}})();var y={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Oe=e=>{let{backendUrl:t,apiVersion:r}=T(),[n,a]=(0,E.useState)(!1),o=async i=>{a(!0);try{await c.signUp(t,i,r),e.onRegisterSuccess(i.email),a(!1)}catch(l){e.onRegisterError(l),a(!1)}},m=H.object().shape({username:H.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must not have more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:H.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must have not more than ${e.maxEmailLength||100} characters.`),password:H.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:H.string().oneOf([H.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation must match."),privacyPolicyAccepted:H.boolean().isTrue(e.privacyPolicyNotAcceptedErrorText||"The privacy policy must be accepted.")}).defined();return E.default.createElement(Ne.Formik,{initialValues:{username:"",email:"",password:"",passwordConfirmation:"",privacyPolicyAccepted:!1},validationSchema:m,onSubmit:i=>{o(i)}},({errors:i,handleChange:l,handleSubmit:p})=>E.default.createElement("form",{onSubmit:p,className:e.containerClassName||y.container},E.default.createElement(v.Form.Group,{id:"username-container",className:e.fieldContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Label,{className:e.fieldLabelClassName||y.fieldLabel},e.labelUsername||"Username"),E.default.createElement(v.Form.Control,{id:"username",className:e.fieldInputClassName||y.formField,type:"text",onChange:l,isInvalid:!!i.username}),E.default.createElement(v.Form.Control.Feedback,{className:e.fieldErrorClassName||y.fieldError,type:"invalid"},i.username)),E.default.createElement(v.Form.Group,{id:"email-container",className:e.fieldContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Label,{className:e.fieldLabelClassName||y.fieldLabel},e.labelEmail||"Email address"),E.default.createElement(v.Form.Control,{id:"email",className:e.fieldInputClassName||y.formField,type:"email",onChange:l,isInvalid:!!i.email}),E.default.createElement(v.Form.Control.Feedback,{className:e.fieldErrorClassName||y.fieldError,type:"invalid"},i.email)),E.default.createElement(v.Form.Group,{id:"password-container",className:e.fieldContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Label,{className:e.fieldLabelClassName||y.fieldLabel},e.labelPassword||"Password"),E.default.createElement(v.Form.Control,{id:"password",className:e.fieldInputClassName||y.formField,type:"password",onChange:l,isInvalid:!!i.password}),E.default.createElement(v.Form.Control.Feedback,{className:e.fieldErrorClassName||y.fieldError,type:"invalid"},i.password)),E.default.createElement(v.Form.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Label,{className:e.fieldLabelClassName||y.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),E.default.createElement(v.Form.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||y.formField,type:"password",onChange:l,isInvalid:!!i.passwordConfirmation}),E.default.createElement(v.Form.Control.Feedback,{className:e.fieldErrorClassName||y.fieldError,type:"invalid"},i.passwordConfirmation)),E.default.createElement(v.Form.Group,{id:"privacy-policy-accepted-container",className:e.fieldCheckboxContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Check,{id:"privacyPolicyAccepted",className:e.fieldCheckboxInputClassName||y.formField,type:"checkbox",label:e.labelPrivacyPolicyAccepted||E.default.createElement("span",null,"I have read and accept the"," ",E.default.createElement("a",{href:e.privacyPolicyUrl,target:"_blank",rel:"noopener noreferrer"},"privacy policy")," ","and"," ",E.default.createElement("a",{href:e.generalTermsUrl,target:"_blank",rel:"noopener noreferrer"},"terms and conditions")," ","."),onChange:l,isInvalid:!!i.privacyPolicyAccepted,feedbackType:"invalid",feedback:i.privacyPolicyAccepted})),!n&&E.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},E.default.createElement(v.Button,{className:e.submitButtonClassName||y.submitButton,type:"submit",variant:"primary"},e.labelSubmitButton||"Register"))))};var Ie=require("formik"),M=h(require("react-bootstrap/Form")),Se=h(require("react-bootstrap/Button")),R=h(require("react")),Q=h(require("yup"));var ke="2c3ee8b53fe5234e7f3c7fc65ebae08368b3f1cda7351508520dc7b40ac92694",wt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(ke)){var e=document.createElement("style");e.id=ke,e.textContent=wt,document.head.appendChild(e)}})();var B={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Ue=e=>{let{backendUrl:t,apiVersion:r,setAuthInfo:n}=T(),[a,o]=(0,R.useState)(!1),m=Q.object().shape({email:Q.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required."),password:Q.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"The password is required.")}).defined(),g=async l=>{o(!0);try{let p=await c.signIn(t,l,r);if(!p)throw"No authentication object returned";if(n(p),!e.onLoginSuccess)return;await e.onLoginSuccess(l.email,p,l.stayLoggedIn)}catch(p){e.onLoginError(p),o(!1)}};return R.default.createElement(Ie.Formik,{initialValues:{email:"",password:"",stayLoggedIn:!1},onSubmit:l=>{g(l)},validationSchema:m},({errors:l,handleChange:p,handleSubmit:O})=>R.default.createElement("form",{onSubmit:O,className:e.containerClassName||B.container},R.default.createElement(M.default.Group,{id:"email-container",className:e.fieldContainerClassName||B.fieldContainer},R.default.createElement(M.default.Label,{className:e.fieldLabelClassName||B.fieldLabel},e.labelEmail||"Email address"),R.default.createElement(M.default.Control,{id:"email",type:"email",onChange:p,className:e.fieldInputClassName||B.formField,isInvalid:!!l.email}),R.default.createElement(M.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||B.fieldError},l.email)),R.default.createElement(M.default.Group,{id:"password-container",className:e.fieldContainerClassName||B.fieldContainer},R.default.createElement(M.default.Label,{className:e.fieldLabelClassName||B.fieldLabel},e.labelPassword||"Password"),R.default.createElement(M.default.Control,{id:"password",type:"password",onChange:p,className:e.fieldInputClassName||B.formField,isInvalid:!!l.password}),R.default.createElement(M.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||B.fieldError},l.password)),!e.hideStayLoggedIn&&R.default.createElement(M.default.Group,{id:"stay-logged-in-container",className:e.fieldCheckboxContainerClassName||B.fieldContainer},R.default.createElement(M.default.Check,{id:"stayLoggedIn",className:e.fieldCheckboxInputClassName||B.formField,type:"checkbox",label:e.labelStayLoggedIn||"Stay logged in.",onChange:p})),!a&&R.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},R.default.createElement(Se.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||B.submitButton},e.labelSubmitButton||"Login"))))};var V=h(require("react")),me=h(require("yup"));var Ae=require("formik"),ee=h(require("react-bootstrap/Form")),Be=h(require("react-bootstrap/Button"));var Le="8a2305251feb8dba8478bd90d4aceb776083a8b93c5b9d48d6ece853b17ccf91",yt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Le)){var e=document.createElement("style");e.id=Le,e.textContent=yt,document.head.appendChild(e)}})();var X={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var He=e=>{let{backendUrl:t,apiVersion:r}=T(),[n,a]=(0,V.useState)(!1),o=me.object().shape({email:me.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required.")}).defined(),m=i=>{a(!0),c.passwordResetInstructions(t,i,r).then(()=>{e.onLostPasswordSuccess(i.email),a(!1)}).catch(l=>{e.onLostPasswordError(l),a(!1)})};return V.default.createElement(Ae.Formik,{initialValues:{email:""},onSubmit:i=>{m(i)},validationSchema:o},({errors:i,handleChange:l,handleSubmit:p})=>V.default.createElement("form",{onSubmit:p,className:e.containerClassName||X.container},V.default.createElement(ee.default.Group,{id:"email-container",className:e.fieldContainerClassName||X.fieldContainer},V.default.createElement(ee.default.Label,{className:e.fieldLabelClassName||X.fieldLabel},e.labelEmail||"Email address"),V.default.createElement(ee.default.Control,{id:"email",type:"email",onChange:l,className:e.fieldInputClassName||X.formField,isInvalid:!!i.email}),V.default.createElement(ee.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||X.fieldError},i.email)),!n&&V.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},V.default.createElement(Be.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||X.submitButton},e.labelSubmitButton||"Submit"))))};var q=h(require("react")),de=h(require("yup"));var Ve=require("formik"),te=h(require("react-bootstrap/Form")),qe=h(require("react-bootstrap/Button"));var Me="a7a72e7de50f7fb0d5ca1e8e9b1bb32ad635ba87a01254a45f81139a4b638a2c",vt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Me)){var e=document.createElement("style");e.id=Me,e.textContent=vt,document.head.appendChild(e)}})();var Z={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var De=e=>{let{backendUrl:t,apiVersion:r}=T(),[n,a]=(0,q.useState)(!1),o=de.object().shape({email:de.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.")}).defined(),m=i=>{a(!0),c.confirmationInstructions(t,i,r).then(()=>{e.onResendConfirmationSuccess(i.email),a(!1)}).catch(l=>{e.onResendConfirmationError(l),a(!1)})};return q.default.createElement(Ve.Formik,{initialValues:{email:""},onSubmit:i=>{m(i)},validationSchema:o},({errors:i,handleChange:l,handleSubmit:p})=>q.default.createElement("form",{onSubmit:p,className:e.containerClassName||Z.container},q.default.createElement(te.default.Group,{id:"email-container",className:e.fieldContainerClassName||Z.fieldContainer},q.default.createElement(te.default.Label,{className:e.fieldLabelClassName||Z.fieldLabel},e.labelEmail||"Email address"),q.default.createElement(te.default.Control,{id:"email",type:"email",onChange:l,className:e.fieldInputClassName||Z.formField,isInvalid:!!i.email}),q.default.createElement(te.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||Z.fieldError},i.email)),!n&&q.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},q.default.createElement(qe.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||Z.submitButton},e.labelSubmitButton||"Submit"))))};var re=h(require("react"));var Ge="1a37a232d6538b666a3098b0793d592912f4208a31298523eb30dc04b75fe58b",zt=`._container_q2u8x_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ge)){var e=document.createElement("style");e.id=Ge,e.textContent=zt,document.head.appendChild(e)}})();var ge={container:"_container_q2u8x_1",text:"_text_q2u8x_13"};var je=e=>{let[t,r]=(0,re.useState)(e.visible),n=()=>{r(!0)};return t?re.default.createElement("div",{onClick:()=>{r(!1),setTimeout(n,e.dismissTimeout||2e4)},className:ge.container},re.default.createElement("span",{className:ge.text},"development")):null};var P=h(require("react")),Ye=h(require("@rails/activestorage")),We=require("react"),W=h(require("react-dropzone"));var $e="257630eca6a3db5ac1f345639fdf03bb30897c494d2583e7ac4165a93a5df40e",Ft=`._dropzoneContainer_14oft_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById($e)){var e=document.createElement("style");e.id=$e,e.textContent=Ft,document.head.appendChild(e)}})();var be={dropzoneContainer:"_dropzoneContainer_14oft_1",pastezoneContainer:"_pastezoneContainer_14oft_19"};var Rt=(e,t)=>`rails/active_storage/blobs/${e}/${t}`,ce=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=T(),[a,o]=(0,We.useState)(0),m=P.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",className:"bi bi-cloud-arrow-up",viewBox:"0 0 16 16"},P.default.createElement("path",{fillRule:"evenodd",d:"M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"}),P.default.createElement("path",{d:"M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"})),g=async d=>{await c.delete(t,`active_storage/blobs/${d}`,null,r,n)},i=async(d,u)=>{await g(u);let k=[...e.files];k=k.filter(A=>u!==A.signedId),e.onChange(k),d.stopPropagation()},l=d=>{d.loaded/d.total>=.9999999},p=d=>{if(d.length){if(e.maxFiles){let u=e.maxFiles-(e.files.length+a);if(u<d.length&&e.onMaxFilesError(e.maxFiles),u<=0)return;d=d.slice(0,u)}if(e.maxSize){let u=d.filter(k=>k.size<=e.maxSize);u.length<d.length&&e.onMaxSizeError(e.maxSize),d=u}o(u=>u+d.length),d.forEach(u=>{new Ye.DirectUpload(u,s.toApiUrl(t,"active_storage/blobs/create_direct_upload"),{directUploadWillCreateBlobWithXHR:A=>{let I=c.defaultHttpHeader(r,n);Object.keys(I).forEach(x=>{A.setRequestHeader(x,I[x])}),A.upload.addEventListener("progress",l)}}).create((A,I)=>{if(o(x=>x-1),!A){let x={signedId:I.signed_id};u.type.includes("image")?x.path=Rt(I.signed_id,I.filename):x.filename=I.filename;let F=e.files;F.push(x),e.onChange([...F])}})})}},O=d=>{if(!d.clipboardData)return;let u=d.clipboardData.items;if(u===void 0)return;let k=[];for(let A of u){if(e.accept&&!Object.keys(e.accept).some(x=>A.type.match(x)))continue;let I=A.getAsFile();I&&k.push(I)}p(k)},C=e.files.map(d=>P.default.createElement("div",{key:d.signedId,className:"card w-25 animate__animated animate__fadeIn mb-4",style:{flex:"0 0 auto"}},P.default.createElement("div",{className:"card-header p-1"},P.default.createElement("button",{onClick:u=>i(u,d.signedId||""),type:"button",className:"close","aria-label":"Close"},P.default.createElement("span",{"aria-hidden":"true"},"\xD7"))),P.default.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},P.default.createElement("img",{src:s.toBaseUrl(t,d.path||""),alt:d.filename,className:"d-block mw-100 m-auto m-0 rounded p-1"})))),b=[];for(let d=0;d<a;d++)b.push(P.default.createElement("div",{key:d,className:"card w-25 mb-4",style:{flex:"0 0 auto"}},P.default.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},P.default.createElement("div",{className:"p-4 text-center"},P.default.createElement("div",{className:"spinner-border",role:"status"},P.default.createElement("span",{className:"sr-only"},"Loading..."))))));let z=d=>{d.some(u=>u.errors[0].code===W.ErrorCode.TooManyFiles)&&e.onMaxFilesError(e.maxFiles),d.some(u=>u.errors[0].code===W.ErrorCode.FileInvalidType)&&e.onInvalidTypeError(e.accept),d.some(u=>u.errors[0].code===W.ErrorCode.FileTooLarge)&&e.onMaxSizeError(e.maxSize)};return P.default.createElement("div",null,e.pasteZone&&P.default.createElement("input",{type:"text",className:`w-100 p-2 ${be.pastezoneContainer}`,value:e.textPastezone||"Copy and paste some files here",onPaste:O,readOnly:!0}),P.default.createElement(W.default,{onDropAccepted:p,multiple:e.multiple,maxFiles:e.maxFiles,maxSize:e.maxSize,onDropRejected:z,accept:e.accept},({getRootProps:d,getInputProps:u}=(0,W.useDropzone)())=>P.default.createElement("section",null,P.default.createElement("div",{...d(),className:`${be.dropzoneContainer} p-4 ${e.className}`},P.default.createElement("input",{...u()}),P.default.createElement("p",{className:"m-0"},e.textDropzone||"Drag 'n' drop some files here, or click to select files"),C.length>0?P.default.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},C):P.default.createElement("div",{className:"m-0"},e.customIcon||m),b.length>0&&P.default.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},b)))))};var Ze=require("formik"),j=h(require("react-bootstrap/Form")),Je=h(require("react-bootstrap/Button")),N=h(require("react")),J=h(require("yup"));var Xe="1dbcd37a5c1959b2908653f7c30e3b962236eb08c067b0a4a77b87e7cea94a53",Nt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Xe)){var e=document.createElement("style");e.id=Xe,e.textContent=Nt,document.head.appendChild(e)}})();var D={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Ke=e=>{let{backendUrl:t,apiVersion:r}=T(),[n,a]=(0,N.useState)(!1),o=J.object().shape({password:J.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:J.string().oneOf([J.ref("password")],e.passwordConfirmationMatchErrorText||"The password and its confirmation must match.")}).defined(),m=(0,N.useCallback)(async i=>{a(!0);try{await c.passwordReset(t,{...i,resetPasswordToken:e.resetPasswordToken},r),await e.onResetPasswordSuccess()}catch(l){e.onResetPasswordError(l),a(!1)}},[e.resetPasswordToken]);return N.default.createElement(Ze.Formik,{initialValues:{password:"",passwordConfirmation:""},onSubmit:i=>{m(i)},validationSchema:o},({errors:i,handleChange:l,handleSubmit:p})=>N.default.createElement("form",{onSubmit:p,className:e.containerClassName||D.container},N.default.createElement(j.default.Group,{id:"password-container",className:e.fieldContainerClassName||D.fieldContainer},N.default.createElement(j.default.Label,{className:e.fieldLabelClassName||D.fieldLabel},e.labelPassword||"Password"),N.default.createElement(j.default.Control,{id:"password",type:"password",onChange:l,className:e.fieldInputClassName||D.formField,isInvalid:!!i.password}),N.default.createElement(j.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||D.fieldError},i.password)),N.default.createElement(j.default.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||D.fieldContainer},N.default.createElement(j.default.Label,{className:e.fieldLabelClassName||D.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),N.default.createElement(j.default.Control,{id:"passwordConfirmation",type:"password",onChange:l,className:e.fieldInputClassName||D.formField,isInvalid:!!i.passwordConfirmation}),N.default.createElement(j.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||D.fieldError},i.passwordConfirmation)),!n&&N.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},N.default.createElement(Je.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||D.submitButton},e.labelSubmitButton||"Submit"))))};var Ee=h(require("react"));var Qe=e=>{let{authInfo:t}=T();return Ee.default.createElement("div",null,t?e.children:Ee.default.createElement("div",{className:e.accessDeniedClassName||"ez-on-rails-protected-page-access-denied-container"},e.accessDeniedText||"You must be signed in to see this content."))};var f=h(require("react")),$=h(require("yup")),tt=require("formik");var w=require("react-bootstrap");var et="4498873a6274472d2fe05aac733813dc2a4fb04f721ba54cabdbd09389b16ae1",Ot=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(et)){var e=document.createElement("style");e.id=et,e.textContent=Ot,document.head.appendChild(e)}})();var _={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var rt=e=>{let{authInfo:t,backendUrl:r,apiVersion:n}=T(),[a,o]=(0,f.useState)(!1),[m,g]=(0,f.useState)(null),[i,l]=(0,f.useState)(void 0),p=b=>{g(b),l(b.unconfirmedEmail)};(0,f.useEffect)(()=>{(async()=>t&&p(await c.getUser(r,t,n)))()},[]);let O=async b=>{if(t){o(!0);try{let z=await c.updateUser(r,b,t,n);e.onUserUpdateSuccess(z),p(z),o(!1)}catch(z){e.onUserUpdateError(z),o(!1)}}},C=$.object().shape({username:$.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must have not more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:$.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must not have more than ${e.maxEmailLength||100} characters.`),password:$.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`),passwordConfirmation:$.string().oneOf([$.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation do not match.")}).defined();return t&&f.default.createElement("div",{className:"ez-on-rails-form-outer-container"},m?f.default.createElement(tt.Formik,{initialValues:m,validationSchema:C,enableReinitialize:!0,onSubmit:b=>{O(b)}},({errors:b,values:z,handleChange:d,setFieldValue:u,setFieldError:k,handleSubmit:A})=>f.default.createElement("form",{onSubmit:A,className:e.containerClassName||_.container},!e.hideUsername&&f.default.createElement(w.Form.Group,{id:"username-container",className:e.fieldContainerClassName||_.fieldContainer},f.default.createElement(w.Form.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelUsername||"Username"),f.default.createElement(w.Form.Control,{id:"username",className:e.fieldInputClassName||_.formField,type:"text",value:z.username,onChange:d,isInvalid:!!b.username}),f.default.createElement(w.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||_.fieldError},b.username)),!e.hideEmail&&f.default.createElement(w.Form.Group,{id:"email-container",className:e.fieldContainerClassName||_.fieldContainer},f.default.createElement(w.Form.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelEmail||"Email address"),f.default.createElement(w.Form.Control,{id:"email",className:e.fieldInputClassName||_.formField,type:"email",value:z.email,onChange:d,isInvalid:!!b.email}),i&&f.default.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-unconfirmed-email-text"},e.unconfirmedEmailText||"The following email is not yet confirmed: "," ",i),f.default.createElement(w.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||_.fieldError},b.email)),!e.hidePassword&&f.default.createElement(w.Form.Group,{id:"password-container",className:e.fieldContainerClassName||_.fieldContainer},f.default.createElement(w.Form.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelPassword||"Password"),f.default.createElement(w.Form.Control,{id:"password",className:e.fieldInputClassName||_.formField,type:"password",value:z.password,onChange:d,isInvalid:!!b.password}),f.default.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-password-optional-text"},e.passwordChangeOptionalText||"You must only provide this if you want to change the password."),f.default.createElement(w.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||_.fieldError},b.password)),!e.hidePassword&&f.default.createElement(w.Form.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||_.fieldContainer},f.default.createElement(w.Form.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),f.default.createElement(w.Form.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||_.formField,type:"password",value:z.passwordConfirmation,onChange:d,isInvalid:!!b.passwordConfirmation}),f.default.createElement(w.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||_.fieldError},b.passwordConfirmation)),!e.hideAvatar&&f.default.createElement(w.Form.Group,{id:"avatar-container",className:e.fieldContainerClassName||_.fieldContainer},f.default.createElement(w.Form.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelAvatar||"Avatar"),f.default.createElement("div",{className:e.dropzoneContainerClassName||_.formField},f.default.createElement(ce,{onChange:I=>u("avatar",I.length>0?I[0]:null),files:z.avatar?[z.avatar]:[],multiple:!1,maxFiles:1,onMaxFilesError:()=>k("avatar",e.avatarToManyFilesErrorText||"Only one file is allowed"),maxSize:e.avatarMaxSize||5242880,onMaxSizeError:()=>k("avatar",e.avatarToLargeErrorText||`The file must not be larger than ${Math.round((e.avatarMaxSize||5242880)/1048576)} MB.`),onInvalidTypeError:()=>k("avatar",e.avatarWrongFormatErrorText||"Invalid file format.")})),f.default.createElement(w.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||_.fieldError},b.avatar)),!a&&f.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},f.default.createElement(w.Button,{ref:e.submitRef,type:"submit",variant:"primary",className:e.submitButtonClassName||_.submitButton},e.labelSubmitButton||"Submit")))):f.default.createElement("div",null,"Loading..."))};var nt={fetcher:async(e,t,r="get",n=null,a=void 0,o="1.0")=>{switch(r=r.toLowerCase(),r){case"post":return c.post(e,t,n,a,o);case"put":return c.put(e,t,n,a,o);case"patch":return c.patch(e,t,n,a,o);case"delete":return c.delete(e,t,n,a,o);default:return c.get(e,t,n,a,o)}}};var kt={client:c,swr:nt,utils:s};var at=require("@d4us1/remawy"),it=h(require("@rails/activestorage")),he=class{uploader;authInfo;apiVersion;constructor(t,r,n){this.uploader=t,this.authInfo=r,this.apiVersion=n}directUploadWillCreateBlobWithXHR(t){let r=c.defaultHttpHeader(this.authInfo,this.apiVersion);Object.keys(r).forEach(n=>{t.setRequestHeader(n,r[n])}),t.upload.addEventListener("progress",n=>this.uploader.onDirectUploadProgress(n))}},ue=class extends at.AbstractUploader{baseUrl;authInfo;apiVersion;constructor(t,r,n){super(),t.endsWith("/")||(t=`${t}/`),this.baseUrl=t,this.authInfo=r,this.apiVersion=n}startUpload(t){let r=new he(this,this.authInfo,this.apiVersion);return new it.DirectUpload(t,`${this.baseUrl}api/active_storage/blobs/create_direct_upload`,r).create((a,o)=>{if(a)this.onError(a);else{let m=`${this.baseUrl}rails/active_storage/blobs/${o.signed_id}/${o.filename}`,g={signedId:o.signed_id,fileName:o.filename};this.onFinish(m,t,g)}}),Promise.resolve(void 0)}onDirectUploadProgress(t){this.onProgress(t.loaded/t.total)}};var ot={uploader:ue};var It={remawy:ot};
//# sourceMappingURL=index.js.map
