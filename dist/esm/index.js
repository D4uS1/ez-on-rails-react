import Ue,{useMemo as Se,useState as J}from"react";import{createContext as Ie}from"react";var Z=Ie({apiVersion:"1.0",backendUrl:"http://localhost:3000",authInfo:null,setBackendUrl:e=>{},setAuthInfo:e=>{},setApiVersion:e=>{},setOnUnauthorizedCallback:e=>{}});var Le=e=>{let[t,r]=J(e.backendUrl),[n,i]=J(e.authInfo||null),[o,m]=J(e.apiVersion),[f,a]=J(()=>e.onUnauthorizedCallback),l=P=>{a(()=>P)},p=Se(()=>{let P={backendUrl:t,authInfo:n||null,apiVersion:o,setBackendUrl:r,setAuthInfo:i,setApiVersion:m,setOnUnauthorizedCallback:l};return P.backendUrl.endsWith("/")&&(P.backendUrl=P.backendUrl.slice(0,-1)),P},[t,n,o]);return Ue.createElement(Z.Provider,{value:p},e.children)};import C,{useState as rt}from"react";import*as A from"yup";import{Formik as nt}from"formik";import{useCallback as Ze,useEffect as Je,useState as me}from"react";import{useCallback as Xe}from"react";import{toCamel as Ae,toSnake as Be}from"convert-keys";var oe=e=>e.startsWith("/")?e.slice(1):e,se=e=>e.endsWith("/")?e.slice(0,-1):e,He=(e,t)=>`${se(e)}/${oe(t)}`,Me=(e,t)=>`${se(e)}/api/${oe(t)}`,Ve=e=>(e=e.replace(/[A-Z]/g,(t,r)=>r===0?t.toLowerCase():"_"+t.toLowerCase()),e=e.replace(/::_/g,"/"),e=e.replace(/\/_/g,"/"),e),Ee=e=>e&&Be(e),he=e=>e&&Ae(e),qe=e=>Object.keys(e).map(t=>t+"="+e[t]).join("&"),K=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}/.test(e)?new Date(e):Array.isArray(e)?e.map(t=>K(t)):(e!==null&&typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=K(e[t])}),e),Q=e=>e instanceof Date?e.toISOString():Array.isArray(e)?e.map(t=>Q(t)):(e!==null&&typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=Q(e[t])}),e),De=e=>Q(Ee(e)),Ge=e=>!e||typeof e!="object"?e:K(he(e)),je=e=>e?!!(typeof e=="object"&&e.httpStatusCode):!1,s={cleanupUrl:se,cleanupPath:oe,toBaseUrl:He,toApiUrl:Me,toSnakeCase:Ee,toSnakeCasePath:Ve,toCamelCase:he,toGetParameters:qe,toDates:K,toDateStrings:Q,toBackendParams:De,toFrontendParams:Ge,isEzOnRailsHttpError:je};var W=class extends Error{httpStatusCode;constructor(t,r){super(),this.message=t,this.httpStatusCode=r}};var $e=e=>{if(e)return{uid:e.uid,client:e.client,expiry:e.expiry,"token-type":e.tokenType,"access-token":e.accessToken}},Ye=e=>({uid:e.uid,client:e.client,expiry:e.expiry,tokenType:e["token-type"],accessToken:e["access-token"]}),O=(e,t)=>({"Content-Type":"application/json",Accept:"application/json","api-version":t,...$e(e)}),k=async(e,t,r,n)=>{let i=await fetch(t,{method:e,headers:n,body:r?JSON.stringify(r):null});if(i.status>=400)throw new W(JSON.stringify(i.body),i.status);let o={},m=null;try{i.headers.forEach((f,a)=>{o[a]=f}),m=await i.json()}catch{}return{headers:o,body:m}},c={signUp:async(e,t,r)=>{t=s.toBackendParams(t),await k("POST",s.toBaseUrl(e,"users"),{user:t},O(null,r))},signIn:async(e,t,r)=>{t=s.toBackendParams(t);let n=await k("POST",s.toApiUrl(e,"auth/sign_in"),t,O(null,r));return Ye(n.headers)},signOut:async(e,t,r)=>{await k("DELETE",s.toApiUrl(e,"auth/sign_out"),null,O(t,r))},passwordResetInstructions:async(e,t,r)=>{t=s.toBackendParams(t),await k("POST",s.toBaseUrl(e,"users/password"),{user:t},O(null,r))},passwordReset:async(e,t,r)=>{t=s.toBackendParams(t),await k("PUT",s.toBaseUrl(e,"users/password"),{user:t},O(null,r))},getUser:async(e,t,r)=>{let n=await k("GET",s.toApiUrl(e,"users/me"),null,O(t,r));return s.toFrontendParams(n.body)},updateUser:async(e,t,r,n)=>{let i=t.avatar?.signedId,o={...s.toBackendParams(t),avatar:i},m=await k("PATCH",s.toApiUrl(e,"users/me"),{user:o},O(r,n));return s.toFrontendParams(m.body)},confirmationInstructions:async(e,t,r)=>{t=s.toBackendParams(t),await k("POST",s.toBaseUrl(e,"users/confirmation"),{user:t},O(null,r))},confirmation:async(e,t,r)=>{let n=s.toBaseUrl(e,"users/confirmation");t=s.toBackendParams(t),n=`${n}?${s.toGetParameters(t)}`,await k("GET",n,null,O(null,r))},get:async(e,t,r,n=null,i="1.0",o=void 0)=>{let m=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),o&&(r=o(r)),r&&(m=`${m}?${s.toGetParameters(r)}`);let f=await k("GET",m,null,O(n,i));return s.toFrontendParams(f.body)},post:async(e,t,r,n=null,i="1.0",o=void 0)=>{let m=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),o&&(r=o(r));let f=await k("POST",m,r,O(n,i));return s.toFrontendParams(f.body)},patch:async(e,t,r,n=null,i="1.0",o=void 0)=>{let m=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),o&&(r=o(r));let f=await k("PATCH",m,r,O(n,i));return s.toFrontendParams(f.body)},put:async(e,t,r,n=null,i="1.0",o=void 0)=>{let m=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),o&&(r=o(r));let f=await k("PUT",m,r,O(n,i));return s.toFrontendParams(f.body)},delete:async(e,t,r,n=null,i="1.0",o=void 0)=>{let m=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),o&&(r=o(r)),r&&(m=`${m}?${s.toGetParameters(r)}`);let f=await k("DELETE",m,null,O(n,i));return s.toFrontendParams(f.body)},defaultHttpHeader:(e,t)=>O(e,t)};import{useContext as We}from"react";var T=()=>We(Z);var le=e=>{let{backendUrl:t,authInfo:r,apiVersion:n,onUnauthorizedCallback:i}=T();return{call:Xe(async(m,f,a)=>{let l=e?s.cleanupPath(s.cleanupUrl(e)):null,p=s.cleanupPath(m),P=`${l?l+"/":""}${p}`;try{switch(f){case"POST":return c.post(t,P,a,r,n);case"PUT":return c.put(t,P,a,r,n);case"PATCH":return c.patch(t,P,a,r,n);case"DELETE":return c.delete(t,P,a,r,n);default:return c.get(t,P,a,r,n)}}catch(E){throw!s.isEzOnRailsHttpError(E)||E.httpStatusCode!==401||!i||i(),E}},[r,n,t,e,i])}};var Ke=(e,t="GET",r,n)=>{let{backendUrl:i,authInfo:o,apiVersion:m}=T(),[f,a]=me(null),[l,p]=me(null),[P,E]=me(!1),{call:g}=le(),v=Ze(async d=>{try{E(!0),p(null),a(null);let u=await g(e,t,d||r);return a(u),E(!1),u}catch(u){p(u),E(!1)}},[e]);return Je(()=>{(async()=>n?.skipInitialCall||await v())()},[o,i,m,e]),{data:f,error:l,inProgress:P,callApi:v}};import{useCallback as G,useMemo as Qe,useState as ee}from"react";var et=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=T(),[i,o]=ee(null),[m,f]=ee(null),[a,l]=ee(!1),[p,P]=ee(null),E=Qe(()=>s.toSnakeCasePath(e),[e]),g=G(async h=>{P(null),l(!0);try{let F=await h();return l(!1),F}catch(F){return l(!1),P(F),null}},[]),v=G(()=>g(async()=>{let h=await c.get(t,E,null,r,n);return f(h),h}),[t,r,n,E]),d=G(h=>g(async()=>{let F=await c.get(t,`${E}/${h}`,null,r,n);return o(F),F}),[t,r,n,E]),u=G(h=>g(async()=>{let F=await c.get(t,E,h,r,n);return f(F),F}),[t,r,n,E]),R=G(h=>g(async()=>{let F=await c.post(t,E,h,r,n);return o(F),F}),[t,r,n,E]),U=G((h,F)=>g(async()=>{let be=await c.patch(t,`${E}/${h}`,F,r,n);return o(be),be}),[t,r,n,E]),N=G(h=>g(async()=>{await c.delete(t,`${E}/${h}`,null,r,n),o(null)}),[t,r,n,E]);return{record:i,records:m,inProgress:a,error:p,getAll:v,getOne:d,search:u,create:R,update:U,remove:N}};import{Button as at,Form as z}from"react-bootstrap";var Ce="5486a407c6cc9a9838c654c206900988e8bbb8b943ecde99f09f45977266f5f4",tt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ce)){var e=document.createElement("style");e.id=Ce,e.textContent=tt,document.head.appendChild(e)}})();var w={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var it=e=>{let{backendUrl:t,apiVersion:r}=T(),[n,i]=rt(!1),o=async a=>{i(!0);try{await c.signUp(t,a,r),e.onRegisterSuccess(a.email),i(!1)}catch(l){e.onRegisterError(l),i(!1)}},m=A.object().shape({username:A.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must not have more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:A.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must have not more than ${e.maxEmailLength||100} characters.`),password:A.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:A.string().oneOf([A.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation must match."),privacyPolicyAccepted:A.boolean().isTrue(e.privacyPolicyNotAcceptedErrorText||"The privacy policy must be accepted.")}).defined();return C.createElement(nt,{initialValues:{username:"",email:"",password:"",passwordConfirmation:"",privacyPolicyAccepted:!1},validationSchema:m,onSubmit:a=>{o(a)}},({errors:a,handleChange:l,handleSubmit:p})=>C.createElement("form",{onSubmit:p,className:e.containerClassName||w.container},C.createElement(z.Group,{id:"username-container",className:e.fieldContainerClassName||w.fieldContainer},C.createElement(z.Label,{className:e.fieldLabelClassName||w.fieldLabel},e.labelUsername||"Username"),C.createElement(z.Control,{id:"username",className:e.fieldInputClassName||w.formField,type:"text",onChange:l,isInvalid:!!a.username}),C.createElement(z.Control.Feedback,{className:e.fieldErrorClassName||w.fieldError,type:"invalid"},a.username)),C.createElement(z.Group,{id:"email-container",className:e.fieldContainerClassName||w.fieldContainer},C.createElement(z.Label,{className:e.fieldLabelClassName||w.fieldLabel},e.labelEmail||"Email address"),C.createElement(z.Control,{id:"email",className:e.fieldInputClassName||w.formField,type:"email",onChange:l,isInvalid:!!a.email}),C.createElement(z.Control.Feedback,{className:e.fieldErrorClassName||w.fieldError,type:"invalid"},a.email)),C.createElement(z.Group,{id:"password-container",className:e.fieldContainerClassName||w.fieldContainer},C.createElement(z.Label,{className:e.fieldLabelClassName||w.fieldLabel},e.labelPassword||"Password"),C.createElement(z.Control,{id:"password",className:e.fieldInputClassName||w.formField,type:"password",onChange:l,isInvalid:!!a.password}),C.createElement(z.Control.Feedback,{className:e.fieldErrorClassName||w.fieldError,type:"invalid"},a.password)),C.createElement(z.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||w.fieldContainer},C.createElement(z.Label,{className:e.fieldLabelClassName||w.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),C.createElement(z.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||w.formField,type:"password",onChange:l,isInvalid:!!a.passwordConfirmation}),C.createElement(z.Control.Feedback,{className:e.fieldErrorClassName||w.fieldError,type:"invalid"},a.passwordConfirmation)),C.createElement(z.Group,{id:"privacy-policy-accepted-container",className:e.fieldCheckboxContainerClassName||w.fieldContainer},C.createElement(z.Check,{id:"privacyPolicyAccepted",className:e.fieldCheckboxInputClassName||w.formField,type:"checkbox",label:e.labelPrivacyPolicyAccepted||C.createElement("span",null,"I have read and accept the"," ",C.createElement("a",{href:e.privacyPolicyUrl,target:"_blank",rel:"noopener noreferrer"},"privacy policy")," ","and"," ",C.createElement("a",{href:e.generalTermsUrl,target:"_blank",rel:"noopener noreferrer"},"terms and conditions")," ","."),onChange:l,isInvalid:!!a.privacyPolicyAccepted,feedbackType:"invalid",feedback:a.privacyPolicyAccepted})),!n&&C.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},C.createElement(at,{className:e.submitButtonClassName||w.submitButton,type:"submit",variant:"primary"},e.labelSubmitButton||"Register"))))};import{Formik as st}from"formik";import H from"react-bootstrap/Form";import lt from"react-bootstrap/Button";import I,{useState as mt}from"react";import*as X from"yup";var xe="781072b1c4a0c0791de4c978bc25e45fd2cb54a30b1388298929912ab6b2ac68",ot=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(xe)){var e=document.createElement("style");e.id=xe,e.textContent=ot,document.head.appendChild(e)}})();var S={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var dt=e=>{let{backendUrl:t,apiVersion:r,setAuthInfo:n}=T(),[i,o]=mt(!1),m=X.object().shape({email:X.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required."),password:X.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"The password is required.")}).defined(),f=async l=>{o(!0);try{let p=await c.signIn(t,l,r);if(!p)throw"No authentication object returned";if(n(p),!e.onLoginSuccess)return;await e.onLoginSuccess(l.email,p,l.stayLoggedIn)}catch(p){e.onLoginError(p),o(!1)}};return I.createElement(st,{initialValues:{email:"",password:"",stayLoggedIn:!1},onSubmit:l=>{f(l)},validationSchema:m},({errors:l,handleChange:p,handleSubmit:P})=>I.createElement("form",{onSubmit:P,className:e.containerClassName||S.container},I.createElement(H.Group,{id:"email-container",className:e.fieldContainerClassName||S.fieldContainer},I.createElement(H.Label,{className:e.fieldLabelClassName||S.fieldLabel},e.labelEmail||"Email address"),I.createElement(H.Control,{id:"email",type:"email",onChange:p,className:e.fieldInputClassName||S.formField,isInvalid:!!l.email}),I.createElement(H.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||S.fieldError},l.email)),I.createElement(H.Group,{id:"password-container",className:e.fieldContainerClassName||S.fieldContainer},I.createElement(H.Label,{className:e.fieldLabelClassName||S.fieldLabel},e.labelPassword||"Password"),I.createElement(H.Control,{id:"password",type:"password",onChange:p,className:e.fieldInputClassName||S.formField,isInvalid:!!l.password}),I.createElement(H.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||S.fieldError},l.password)),!e.hideStayLoggedIn&&I.createElement(H.Group,{id:"stay-logged-in-container",className:e.fieldCheckboxContainerClassName||S.fieldContainer},I.createElement(H.Check,{id:"stayLoggedIn",className:e.fieldCheckboxInputClassName||S.formField,type:"checkbox",label:e.labelStayLoggedIn||"Stay logged in.",onChange:p})),!i&&I.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},I.createElement(lt,{variant:"primary",type:"submit",className:e.submitButtonClassName||S.submitButton},e.labelSubmitButton||"Login"))))};import V,{useState as ut}from"react";import*as re from"yup";import{Formik as ft}from"formik";import te from"react-bootstrap/Form";import pt from"react-bootstrap/Button";var Pe="970f0e915dd980c7c59e2cd9cefd007eaa512a5bcce916f6ac929f7154783892",ct=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Pe)){var e=document.createElement("style");e.id=Pe,e.textContent=ct,document.head.appendChild(e)}})();var j={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var gt=e=>{let{backendUrl:t,apiVersion:r}=T(),[n,i]=ut(!1),o=re.object().shape({email:re.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required.")}).defined(),m=a=>{i(!0),c.passwordResetInstructions(t,a,r).then(()=>{e.onLostPasswordSuccess(a.email),i(!1)}).catch(l=>{e.onLostPasswordError(l),i(!1)})};return V.createElement(ft,{initialValues:{email:""},onSubmit:a=>{m(a)},validationSchema:o},({errors:a,handleChange:l,handleSubmit:p})=>V.createElement("form",{onSubmit:p,className:e.containerClassName||j.container},V.createElement(te.Group,{id:"email-container",className:e.fieldContainerClassName||j.fieldContainer},V.createElement(te.Label,{className:e.fieldLabelClassName||j.fieldLabel},e.labelEmail||"Email address"),V.createElement(te.Control,{id:"email",type:"email",onChange:l,className:e.fieldInputClassName||j.formField,isInvalid:!!a.email}),V.createElement(te.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||j.fieldError},a.email)),!n&&V.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},V.createElement(pt,{variant:"primary",type:"submit",className:e.submitButtonClassName||j.submitButton},e.labelSubmitButton||"Submit"))))};import q,{useState as Et}from"react";import*as ae from"yup";import{Formik as ht}from"formik";import ne from"react-bootstrap/Form";import Ct from"react-bootstrap/Button";var Te="89067497cd830f446a266e879fec9c70991ddc99d14e5bbb0de7b169d1e453c6",bt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Te)){var e=document.createElement("style");e.id=Te,e.textContent=bt,document.head.appendChild(e)}})();var $={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var xt=e=>{let{backendUrl:t,apiVersion:r}=T(),[n,i]=Et(!1),o=ae.object().shape({email:ae.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.")}).defined(),m=a=>{i(!0),c.confirmationInstructions(t,a,r).then(()=>{e.onResendConfirmationSuccess(a.email),i(!1)}).catch(l=>{e.onResendConfirmationError(l),i(!1)})};return q.createElement(ht,{initialValues:{email:""},onSubmit:a=>{m(a)},validationSchema:o},({errors:a,handleChange:l,handleSubmit:p})=>q.createElement("form",{onSubmit:p,className:e.containerClassName||$.container},q.createElement(ne.Group,{id:"email-container",className:e.fieldContainerClassName||$.fieldContainer},q.createElement(ne.Label,{className:e.fieldLabelClassName||$.fieldLabel},e.labelEmail||"Email address"),q.createElement(ne.Control,{id:"email",type:"email",onChange:l,className:e.fieldInputClassName||$.formField,isInvalid:!!a.email}),q.createElement(ne.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||$.fieldError},a.email)),!n&&q.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},q.createElement(Ct,{variant:"primary",type:"submit",className:e.submitButtonClassName||$.submitButton},e.labelSubmitButton||"Submit"))))};import we,{useState as Tt}from"react";var _e="1a37a232d6538b666a3098b0793d592912f4208a31298523eb30dc04b75fe58b",Pt=`._container_q2u8x_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(_e)){var e=document.createElement("style");e.id=_e,e.textContent=Pt,document.head.appendChild(e)}})();var de={container:"_container_q2u8x_1",text:"_text_q2u8x_13"};var _t=e=>{let[t,r]=Tt(e.visible),n=()=>{r(!0)};return t?we.createElement("div",{onClick:()=>{r(!1),setTimeout(n,e.dismissTimeout||2e4)},className:de.container},we.createElement("span",{className:de.text},"development")):null};import x from"react";import*as ve from"@rails/activestorage";import{useState as yt}from"react";import vt,{ErrorCode as ue,useDropzone as zt}from"react-dropzone";var ye="9875bc81e8742aada173e8937a36f75b7005a85d3fac6906c31864f58987f23d",wt=`._dropzoneContainer_14oft_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(ye)){var e=document.createElement("style");e.id=ye,e.textContent=wt,document.head.appendChild(e)}})();var ce={dropzoneContainer:"_dropzoneContainer_14oft_1",pastezoneContainer:"_pastezoneContainer_14oft_19"};var Ft=(e,t)=>`rails/active_storage/blobs/${e}/${t}`,fe=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=T(),[i,o]=yt(0),m=x.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",className:"bi bi-cloud-arrow-up",viewBox:"0 0 16 16"},x.createElement("path",{fillRule:"evenodd",d:"M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"}),x.createElement("path",{d:"M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"})),f=async d=>{await c.delete(t,`active_storage/blobs/${d}`,null,r,n)},a=async(d,u)=>{await f(u);let R=[...e.files];R=R.filter(U=>u!==U.signedId),e.onChange(R),d.stopPropagation()},l=d=>{d.loaded/d.total>=.9999999},p=d=>{if(d.length){if(e.maxFiles){let u=e.maxFiles-(e.files.length+i);if(u<d.length&&e.onMaxFilesError(e.maxFiles),u<=0)return;d=d.slice(0,u)}if(e.maxSize){let u=d.filter(R=>R.size<=e.maxSize);u.length<d.length&&e.onMaxSizeError(e.maxSize),d=u}o(u=>u+d.length),d.forEach(u=>{new ve.DirectUpload(u,s.toApiUrl(t,"active_storage/blobs/create_direct_upload"),{directUploadWillCreateBlobWithXHR:U=>{let N=c.defaultHttpHeader(r,n);Object.keys(N).forEach(h=>{U.setRequestHeader(h,N[h])}),U.upload.addEventListener("progress",l)}}).create((U,N)=>{if(o(h=>h-1),!U){let h={signedId:N.signed_id};u.type.includes("image")?h.path=Ft(N.signed_id,N.filename):h.filename=N.filename;let F=e.files;F.push(h),e.onChange([...F])}})})}},P=d=>{if(!d.clipboardData)return;let u=d.clipboardData.items;if(u===void 0)return;let R=[];for(let U of u){if(e.accept&&!Object.keys(e.accept).some(h=>U.type.match(h)))continue;let N=U.getAsFile();N&&R.push(N)}p(R)},E=e.files.map(d=>x.createElement("div",{key:d.signedId,className:"card w-25 animate__animated animate__fadeIn mb-4",style:{flex:"0 0 auto"}},x.createElement("div",{className:"card-header p-1"},x.createElement("button",{onClick:u=>a(u,d.signedId||""),type:"button",className:"close","aria-label":"Close"},x.createElement("span",{"aria-hidden":"true"},"\xD7"))),x.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},x.createElement("img",{src:s.toBaseUrl(t,d.path||""),alt:d.filename,className:"d-block mw-100 m-auto m-0 rounded p-1"})))),g=[];for(let d=0;d<i;d++)g.push(x.createElement("div",{key:d,className:"card w-25 mb-4",style:{flex:"0 0 auto"}},x.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},x.createElement("div",{className:"p-4 text-center"},x.createElement("div",{className:"spinner-border",role:"status"},x.createElement("span",{className:"sr-only"},"Loading..."))))));let v=d=>{d.some(u=>u.errors[0].code===ue.TooManyFiles)&&e.onMaxFilesError(e.maxFiles),d.some(u=>u.errors[0].code===ue.FileInvalidType)&&e.onInvalidTypeError(e.accept),d.some(u=>u.errors[0].code===ue.FileTooLarge)&&e.onMaxSizeError(e.maxSize)};return x.createElement("div",null,e.pasteZone&&x.createElement("input",{type:"text",className:`w-100 p-2 ${ce.pastezoneContainer}`,value:e.textPastezone||"Copy and paste some files here",onPaste:P,readOnly:!0}),x.createElement(vt,{onDropAccepted:p,multiple:e.multiple,maxFiles:e.maxFiles,maxSize:e.maxSize,onDropRejected:v,accept:e.accept},({getRootProps:d,getInputProps:u}=zt())=>x.createElement("section",null,x.createElement("div",{...d(),className:`${ce.dropzoneContainer} p-4 ${e.className}`},x.createElement("input",{...u()}),x.createElement("p",{className:"m-0"},e.textDropzone||"Drag 'n' drop some files here, or click to select files"),E.length>0?x.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},E):x.createElement("div",{className:"m-0"},e.customIcon||m),g.length>0&&x.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},g)))))};import{Formik as Nt}from"formik";import D from"react-bootstrap/Form";import Ot from"react-bootstrap/Button";import L,{useCallback as kt,useState as It}from"react";import*as Y from"yup";var ze="7332d853674ce02b006e7122e514fbd058cbcb1414e924ec9e4a742071544e11",Rt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(ze)){var e=document.createElement("style");e.id=ze,e.textContent=Rt,document.head.appendChild(e)}})();var B={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Ut=e=>{let{backendUrl:t,apiVersion:r}=T(),[n,i]=It(!1),o=Y.object().shape({password:Y.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:Y.string().oneOf([Y.ref("password")],e.passwordConfirmationMatchErrorText||"The password and its confirmation must match.")}).defined(),m=kt(async a=>{i(!0);try{await c.passwordReset(t,{...a,resetPasswordToken:e.resetPasswordToken},r),await e.onResetPasswordSuccess()}catch(l){e.onResetPasswordError(l),i(!1)}},[e.resetPasswordToken]);return L.createElement(Nt,{initialValues:{password:"",passwordConfirmation:""},onSubmit:a=>{m(a)},validationSchema:o},({errors:a,handleChange:l,handleSubmit:p})=>L.createElement("form",{onSubmit:p,className:e.containerClassName||B.container},L.createElement(D.Group,{id:"password-container",className:e.fieldContainerClassName||B.fieldContainer},L.createElement(D.Label,{className:e.fieldLabelClassName||B.fieldLabel},e.labelPassword||"Password"),L.createElement(D.Control,{id:"password",type:"password",onChange:l,className:e.fieldInputClassName||B.formField,isInvalid:!!a.password}),L.createElement(D.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||B.fieldError},a.password)),L.createElement(D.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||B.fieldContainer},L.createElement(D.Label,{className:e.fieldLabelClassName||B.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),L.createElement(D.Control,{id:"passwordConfirmation",type:"password",onChange:l,className:e.fieldInputClassName||B.formField,isInvalid:!!a.passwordConfirmation}),L.createElement(D.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||B.fieldError},a.passwordConfirmation)),!n&&L.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},L.createElement(Ot,{variant:"primary",type:"submit",className:e.submitButtonClassName||B.submitButton},e.labelSubmitButton||"Submit"))))};import Fe from"react";var St=e=>{let{authInfo:t}=T();return Fe.createElement("div",null,t?e.children:Fe.createElement("div",{className:e.accessDeniedClassName||"ez-on-rails-protected-page-access-denied-container"},e.accessDeniedText||"You must be signed in to see this content."))};import b,{useEffect as At,useState as pe}from"react";import*as M from"yup";import{Formik as Bt}from"formik";import{Button as Ht,Form as y}from"react-bootstrap";var Re="675576c623a58703cd8a2f0b18516b57b5751d083402c51e10fe31a297f33a1e",Lt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Re)){var e=document.createElement("style");e.id=Re,e.textContent=Lt,document.head.appendChild(e)}})();var _={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Mt=e=>{let{authInfo:t,backendUrl:r,apiVersion:n}=T(),[i,o]=pe(!1),[m,f]=pe(null),[a,l]=pe(void 0),p=g=>{f(g),l(g.unconfirmedEmail)};At(()=>{(async()=>t&&p(await c.getUser(r,t,n)))()},[]);let P=async g=>{if(t){o(!0);try{let v=await c.updateUser(r,g,t,n);e.onUserUpdateSuccess(v),p(v),o(!1)}catch(v){e.onUserUpdateError(v),o(!1)}}},E=M.object().shape({username:M.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must have not more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:M.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must not have more than ${e.maxEmailLength||100} characters.`),password:M.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`),passwordConfirmation:M.string().oneOf([M.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation do not match.")}).defined();return t&&b.createElement("div",{className:"ez-on-rails-form-outer-container"},m?b.createElement(Bt,{initialValues:m,validationSchema:E,enableReinitialize:!0,onSubmit:g=>{P(g)}},({errors:g,values:v,handleChange:d,setFieldValue:u,setFieldError:R,handleSubmit:U})=>b.createElement("form",{onSubmit:U,className:e.containerClassName||_.container},!e.hideUsername&&b.createElement(y.Group,{id:"username-container",className:e.fieldContainerClassName||_.fieldContainer},b.createElement(y.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelUsername||"Username"),b.createElement(y.Control,{id:"username",className:e.fieldInputClassName||_.formField,type:"text",value:v.username,onChange:d,isInvalid:!!g.username}),b.createElement(y.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||_.fieldError},g.username)),!e.hideEmail&&b.createElement(y.Group,{id:"email-container",className:e.fieldContainerClassName||_.fieldContainer},b.createElement(y.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelEmail||"Email address"),b.createElement(y.Control,{id:"email",className:e.fieldInputClassName||_.formField,type:"email",value:v.email,onChange:d,isInvalid:!!g.email}),a&&b.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-unconfirmed-email-text"},e.unconfirmedEmailText||"The following email is not yet confirmed: "," ",a),b.createElement(y.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||_.fieldError},g.email)),!e.hidePassword&&b.createElement(y.Group,{id:"password-container",className:e.fieldContainerClassName||_.fieldContainer},b.createElement(y.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelPassword||"Password"),b.createElement(y.Control,{id:"password",className:e.fieldInputClassName||_.formField,type:"password",value:v.password,onChange:d,isInvalid:!!g.password}),b.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-password-optional-text"},e.passwordChangeOptionalText||"You must only provide this if you want to change the password."),b.createElement(y.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||_.fieldError},g.password)),!e.hidePassword&&b.createElement(y.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||_.fieldContainer},b.createElement(y.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),b.createElement(y.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||_.formField,type:"password",value:v.passwordConfirmation,onChange:d,isInvalid:!!g.passwordConfirmation}),b.createElement(y.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||_.fieldError},g.passwordConfirmation)),!e.hideAvatar&&b.createElement(y.Group,{id:"avatar-container",className:e.fieldContainerClassName||_.fieldContainer},b.createElement(y.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelAvatar||"Avatar"),b.createElement("div",{className:e.dropzoneContainerClassName||_.formField},b.createElement(fe,{onChange:N=>u("avatar",N.length>0?N[0]:null),files:v.avatar?[v.avatar]:[],multiple:!1,maxFiles:1,onMaxFilesError:()=>R("avatar",e.avatarToManyFilesErrorText||"Only one file is allowed"),maxSize:e.avatarMaxSize||5242880,onMaxSizeError:()=>R("avatar",e.avatarToLargeErrorText||`The file must not be larger than ${Math.round((e.avatarMaxSize||5242880)/1048576)} MB.`),onInvalidTypeError:()=>R("avatar",e.avatarWrongFormatErrorText||"Invalid file format.")})),b.createElement(y.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||_.fieldError},g.avatar)),!i&&b.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},b.createElement(Ht,{ref:e.submitRef,type:"submit",variant:"primary",className:e.submitButtonClassName||_.submitButton},e.labelSubmitButton||"Submit")))):b.createElement("div",null,"Loading..."))};var Ne={fetcher:async(e,t,r="get",n=null,i=void 0,o="1.0")=>{switch(r=r.toLowerCase(),r){case"post":return c.post(e,t,n,i,o);case"put":return c.put(e,t,n,i,o);case"patch":return c.patch(e,t,n,i,o);case"delete":return c.delete(e,t,n,i,o);default:return c.get(e,t,n,i,o)}}};var Ta={client:c,swr:Ne,utils:s};import{AbstractUploader as Vt}from"@d4us1/remawy";import*as Oe from"@rails/activestorage";var ge=class{uploader;authInfo;apiVersion;constructor(t,r,n){this.uploader=t,this.authInfo=r,this.apiVersion=n}directUploadWillCreateBlobWithXHR(t){let r=c.defaultHttpHeader(this.authInfo,this.apiVersion);Object.keys(r).forEach(n=>{t.setRequestHeader(n,r[n])}),t.upload.addEventListener("progress",n=>this.uploader.onDirectUploadProgress(n))}},ie=class extends Vt{baseUrl;authInfo;apiVersion;constructor(t,r,n){super(),t.endsWith("/")||(t=`${t}/`),this.baseUrl=t,this.authInfo=r,this.apiVersion=n}startUpload(t){let r=new ge(this,this.authInfo,this.apiVersion);return new Oe.DirectUpload(t,`${this.baseUrl}api/active_storage/blobs/create_direct_upload`,r).create((i,o)=>{if(i)this.onError(i);else{let m=`${this.baseUrl}rails/active_storage/blobs/${o.signed_id}/${o.filename}`,f={signedId:o.signed_id,fileName:o.filename};this.onFinish(m,t,f)}}),Promise.resolve(void 0)}onDirectUploadProgress(t){this.onProgress(t.loaded/t.total)}};var ke={uploader:ie};var ka={remawy:ke};export{fe as ActiveStorageDropzone,_t as DevelopmentHint,Le as EzOnRails,Ta as EzOnRailsHttp,W as EzOnRailsHttpError,ka as EzOnRailsIntegrations,dt as LoginForm,gt as LostPasswordForm,St as ProtectedPage,it as RegistrationForm,xt as ResendConfirmationForm,Ut as ResetPasswordForm,Mt as UpdateUserForm,Ke as useEzApi,le as useEzApiHttpClient,T as useEzOnRails,et as useEzScaff};
//# sourceMappingURL=index.js.map
