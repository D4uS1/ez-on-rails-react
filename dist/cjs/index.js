"use strict";var st=Object.create;var ne=Object.defineProperty;var lt=Object.getOwnPropertyDescriptor;var mt=Object.getOwnPropertyNames;var dt=Object.getPrototypeOf,ct=Object.prototype.hasOwnProperty;var ut=(e,t)=>{for(var r in t)ne(e,r,{get:t[r],enumerable:!0})},xe=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of mt(t))!ct.call(e,a)&&a!==r&&ne(e,a,{get:()=>t[a],enumerable:!(n=lt(t,a))||n.enumerable});return e};var h=(e,t,r)=>(r=e!=null?st(dt(e)):{},xe(t||!e||!e.__esModule?ne(r,"default",{value:e,enumerable:!0}):r,e)),ft=e=>xe(ne({},"__esModule",{value:!0}),e);var Ut={};ut(Ut,{ActiveStorageDropzone:()=>ce,DevelopmentHint:()=>$e,EzOnRails:()=>Te,EzOnRailsHttp:()=>kt,EzOnRailsHttpError:()=>Y,EzOnRailsIntegrations:()=>It,LoginForm:()=>Se,LostPasswordForm:()=>He,ProtectedPage:()=>Qe,RegistrationForm:()=>Oe,ResendConfirmationForm:()=>De,ResetPasswordForm:()=>Ke,UpdateUserForm:()=>rt,useEzApi:()=>ze,useEzApiHttpClient:()=>le,useEzOnRails:()=>w,useEzScaff:()=>Fe});module.exports=ft(Ut);var H=h(require("react"));var Pe=require("react"),ae=(0,Pe.createContext)({apiVersion:"1.0",backendUrl:"http://localhost:3000",authInfo:null,setBackendUrl:e=>{},setAuthInfo:e=>{},setApiVersion:e=>{},setOnUnauthorizedCallback:e=>{}});var Te=e=>{let[t,r]=(0,H.useState)(e.backendUrl),[n,a]=(0,H.useState)(e.authInfo||null),[i,m]=(0,H.useState)(e.apiVersion),[p,o]=(0,H.useState)(()=>e.onUnauthorizedCallback),s=(0,H.useCallback)(C=>{o(()=>C)},[]),g=(0,H.useMemo)(()=>{let C={backendUrl:t,authInfo:n||null,apiVersion:i,setBackendUrl:r,setAuthInfo:a,setApiVersion:m,setOnUnauthorizedCallback:s,onUnauthorizedCallback:p};return C.backendUrl.endsWith("/")&&(C.backendUrl=C.backendUrl.slice(0,-1)),C},[t,n,i,s,p]);return H.default.createElement(ae.Provider,{value:g},e.children)};var E=h(require("react")),M=h(require("yup")),Ne=require("formik");var W=require("react");var ve=require("react");var se=require("convert-keys");var Y=class extends Error{httpStatusCode;constructor(t,r){super(),this.message=t,this.httpStatusCode=r}};var fe=e=>e.startsWith("/")?e.slice(1):e,pe=e=>e.endsWith("/")?e.slice(0,-1):e,pt=(e,t)=>`${pe(e)}/${fe(t)}`,gt=(e,t)=>`${pe(e)}/api/${fe(t)}`,bt=e=>(e=e.replace(/[A-Z]/g,(t,r)=>r===0?t.toLowerCase():"_"+t.toLowerCase()),e=e.replace(/::_/g,"/"),e=e.replace(/\/_/g,"/"),e),_e=e=>e&&(0,se.toSnake)(e),we=e=>e&&(0,se.toCamel)(e),Et=e=>Object.keys(e).map(t=>t+"="+e[t]).join("&"),ie=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}/.test(e)?new Date(e):Array.isArray(e)?e.map(t=>ie(t)):(e!==null&&typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=ie(e[t])}),e),oe=e=>e instanceof Date?e.toISOString():Array.isArray(e)?e.map(t=>oe(t)):(e!==null&&typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=oe(e[t])}),e),ht=e=>oe(_e(e)),Ct=e=>!e||typeof e!="object"?e:ie(we(e)),xt=e=>e?e instanceof Y:!1,l={cleanupUrl:pe,cleanupPath:fe,toBaseUrl:pt,toApiUrl:gt,toSnakeCase:_e,toSnakeCasePath:bt,toCamelCase:we,toGetParameters:Et,toDates:ie,toDateStrings:oe,toBackendParams:ht,toFrontendParams:Ct,isEzOnRailsHttpError:xt};var Pt=e=>{if(e)return{uid:e.uid,client:e.client,expiry:e.expiry,"token-type":e.tokenType,"access-token":e.accessToken}},Tt=e=>({uid:e.uid,client:e.client,expiry:e.expiry,tokenType:e["token-type"],accessToken:e["access-token"]}),U=(e,t)=>({"Content-Type":"application/json",Accept:"application/json","api-version":t,...Pt(e)}),L=async(e,t,r,n)=>{let a=await fetch(t,{method:e,headers:n,body:r?JSON.stringify(r):null});if(!a.ok)throw new Y(await a.text(),a.status);let i={},m=null;try{a.headers.forEach((p,o)=>{i[o]=p}),m=await a.json()}catch{}return{headers:i,body:m}},c={signUp:async(e,t,r)=>{t=l.toBackendParams(t),await L("POST",l.toBaseUrl(e,"users"),{user:t},U(null,r))},signIn:async(e,t,r)=>{t=l.toBackendParams(t);let n=await L("POST",l.toApiUrl(e,"auth/sign_in"),t,U(null,r));return Tt(n.headers)},signOut:async(e,t,r)=>{await L("DELETE",l.toApiUrl(e,"auth/sign_out"),null,U(t,r))},passwordResetInstructions:async(e,t,r)=>{t=l.toBackendParams(t),await L("POST",l.toBaseUrl(e,"users/password"),{user:t},U(null,r))},passwordReset:async(e,t,r)=>{t=l.toBackendParams(t),await L("PUT",l.toBaseUrl(e,"users/password"),{user:t},U(null,r))},getUser:async(e,t,r)=>{let n=await L("GET",l.toApiUrl(e,"users/me"),null,U(t,r));return l.toFrontendParams(n.body)},updateUser:async(e,t,r,n)=>{let a=t.avatar?.signedId,i={...l.toBackendParams(t),avatar:a},m=await L("PATCH",l.toApiUrl(e,"users/me"),{user:i},U(r,n));return l.toFrontendParams(m.body)},confirmationInstructions:async(e,t,r)=>{t=l.toBackendParams(t),await L("POST",l.toBaseUrl(e,"users/confirmation"),{user:t},U(null,r))},confirmation:async(e,t,r)=>{let n=l.toBaseUrl(e,"users/confirmation");t=l.toBackendParams(t),n=`${n}?${l.toGetParameters(t)}`,await L("GET",n,null,U(null,r))},get:async(e,t,r,n=null,a="1.0",i=void 0)=>{let m=l.toApiUrl(e,t);r&&(r=l.toBackendParams(r)),i&&(r=i(r)),r&&(m=`${m}?${l.toGetParameters(r)}`);let p=await L("GET",m,null,U(n,a));return l.toFrontendParams(p.body)},post:async(e,t,r,n=null,a="1.0",i=void 0)=>{let m=l.toApiUrl(e,t);r&&(r=l.toBackendParams(r)),i&&(r=i(r));let p=await L("POST",m,r,U(n,a));return l.toFrontendParams(p.body)},patch:async(e,t,r,n=null,a="1.0",i=void 0)=>{let m=l.toApiUrl(e,t);r&&(r=l.toBackendParams(r)),i&&(r=i(r));let p=await L("PATCH",m,r,U(n,a));return l.toFrontendParams(p.body)},put:async(e,t,r,n=null,a="1.0",i=void 0)=>{let m=l.toApiUrl(e,t);r&&(r=l.toBackendParams(r)),i&&(r=i(r));let p=await L("PUT",m,r,U(n,a));return l.toFrontendParams(p.body)},delete:async(e,t,r,n=null,a="1.0",i=void 0)=>{let m=l.toApiUrl(e,t);r&&(r=l.toBackendParams(r)),i&&(r=i(r)),r&&(m=`${m}?${l.toGetParameters(r)}`);let p=await L("DELETE",m,null,U(n,a));return l.toFrontendParams(p.body)},defaultHttpHeader:(e,t)=>U(e,t)};var ye=require("react");var w=()=>(0,ye.useContext)(ae);var le=e=>{let{backendUrl:t,authInfo:r,apiVersion:n,onUnauthorizedCallback:a}=w();return{call:(0,ve.useCallback)(async(m,p,o)=>{let s=e?l.cleanupPath(l.cleanupUrl(e)):null,g=l.cleanupPath(m),C=`${s?s+"/":""}${g}`;try{switch(p){case"POST":return await c.post(t,C,o,r,n);case"PUT":return await c.put(t,C,o,r,n);case"PATCH":return await c.patch(t,C,o,r,n);case"DELETE":return await c.delete(t,C,o,r,n);default:return await c.get(t,C,o,r,n)}}catch(T){if(!l.isEzOnRailsHttpError(T)||T.httpStatusCode!==401||!a)throw T;return a(),null}},[r,n,t,e,a])}};var ze=(e,t="GET",r,n)=>{let[a,i]=(0,W.useState)(null),[m,p]=(0,W.useState)(null),[o,s]=(0,W.useState)(!1),{call:g}=le(),C=(0,W.useCallback)(async T=>{try{s(!0),p(null),i(null);let u=await g(e,t,T||r);return i(u),s(!1),u}catch(u){p(u),s(!1)}},[e,g,r,t]);return(0,W.useEffect)(()=>{(async()=>n?.skipInitialCall||await C())()},[C,n]),{data:a,error:m,inProgress:o,callApi:C}};var S=require("react");var Fe=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=w(),[a,i]=(0,S.useState)(null),[m,p]=(0,S.useState)(null),[o,s]=(0,S.useState)(!1),[g,C]=(0,S.useState)(null),T=(0,S.useMemo)(()=>l.toSnakeCasePath(e),[e]),u=(0,S.useCallback)(async x=>{C(null),s(!0);try{let F=await x();return s(!1),F}catch(F){return s(!1),C(F),null}},[]),O=(0,S.useCallback)(()=>u(async()=>{let x=await c.get(t,T,null,r,n);return p(x),x}),[t,r,n,T,u]),d=(0,S.useCallback)(x=>u(async()=>{let F=await c.get(t,`${T}/${x}`,null,r,n);return i(F),F}),[t,r,n,T,u]),b=(0,S.useCallback)(x=>u(async()=>{let F=await c.get(t,T,x,r,n);return p(F),F}),[t,r,n,T,u]),k=(0,S.useCallback)(x=>u(async()=>{let F=await c.post(t,T,x,r,n);return i(F),F}),[t,r,n,T,u]),A=(0,S.useCallback)((x,F)=>u(async()=>{let Ce=await c.patch(t,`${T}/${x}`,F,r,n);return i(Ce),Ce}),[t,r,n,T,u]),I=(0,S.useCallback)(x=>u(async()=>{await c.delete(t,`${T}/${x}`,null,r,n),i(null)}),[t,r,n,T,u]);return{record:a,records:m,inProgress:o,error:g,getAll:O,getOne:d,search:b,create:k,update:A,remove:I}};var z=require("react-bootstrap");var Re="bafe24020c824c6ae836bd0ad4f966f05cde233185fa37e634e3e24e8476e850",_t=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Re)){var e=document.createElement("style");e.id=Re,e.textContent=_t,document.head.appendChild(e)}})();var v={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Oe=e=>{let{backendUrl:t,apiVersion:r}=w(),[n,a]=(0,E.useState)(!1),i=async o=>{a(!0);try{await c.signUp(t,o,r),e.onRegisterSuccess(o.email),a(!1)}catch(s){e.onRegisterError(s),a(!1)}},m=M.object().shape({username:M.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must not have more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:M.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must have not more than ${e.maxEmailLength||100} characters.`),password:M.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:M.string().oneOf([M.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation must match."),privacyPolicyAccepted:M.boolean().isTrue(e.privacyPolicyNotAcceptedErrorText||"The privacy policy must be accepted.")}).defined();return E.default.createElement(Ne.Formik,{initialValues:{username:"",email:"",password:"",passwordConfirmation:"",privacyPolicyAccepted:!1},validationSchema:m,onSubmit:o=>{i(o)}},({errors:o,handleChange:s,handleSubmit:g})=>E.default.createElement("form",{onSubmit:g,className:e.containerClassName||v.container},E.default.createElement(z.Form.Group,{id:"username-container",className:e.fieldContainerClassName||v.fieldContainer},E.default.createElement(z.Form.Label,{className:e.fieldLabelClassName||v.fieldLabel},e.labelUsername||"Username"),E.default.createElement(z.Form.Control,{id:"username",className:e.fieldInputClassName||v.formField,type:"text",onChange:s,isInvalid:!!o.username}),E.default.createElement(z.Form.Control.Feedback,{className:e.fieldErrorClassName||v.fieldError,type:"invalid"},o.username)),E.default.createElement(z.Form.Group,{id:"email-container",className:e.fieldContainerClassName||v.fieldContainer},E.default.createElement(z.Form.Label,{className:e.fieldLabelClassName||v.fieldLabel},e.labelEmail||"Email address"),E.default.createElement(z.Form.Control,{id:"email",className:e.fieldInputClassName||v.formField,type:"email",onChange:s,isInvalid:!!o.email}),E.default.createElement(z.Form.Control.Feedback,{className:e.fieldErrorClassName||v.fieldError,type:"invalid"},o.email)),E.default.createElement(z.Form.Group,{id:"password-container",className:e.fieldContainerClassName||v.fieldContainer},E.default.createElement(z.Form.Label,{className:e.fieldLabelClassName||v.fieldLabel},e.labelPassword||"Password"),E.default.createElement(z.Form.Control,{id:"password",className:e.fieldInputClassName||v.formField,type:"password",onChange:s,isInvalid:!!o.password}),E.default.createElement(z.Form.Control.Feedback,{className:e.fieldErrorClassName||v.fieldError,type:"invalid"},o.password)),E.default.createElement(z.Form.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||v.fieldContainer},E.default.createElement(z.Form.Label,{className:e.fieldLabelClassName||v.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),E.default.createElement(z.Form.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||v.formField,type:"password",onChange:s,isInvalid:!!o.passwordConfirmation}),E.default.createElement(z.Form.Control.Feedback,{className:e.fieldErrorClassName||v.fieldError,type:"invalid"},o.passwordConfirmation)),E.default.createElement(z.Form.Group,{id:"privacy-policy-accepted-container",className:e.fieldCheckboxContainerClassName||v.fieldContainer},E.default.createElement(z.Form.Check,{id:"privacyPolicyAccepted",className:e.fieldCheckboxInputClassName||v.formField,type:"checkbox",label:e.labelPrivacyPolicyAccepted||E.default.createElement("span",null,"I have read and accept the"," ",E.default.createElement("a",{href:e.privacyPolicyUrl,target:"_blank",rel:"noopener noreferrer"},"privacy policy")," ","and"," ",E.default.createElement("a",{href:e.generalTermsUrl,target:"_blank",rel:"noopener noreferrer"},"terms and conditions")," ","."),onChange:s,isInvalid:!!o.privacyPolicyAccepted,feedbackType:"invalid",feedback:o.privacyPolicyAccepted})),!n&&E.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},E.default.createElement(z.Button,{className:e.submitButtonClassName||v.submitButton,type:"submit",variant:"primary"},e.labelSubmitButton||"Register"))))};var Ie=require("formik"),V=h(require("react-bootstrap/Form")),Ue=h(require("react-bootstrap/Button")),R=h(require("react")),Q=h(require("yup"));var ke="76c45bdc8b6c228667f27a2aabdd5ebaf608f57eb1166041365f2096fdab7152",wt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(ke)){var e=document.createElement("style");e.id=ke,e.textContent=wt,document.head.appendChild(e)}})();var B={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Se=e=>{let{backendUrl:t,apiVersion:r,setAuthInfo:n}=w(),[a,i]=(0,R.useState)(!1),m=Q.object().shape({email:Q.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required."),password:Q.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"The password is required.")}).defined(),p=async s=>{i(!0);try{let g=await c.signIn(t,s,r);if(!g)throw"No authentication object returned";if(n(g),!e.onLoginSuccess)return;await e.onLoginSuccess(s.email,g,s.stayLoggedIn)}catch(g){e.onLoginError(g),i(!1)}};return R.default.createElement(Ie.Formik,{initialValues:{email:"",password:"",stayLoggedIn:!1},onSubmit:s=>{p(s)},validationSchema:m},({errors:s,handleChange:g,handleSubmit:C})=>R.default.createElement("form",{onSubmit:C,className:e.containerClassName||B.container},R.default.createElement(V.default.Group,{id:"email-container",className:e.fieldContainerClassName||B.fieldContainer},R.default.createElement(V.default.Label,{className:e.fieldLabelClassName||B.fieldLabel},e.labelEmail||"Email address"),R.default.createElement(V.default.Control,{id:"email",type:"email",onChange:g,className:e.fieldInputClassName||B.formField,isInvalid:!!s.email}),R.default.createElement(V.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||B.fieldError},s.email)),R.default.createElement(V.default.Group,{id:"password-container",className:e.fieldContainerClassName||B.fieldContainer},R.default.createElement(V.default.Label,{className:e.fieldLabelClassName||B.fieldLabel},e.labelPassword||"Password"),R.default.createElement(V.default.Control,{id:"password",type:"password",onChange:g,className:e.fieldInputClassName||B.formField,isInvalid:!!s.password}),R.default.createElement(V.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||B.fieldError},s.password)),!e.hideStayLoggedIn&&R.default.createElement(V.default.Group,{id:"stay-logged-in-container",className:e.fieldCheckboxContainerClassName||B.fieldContainer},R.default.createElement(V.default.Check,{id:"stayLoggedIn",className:e.fieldCheckboxInputClassName||B.formField,type:"checkbox",label:e.labelStayLoggedIn||"Stay logged in.",onChange:g})),!a&&R.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},R.default.createElement(Ue.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||B.submitButton},e.labelSubmitButton||"Login"))))};var q=h(require("react")),me=h(require("yup"));var Ae=require("formik"),ee=h(require("react-bootstrap/Form")),Be=h(require("react-bootstrap/Button"));var Le="6dd7730d7b9bcf74b7f0abd012cd00956c3ffc345143bfcbb5bbe259750c8509",yt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Le)){var e=document.createElement("style");e.id=Le,e.textContent=yt,document.head.appendChild(e)}})();var X={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var He=e=>{let{backendUrl:t,apiVersion:r}=w(),[n,a]=(0,q.useState)(!1),i=me.object().shape({email:me.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required.")}).defined(),m=o=>{a(!0),c.passwordResetInstructions(t,o,r).then(()=>{e.onLostPasswordSuccess(o.email),a(!1)}).catch(s=>{e.onLostPasswordError(s),a(!1)})};return q.default.createElement(Ae.Formik,{initialValues:{email:""},onSubmit:o=>{m(o)},validationSchema:i},({errors:o,handleChange:s,handleSubmit:g})=>q.default.createElement("form",{onSubmit:g,className:e.containerClassName||X.container},q.default.createElement(ee.default.Group,{id:"email-container",className:e.fieldContainerClassName||X.fieldContainer},q.default.createElement(ee.default.Label,{className:e.fieldLabelClassName||X.fieldLabel},e.labelEmail||"Email address"),q.default.createElement(ee.default.Control,{id:"email",type:"email",onChange:s,className:e.fieldInputClassName||X.formField,isInvalid:!!o.email}),q.default.createElement(ee.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||X.fieldError},o.email)),!n&&q.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},q.default.createElement(Be.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||X.submitButton},e.labelSubmitButton||"Submit"))))};var D=h(require("react")),de=h(require("yup"));var Ve=require("formik"),te=h(require("react-bootstrap/Form")),qe=h(require("react-bootstrap/Button"));var Me="3e29f85c7be8207724f40711e4abb507cdd78944d66fcb8394a05978139308bc",vt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Me)){var e=document.createElement("style");e.id=Me,e.textContent=vt,document.head.appendChild(e)}})();var Z={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var De=e=>{let{backendUrl:t,apiVersion:r}=w(),[n,a]=(0,D.useState)(!1),i=de.object().shape({email:de.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.")}).defined(),m=o=>{a(!0),c.confirmationInstructions(t,o,r).then(()=>{e.onResendConfirmationSuccess(o.email),a(!1)}).catch(s=>{e.onResendConfirmationError(s),a(!1)})};return D.default.createElement(Ve.Formik,{initialValues:{email:""},onSubmit:o=>{m(o)},validationSchema:i},({errors:o,handleChange:s,handleSubmit:g})=>D.default.createElement("form",{onSubmit:g,className:e.containerClassName||Z.container},D.default.createElement(te.default.Group,{id:"email-container",className:e.fieldContainerClassName||Z.fieldContainer},D.default.createElement(te.default.Label,{className:e.fieldLabelClassName||Z.fieldLabel},e.labelEmail||"Email address"),D.default.createElement(te.default.Control,{id:"email",type:"email",onChange:s,className:e.fieldInputClassName||Z.formField,isInvalid:!!o.email}),D.default.createElement(te.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||Z.fieldError},o.email)),!n&&D.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},D.default.createElement(qe.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||Z.submitButton},e.labelSubmitButton||"Submit"))))};var re=h(require("react"));var Ge="605175769c309756d0ef5afb7c84369b36707bdafbe54321922699a6948b5cd9",zt=`._container_q2u8x_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ge)){var e=document.createElement("style");e.id=Ge,e.textContent=zt,document.head.appendChild(e)}})();var ge={container:"_container_q2u8x_1",text:"_text_q2u8x_13"};var $e=e=>{let[t,r]=(0,re.useState)(e.visible),n=()=>{r(!0)};return t?re.default.createElement("div",{onClick:()=>{r(!1),setTimeout(n,e.dismissTimeout||2e4)},className:ge.container},re.default.createElement("span",{className:ge.text},"development")):null};var P=h(require("react")),Ye=h(require("@rails/activestorage")),We=require("react"),K=h(require("react-dropzone"));var je="c05f0f23f137ce6a63fa03175493c7364db1bc2b580d733625ade6720ced98bd",Ft=`._dropzoneContainer_14oft_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(je)){var e=document.createElement("style");e.id=je,e.textContent=Ft,document.head.appendChild(e)}})();var be={dropzoneContainer:"_dropzoneContainer_14oft_1",pastezoneContainer:"_pastezoneContainer_14oft_19"};var Rt=(e,t)=>`rails/active_storage/blobs/${e}/${t}`,ce=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=w(),[a,i]=(0,We.useState)(0),m=P.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",className:"bi bi-cloud-arrow-up",viewBox:"0 0 16 16"},P.default.createElement("path",{fillRule:"evenodd",d:"M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"}),P.default.createElement("path",{d:"M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"})),p=async d=>{await c.delete(t,`active_storage/blobs/${d}`,null,r,n)},o=async(d,b)=>{await p(b);let k=[...e.files];k=k.filter(A=>b!==A.signedId),e.onChange(k),d.stopPropagation()},s=d=>{d.loaded/d.total>=.9999999},g=d=>{if(d.length){if(e.maxFiles){let b=e.maxFiles-(e.files.length+a);if(b<d.length&&e.onMaxFilesError(e.maxFiles),b<=0)return;d=d.slice(0,b)}if(e.maxSize){let b=d.filter(k=>k.size<=e.maxSize);b.length<d.length&&e.onMaxSizeError(e.maxSize),d=b}i(b=>b+d.length),d.forEach(b=>{new Ye.DirectUpload(b,l.toApiUrl(t,"active_storage/blobs/create_direct_upload"),{directUploadWillCreateBlobWithXHR:A=>{let I=c.defaultHttpHeader(r,n);Object.keys(I).forEach(x=>{A.setRequestHeader(x,I[x])}),A.upload.addEventListener("progress",s)}}).create((A,I)=>{if(i(x=>x-1),!A){let x={signedId:I.signed_id};b.type.includes("image")?x.path=Rt(I.signed_id,I.filename):x.filename=I.filename;let F=e.files;F.push(x),e.onChange([...F])}})})}},C=d=>{if(!d.clipboardData)return;let b=d.clipboardData.items;if(b===void 0)return;let k=[];for(let A of b){if(e.accept&&!Object.keys(e.accept).some(x=>A.type.match(x)))continue;let I=A.getAsFile();I&&k.push(I)}g(k)},T=e.files.map(d=>P.default.createElement("div",{key:d.signedId,className:"card w-25 animate__animated animate__fadeIn mb-4",style:{flex:"0 0 auto"}},P.default.createElement("div",{className:"card-header p-1"},P.default.createElement("button",{onClick:b=>o(b,d.signedId||""),type:"button",className:"close","aria-label":"Close"},P.default.createElement("span",{"aria-hidden":"true"},"\xD7"))),P.default.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},P.default.createElement("img",{src:l.toBaseUrl(t,d.path||""),alt:d.filename,className:"d-block mw-100 m-auto m-0 rounded p-1"})))),u=[];for(let d=0;d<a;d++)u.push(P.default.createElement("div",{key:d,className:"card w-25 mb-4",style:{flex:"0 0 auto"}},P.default.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},P.default.createElement("div",{className:"p-4 text-center"},P.default.createElement("div",{className:"spinner-border",role:"status"},P.default.createElement("span",{className:"sr-only"},"Loading..."))))));let O=d=>{d.some(b=>b.errors[0].code===K.ErrorCode.TooManyFiles)&&e.onMaxFilesError(e.maxFiles),d.some(b=>b.errors[0].code===K.ErrorCode.FileInvalidType)&&e.onInvalidTypeError(e.accept),d.some(b=>b.errors[0].code===K.ErrorCode.FileTooLarge)&&e.onMaxSizeError(e.maxSize)};return P.default.createElement("div",null,e.pasteZone&&P.default.createElement("input",{type:"text",className:`w-100 p-2 ${be.pastezoneContainer}`,value:e.textPastezone||"Copy and paste some files here",onPaste:C,readOnly:!0}),P.default.createElement(K.default,{onDropAccepted:g,multiple:e.multiple,maxFiles:e.maxFiles,maxSize:e.maxSize,onDropRejected:O,accept:e.accept},({getRootProps:d,getInputProps:b})=>P.default.createElement("section",null,P.default.createElement("div",{...d(),className:`${be.dropzoneContainer} p-4 ${e.className}`},P.default.createElement("input",{...b()}),P.default.createElement("p",{className:"m-0"},e.textDropzone||"Drag 'n' drop some files here, or click to select files"),T.length>0?P.default.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},T):P.default.createElement("div",{className:"m-0"},e.customIcon||m),u.length>0&&P.default.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},u)))))};var Ze=require("formik"),$=h(require("react-bootstrap/Form")),Je=h(require("react-bootstrap/Button")),N=h(require("react")),J=h(require("yup"));var Xe="8fdf4b1ac769a8e37eb4fb0b92c8adcd88978793e2ac8abbacfd290c41c56cc3",Nt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Xe)){var e=document.createElement("style");e.id=Xe,e.textContent=Nt,document.head.appendChild(e)}})();var G={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Ke=e=>{let{backendUrl:t,apiVersion:r}=w(),[n,a]=(0,N.useState)(!1),i=J.object().shape({password:J.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:J.string().oneOf([J.ref("password")],e.passwordConfirmationMatchErrorText||"The password and its confirmation must match.")}).defined(),m=(0,N.useCallback)(async o=>{a(!0);try{await c.passwordReset(t,{...o,resetPasswordToken:e.resetPasswordToken},r),await e.onResetPasswordSuccess()}catch(s){e.onResetPasswordError(s),a(!1)}},[e,t,r]);return N.default.createElement(Ze.Formik,{initialValues:{password:"",passwordConfirmation:""},onSubmit:o=>{m(o)},validationSchema:i},({errors:o,handleChange:s,handleSubmit:g})=>N.default.createElement("form",{onSubmit:g,className:e.containerClassName||G.container},N.default.createElement($.default.Group,{id:"password-container",className:e.fieldContainerClassName||G.fieldContainer},N.default.createElement($.default.Label,{className:e.fieldLabelClassName||G.fieldLabel},e.labelPassword||"Password"),N.default.createElement($.default.Control,{id:"password",type:"password",onChange:s,className:e.fieldInputClassName||G.formField,isInvalid:!!o.password}),N.default.createElement($.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||G.fieldError},o.password)),N.default.createElement($.default.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||G.fieldContainer},N.default.createElement($.default.Label,{className:e.fieldLabelClassName||G.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),N.default.createElement($.default.Control,{id:"passwordConfirmation",type:"password",onChange:s,className:e.fieldInputClassName||G.formField,isInvalid:!!o.passwordConfirmation}),N.default.createElement($.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||G.fieldError},o.passwordConfirmation)),!n&&N.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},N.default.createElement(Je.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||G.submitButton},e.labelSubmitButton||"Submit"))))};var Ee=h(require("react"));var Qe=e=>{let{authInfo:t}=w();return Ee.default.createElement("div",null,t?e.children:Ee.default.createElement("div",{className:e.accessDeniedClassName||"ez-on-rails-protected-page-access-denied-container"},e.accessDeniedText||"You must be signed in to see this content."))};var f=h(require("react")),j=h(require("yup")),tt=require("formik");var y=require("react-bootstrap");var et="ecdb1b0ff6a45f088e6cadd7540744d7f9a9209b98787b7f7c9911f4383284a8",Ot=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(et)){var e=document.createElement("style");e.id=et,e.textContent=Ot,document.head.appendChild(e)}})();var _={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var rt=e=>{let{authInfo:t,backendUrl:r,apiVersion:n}=w(),[a,i]=(0,f.useState)(!1),[m,p]=(0,f.useState)(null),[o,s]=(0,f.useState)(void 0),g=u=>{p(u),s(u.unconfirmedEmail)};(0,f.useEffect)(()=>{(async()=>t&&g(await c.getUser(r,t,n)))()},[r,t,n]);let C=async u=>{if(t){i(!0);try{let O=await c.updateUser(r,u,t,n);e.onUserUpdateSuccess(O),g(O),i(!1)}catch(O){e.onUserUpdateError(O),i(!1)}}},T=j.object().shape({username:j.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must have not more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:j.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must not have more than ${e.maxEmailLength||100} characters.`),password:j.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`),passwordConfirmation:j.string().oneOf([j.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation do not match.")}).defined();return t&&f.default.createElement("div",{className:"ez-on-rails-form-outer-container"},m?f.default.createElement(tt.Formik,{initialValues:m,validationSchema:T,enableReinitialize:!0,onSubmit:u=>{C(u)}},({errors:u,values:O,handleChange:d,setFieldValue:b,setFieldError:k,handleSubmit:A})=>f.default.createElement("form",{onSubmit:A,className:e.containerClassName||_.container},!e.hideUsername&&f.default.createElement(y.Form.Group,{id:"username-container",className:e.fieldContainerClassName||_.fieldContainer},f.default.createElement(y.Form.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelUsername||"Username"),f.default.createElement(y.Form.Control,{id:"username",className:e.fieldInputClassName||_.formField,type:"text",value:O.username,onChange:d,isInvalid:!!u.username}),f.default.createElement(y.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||_.fieldError},u.username)),!e.hideEmail&&f.default.createElement(y.Form.Group,{id:"email-container",className:e.fieldContainerClassName||_.fieldContainer},f.default.createElement(y.Form.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelEmail||"Email address"),f.default.createElement(y.Form.Control,{id:"email",className:e.fieldInputClassName||_.formField,type:"email",value:O.email,onChange:d,isInvalid:!!u.email}),o&&f.default.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-unconfirmed-email-text"},e.unconfirmedEmailText||"The following email is not yet confirmed: "," ",o),f.default.createElement(y.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||_.fieldError},u.email)),!e.hidePassword&&f.default.createElement(y.Form.Group,{id:"password-container",className:e.fieldContainerClassName||_.fieldContainer},f.default.createElement(y.Form.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelPassword||"Password"),f.default.createElement(y.Form.Control,{id:"password",className:e.fieldInputClassName||_.formField,type:"password",value:O.password,onChange:d,isInvalid:!!u.password}),f.default.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-password-optional-text"},e.passwordChangeOptionalText||"You must only provide this if you want to change the password."),f.default.createElement(y.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||_.fieldError},u.password)),!e.hidePassword&&f.default.createElement(y.Form.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||_.fieldContainer},f.default.createElement(y.Form.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),f.default.createElement(y.Form.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||_.formField,type:"password",value:O.passwordConfirmation,onChange:d,isInvalid:!!u.passwordConfirmation}),f.default.createElement(y.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||_.fieldError},u.passwordConfirmation)),!e.hideAvatar&&f.default.createElement(y.Form.Group,{id:"avatar-container",className:e.fieldContainerClassName||_.fieldContainer},f.default.createElement(y.Form.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelAvatar||"Avatar"),f.default.createElement("div",{className:e.dropzoneContainerClassName||_.formField},f.default.createElement(ce,{onChange:I=>b("avatar",I.length>0?I[0]:null),files:O.avatar?[O.avatar]:[],multiple:!1,maxFiles:1,onMaxFilesError:()=>k("avatar",e.avatarToManyFilesErrorText||"Only one file is allowed"),maxSize:e.avatarMaxSize||5242880,onMaxSizeError:()=>k("avatar",e.avatarToLargeErrorText||`The file must not be larger than ${Math.round((e.avatarMaxSize||5242880)/1048576)} MB.`),onInvalidTypeError:()=>k("avatar",e.avatarWrongFormatErrorText||"Invalid file format.")})),f.default.createElement(y.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||_.fieldError},u.avatar)),!a&&f.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},f.default.createElement(y.Button,{ref:e.submitRef,type:"submit",variant:"primary",className:e.submitButtonClassName||_.submitButton},e.labelSubmitButton||"Submit")))):f.default.createElement("div",null,"Loading..."))};var nt={fetcher:async([e,t,r="get",n=null,a=void 0,i="1.0"])=>{switch(r=r.toLowerCase(),r){case"post":return c.post(e,t,n,a,i);case"put":return c.put(e,t,n,a,i);case"patch":return c.patch(e,t,n,a,i);case"delete":return c.delete(e,t,n,a,i);default:return c.get(e,t,n,a,i)}}};var kt={client:c,swr:nt,utils:l};var at=require("@d4us1/remawy"),it=h(require("@rails/activestorage")),he=class{uploader;authInfo;apiVersion;constructor(t,r,n){this.uploader=t,this.authInfo=r,this.apiVersion=n}directUploadWillCreateBlobWithXHR(t){let r=c.defaultHttpHeader(this.authInfo,this.apiVersion);Object.keys(r).forEach(n=>{t.setRequestHeader(n,r[n])}),t.upload.addEventListener("progress",n=>this.uploader.onDirectUploadProgress(n))}},ue=class extends at.AbstractUploader{baseUrl;authInfo;apiVersion;constructor(t,r,n){super(),t.endsWith("/")||(t=`${t}/`),this.baseUrl=t,this.authInfo=r,this.apiVersion=n}startUpload(t){let r=new he(this,this.authInfo,this.apiVersion);return new it.DirectUpload(t,`${this.baseUrl}api/active_storage/blobs/create_direct_upload`,r).create((a,i)=>{if(a)this.onError(a);else{let m=`${this.baseUrl}rails/active_storage/blobs/${i.signed_id}/${i.filename}`,p={signedId:i.signed_id,fileName:i.filename};this.onFinish(m,t,p)}}),Promise.resolve(void 0)}onDirectUploadProgress(t){this.onProgress(t.loaded/t.total)}};var ot={uploader:ue};var It={remawy:ot};
//# sourceMappingURL=index.js.map
