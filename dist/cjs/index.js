"use strict";var st=Object.create;var ne=Object.defineProperty;var lt=Object.getOwnPropertyDescriptor;var mt=Object.getOwnPropertyNames;var dt=Object.getPrototypeOf,ct=Object.prototype.hasOwnProperty;var ut=(e,t)=>{for(var r in t)ne(e,r,{get:t[r],enumerable:!0})},Pe=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of mt(t))!ct.call(e,a)&&a!==r&&ne(e,a,{get:()=>t[a],enumerable:!(n=lt(t,a))||n.enumerable});return e};var h=(e,t,r)=>(r=e!=null?st(dt(e)):{},Pe(t||!e||!e.__esModule?ne(r,"default",{value:e,enumerable:!0}):r,e)),ft=e=>Pe(ne({},"__esModule",{value:!0}),e);var St={};ut(St,{ActiveStorageDropzone:()=>ce,DevelopmentHint:()=>$e,EzOnRails:()=>Te,EzOnRailsHttp:()=>Ot,EzOnRailsHttpError:()=>K,EzOnRailsIntegrations:()=>It,LoginForm:()=>Le,LostPasswordForm:()=>He,ProtectedPage:()=>Qe,RegistrationForm:()=>Oe,ResendConfirmationForm:()=>De,ResetPasswordForm:()=>Ke,UpdateUserForm:()=>rt,useEzApi:()=>Fe,useEzApiHttpClient:()=>le,useEzOnRails:()=>x,useEzScaff:()=>ze});module.exports=ft(St);var Y=h(require("react"));var xe=require("react"),ae=(0,xe.createContext)({apiVersion:"1.0",backendUrl:"http://localhost:3000",authInfo:null,setBackendUrl:e=>{},setAuthInfo:e=>{},setApiVersion:e=>{}});var Te=e=>{let[t,r]=(0,Y.useState)(e.backendUrl),[n,a]=(0,Y.useState)(e.authInfo||null),[i,d]=(0,Y.useState)(e.apiVersion),u=(0,Y.useMemo)(()=>{let o={backendUrl:t,authInfo:n||null,apiVersion:i,setBackendUrl:r,setAuthInfo:a,setApiVersion:d};return o.backendUrl.endsWith("/")&&(o.backendUrl=o.backendUrl.slice(0,-1)),o},[t,n,i]);return Y.default.createElement(ae.Provider,{value:u},e.children)};var E=h(require("react")),H=h(require("yup")),Ne=require("formik");var G=require("react");var ve=require("react");var se=require("convert-keys"),fe=e=>e.startsWith("/")?e.slice(1):e,pe=e=>e.endsWith("/")?e.slice(0,-1):e,pt=(e,t)=>`${pe(e)}/${fe(t)}`,gt=(e,t)=>`${pe(e)}/api/${fe(t)}`,bt=e=>(e=e.replace(/[A-Z]/g,(t,r)=>r===0?t.toLowerCase():"_"+t.toLowerCase()),e=e.replace(/::_/g,"/"),e=e.replace(/\/_/g,"/"),e),_e=e=>e&&(0,se.toSnake)(e),we=e=>e&&(0,se.toCamel)(e),Et=e=>Object.keys(e).map(t=>t+"="+e[t]).join("&"),ie=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}/.test(e)?new Date(e):Array.isArray(e)?e.map(t=>ie(t)):(e!==null&&typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=ie(e[t])}),e),oe=e=>e instanceof Date?e.toISOString():Array.isArray(e)?e.map(t=>oe(t)):(e!==null&&typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=oe(e[t])}),e),ht=e=>oe(_e(e)),Ct=e=>!e||typeof e!="object"?e:ie(we(e)),s={cleanupUrl:pe,cleanupPath:fe,toBaseUrl:pt,toApiUrl:gt,toSnakeCase:_e,toSnakeCasePath:bt,toCamelCase:we,toGetParameters:Et,toDates:ie,toDateStrings:oe,toBackendParams:ht,toFrontendParams:Ct};var K=class extends Error{httpStatusCode;constructor(t,r){super(),this.message=t,this.httpStatusCode=r}};var Pt=e=>{if(e)return{uid:e.uid,client:e.client,expiry:e.expiry,"token-type":e.tokenType,"access-token":e.accessToken}},xt=e=>({uid:e.uid,client:e.client,expiry:e.expiry,tokenType:e["token-type"],accessToken:e["access-token"]}),S=(e,t)=>({"Content-Type":"application/json",Accept:"application/json","api-version":t,...Pt(e)}),L=async(e,t,r,n)=>{let a=await fetch(t,{method:e,headers:n,body:r?JSON.stringify(r):null});if(a.status>=400)throw new K(JSON.stringify(a.body),a.status);let i={},d=null;try{a.headers.forEach((u,o)=>{i[o]=u}),d=await a.json()}catch{}return{headers:i,body:d}},c={signUp:async(e,t,r)=>{t=s.toBackendParams(t),await L("POST",s.toBaseUrl(e,"users"),{user:t},S(null,r))},signIn:async(e,t,r)=>{t=s.toBackendParams(t);let n=await L("POST",s.toApiUrl(e,"auth/sign_in"),t,S(null,r));return xt(n.headers)},signOut:async(e,t,r)=>{await L("DELETE",s.toApiUrl(e,"auth/sign_out"),null,S(t,r))},passwordResetInstructions:async(e,t,r)=>{t=s.toBackendParams(t),await L("POST",s.toBaseUrl(e,"users/password"),{user:t},S(null,r))},passwordReset:async(e,t,r)=>{t=s.toBackendParams(t),await L("PUT",s.toBaseUrl(e,"users/password"),{user:t},S(null,r))},getUser:async(e,t,r)=>{let n=await L("GET",s.toApiUrl(e,"users/me"),null,S(t,r));return s.toFrontendParams(n.body)},updateUser:async(e,t,r,n)=>{let a=t.avatar?.signedId,i={...s.toBackendParams(t),avatar:a},d=await L("PATCH",s.toApiUrl(e,"users/me"),{user:i},S(r,n));return s.toFrontendParams(d.body)},confirmationInstructions:async(e,t,r)=>{t=s.toBackendParams(t),await L("POST",s.toBaseUrl(e,"users/confirmation"),{user:t},S(null,r))},confirmation:async(e,t,r)=>{let n=s.toBaseUrl(e,"users/confirmation");t=s.toBackendParams(t),n=`${n}?${s.toGetParameters(t)}`,await L("GET",n,null,S(null,r))},get:async(e,t,r,n=null,a="1.0",i=void 0)=>{let d=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),i&&(r=i(r)),r&&(d=`${d}?${s.toGetParameters(r)}`);let u=await L("GET",d,null,S(n,a));return s.toFrontendParams(u.body)},post:async(e,t,r,n=null,a="1.0",i=void 0)=>{let d=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),i&&(r=i(r));let u=await L("POST",d,r,S(n,a));return s.toFrontendParams(u.body)},patch:async(e,t,r,n=null,a="1.0",i=void 0)=>{let d=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),i&&(r=i(r));let u=await L("PATCH",d,r,S(n,a));return s.toFrontendParams(u.body)},put:async(e,t,r,n=null,a="1.0",i=void 0)=>{let d=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),i&&(r=i(r));let u=await L("PUT",d,r,S(n,a));return s.toFrontendParams(u.body)},delete:async(e,t,r,n=null,a="1.0",i=void 0)=>{let d=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),i&&(r=i(r)),r&&(d=`${d}?${s.toGetParameters(r)}`);let u=await L("DELETE",d,null,S(n,a));return s.toFrontendParams(u.body)},defaultHttpHeader:(e,t)=>S(e,t)};var ye=require("react");var x=()=>(0,ye.useContext)(ae);var le=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=x();return{call:(0,ve.useCallback)(async(i,d,u)=>{let o=e?s.cleanupPath(s.cleanupUrl(e)):null,l=s.cleanupPath(i),p=`${o?o+"/":""}${l}`;switch(d){case"POST":return c.post(t,p,u,r,n);case"PUT":return c.put(t,p,u,r,n);case"PATCH":return c.patch(t,p,u,r,n);case"DELETE":return c.delete(t,p,u,r,n);default:return c.get(t,p,u,r,n)}},[r,n,t,e])}};var Fe=(e,t="GET",r,n)=>{let a=(0,G.useRef)(e),{backendUrl:i,authInfo:d,apiVersion:u}=x(),[o,l]=(0,G.useState)(null),[p,B]=(0,G.useState)(null),[F,b]=(0,G.useState)(!1),{call:z}=le(),m=(0,G.useCallback)(async g=>{try{b(!0),B(null),l(null);let v=await z(e,t,g||r);return l(v),b(!1),v}catch(v){B(v),b(!1)}},[e]);return(0,G.useEffect)(()=>{(async()=>e!==a.current&&(n?.skipInitialCall||(console.log("executing again"),await m()),a.current=e))()},[d,i,u,e]),{data:o,error:p,inProgress:F,callApi:m}};var k=require("react");var ze=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=x(),[a,i]=(0,k.useState)(null),[d,u]=(0,k.useState)(null),[o,l]=(0,k.useState)(!1),[p,B]=(0,k.useState)(null),F=(0,k.useMemo)(()=>s.toSnakeCasePath(e),[e]),b=(0,k.useCallback)(async C=>{B(null),l(!0);try{let R=await C();return l(!1),R}catch(R){return l(!1),B(R),null}},[]),z=(0,k.useCallback)(()=>b(async()=>{let C=await c.get(t,F,null,r,n);return u(C),C}),[t,r,n,F]),m=(0,k.useCallback)(C=>b(async()=>{let R=await c.get(t,`${F}/${C}`,null,r,n);return i(R),R}),[t,r,n,F]),g=(0,k.useCallback)(C=>b(async()=>{let R=await c.get(t,F,C,r,n);return u(R),R}),[t,r,n,F]),v=(0,k.useCallback)(C=>b(async()=>{let R=await c.post(t,F,C,r,n);return i(R),R}),[t,r,n,F]),U=(0,k.useCallback)((C,R)=>b(async()=>{let Ce=await c.patch(t,`${F}/${C}`,R,r,n);return i(Ce),Ce}),[t,r,n,F]),I=(0,k.useCallback)(C=>b(async()=>{await c.delete(t,`${F}/${C}`,null,r,n),i(null)}),[t,r,n,F]);return{record:a,records:d,inProgress:o,error:p,getAll:z,getOne:m,search:g,create:v,update:U,remove:I}};var y=require("react-bootstrap");var Re="a563a7ebb3e648e97f9484abfe6d2e49b279541947d0d1e8c32963c80c0b3f08",Tt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Re)){var e=document.createElement("style");e.id=Re,e.textContent=Tt,document.head.appendChild(e)}})();var w={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Oe=e=>{let{backendUrl:t,apiVersion:r}=x(),[n,a]=(0,E.useState)(!1),i=async o=>{a(!0);try{await c.signUp(t,o,r),e.onRegisterSuccess(o.email),a(!1)}catch(l){e.onRegisterError(l),a(!1)}},d=H.object().shape({username:H.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must not have more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:H.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must have not more than ${e.maxEmailLength||100} characters.`),password:H.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:H.string().oneOf([H.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation must match."),privacyPolicyAccepted:H.boolean().isTrue(e.privacyPolicyNotAcceptedErrorText||"The privacy policy must be accepted.")}).defined();return E.default.createElement(Ne.Formik,{initialValues:{username:"",email:"",password:"",passwordConfirmation:"",privacyPolicyAccepted:!1},validationSchema:d,onSubmit:o=>{i(o)}},({errors:o,handleChange:l,handleSubmit:p})=>E.default.createElement("form",{onSubmit:p,className:e.containerClassName||w.container},E.default.createElement(y.Form.Group,{id:"username-container",className:e.fieldContainerClassName||w.fieldContainer},E.default.createElement(y.Form.Label,{className:e.fieldLabelClassName||w.fieldLabel},e.labelUsername||"Username"),E.default.createElement(y.Form.Control,{id:"username",className:e.fieldInputClassName||w.formField,type:"text",onChange:l,isInvalid:!!o.username}),E.default.createElement(y.Form.Control.Feedback,{className:e.fieldErrorClassName||w.fieldError,type:"invalid"},o.username)),E.default.createElement(y.Form.Group,{id:"email-container",className:e.fieldContainerClassName||w.fieldContainer},E.default.createElement(y.Form.Label,{className:e.fieldLabelClassName||w.fieldLabel},e.labelEmail||"Email address"),E.default.createElement(y.Form.Control,{id:"email",className:e.fieldInputClassName||w.formField,type:"email",onChange:l,isInvalid:!!o.email}),E.default.createElement(y.Form.Control.Feedback,{className:e.fieldErrorClassName||w.fieldError,type:"invalid"},o.email)),E.default.createElement(y.Form.Group,{id:"password-container",className:e.fieldContainerClassName||w.fieldContainer},E.default.createElement(y.Form.Label,{className:e.fieldLabelClassName||w.fieldLabel},e.labelPassword||"Password"),E.default.createElement(y.Form.Control,{id:"password",className:e.fieldInputClassName||w.formField,type:"password",onChange:l,isInvalid:!!o.password}),E.default.createElement(y.Form.Control.Feedback,{className:e.fieldErrorClassName||w.fieldError,type:"invalid"},o.password)),E.default.createElement(y.Form.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||w.fieldContainer},E.default.createElement(y.Form.Label,{className:e.fieldLabelClassName||w.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),E.default.createElement(y.Form.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||w.formField,type:"password",onChange:l,isInvalid:!!o.passwordConfirmation}),E.default.createElement(y.Form.Control.Feedback,{className:e.fieldErrorClassName||w.fieldError,type:"invalid"},o.passwordConfirmation)),E.default.createElement(y.Form.Group,{id:"privacy-policy-accepted-container",className:e.fieldCheckboxContainerClassName||w.fieldContainer},E.default.createElement(y.Form.Check,{id:"privacyPolicyAccepted",className:e.fieldCheckboxInputClassName||w.formField,type:"checkbox",label:e.labelPrivacyPolicyAccepted||E.default.createElement("span",null,"I have read and accept the"," ",E.default.createElement("a",{href:e.privacyPolicyUrl,target:"_blank",rel:"noopener noreferrer"},"privacy policy")," ","and"," ",E.default.createElement("a",{href:e.generalTermsUrl,target:"_blank",rel:"noopener noreferrer"},"terms and conditions")," ","."),onChange:l,isInvalid:!!o.privacyPolicyAccepted,feedbackType:"invalid",feedback:o.privacyPolicyAccepted})),!n&&E.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},E.default.createElement(y.Button,{className:e.submitButtonClassName||w.submitButton,type:"submit",variant:"primary"},e.labelSubmitButton||"Register"))))};var Se=require("formik"),M=h(require("react-bootstrap/Form")),ke=h(require("react-bootstrap/Button")),N=h(require("react")),Q=h(require("yup"));var Ie="22f0744f7499dc4dc3931a831ce214b61be2117ea7faef8309e6e4972d40a28b",_t=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ie)){var e=document.createElement("style");e.id=Ie,e.textContent=_t,document.head.appendChild(e)}})();var A={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Le=e=>{let{backendUrl:t,apiVersion:r,setAuthInfo:n}=x(),[a,i]=(0,N.useState)(!1),d=Q.object().shape({email:Q.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required."),password:Q.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"The password is required.")}).defined(),u=async l=>{i(!0);try{let p=await c.signIn(t,l,r);if(!p)throw"No authentication object returned";if(n(p),!e.onLoginSuccess)return;await e.onLoginSuccess(l.email,p,l.stayLoggedIn)}catch(p){e.onLoginError(p),i(!1)}};return N.default.createElement(Se.Formik,{initialValues:{email:"",password:"",stayLoggedIn:!1},onSubmit:l=>{u(l)},validationSchema:d},({errors:l,handleChange:p,handleSubmit:B})=>N.default.createElement("form",{onSubmit:B,className:e.containerClassName||A.container},N.default.createElement(M.default.Group,{id:"email-container",className:e.fieldContainerClassName||A.fieldContainer},N.default.createElement(M.default.Label,{className:e.fieldLabelClassName||A.fieldLabel},e.labelEmail||"Email address"),N.default.createElement(M.default.Control,{id:"email",type:"email",onChange:p,className:e.fieldInputClassName||A.formField,isInvalid:!!l.email}),N.default.createElement(M.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||A.fieldError},l.email)),N.default.createElement(M.default.Group,{id:"password-container",className:e.fieldContainerClassName||A.fieldContainer},N.default.createElement(M.default.Label,{className:e.fieldLabelClassName||A.fieldLabel},e.labelPassword||"Password"),N.default.createElement(M.default.Control,{id:"password",type:"password",onChange:p,className:e.fieldInputClassName||A.formField,isInvalid:!!l.password}),N.default.createElement(M.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||A.fieldError},l.password)),!e.hideStayLoggedIn&&N.default.createElement(M.default.Group,{id:"stay-logged-in-container",className:e.fieldCheckboxContainerClassName||A.fieldContainer},N.default.createElement(M.default.Check,{id:"stayLoggedIn",className:e.fieldCheckboxInputClassName||A.formField,type:"checkbox",label:e.labelStayLoggedIn||"Stay logged in.",onChange:p})),!a&&N.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},N.default.createElement(ke.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||A.submitButton},e.labelSubmitButton||"Login"))))};var V=h(require("react")),me=h(require("yup"));var Ae=require("formik"),ee=h(require("react-bootstrap/Form")),Be=h(require("react-bootstrap/Button"));var Ue="57a0afebb13a94fca8de1a2c9f0e2be84368d84516625ca5aa2dc7c2093e9ee9",wt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ue)){var e=document.createElement("style");e.id=Ue,e.textContent=wt,document.head.appendChild(e)}})();var X={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var He=e=>{let{backendUrl:t,apiVersion:r}=x(),[n,a]=(0,V.useState)(!1),i=me.object().shape({email:me.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required.")}).defined(),d=o=>{a(!0),c.passwordResetInstructions(t,o,r).then(()=>{e.onLostPasswordSuccess(o.email),a(!1)}).catch(l=>{e.onLostPasswordError(l),a(!1)})};return V.default.createElement(Ae.Formik,{initialValues:{email:""},onSubmit:o=>{d(o)},validationSchema:i},({errors:o,handleChange:l,handleSubmit:p})=>V.default.createElement("form",{onSubmit:p,className:e.containerClassName||X.container},V.default.createElement(ee.default.Group,{id:"email-container",className:e.fieldContainerClassName||X.fieldContainer},V.default.createElement(ee.default.Label,{className:e.fieldLabelClassName||X.fieldLabel},e.labelEmail||"Email address"),V.default.createElement(ee.default.Control,{id:"email",type:"email",onChange:l,className:e.fieldInputClassName||X.formField,isInvalid:!!o.email}),V.default.createElement(ee.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||X.fieldError},o.email)),!n&&V.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},V.default.createElement(Be.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||X.submitButton},e.labelSubmitButton||"Submit"))))};var q=h(require("react")),de=h(require("yup"));var Ve=require("formik"),te=h(require("react-bootstrap/Form")),qe=h(require("react-bootstrap/Button"));var Me="7e6e9d3476df316f599dacca7b14adb07957a7b8dc1d0e9b7c5e39cfe0affcbc",yt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Me)){var e=document.createElement("style");e.id=Me,e.textContent=yt,document.head.appendChild(e)}})();var Z={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var De=e=>{let{backendUrl:t,apiVersion:r}=x(),[n,a]=(0,q.useState)(!1),i=de.object().shape({email:de.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.")}).defined(),d=o=>{a(!0),c.confirmationInstructions(t,o,r).then(()=>{e.onResendConfirmationSuccess(o.email),a(!1)}).catch(l=>{e.onResendConfirmationError(l),a(!1)})};return q.default.createElement(Ve.Formik,{initialValues:{email:""},onSubmit:o=>{d(o)},validationSchema:i},({errors:o,handleChange:l,handleSubmit:p})=>q.default.createElement("form",{onSubmit:p,className:e.containerClassName||Z.container},q.default.createElement(te.default.Group,{id:"email-container",className:e.fieldContainerClassName||Z.fieldContainer},q.default.createElement(te.default.Label,{className:e.fieldLabelClassName||Z.fieldLabel},e.labelEmail||"Email address"),q.default.createElement(te.default.Control,{id:"email",type:"email",onChange:l,className:e.fieldInputClassName||Z.formField,isInvalid:!!o.email}),q.default.createElement(te.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||Z.fieldError},o.email)),!n&&q.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},q.default.createElement(qe.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||Z.submitButton},e.labelSubmitButton||"Submit"))))};var re=h(require("react"));var Ge="1a37a232d6538b666a3098b0793d592912f4208a31298523eb30dc04b75fe58b",vt=`._container_q2u8x_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ge)){var e=document.createElement("style");e.id=Ge,e.textContent=vt,document.head.appendChild(e)}})();var ge={container:"_container_q2u8x_1",text:"_text_q2u8x_13"};var $e=e=>{let[t,r]=(0,re.useState)(e.visible),n=()=>{r(!0)};return t?re.default.createElement("div",{onClick:()=>{r(!1),setTimeout(n,e.dismissTimeout||2e4)},className:ge.container},re.default.createElement("span",{className:ge.text},"development")):null};var P=h(require("react")),Ye=h(require("@rails/activestorage")),We=require("react"),W=h(require("react-dropzone"));var je="257630eca6a3db5ac1f345639fdf03bb30897c494d2583e7ac4165a93a5df40e",Ft=`._dropzoneContainer_14oft_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(je)){var e=document.createElement("style");e.id=je,e.textContent=Ft,document.head.appendChild(e)}})();var be={dropzoneContainer:"_dropzoneContainer_14oft_1",pastezoneContainer:"_pastezoneContainer_14oft_19"};var zt=(e,t)=>`rails/active_storage/blobs/${e}/${t}`,ce=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=x(),[a,i]=(0,We.useState)(0),d=P.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",className:"bi bi-cloud-arrow-up",viewBox:"0 0 16 16"},P.default.createElement("path",{fillRule:"evenodd",d:"M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"}),P.default.createElement("path",{d:"M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"})),u=async m=>{await c.delete(t,`active_storage/blobs/${m}`,null,r,n)},o=async(m,g)=>{await u(g);let v=[...e.files];v=v.filter(U=>g!==U.signedId),e.onChange(v),m.stopPropagation()},l=m=>{m.loaded/m.total>=.9999999},p=m=>{if(m.length){if(e.maxFiles){let g=e.maxFiles-(e.files.length+a);if(g<m.length&&e.onMaxFilesError(e.maxFiles),g<=0)return;m=m.slice(0,g)}if(e.maxSize){let g=m.filter(v=>v.size<=e.maxSize);g.length<m.length&&e.onMaxSizeError(e.maxSize),m=g}i(g=>g+m.length),m.forEach(g=>{new Ye.DirectUpload(g,s.toApiUrl(t,"active_storage/blobs/create_direct_upload"),{directUploadWillCreateBlobWithXHR:U=>{let I=c.defaultHttpHeader(r,n);Object.keys(I).forEach(C=>{U.setRequestHeader(C,I[C])}),U.upload.addEventListener("progress",l)}}).create((U,I)=>{if(i(C=>C-1),!U){let C={signedId:I.signed_id};g.type.includes("image")?C.path=zt(I.signed_id,I.filename):C.filename=I.filename;let R=e.files;R.push(C),e.onChange([...R])}})})}},B=m=>{if(!m.clipboardData)return;let g=m.clipboardData.items;if(g===void 0)return;let v=[];for(let U of g){if(e.accept&&!Object.keys(e.accept).some(C=>U.type.match(C)))continue;let I=U.getAsFile();I&&v.push(I)}p(v)},F=e.files.map(m=>P.default.createElement("div",{key:m.signedId,className:"card w-25 animate__animated animate__fadeIn mb-4",style:{flex:"0 0 auto"}},P.default.createElement("div",{className:"card-header p-1"},P.default.createElement("button",{onClick:g=>o(g,m.signedId||""),type:"button",className:"close","aria-label":"Close"},P.default.createElement("span",{"aria-hidden":"true"},"\xD7"))),P.default.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},P.default.createElement("img",{src:s.toBaseUrl(t,m.path||""),alt:m.filename,className:"d-block mw-100 m-auto m-0 rounded p-1"})))),b=[];for(let m=0;m<a;m++)b.push(P.default.createElement("div",{key:m,className:"card w-25 mb-4",style:{flex:"0 0 auto"}},P.default.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},P.default.createElement("div",{className:"p-4 text-center"},P.default.createElement("div",{className:"spinner-border",role:"status"},P.default.createElement("span",{className:"sr-only"},"Loading..."))))));let z=m=>{m.some(g=>g.errors[0].code===W.ErrorCode.TooManyFiles)&&e.onMaxFilesError(e.maxFiles),m.some(g=>g.errors[0].code===W.ErrorCode.FileInvalidType)&&e.onInvalidTypeError(e.accept),m.some(g=>g.errors[0].code===W.ErrorCode.FileTooLarge)&&e.onMaxSizeError(e.maxSize)};return P.default.createElement("div",null,e.pasteZone&&P.default.createElement("input",{type:"text",className:`w-100 p-2 ${be.pastezoneContainer}`,value:e.textPastezone||"Copy and paste some files here",onPaste:B,readOnly:!0}),P.default.createElement(W.default,{onDropAccepted:p,multiple:e.multiple,maxFiles:e.maxFiles,maxSize:e.maxSize,onDropRejected:z,accept:e.accept},({getRootProps:m,getInputProps:g}=(0,W.useDropzone)())=>P.default.createElement("section",null,P.default.createElement("div",{...m(),className:`${be.dropzoneContainer} p-4 ${e.className}`},P.default.createElement("input",{...g()}),P.default.createElement("p",{className:"m-0"},e.textDropzone||"Drag 'n' drop some files here, or click to select files"),F.length>0?P.default.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},F):P.default.createElement("div",{className:"m-0"},e.customIcon||d),b.length>0&&P.default.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},b)))))};var Ze=require("formik"),$=h(require("react-bootstrap/Form")),Je=h(require("react-bootstrap/Button")),O=h(require("react")),J=h(require("yup"));var Xe="89ae8ceb5715a97634b604b77e8db8c51a73ff369719b1b41c5393911516fb24",Rt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Xe)){var e=document.createElement("style");e.id=Xe,e.textContent=Rt,document.head.appendChild(e)}})();var D={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Ke=e=>{let{backendUrl:t,apiVersion:r}=x(),[n,a]=(0,O.useState)(!1),i=J.object().shape({password:J.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:J.string().oneOf([J.ref("password")],e.passwordConfirmationMatchErrorText||"The password and its confirmation must match.")}).defined(),d=(0,O.useCallback)(async o=>{a(!0);try{await c.passwordReset(t,{...o,resetPasswordToken:e.resetPasswordToken},r),await e.onResetPasswordSuccess()}catch(l){e.onResetPasswordError(l),a(!1)}},[e.resetPasswordToken]);return O.default.createElement(Ze.Formik,{initialValues:{password:"",passwordConfirmation:""},onSubmit:o=>{d(o)},validationSchema:i},({errors:o,handleChange:l,handleSubmit:p})=>O.default.createElement("form",{onSubmit:p,className:e.containerClassName||D.container},O.default.createElement($.default.Group,{id:"password-container",className:e.fieldContainerClassName||D.fieldContainer},O.default.createElement($.default.Label,{className:e.fieldLabelClassName||D.fieldLabel},e.labelPassword||"Password"),O.default.createElement($.default.Control,{id:"password",type:"password",onChange:l,className:e.fieldInputClassName||D.formField,isInvalid:!!o.password}),O.default.createElement($.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||D.fieldError},o.password)),O.default.createElement($.default.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||D.fieldContainer},O.default.createElement($.default.Label,{className:e.fieldLabelClassName||D.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),O.default.createElement($.default.Control,{id:"passwordConfirmation",type:"password",onChange:l,className:e.fieldInputClassName||D.formField,isInvalid:!!o.passwordConfirmation}),O.default.createElement($.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||D.fieldError},o.passwordConfirmation)),!n&&O.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},O.default.createElement(Je.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||D.submitButton},e.labelSubmitButton||"Submit"))))};var Ee=h(require("react"));var Qe=e=>{let{authInfo:t}=x();return Ee.default.createElement("div",null,t?e.children:Ee.default.createElement("div",{className:e.accessDeniedClassName||"ez-on-rails-protected-page-access-denied-container"},e.accessDeniedText||"You must be signed in to see this content."))};var f=h(require("react")),j=h(require("yup")),tt=require("formik");var _=require("react-bootstrap");var et="1ced5992128b2373e529afb6c9d18e1a38e47e17bc21e470c8d685fbef280e02",Nt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(et)){var e=document.createElement("style");e.id=et,e.textContent=Nt,document.head.appendChild(e)}})();var T={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var rt=e=>{let{authInfo:t,backendUrl:r,apiVersion:n}=x(),[a,i]=(0,f.useState)(!1),[d,u]=(0,f.useState)(null),[o,l]=(0,f.useState)(void 0),p=b=>{u(b),l(b.unconfirmedEmail)};(0,f.useEffect)(()=>{(async()=>t&&p(await c.getUser(r,t,n)))()},[]);let B=async b=>{if(t){i(!0);try{let z=await c.updateUser(r,b,t,n);e.onUserUpdateSuccess(z),p(z),i(!1)}catch(z){e.onUserUpdateError(z),i(!1)}}},F=j.object().shape({username:j.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must have not more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:j.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must not have more than ${e.maxEmailLength||100} characters.`),password:j.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`),passwordConfirmation:j.string().oneOf([j.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation do not match.")}).defined();return t&&f.default.createElement("div",{className:"ez-on-rails-form-outer-container"},d?f.default.createElement(tt.Formik,{initialValues:d,validationSchema:F,enableReinitialize:!0,onSubmit:b=>{B(b)}},({errors:b,values:z,handleChange:m,setFieldValue:g,setFieldError:v,handleSubmit:U})=>f.default.createElement("form",{onSubmit:U,className:e.containerClassName||T.container},!e.hideUsername&&f.default.createElement(_.Form.Group,{id:"username-container",className:e.fieldContainerClassName||T.fieldContainer},f.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelUsername||"Username"),f.default.createElement(_.Form.Control,{id:"username",className:e.fieldInputClassName||T.formField,type:"text",value:z.username,onChange:m,isInvalid:!!b.username}),f.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},b.username)),!e.hideEmail&&f.default.createElement(_.Form.Group,{id:"email-container",className:e.fieldContainerClassName||T.fieldContainer},f.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelEmail||"Email address"),f.default.createElement(_.Form.Control,{id:"email",className:e.fieldInputClassName||T.formField,type:"email",value:z.email,onChange:m,isInvalid:!!b.email}),o&&f.default.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-unconfirmed-email-text"},e.unconfirmedEmailText||"The following email is not yet confirmed: "," ",o),f.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},b.email)),!e.hidePassword&&f.default.createElement(_.Form.Group,{id:"password-container",className:e.fieldContainerClassName||T.fieldContainer},f.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelPassword||"Password"),f.default.createElement(_.Form.Control,{id:"password",className:e.fieldInputClassName||T.formField,type:"password",value:z.password,onChange:m,isInvalid:!!b.password}),f.default.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-password-optional-text"},e.passwordChangeOptionalText||"You must only provide this if you want to change the password."),f.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},b.password)),!e.hidePassword&&f.default.createElement(_.Form.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||T.fieldContainer},f.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),f.default.createElement(_.Form.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||T.formField,type:"password",value:z.passwordConfirmation,onChange:m,isInvalid:!!b.passwordConfirmation}),f.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},b.passwordConfirmation)),!e.hideAvatar&&f.default.createElement(_.Form.Group,{id:"avatar-container",className:e.fieldContainerClassName||T.fieldContainer},f.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelAvatar||"Avatar"),f.default.createElement("div",{className:e.dropzoneContainerClassName||T.formField},f.default.createElement(ce,{onChange:I=>g("avatar",I.length>0?I[0]:null),files:z.avatar?[z.avatar]:[],multiple:!1,maxFiles:1,onMaxFilesError:()=>v("avatar",e.avatarToManyFilesErrorText||"Only one file is allowed"),maxSize:e.avatarMaxSize||5242880,onMaxSizeError:()=>v("avatar",e.avatarToLargeErrorText||`The file must not be larger than ${Math.round((e.avatarMaxSize||5242880)/1048576)} MB.`),onInvalidTypeError:()=>v("avatar",e.avatarWrongFormatErrorText||"Invalid file format.")})),f.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},b.avatar)),!a&&f.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},f.default.createElement(_.Button,{ref:e.submitRef,type:"submit",variant:"primary",className:e.submitButtonClassName||T.submitButton},e.labelSubmitButton||"Submit")))):f.default.createElement("div",null,"Loading..."))};var nt={fetcher:async(e,t,r="get",n=null,a=void 0,i="1.0")=>{switch(r=r.toLowerCase(),r){case"post":return c.post(e,t,n,a,i);case"put":return c.put(e,t,n,a,i);case"patch":return c.patch(e,t,n,a,i);case"delete":return c.delete(e,t,n,a,i);default:return c.get(e,t,n,a,i)}}};var Ot={client:c,swr:nt,utils:s};var at=require("@d4us1/remawy"),it=h(require("@rails/activestorage")),he=class{uploader;authInfo;apiVersion;constructor(t,r,n){this.uploader=t,this.authInfo=r,this.apiVersion=n}directUploadWillCreateBlobWithXHR(t){let r=c.defaultHttpHeader(this.authInfo,this.apiVersion);Object.keys(r).forEach(n=>{t.setRequestHeader(n,r[n])}),t.upload.addEventListener("progress",n=>this.uploader.onDirectUploadProgress(n))}},ue=class extends at.AbstractUploader{baseUrl;authInfo;apiVersion;constructor(t,r,n){super(),t.endsWith("/")||(t=`${t}/`),this.baseUrl=t,this.authInfo=r,this.apiVersion=n}startUpload(t){let r=new he(this,this.authInfo,this.apiVersion);return new it.DirectUpload(t,`${this.baseUrl}api/active_storage/blobs/create_direct_upload`,r).create((a,i)=>{if(a)this.onError(a);else{let d=`${this.baseUrl}rails/active_storage/blobs/${i.signed_id}/${i.filename}`,u={signedId:i.signed_id,fileName:i.filename};this.onFinish(d,t,u)}}),Promise.resolve(void 0)}onDirectUploadProgress(t){this.onProgress(t.loaded/t.total)}};var ot={uploader:ue};var It={remawy:ot};
//# sourceMappingURL=index.js.map
