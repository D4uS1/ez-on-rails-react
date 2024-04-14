import Ue,{useCallback as Se,useMemo as Le,useState as J}from"react";import{createContext as Ie}from"react";var Z=Ie({apiVersion:"1.0",backendUrl:"http://localhost:3000",authInfo:null,setBackendUrl:e=>{},setAuthInfo:e=>{},setApiVersion:e=>{},setOnUnauthorizedCallback:e=>{}});var Ae=e=>{let[t,r]=J(e.backendUrl),[n,a]=J(e.authInfo||null),[i,m]=J(e.apiVersion),[c,o]=J(()=>e.onUnauthorizedCallback),s=Se(E=>{o(()=>E)},[]),p=Le(()=>{let E={backendUrl:t,authInfo:n||null,apiVersion:i,setBackendUrl:r,setAuthInfo:a,setApiVersion:m,setOnUnauthorizedCallback:s,onUnauthorizedCallback:c};return E.backendUrl.endsWith("/")&&(E.backendUrl=E.backendUrl.slice(0,-1)),E},[t,n,i,s,c]);return Ue.createElement(Z.Provider,{value:p},e.children)};import C,{useState as nt}from"react";import*as A from"yup";import{Formik as at}from"formik";import{useCallback as Je,useEffect as Ke,useState as me}from"react";import{useCallback as Ze}from"react";import{toCamel as Be,toSnake as He}from"convert-keys";var G=class extends Error{httpStatusCode;constructor(t,r){super(),this.message=t,this.httpStatusCode=r}};var oe=e=>e.startsWith("/")?e.slice(1):e,se=e=>e.endsWith("/")?e.slice(0,-1):e,Me=(e,t)=>`${se(e)}/${oe(t)}`,Ve=(e,t)=>`${se(e)}/api/${oe(t)}`,qe=e=>(e=e.replace(/[A-Z]/g,(t,r)=>r===0?t.toLowerCase():"_"+t.toLowerCase()),e=e.replace(/::_/g,"/"),e=e.replace(/\/_/g,"/"),e),Ee=e=>e&&He(e),he=e=>e&&Be(e),De=e=>Object.keys(e).map(t=>t+"="+e[t]).join("&"),K=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}/.test(e)?new Date(e):Array.isArray(e)?e.map(t=>K(t)):(e!==null&&typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=K(e[t])}),e),Q=e=>e instanceof Date?e.toISOString():Array.isArray(e)?e.map(t=>Q(t)):(e!==null&&typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=Q(e[t])}),e),Ge=e=>Q(Ee(e)),$e=e=>!e||typeof e!="object"?e:K(he(e)),je=e=>e?e instanceof G:!1,l={cleanupUrl:se,cleanupPath:oe,toBaseUrl:Me,toApiUrl:Ve,toSnakeCase:Ee,toSnakeCasePath:qe,toCamelCase:he,toGetParameters:De,toDates:K,toDateStrings:Q,toBackendParams:Ge,toFrontendParams:$e,isEzOnRailsHttpError:je};var Ye=e=>{if(e)return{uid:e.uid,client:e.client,expiry:e.expiry,"token-type":e.tokenType,"access-token":e.accessToken}},We=e=>({uid:e.uid,client:e.client,expiry:e.expiry,tokenType:e["token-type"],accessToken:e["access-token"]}),O=(e,t)=>({"Content-Type":"application/json",Accept:"application/json","api-version":t,...Ye(e)}),k=async(e,t,r,n)=>{let a=await fetch(t,{method:e,headers:n,body:r?JSON.stringify(r):null});if(a.status>=400){let c=JSON.stringify(a.body);throw c==="{}"&&(c=`HTTP Error ${a.status}`),new G(c,a.status)}let i={},m=null;try{a.headers.forEach((c,o)=>{i[o]=c}),m=await a.json()}catch{}return{headers:i,body:m}},u={signUp:async(e,t,r)=>{t=l.toBackendParams(t),await k("POST",l.toBaseUrl(e,"users"),{user:t},O(null,r))},signIn:async(e,t,r)=>{t=l.toBackendParams(t);let n=await k("POST",l.toApiUrl(e,"auth/sign_in"),t,O(null,r));return We(n.headers)},signOut:async(e,t,r)=>{await k("DELETE",l.toApiUrl(e,"auth/sign_out"),null,O(t,r))},passwordResetInstructions:async(e,t,r)=>{t=l.toBackendParams(t),await k("POST",l.toBaseUrl(e,"users/password"),{user:t},O(null,r))},passwordReset:async(e,t,r)=>{t=l.toBackendParams(t),await k("PUT",l.toBaseUrl(e,"users/password"),{user:t},O(null,r))},getUser:async(e,t,r)=>{let n=await k("GET",l.toApiUrl(e,"users/me"),null,O(t,r));return l.toFrontendParams(n.body)},updateUser:async(e,t,r,n)=>{let a=t.avatar?.signedId,i={...l.toBackendParams(t),avatar:a},m=await k("PATCH",l.toApiUrl(e,"users/me"),{user:i},O(r,n));return l.toFrontendParams(m.body)},confirmationInstructions:async(e,t,r)=>{t=l.toBackendParams(t),await k("POST",l.toBaseUrl(e,"users/confirmation"),{user:t},O(null,r))},confirmation:async(e,t,r)=>{let n=l.toBaseUrl(e,"users/confirmation");t=l.toBackendParams(t),n=`${n}?${l.toGetParameters(t)}`,await k("GET",n,null,O(null,r))},get:async(e,t,r,n=null,a="1.0",i=void 0)=>{let m=l.toApiUrl(e,t);r&&(r=l.toBackendParams(r)),i&&(r=i(r)),r&&(m=`${m}?${l.toGetParameters(r)}`);let c=await k("GET",m,null,O(n,a));return l.toFrontendParams(c.body)},post:async(e,t,r,n=null,a="1.0",i=void 0)=>{let m=l.toApiUrl(e,t);r&&(r=l.toBackendParams(r)),i&&(r=i(r));let c=await k("POST",m,r,O(n,a));return l.toFrontendParams(c.body)},patch:async(e,t,r,n=null,a="1.0",i=void 0)=>{let m=l.toApiUrl(e,t);r&&(r=l.toBackendParams(r)),i&&(r=i(r));let c=await k("PATCH",m,r,O(n,a));return l.toFrontendParams(c.body)},put:async(e,t,r,n=null,a="1.0",i=void 0)=>{let m=l.toApiUrl(e,t);r&&(r=l.toBackendParams(r)),i&&(r=i(r));let c=await k("PUT",m,r,O(n,a));return l.toFrontendParams(c.body)},delete:async(e,t,r,n=null,a="1.0",i=void 0)=>{let m=l.toApiUrl(e,t);r&&(r=l.toBackendParams(r)),i&&(r=i(r)),r&&(m=`${m}?${l.toGetParameters(r)}`);let c=await k("DELETE",m,null,O(n,a));return l.toFrontendParams(c.body)},defaultHttpHeader:(e,t)=>O(e,t)};import{useContext as Xe}from"react";var _=()=>Xe(Z);var le=e=>{let{backendUrl:t,authInfo:r,apiVersion:n,onUnauthorizedCallback:a}=_();return{call:Ze(async(m,c,o)=>{let s=e?l.cleanupPath(l.cleanupUrl(e)):null,p=l.cleanupPath(m),E=`${s?s+"/":""}${p}`;try{switch(c){case"POST":return u.post(t,E,o,r,n);case"PUT":return u.put(t,E,o,r,n);case"PATCH":return u.patch(t,E,o,r,n);case"DELETE":return u.delete(t,E,o,r,n);default:return u.get(t,E,o,r,n)}}catch(P){if(!l.isEzOnRailsHttpError(P)||P.httpStatusCode!==401||!a)throw P;return a(),null}},[r,n,t,e,a])}};var Qe=(e,t="GET",r,n)=>{let[a,i]=me(null),[m,c]=me(null),[o,s]=me(!1),{call:p}=le(),E=Je(async P=>{try{s(!0),c(null),i(null);let f=await p(e,t,P||r);return i(f),s(!1),f}catch(f){c(f),s(!1)}},[e,p,r,t]);return Ke(()=>{(async()=>n?.skipInitialCall||await E())()},[E,n]),{data:a,error:m,inProgress:o,callApi:E}};import{useCallback as $,useMemo as et,useState as ee}from"react";var tt=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=_(),[a,i]=ee(null),[m,c]=ee(null),[o,s]=ee(!1),[p,E]=ee(null),P=et(()=>l.toSnakeCasePath(e),[e]),f=$(async h=>{E(null),s(!0);try{let z=await h();return s(!1),z}catch(z){return s(!1),E(z),null}},[]),F=$(()=>f(async()=>{let h=await u.get(t,P,null,r,n);return c(h),h}),[t,r,n,P,f]),d=$(h=>f(async()=>{let z=await u.get(t,`${P}/${h}`,null,r,n);return i(z),z}),[t,r,n,P,f]),g=$(h=>f(async()=>{let z=await u.get(t,P,h,r,n);return c(z),z}),[t,r,n,P,f]),R=$(h=>f(async()=>{let z=await u.post(t,P,h,r,n);return i(z),z}),[t,r,n,P,f]),U=$((h,z)=>f(async()=>{let be=await u.patch(t,`${P}/${h}`,z,r,n);return i(be),be}),[t,r,n,P,f]),N=$(h=>f(async()=>{await u.delete(t,`${P}/${h}`,null,r,n),i(null)}),[t,r,n,P,f]);return{record:a,records:m,inProgress:o,error:p,getAll:F,getOne:d,search:g,create:R,update:U,remove:N}};import{Button as it,Form as v}from"react-bootstrap";var Ce="a563a7ebb3e648e97f9484abfe6d2e49b279541947d0d1e8c32963c80c0b3f08",rt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ce)){var e=document.createElement("style");e.id=Ce,e.textContent=rt,document.head.appendChild(e)}})();var w={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var ot=e=>{let{backendUrl:t,apiVersion:r}=_(),[n,a]=nt(!1),i=async o=>{a(!0);try{await u.signUp(t,o,r),e.onRegisterSuccess(o.email),a(!1)}catch(s){e.onRegisterError(s),a(!1)}},m=A.object().shape({username:A.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must not have more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:A.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must have not more than ${e.maxEmailLength||100} characters.`),password:A.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:A.string().oneOf([A.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation must match."),privacyPolicyAccepted:A.boolean().isTrue(e.privacyPolicyNotAcceptedErrorText||"The privacy policy must be accepted.")}).defined();return C.createElement(at,{initialValues:{username:"",email:"",password:"",passwordConfirmation:"",privacyPolicyAccepted:!1},validationSchema:m,onSubmit:o=>{i(o)}},({errors:o,handleChange:s,handleSubmit:p})=>C.createElement("form",{onSubmit:p,className:e.containerClassName||w.container},C.createElement(v.Group,{id:"username-container",className:e.fieldContainerClassName||w.fieldContainer},C.createElement(v.Label,{className:e.fieldLabelClassName||w.fieldLabel},e.labelUsername||"Username"),C.createElement(v.Control,{id:"username",className:e.fieldInputClassName||w.formField,type:"text",onChange:s,isInvalid:!!o.username}),C.createElement(v.Control.Feedback,{className:e.fieldErrorClassName||w.fieldError,type:"invalid"},o.username)),C.createElement(v.Group,{id:"email-container",className:e.fieldContainerClassName||w.fieldContainer},C.createElement(v.Label,{className:e.fieldLabelClassName||w.fieldLabel},e.labelEmail||"Email address"),C.createElement(v.Control,{id:"email",className:e.fieldInputClassName||w.formField,type:"email",onChange:s,isInvalid:!!o.email}),C.createElement(v.Control.Feedback,{className:e.fieldErrorClassName||w.fieldError,type:"invalid"},o.email)),C.createElement(v.Group,{id:"password-container",className:e.fieldContainerClassName||w.fieldContainer},C.createElement(v.Label,{className:e.fieldLabelClassName||w.fieldLabel},e.labelPassword||"Password"),C.createElement(v.Control,{id:"password",className:e.fieldInputClassName||w.formField,type:"password",onChange:s,isInvalid:!!o.password}),C.createElement(v.Control.Feedback,{className:e.fieldErrorClassName||w.fieldError,type:"invalid"},o.password)),C.createElement(v.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||w.fieldContainer},C.createElement(v.Label,{className:e.fieldLabelClassName||w.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),C.createElement(v.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||w.formField,type:"password",onChange:s,isInvalid:!!o.passwordConfirmation}),C.createElement(v.Control.Feedback,{className:e.fieldErrorClassName||w.fieldError,type:"invalid"},o.passwordConfirmation)),C.createElement(v.Group,{id:"privacy-policy-accepted-container",className:e.fieldCheckboxContainerClassName||w.fieldContainer},C.createElement(v.Check,{id:"privacyPolicyAccepted",className:e.fieldCheckboxInputClassName||w.formField,type:"checkbox",label:e.labelPrivacyPolicyAccepted||C.createElement("span",null,"I have read and accept the"," ",C.createElement("a",{href:e.privacyPolicyUrl,target:"_blank",rel:"noopener noreferrer"},"privacy policy")," ","and"," ",C.createElement("a",{href:e.generalTermsUrl,target:"_blank",rel:"noopener noreferrer"},"terms and conditions")," ","."),onChange:s,isInvalid:!!o.privacyPolicyAccepted,feedbackType:"invalid",feedback:o.privacyPolicyAccepted})),!n&&C.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},C.createElement(it,{className:e.submitButtonClassName||w.submitButton,type:"submit",variant:"primary"},e.labelSubmitButton||"Register"))))};import{Formik as lt}from"formik";import H from"react-bootstrap/Form";import mt from"react-bootstrap/Button";import I,{useState as dt}from"react";import*as X from"yup";var xe="7e6e9d3476df316f599dacca7b14adb07957a7b8dc1d0e9b7c5e39cfe0affcbc",st=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(xe)){var e=document.createElement("style");e.id=xe,e.textContent=st,document.head.appendChild(e)}})();var S={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var ct=e=>{let{backendUrl:t,apiVersion:r,setAuthInfo:n}=_(),[a,i]=dt(!1),m=X.object().shape({email:X.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required."),password:X.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"The password is required.")}).defined(),c=async s=>{i(!0);try{let p=await u.signIn(t,s,r);if(!p)throw"No authentication object returned";if(n(p),!e.onLoginSuccess)return;await e.onLoginSuccess(s.email,p,s.stayLoggedIn)}catch(p){e.onLoginError(p),i(!1)}};return I.createElement(lt,{initialValues:{email:"",password:"",stayLoggedIn:!1},onSubmit:s=>{c(s)},validationSchema:m},({errors:s,handleChange:p,handleSubmit:E})=>I.createElement("form",{onSubmit:E,className:e.containerClassName||S.container},I.createElement(H.Group,{id:"email-container",className:e.fieldContainerClassName||S.fieldContainer},I.createElement(H.Label,{className:e.fieldLabelClassName||S.fieldLabel},e.labelEmail||"Email address"),I.createElement(H.Control,{id:"email",type:"email",onChange:p,className:e.fieldInputClassName||S.formField,isInvalid:!!s.email}),I.createElement(H.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||S.fieldError},s.email)),I.createElement(H.Group,{id:"password-container",className:e.fieldContainerClassName||S.fieldContainer},I.createElement(H.Label,{className:e.fieldLabelClassName||S.fieldLabel},e.labelPassword||"Password"),I.createElement(H.Control,{id:"password",type:"password",onChange:p,className:e.fieldInputClassName||S.formField,isInvalid:!!s.password}),I.createElement(H.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||S.fieldError},s.password)),!e.hideStayLoggedIn&&I.createElement(H.Group,{id:"stay-logged-in-container",className:e.fieldCheckboxContainerClassName||S.fieldContainer},I.createElement(H.Check,{id:"stayLoggedIn",className:e.fieldCheckboxInputClassName||S.formField,type:"checkbox",label:e.labelStayLoggedIn||"Stay logged in.",onChange:p})),!a&&I.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},I.createElement(mt,{variant:"primary",type:"submit",className:e.submitButtonClassName||S.submitButton},e.labelSubmitButton||"Login"))))};import V,{useState as ft}from"react";import*as re from"yup";import{Formik as pt}from"formik";import te from"react-bootstrap/Form";import gt from"react-bootstrap/Button";var Pe="184b78f771b5a241c7bfec84028f8a6293ef4cd81c949507f42398c35855848d",ut=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Pe)){var e=document.createElement("style");e.id=Pe,e.textContent=ut,document.head.appendChild(e)}})();var j={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var bt=e=>{let{backendUrl:t,apiVersion:r}=_(),[n,a]=ft(!1),i=re.object().shape({email:re.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required.")}).defined(),m=o=>{a(!0),u.passwordResetInstructions(t,o,r).then(()=>{e.onLostPasswordSuccess(o.email),a(!1)}).catch(s=>{e.onLostPasswordError(s),a(!1)})};return V.createElement(pt,{initialValues:{email:""},onSubmit:o=>{m(o)},validationSchema:i},({errors:o,handleChange:s,handleSubmit:p})=>V.createElement("form",{onSubmit:p,className:e.containerClassName||j.container},V.createElement(te.Group,{id:"email-container",className:e.fieldContainerClassName||j.fieldContainer},V.createElement(te.Label,{className:e.fieldLabelClassName||j.fieldLabel},e.labelEmail||"Email address"),V.createElement(te.Control,{id:"email",type:"email",onChange:s,className:e.fieldInputClassName||j.formField,isInvalid:!!o.email}),V.createElement(te.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||j.fieldError},o.email)),!n&&V.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},V.createElement(gt,{variant:"primary",type:"submit",className:e.submitButtonClassName||j.submitButton},e.labelSubmitButton||"Submit"))))};import q,{useState as ht}from"react";import*as ae from"yup";import{Formik as Ct}from"formik";import ne from"react-bootstrap/Form";import xt from"react-bootstrap/Button";var Te="1b2b7d0082579b5f3b82558d8d63cd1ca5254acc2ba179d1791f3b7274e3007a",Et=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Te)){var e=document.createElement("style");e.id=Te,e.textContent=Et,document.head.appendChild(e)}})();var Y={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Pt=e=>{let{backendUrl:t,apiVersion:r}=_(),[n,a]=ht(!1),i=ae.object().shape({email:ae.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.")}).defined(),m=o=>{a(!0),u.confirmationInstructions(t,o,r).then(()=>{e.onResendConfirmationSuccess(o.email),a(!1)}).catch(s=>{e.onResendConfirmationError(s),a(!1)})};return q.createElement(Ct,{initialValues:{email:""},onSubmit:o=>{m(o)},validationSchema:i},({errors:o,handleChange:s,handleSubmit:p})=>q.createElement("form",{onSubmit:p,className:e.containerClassName||Y.container},q.createElement(ne.Group,{id:"email-container",className:e.fieldContainerClassName||Y.fieldContainer},q.createElement(ne.Label,{className:e.fieldLabelClassName||Y.fieldLabel},e.labelEmail||"Email address"),q.createElement(ne.Control,{id:"email",type:"email",onChange:s,className:e.fieldInputClassName||Y.formField,isInvalid:!!o.email}),q.createElement(ne.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||Y.fieldError},o.email)),!n&&q.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},q.createElement(xt,{variant:"primary",type:"submit",className:e.submitButtonClassName||Y.submitButton},e.labelSubmitButton||"Submit"))))};import we,{useState as _t}from"react";var _e="dfffe9637f7a60407aac13517bbfb11ff47b3851dabc1a2667ff9fbba65f0561",Tt=`._container_q2u8x_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(_e)){var e=document.createElement("style");e.id=_e,e.textContent=Tt,document.head.appendChild(e)}})();var de={container:"_container_q2u8x_1",text:"_text_q2u8x_13"};var wt=e=>{let[t,r]=_t(e.visible),n=()=>{r(!0)};return t?we.createElement("div",{onClick:()=>{r(!1),setTimeout(n,e.dismissTimeout||2e4)},className:de.container},we.createElement("span",{className:de.text},"development")):null};import x from"react";import*as ve from"@rails/activestorage";import{useState as vt}from"react";import zt,{ErrorCode as ue}from"react-dropzone";var ye="2013c8a62515dd4a9efd3fcc3573094b9682aa9201896f90ad5202d6d823fae2",yt=`._dropzoneContainer_14oft_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(ye)){var e=document.createElement("style");e.id=ye,e.textContent=yt,document.head.appendChild(e)}})();var ce={dropzoneContainer:"_dropzoneContainer_14oft_1",pastezoneContainer:"_pastezoneContainer_14oft_19"};var Ft=(e,t)=>`rails/active_storage/blobs/${e}/${t}`,fe=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=_(),[a,i]=vt(0),m=x.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",className:"bi bi-cloud-arrow-up",viewBox:"0 0 16 16"},x.createElement("path",{fillRule:"evenodd",d:"M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"}),x.createElement("path",{d:"M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"})),c=async d=>{await u.delete(t,`active_storage/blobs/${d}`,null,r,n)},o=async(d,g)=>{await c(g);let R=[...e.files];R=R.filter(U=>g!==U.signedId),e.onChange(R),d.stopPropagation()},s=d=>{d.loaded/d.total>=.9999999},p=d=>{if(d.length){if(e.maxFiles){let g=e.maxFiles-(e.files.length+a);if(g<d.length&&e.onMaxFilesError(e.maxFiles),g<=0)return;d=d.slice(0,g)}if(e.maxSize){let g=d.filter(R=>R.size<=e.maxSize);g.length<d.length&&e.onMaxSizeError(e.maxSize),d=g}i(g=>g+d.length),d.forEach(g=>{new ve.DirectUpload(g,l.toApiUrl(t,"active_storage/blobs/create_direct_upload"),{directUploadWillCreateBlobWithXHR:U=>{let N=u.defaultHttpHeader(r,n);Object.keys(N).forEach(h=>{U.setRequestHeader(h,N[h])}),U.upload.addEventListener("progress",s)}}).create((U,N)=>{if(i(h=>h-1),!U){let h={signedId:N.signed_id};g.type.includes("image")?h.path=Ft(N.signed_id,N.filename):h.filename=N.filename;let z=e.files;z.push(h),e.onChange([...z])}})})}},E=d=>{if(!d.clipboardData)return;let g=d.clipboardData.items;if(g===void 0)return;let R=[];for(let U of g){if(e.accept&&!Object.keys(e.accept).some(h=>U.type.match(h)))continue;let N=U.getAsFile();N&&R.push(N)}p(R)},P=e.files.map(d=>x.createElement("div",{key:d.signedId,className:"card w-25 animate__animated animate__fadeIn mb-4",style:{flex:"0 0 auto"}},x.createElement("div",{className:"card-header p-1"},x.createElement("button",{onClick:g=>o(g,d.signedId||""),type:"button",className:"close","aria-label":"Close"},x.createElement("span",{"aria-hidden":"true"},"\xD7"))),x.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},x.createElement("img",{src:l.toBaseUrl(t,d.path||""),alt:d.filename,className:"d-block mw-100 m-auto m-0 rounded p-1"})))),f=[];for(let d=0;d<a;d++)f.push(x.createElement("div",{key:d,className:"card w-25 mb-4",style:{flex:"0 0 auto"}},x.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},x.createElement("div",{className:"p-4 text-center"},x.createElement("div",{className:"spinner-border",role:"status"},x.createElement("span",{className:"sr-only"},"Loading..."))))));let F=d=>{d.some(g=>g.errors[0].code===ue.TooManyFiles)&&e.onMaxFilesError(e.maxFiles),d.some(g=>g.errors[0].code===ue.FileInvalidType)&&e.onInvalidTypeError(e.accept),d.some(g=>g.errors[0].code===ue.FileTooLarge)&&e.onMaxSizeError(e.maxSize)};return x.createElement("div",null,e.pasteZone&&x.createElement("input",{type:"text",className:`w-100 p-2 ${ce.pastezoneContainer}`,value:e.textPastezone||"Copy and paste some files here",onPaste:E,readOnly:!0}),x.createElement(zt,{onDropAccepted:p,multiple:e.multiple,maxFiles:e.maxFiles,maxSize:e.maxSize,onDropRejected:F,accept:e.accept},({getRootProps:d,getInputProps:g})=>x.createElement("section",null,x.createElement("div",{...d(),className:`${ce.dropzoneContainer} p-4 ${e.className}`},x.createElement("input",{...g()}),x.createElement("p",{className:"m-0"},e.textDropzone||"Drag 'n' drop some files here, or click to select files"),P.length>0?x.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},P):x.createElement("div",{className:"m-0"},e.customIcon||m),f.length>0&&x.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},f)))))};import{Formik as Nt}from"formik";import D from"react-bootstrap/Form";import Ot from"react-bootstrap/Button";import L,{useCallback as kt,useState as It}from"react";import*as W from"yup";var ze="26f9b305c337d82f23e38492352522e21d65c6459993e27ae5faf0621aacf97f",Rt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(ze)){var e=document.createElement("style");e.id=ze,e.textContent=Rt,document.head.appendChild(e)}})();var B={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Ut=e=>{let{backendUrl:t,apiVersion:r}=_(),[n,a]=It(!1),i=W.object().shape({password:W.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:W.string().oneOf([W.ref("password")],e.passwordConfirmationMatchErrorText||"The password and its confirmation must match.")}).defined(),m=kt(async o=>{a(!0);try{await u.passwordReset(t,{...o,resetPasswordToken:e.resetPasswordToken},r),await e.onResetPasswordSuccess()}catch(s){e.onResetPasswordError(s),a(!1)}},[e,t,r]);return L.createElement(Nt,{initialValues:{password:"",passwordConfirmation:""},onSubmit:o=>{m(o)},validationSchema:i},({errors:o,handleChange:s,handleSubmit:p})=>L.createElement("form",{onSubmit:p,className:e.containerClassName||B.container},L.createElement(D.Group,{id:"password-container",className:e.fieldContainerClassName||B.fieldContainer},L.createElement(D.Label,{className:e.fieldLabelClassName||B.fieldLabel},e.labelPassword||"Password"),L.createElement(D.Control,{id:"password",type:"password",onChange:s,className:e.fieldInputClassName||B.formField,isInvalid:!!o.password}),L.createElement(D.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||B.fieldError},o.password)),L.createElement(D.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||B.fieldContainer},L.createElement(D.Label,{className:e.fieldLabelClassName||B.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),L.createElement(D.Control,{id:"passwordConfirmation",type:"password",onChange:s,className:e.fieldInputClassName||B.formField,isInvalid:!!o.passwordConfirmation}),L.createElement(D.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||B.fieldError},o.passwordConfirmation)),!n&&L.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},L.createElement(Ot,{variant:"primary",type:"submit",className:e.submitButtonClassName||B.submitButton},e.labelSubmitButton||"Submit"))))};import Fe from"react";var St=e=>{let{authInfo:t}=_();return Fe.createElement("div",null,t?e.children:Fe.createElement("div",{className:e.accessDeniedClassName||"ez-on-rails-protected-page-access-denied-container"},e.accessDeniedText||"You must be signed in to see this content."))};import b,{useEffect as At,useState as pe}from"react";import*as M from"yup";import{Formik as Bt}from"formik";import{Button as Ht,Form as y}from"react-bootstrap";var Re="f9f52e78e174bf1d2ef410620bc0a8a1cdfe4cf1721e3e0c1621166cce52d43b",Lt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Re)){var e=document.createElement("style");e.id=Re,e.textContent=Lt,document.head.appendChild(e)}})();var T={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Mt=e=>{let{authInfo:t,backendUrl:r,apiVersion:n}=_(),[a,i]=pe(!1),[m,c]=pe(null),[o,s]=pe(void 0),p=f=>{c(f),s(f.unconfirmedEmail)};At(()=>{(async()=>t&&p(await u.getUser(r,t,n)))()},[r,t,n]);let E=async f=>{if(t){i(!0);try{let F=await u.updateUser(r,f,t,n);e.onUserUpdateSuccess(F),p(F),i(!1)}catch(F){e.onUserUpdateError(F),i(!1)}}},P=M.object().shape({username:M.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must have not more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:M.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must not have more than ${e.maxEmailLength||100} characters.`),password:M.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`),passwordConfirmation:M.string().oneOf([M.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation do not match.")}).defined();return t&&b.createElement("div",{className:"ez-on-rails-form-outer-container"},m?b.createElement(Bt,{initialValues:m,validationSchema:P,enableReinitialize:!0,onSubmit:f=>{E(f)}},({errors:f,values:F,handleChange:d,setFieldValue:g,setFieldError:R,handleSubmit:U})=>b.createElement("form",{onSubmit:U,className:e.containerClassName||T.container},!e.hideUsername&&b.createElement(y.Group,{id:"username-container",className:e.fieldContainerClassName||T.fieldContainer},b.createElement(y.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelUsername||"Username"),b.createElement(y.Control,{id:"username",className:e.fieldInputClassName||T.formField,type:"text",value:F.username,onChange:d,isInvalid:!!f.username}),b.createElement(y.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},f.username)),!e.hideEmail&&b.createElement(y.Group,{id:"email-container",className:e.fieldContainerClassName||T.fieldContainer},b.createElement(y.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelEmail||"Email address"),b.createElement(y.Control,{id:"email",className:e.fieldInputClassName||T.formField,type:"email",value:F.email,onChange:d,isInvalid:!!f.email}),o&&b.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-unconfirmed-email-text"},e.unconfirmedEmailText||"The following email is not yet confirmed: "," ",o),b.createElement(y.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},f.email)),!e.hidePassword&&b.createElement(y.Group,{id:"password-container",className:e.fieldContainerClassName||T.fieldContainer},b.createElement(y.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelPassword||"Password"),b.createElement(y.Control,{id:"password",className:e.fieldInputClassName||T.formField,type:"password",value:F.password,onChange:d,isInvalid:!!f.password}),b.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-password-optional-text"},e.passwordChangeOptionalText||"You must only provide this if you want to change the password."),b.createElement(y.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},f.password)),!e.hidePassword&&b.createElement(y.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||T.fieldContainer},b.createElement(y.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),b.createElement(y.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||T.formField,type:"password",value:F.passwordConfirmation,onChange:d,isInvalid:!!f.passwordConfirmation}),b.createElement(y.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},f.passwordConfirmation)),!e.hideAvatar&&b.createElement(y.Group,{id:"avatar-container",className:e.fieldContainerClassName||T.fieldContainer},b.createElement(y.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelAvatar||"Avatar"),b.createElement("div",{className:e.dropzoneContainerClassName||T.formField},b.createElement(fe,{onChange:N=>g("avatar",N.length>0?N[0]:null),files:F.avatar?[F.avatar]:[],multiple:!1,maxFiles:1,onMaxFilesError:()=>R("avatar",e.avatarToManyFilesErrorText||"Only one file is allowed"),maxSize:e.avatarMaxSize||5242880,onMaxSizeError:()=>R("avatar",e.avatarToLargeErrorText||`The file must not be larger than ${Math.round((e.avatarMaxSize||5242880)/1048576)} MB.`),onInvalidTypeError:()=>R("avatar",e.avatarWrongFormatErrorText||"Invalid file format.")})),b.createElement(y.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||T.fieldError},f.avatar)),!a&&b.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},b.createElement(Ht,{ref:e.submitRef,type:"submit",variant:"primary",className:e.submitButtonClassName||T.submitButton},e.labelSubmitButton||"Submit")))):b.createElement("div",null,"Loading..."))};var Ne={fetcher:async([e,t,r="get",n=null,a=void 0,i="1.0"])=>{switch(r=r.toLowerCase(),r){case"post":return u.post(e,t,n,a,i);case"put":return u.put(e,t,n,a,i);case"patch":return u.patch(e,t,n,a,i);case"delete":return u.delete(e,t,n,a,i);default:return u.get(e,t,n,a,i)}}};var Pa={client:u,swr:Ne,utils:l};import{AbstractUploader as Vt}from"@d4us1/remawy";import*as Oe from"@rails/activestorage";var ge=class{uploader;authInfo;apiVersion;constructor(t,r,n){this.uploader=t,this.authInfo=r,this.apiVersion=n}directUploadWillCreateBlobWithXHR(t){let r=u.defaultHttpHeader(this.authInfo,this.apiVersion);Object.keys(r).forEach(n=>{t.setRequestHeader(n,r[n])}),t.upload.addEventListener("progress",n=>this.uploader.onDirectUploadProgress(n))}},ie=class extends Vt{baseUrl;authInfo;apiVersion;constructor(t,r,n){super(),t.endsWith("/")||(t=`${t}/`),this.baseUrl=t,this.authInfo=r,this.apiVersion=n}startUpload(t){let r=new ge(this,this.authInfo,this.apiVersion);return new Oe.DirectUpload(t,`${this.baseUrl}api/active_storage/blobs/create_direct_upload`,r).create((a,i)=>{if(a)this.onError(a);else{let m=`${this.baseUrl}rails/active_storage/blobs/${i.signed_id}/${i.filename}`,c={signedId:i.signed_id,fileName:i.filename};this.onFinish(m,t,c)}}),Promise.resolve(void 0)}onDirectUploadProgress(t){this.onProgress(t.loaded/t.total)}};var ke={uploader:ie};var Oa={remawy:ke};export{fe as ActiveStorageDropzone,wt as DevelopmentHint,Ae as EzOnRails,Pa as EzOnRailsHttp,G as EzOnRailsHttpError,Oa as EzOnRailsIntegrations,ct as LoginForm,bt as LostPasswordForm,St as ProtectedPage,ot as RegistrationForm,Pt as ResendConfirmationForm,Ut as ResetPasswordForm,Mt as UpdateUserForm,Qe as useEzApi,le as useEzApiHttpClient,_ as useEzOnRails,tt as useEzScaff};
//# sourceMappingURL=index.js.map
