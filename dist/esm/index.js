import ke,{useMemo as Le,useState as ie}from"react";import{createContext as Se}from"react";var Z=Se({apiVersion:"1.0",backendUrl:"http://localhost:3000",authInfo:null,setBackendUrl:e=>{},setAuthInfo:e=>{},setApiVersion:e=>{}});var Ue=e=>{let[t,r]=ie(e.backendUrl),[n,o]=ie(e.authInfo||null),[a,d]=ie(e.apiVersion),u=Le(()=>{let i={backendUrl:t,authInfo:n||null,apiVersion:a,setBackendUrl:r,setAuthInfo:o,setApiVersion:d};return i.backendUrl.endsWith("/")&&(i.backendUrl=i.backendUrl.slice(0,-1)),i},[t,n,a]);return ke.createElement(Z.Provider,{value:u},e.children)};import h,{useState as rt}from"react";import*as A from"yup";import{Formik as nt}from"formik";import{useCallback as Xe,useEffect as Ze,useRef as Je,useState as me}from"react";import{useCallback as We}from"react";import{toCamel as Ae,toSnake as Be}from"convert-keys";var oe=e=>e.startsWith("/")?e.slice(1):e,se=e=>e.endsWith("/")?e.slice(0,-1):e,He=(e,t)=>`${se(e)}/${oe(t)}`,Me=(e,t)=>`${se(e)}/api/${oe(t)}`,Ve=e=>(e=e.replace(/[A-Z]/g,(t,r)=>r===0?t.toLowerCase():"_"+t.toLowerCase()),e=e.replace(/::_/g,"/"),e=e.replace(/\/_/g,"/"),e),Ee=e=>e&&Be(e),he=e=>e&&Ae(e),qe=e=>Object.keys(e).map(t=>t+"="+e[t]).join("&"),J=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}/.test(e)?new Date(e):Array.isArray(e)?e.map(t=>J(t)):(e!==null&&typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=J(e[t])}),e),K=e=>e instanceof Date?e.toISOString():Array.isArray(e)?e.map(t=>K(t)):(e!==null&&typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=K(e[t])}),e),De=e=>K(Ee(e)),Ge=e=>!e||typeof e!="object"?e:J(he(e)),s={cleanupUrl:se,cleanupPath:oe,toBaseUrl:He,toApiUrl:Me,toSnakeCase:Ee,toSnakeCasePath:Ve,toCamelCase:he,toGetParameters:qe,toDates:J,toDateStrings:K,toBackendParams:De,toFrontendParams:Ge};var W=class extends Error{httpStatusCode;constructor(t,r){super(),this.message=t,this.httpStatusCode=r}};var $e=e=>{if(e)return{uid:e.uid,client:e.client,expiry:e.expiry,"token-type":e.tokenType,"access-token":e.accessToken}},je=e=>({uid:e.uid,client:e.client,expiry:e.expiry,tokenType:e["token-type"],accessToken:e["access-token"]}),N=(e,t)=>({"Content-Type":"application/json",Accept:"application/json","api-version":t,...$e(e)}),O=async(e,t,r,n)=>{let o=await fetch(t,{method:e,headers:n,body:r?JSON.stringify(r):null});if(o.status>=400)throw new W(JSON.stringify(o.body),o.status);let a={},d=null;try{o.headers.forEach((u,i)=>{a[i]=u}),d=await o.json()}catch{}return{headers:a,body:d}},c={signUp:async(e,t,r)=>{t=s.toBackendParams(t),await O("POST",s.toBaseUrl(e,"users"),{user:t},N(null,r))},signIn:async(e,t,r)=>{t=s.toBackendParams(t);let n=await O("POST",s.toApiUrl(e,"auth/sign_in"),t,N(null,r));return je(n.headers)},signOut:async(e,t,r)=>{await O("DELETE",s.toApiUrl(e,"auth/sign_out"),null,N(t,r))},passwordResetInstructions:async(e,t,r)=>{t=s.toBackendParams(t),await O("POST",s.toBaseUrl(e,"users/password"),{user:t},N(null,r))},passwordReset:async(e,t,r)=>{t=s.toBackendParams(t),await O("PUT",s.toBaseUrl(e,"users/password"),{user:t},N(null,r))},getUser:async(e,t,r)=>{let n=await O("GET",s.toApiUrl(e,"users/me"),null,N(t,r));return s.toFrontendParams(n.body)},updateUser:async(e,t,r,n)=>{let o=t.avatar?.signedId,a={...s.toBackendParams(t),avatar:o},d=await O("PATCH",s.toApiUrl(e,"users/me"),{user:a},N(r,n));return s.toFrontendParams(d.body)},confirmationInstructions:async(e,t,r)=>{t=s.toBackendParams(t),await O("POST",s.toBaseUrl(e,"users/confirmation"),{user:t},N(null,r))},confirmation:async(e,t,r)=>{let n=s.toBaseUrl(e,"users/confirmation");t=s.toBackendParams(t),n=`${n}?${s.toGetParameters(t)}`,await O("GET",n,null,N(null,r))},get:async(e,t,r,n=null,o="1.0",a=void 0)=>{let d=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),a&&(r=a(r)),r&&(d=`${d}?${s.toGetParameters(r)}`);let u=await O("GET",d,null,N(n,o));return s.toFrontendParams(u.body)},post:async(e,t,r,n=null,o="1.0",a=void 0)=>{let d=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),a&&(r=a(r));let u=await O("POST",d,r,N(n,o));return s.toFrontendParams(u.body)},patch:async(e,t,r,n=null,o="1.0",a=void 0)=>{let d=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),a&&(r=a(r));let u=await O("PATCH",d,r,N(n,o));return s.toFrontendParams(u.body)},put:async(e,t,r,n=null,o="1.0",a=void 0)=>{let d=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),a&&(r=a(r));let u=await O("PUT",d,r,N(n,o));return s.toFrontendParams(u.body)},delete:async(e,t,r,n=null,o="1.0",a=void 0)=>{let d=s.toApiUrl(e,t);r&&(r=s.toBackendParams(r)),a&&(r=a(r)),r&&(d=`${d}?${s.toGetParameters(r)}`);let u=await O("DELETE",d,null,N(n,o));return s.toFrontendParams(u.body)},defaultHttpHeader:(e,t)=>N(e,t)};import{useContext as Ye}from"react";var P=()=>Ye(Z);var le=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=P();return{call:We(async(a,d,u)=>{let i=e?s.cleanupPath(s.cleanupUrl(e)):null,l=s.cleanupPath(a),f=`${i?i+"/":""}${l}`;switch(d){case"POST":return c.post(t,f,u,r,n);case"PUT":return c.put(t,f,u,r,n);case"PATCH":return c.patch(t,f,u,r,n);case"DELETE":return c.delete(t,f,u,r,n);default:return c.get(t,f,u,r,n)}},[r,n,t,e])}};var Ke=(e,t="GET",r,n)=>{let o=Je(e),{backendUrl:a,authInfo:d,apiVersion:u}=P(),[i,l]=me(null),[f,U]=me(null),[w,g]=me(!1),{call:F}=le(),m=Xe(async p=>{try{g(!0),U(null),l(null);let _=await F(e,t,p||r);return l(_),g(!1),_}catch(_){U(_),g(!1)}},[e]);return Ze(()=>{(async()=>e!==o.current&&(n?.skipInitialCall||(console.log("executing again"),await m()),o.current=e))()},[d,a,u,e]),{data:i,error:f,inProgress:w,callApi:m}};import{useCallback as G,useMemo as Qe,useState as Q}from"react";var et=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=P(),[o,a]=Q(null),[d,u]=Q(null),[i,l]=Q(!1),[f,U]=Q(null),w=Qe(()=>s.toSnakeCasePath(e),[e]),g=G(async E=>{U(null),l(!0);try{let z=await E();return l(!1),z}catch(z){return l(!1),U(z),null}},[]),F=G(()=>g(async()=>{let E=await c.get(t,w,null,r,n);return u(E),E}),[t,r,n,w]),m=G(E=>g(async()=>{let z=await c.get(t,`${w}/${E}`,null,r,n);return a(z),z}),[t,r,n,w]),p=G(E=>g(async()=>{let z=await c.get(t,w,E,r,n);return u(z),z}),[t,r,n,w]),_=G(E=>g(async()=>{let z=await c.post(t,w,E,r,n);return a(z),z}),[t,r,n,w]),S=G((E,z)=>g(async()=>{let be=await c.patch(t,`${w}/${E}`,z,r,n);return a(be),be}),[t,r,n,w]),R=G(E=>g(async()=>{await c.delete(t,`${w}/${E}`,null,r,n),a(null)}),[t,r,n,w]);return{record:o,records:d,inProgress:i,error:f,getAll:F,getOne:m,search:p,create:_,update:S,remove:R}};import{Button as at,Form as v}from"react-bootstrap";var Ce="1b2b7d0082579b5f3b82558d8d63cd1ca5254acc2ba179d1791f3b7274e3007a",tt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ce)){var e=document.createElement("style");e.id=Ce,e.textContent=tt,document.head.appendChild(e)}})();var T={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var it=e=>{let{backendUrl:t,apiVersion:r}=P(),[n,o]=rt(!1),a=async i=>{o(!0);try{await c.signUp(t,i,r),e.onRegisterSuccess(i.email),o(!1)}catch(l){e.onRegisterError(l),o(!1)}},d=A.object().shape({username:A.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must not have more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:A.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must have not more than ${e.maxEmailLength||100} characters.`),password:A.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:A.string().oneOf([A.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation must match."),privacyPolicyAccepted:A.boolean().isTrue(e.privacyPolicyNotAcceptedErrorText||"The privacy policy must be accepted.")}).defined();return h.createElement(nt,{initialValues:{username:"",email:"",password:"",passwordConfirmation:"",privacyPolicyAccepted:!1},validationSchema:d,onSubmit:i=>{a(i)}},({errors:i,handleChange:l,handleSubmit:f})=>h.createElement("form",{onSubmit:f,className:e.containerClassName||T.container},h.createElement(v.Group,{id:"username-container",className:e.fieldContainerClassName||T.fieldContainer},h.createElement(v.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelUsername||"Username"),h.createElement(v.Control,{id:"username",className:e.fieldInputClassName||T.formField,type:"text",onChange:l,isInvalid:!!i.username}),h.createElement(v.Control.Feedback,{className:e.fieldErrorClassName||T.fieldError,type:"invalid"},i.username)),h.createElement(v.Group,{id:"email-container",className:e.fieldContainerClassName||T.fieldContainer},h.createElement(v.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelEmail||"Email address"),h.createElement(v.Control,{id:"email",className:e.fieldInputClassName||T.formField,type:"email",onChange:l,isInvalid:!!i.email}),h.createElement(v.Control.Feedback,{className:e.fieldErrorClassName||T.fieldError,type:"invalid"},i.email)),h.createElement(v.Group,{id:"password-container",className:e.fieldContainerClassName||T.fieldContainer},h.createElement(v.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelPassword||"Password"),h.createElement(v.Control,{id:"password",className:e.fieldInputClassName||T.formField,type:"password",onChange:l,isInvalid:!!i.password}),h.createElement(v.Control.Feedback,{className:e.fieldErrorClassName||T.fieldError,type:"invalid"},i.password)),h.createElement(v.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||T.fieldContainer},h.createElement(v.Label,{className:e.fieldLabelClassName||T.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),h.createElement(v.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||T.formField,type:"password",onChange:l,isInvalid:!!i.passwordConfirmation}),h.createElement(v.Control.Feedback,{className:e.fieldErrorClassName||T.fieldError,type:"invalid"},i.passwordConfirmation)),h.createElement(v.Group,{id:"privacy-policy-accepted-container",className:e.fieldCheckboxContainerClassName||T.fieldContainer},h.createElement(v.Check,{id:"privacyPolicyAccepted",className:e.fieldCheckboxInputClassName||T.formField,type:"checkbox",label:e.labelPrivacyPolicyAccepted||h.createElement("span",null,"I have read and accept the"," ",h.createElement("a",{href:e.privacyPolicyUrl,target:"_blank",rel:"noopener noreferrer"},"privacy policy")," ","and"," ",h.createElement("a",{href:e.generalTermsUrl,target:"_blank",rel:"noopener noreferrer"},"terms and conditions")," ","."),onChange:l,isInvalid:!!i.privacyPolicyAccepted,feedbackType:"invalid",feedback:i.privacyPolicyAccepted})),!n&&h.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},h.createElement(at,{className:e.submitButtonClassName||T.submitButton,type:"submit",variant:"primary"},e.labelSubmitButton||"Register"))))};import{Formik as st}from"formik";import H from"react-bootstrap/Form";import lt from"react-bootstrap/Button";import I,{useState as mt}from"react";import*as X from"yup";var Pe="08faa1fc3d8d44ac793d64f9044157186548fdbc461a48c463085815552fa55e",ot=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Pe)){var e=document.createElement("style");e.id=Pe,e.textContent=ot,document.head.appendChild(e)}})();var k={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var dt=e=>{let{backendUrl:t,apiVersion:r,setAuthInfo:n}=P(),[o,a]=mt(!1),d=X.object().shape({email:X.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required."),password:X.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"The password is required.")}).defined(),u=async l=>{a(!0);try{let f=await c.signIn(t,l,r);if(!f)throw"No authentication object returned";if(n(f),!e.onLoginSuccess)return;await e.onLoginSuccess(l.email,f,l.stayLoggedIn)}catch(f){e.onLoginError(f),a(!1)}};return I.createElement(st,{initialValues:{email:"",password:"",stayLoggedIn:!1},onSubmit:l=>{u(l)},validationSchema:d},({errors:l,handleChange:f,handleSubmit:U})=>I.createElement("form",{onSubmit:U,className:e.containerClassName||k.container},I.createElement(H.Group,{id:"email-container",className:e.fieldContainerClassName||k.fieldContainer},I.createElement(H.Label,{className:e.fieldLabelClassName||k.fieldLabel},e.labelEmail||"Email address"),I.createElement(H.Control,{id:"email",type:"email",onChange:f,className:e.fieldInputClassName||k.formField,isInvalid:!!l.email}),I.createElement(H.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||k.fieldError},l.email)),I.createElement(H.Group,{id:"password-container",className:e.fieldContainerClassName||k.fieldContainer},I.createElement(H.Label,{className:e.fieldLabelClassName||k.fieldLabel},e.labelPassword||"Password"),I.createElement(H.Control,{id:"password",type:"password",onChange:f,className:e.fieldInputClassName||k.formField,isInvalid:!!l.password}),I.createElement(H.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||k.fieldError},l.password)),!e.hideStayLoggedIn&&I.createElement(H.Group,{id:"stay-logged-in-container",className:e.fieldCheckboxContainerClassName||k.fieldContainer},I.createElement(H.Check,{id:"stayLoggedIn",className:e.fieldCheckboxInputClassName||k.formField,type:"checkbox",label:e.labelStayLoggedIn||"Stay logged in.",onChange:f})),!o&&I.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},I.createElement(lt,{variant:"primary",type:"submit",className:e.submitButtonClassName||k.submitButton},e.labelSubmitButton||"Login"))))};import V,{useState as ut}from"react";import*as te from"yup";import{Formik as ft}from"formik";import ee from"react-bootstrap/Form";import pt from"react-bootstrap/Button";var xe="6597fb2ef423f9fe9e38df405cbcfac366421233e5f29a986f3e16fcc9f48e38",ct=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(xe)){var e=document.createElement("style");e.id=xe,e.textContent=ct,document.head.appendChild(e)}})();var $={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var gt=e=>{let{backendUrl:t,apiVersion:r}=P(),[n,o]=ut(!1),a=te.object().shape({email:te.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required.")}).defined(),d=i=>{o(!0),c.passwordResetInstructions(t,i,r).then(()=>{e.onLostPasswordSuccess(i.email),o(!1)}).catch(l=>{e.onLostPasswordError(l),o(!1)})};return V.createElement(ft,{initialValues:{email:""},onSubmit:i=>{d(i)},validationSchema:a},({errors:i,handleChange:l,handleSubmit:f})=>V.createElement("form",{onSubmit:f,className:e.containerClassName||$.container},V.createElement(ee.Group,{id:"email-container",className:e.fieldContainerClassName||$.fieldContainer},V.createElement(ee.Label,{className:e.fieldLabelClassName||$.fieldLabel},e.labelEmail||"Email address"),V.createElement(ee.Control,{id:"email",type:"email",onChange:l,className:e.fieldInputClassName||$.formField,isInvalid:!!i.email}),V.createElement(ee.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||$.fieldError},i.email)),!n&&V.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},V.createElement(pt,{variant:"primary",type:"submit",className:e.submitButtonClassName||$.submitButton},e.labelSubmitButton||"Submit"))))};import q,{useState as Et}from"react";import*as ne from"yup";import{Formik as ht}from"formik";import re from"react-bootstrap/Form";import Ct from"react-bootstrap/Button";var Te="26f9b305c337d82f23e38492352522e21d65c6459993e27ae5faf0621aacf97f",bt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Te)){var e=document.createElement("style");e.id=Te,e.textContent=bt,document.head.appendChild(e)}})();var j={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Pt=e=>{let{backendUrl:t,apiVersion:r}=P(),[n,o]=Et(!1),a=ne.object().shape({email:ne.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.")}).defined(),d=i=>{o(!0),c.confirmationInstructions(t,i,r).then(()=>{e.onResendConfirmationSuccess(i.email),o(!1)}).catch(l=>{e.onResendConfirmationError(l),o(!1)})};return q.createElement(ht,{initialValues:{email:""},onSubmit:i=>{d(i)},validationSchema:a},({errors:i,handleChange:l,handleSubmit:f})=>q.createElement("form",{onSubmit:f,className:e.containerClassName||j.container},q.createElement(re.Group,{id:"email-container",className:e.fieldContainerClassName||j.fieldContainer},q.createElement(re.Label,{className:e.fieldLabelClassName||j.fieldLabel},e.labelEmail||"Email address"),q.createElement(re.Control,{id:"email",type:"email",onChange:l,className:e.fieldInputClassName||j.formField,isInvalid:!!i.email}),q.createElement(re.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||j.fieldError},i.email)),!n&&q.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},q.createElement(Ct,{variant:"primary",type:"submit",className:e.submitButtonClassName||j.submitButton},e.labelSubmitButton||"Submit"))))};import we,{useState as Tt}from"react";var _e="dfffe9637f7a60407aac13517bbfb11ff47b3851dabc1a2667ff9fbba65f0561",xt=`._container_q2u8x_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(_e)){var e=document.createElement("style");e.id=_e,e.textContent=xt,document.head.appendChild(e)}})();var de={container:"_container_q2u8x_1",text:"_text_q2u8x_13"};var _t=e=>{let[t,r]=Tt(e.visible),n=()=>{r(!0)};return t?we.createElement("div",{onClick:()=>{r(!1),setTimeout(n,e.dismissTimeout||2e4)},className:de.container},we.createElement("span",{className:de.text},"development")):null};import C from"react";import*as ve from"@rails/activestorage";import{useState as yt}from"react";import vt,{ErrorCode as ue,useDropzone as Ft}from"react-dropzone";var ye="2013c8a62515dd4a9efd3fcc3573094b9682aa9201896f90ad5202d6d823fae2",wt=`._dropzoneContainer_14oft_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(ye)){var e=document.createElement("style");e.id=ye,e.textContent=wt,document.head.appendChild(e)}})();var ce={dropzoneContainer:"_dropzoneContainer_14oft_1",pastezoneContainer:"_pastezoneContainer_14oft_19"};var zt=(e,t)=>`rails/active_storage/blobs/${e}/${t}`,fe=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=P(),[o,a]=yt(0),d=C.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",className:"bi bi-cloud-arrow-up",viewBox:"0 0 16 16"},C.createElement("path",{fillRule:"evenodd",d:"M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"}),C.createElement("path",{d:"M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"})),u=async m=>{await c.delete(t,`active_storage/blobs/${m}`,null,r,n)},i=async(m,p)=>{await u(p);let _=[...e.files];_=_.filter(S=>p!==S.signedId),e.onChange(_),m.stopPropagation()},l=m=>{m.loaded/m.total>=.9999999},f=m=>{if(m.length){if(e.maxFiles){let p=e.maxFiles-(e.files.length+o);if(p<m.length&&e.onMaxFilesError(e.maxFiles),p<=0)return;m=m.slice(0,p)}if(e.maxSize){let p=m.filter(_=>_.size<=e.maxSize);p.length<m.length&&e.onMaxSizeError(e.maxSize),m=p}a(p=>p+m.length),m.forEach(p=>{new ve.DirectUpload(p,s.toApiUrl(t,"active_storage/blobs/create_direct_upload"),{directUploadWillCreateBlobWithXHR:S=>{let R=c.defaultHttpHeader(r,n);Object.keys(R).forEach(E=>{S.setRequestHeader(E,R[E])}),S.upload.addEventListener("progress",l)}}).create((S,R)=>{if(a(E=>E-1),!S){let E={signedId:R.signed_id};p.type.includes("image")?E.path=zt(R.signed_id,R.filename):E.filename=R.filename;let z=e.files;z.push(E),e.onChange([...z])}})})}},U=m=>{if(!m.clipboardData)return;let p=m.clipboardData.items;if(p===void 0)return;let _=[];for(let S of p){if(e.accept&&!Object.keys(e.accept).some(E=>S.type.match(E)))continue;let R=S.getAsFile();R&&_.push(R)}f(_)},w=e.files.map(m=>C.createElement("div",{key:m.signedId,className:"card w-25 animate__animated animate__fadeIn mb-4",style:{flex:"0 0 auto"}},C.createElement("div",{className:"card-header p-1"},C.createElement("button",{onClick:p=>i(p,m.signedId||""),type:"button",className:"close","aria-label":"Close"},C.createElement("span",{"aria-hidden":"true"},"\xD7"))),C.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},C.createElement("img",{src:s.toBaseUrl(t,m.path||""),alt:m.filename,className:"d-block mw-100 m-auto m-0 rounded p-1"})))),g=[];for(let m=0;m<o;m++)g.push(C.createElement("div",{key:m,className:"card w-25 mb-4",style:{flex:"0 0 auto"}},C.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},C.createElement("div",{className:"p-4 text-center"},C.createElement("div",{className:"spinner-border",role:"status"},C.createElement("span",{className:"sr-only"},"Loading..."))))));let F=m=>{m.some(p=>p.errors[0].code===ue.TooManyFiles)&&e.onMaxFilesError(e.maxFiles),m.some(p=>p.errors[0].code===ue.FileInvalidType)&&e.onInvalidTypeError(e.accept),m.some(p=>p.errors[0].code===ue.FileTooLarge)&&e.onMaxSizeError(e.maxSize)};return C.createElement("div",null,e.pasteZone&&C.createElement("input",{type:"text",className:`w-100 p-2 ${ce.pastezoneContainer}`,value:e.textPastezone||"Copy and paste some files here",onPaste:U,readOnly:!0}),C.createElement(vt,{onDropAccepted:f,multiple:e.multiple,maxFiles:e.maxFiles,maxSize:e.maxSize,onDropRejected:F,accept:e.accept},({getRootProps:m,getInputProps:p}=Ft())=>C.createElement("section",null,C.createElement("div",{...m(),className:`${ce.dropzoneContainer} p-4 ${e.className}`},C.createElement("input",{...p()}),C.createElement("p",{className:"m-0"},e.textDropzone||"Drag 'n' drop some files here, or click to select files"),w.length>0?C.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},w):C.createElement("div",{className:"m-0"},e.customIcon||d),g.length>0&&C.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},g)))))};import{Formik as Nt}from"formik";import D from"react-bootstrap/Form";import Ot from"react-bootstrap/Button";import L,{useCallback as It,useState as St}from"react";import*as Y from"yup";var Fe="184b78f771b5a241c7bfec84028f8a6293ef4cd81c949507f42398c35855848d",Rt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Fe)){var e=document.createElement("style");e.id=Fe,e.textContent=Rt,document.head.appendChild(e)}})();var B={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var kt=e=>{let{backendUrl:t,apiVersion:r}=P(),[n,o]=St(!1),a=Y.object().shape({password:Y.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:Y.string().oneOf([Y.ref("password")],e.passwordConfirmationMatchErrorText||"The password and its confirmation must match.")}).defined(),d=It(async i=>{o(!0);try{await c.passwordReset(t,{...i,resetPasswordToken:e.resetPasswordToken},r),await e.onResetPasswordSuccess()}catch(l){e.onResetPasswordError(l),o(!1)}},[e.resetPasswordToken]);return L.createElement(Nt,{initialValues:{password:"",passwordConfirmation:""},onSubmit:i=>{d(i)},validationSchema:a},({errors:i,handleChange:l,handleSubmit:f})=>L.createElement("form",{onSubmit:f,className:e.containerClassName||B.container},L.createElement(D.Group,{id:"password-container",className:e.fieldContainerClassName||B.fieldContainer},L.createElement(D.Label,{className:e.fieldLabelClassName||B.fieldLabel},e.labelPassword||"Password"),L.createElement(D.Control,{id:"password",type:"password",onChange:l,className:e.fieldInputClassName||B.formField,isInvalid:!!i.password}),L.createElement(D.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||B.fieldError},i.password)),L.createElement(D.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||B.fieldContainer},L.createElement(D.Label,{className:e.fieldLabelClassName||B.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),L.createElement(D.Control,{id:"passwordConfirmation",type:"password",onChange:l,className:e.fieldInputClassName||B.formField,isInvalid:!!i.passwordConfirmation}),L.createElement(D.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||B.fieldError},i.passwordConfirmation)),!n&&L.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},L.createElement(Ot,{variant:"primary",type:"submit",className:e.submitButtonClassName||B.submitButton},e.labelSubmitButton||"Submit"))))};import ze from"react";var Lt=e=>{let{authInfo:t}=P();return ze.createElement("div",null,t?e.children:ze.createElement("div",{className:e.accessDeniedClassName||"ez-on-rails-protected-page-access-denied-container"},e.accessDeniedText||"You must be signed in to see this content."))};import b,{useEffect as At,useState as pe}from"react";import*as M from"yup";import{Formik as Bt}from"formik";import{Button as Ht,Form as y}from"react-bootstrap";var Re="f9f52e78e174bf1d2ef410620bc0a8a1cdfe4cf1721e3e0c1621166cce52d43b",Ut=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Re)){var e=document.createElement("style");e.id=Re,e.textContent=Ut,document.head.appendChild(e)}})();var x={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Mt=e=>{let{authInfo:t,backendUrl:r,apiVersion:n}=P(),[o,a]=pe(!1),[d,u]=pe(null),[i,l]=pe(void 0),f=g=>{u(g),l(g.unconfirmedEmail)};At(()=>{(async()=>t&&f(await c.getUser(r,t,n)))()},[]);let U=async g=>{if(t){a(!0);try{let F=await c.updateUser(r,g,t,n);e.onUserUpdateSuccess(F),f(F),a(!1)}catch(F){e.onUserUpdateError(F),a(!1)}}},w=M.object().shape({username:M.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must have not more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:M.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must not have more than ${e.maxEmailLength||100} characters.`),password:M.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`),passwordConfirmation:M.string().oneOf([M.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation do not match.")}).defined();return t&&b.createElement("div",{className:"ez-on-rails-form-outer-container"},d?b.createElement(Bt,{initialValues:d,validationSchema:w,enableReinitialize:!0,onSubmit:g=>{U(g)}},({errors:g,values:F,handleChange:m,setFieldValue:p,setFieldError:_,handleSubmit:S})=>b.createElement("form",{onSubmit:S,className:e.containerClassName||x.container},!e.hideUsername&&b.createElement(y.Group,{id:"username-container",className:e.fieldContainerClassName||x.fieldContainer},b.createElement(y.Label,{className:e.fieldLabelClassName||x.fieldLabel},e.labelUsername||"Username"),b.createElement(y.Control,{id:"username",className:e.fieldInputClassName||x.formField,type:"text",value:F.username,onChange:m,isInvalid:!!g.username}),b.createElement(y.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||x.fieldError},g.username)),!e.hideEmail&&b.createElement(y.Group,{id:"email-container",className:e.fieldContainerClassName||x.fieldContainer},b.createElement(y.Label,{className:e.fieldLabelClassName||x.fieldLabel},e.labelEmail||"Email address"),b.createElement(y.Control,{id:"email",className:e.fieldInputClassName||x.formField,type:"email",value:F.email,onChange:m,isInvalid:!!g.email}),i&&b.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-unconfirmed-email-text"},e.unconfirmedEmailText||"The following email is not yet confirmed: "," ",i),b.createElement(y.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||x.fieldError},g.email)),!e.hidePassword&&b.createElement(y.Group,{id:"password-container",className:e.fieldContainerClassName||x.fieldContainer},b.createElement(y.Label,{className:e.fieldLabelClassName||x.fieldLabel},e.labelPassword||"Password"),b.createElement(y.Control,{id:"password",className:e.fieldInputClassName||x.formField,type:"password",value:F.password,onChange:m,isInvalid:!!g.password}),b.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-password-optional-text"},e.passwordChangeOptionalText||"You must only provide this if you want to change the password."),b.createElement(y.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||x.fieldError},g.password)),!e.hidePassword&&b.createElement(y.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||x.fieldContainer},b.createElement(y.Label,{className:e.fieldLabelClassName||x.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),b.createElement(y.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||x.formField,type:"password",value:F.passwordConfirmation,onChange:m,isInvalid:!!g.passwordConfirmation}),b.createElement(y.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||x.fieldError},g.passwordConfirmation)),!e.hideAvatar&&b.createElement(y.Group,{id:"avatar-container",className:e.fieldContainerClassName||x.fieldContainer},b.createElement(y.Label,{className:e.fieldLabelClassName||x.fieldLabel},e.labelAvatar||"Avatar"),b.createElement("div",{className:e.dropzoneContainerClassName||x.formField},b.createElement(fe,{onChange:R=>p("avatar",R.length>0?R[0]:null),files:F.avatar?[F.avatar]:[],multiple:!1,maxFiles:1,onMaxFilesError:()=>_("avatar",e.avatarToManyFilesErrorText||"Only one file is allowed"),maxSize:e.avatarMaxSize||5242880,onMaxSizeError:()=>_("avatar",e.avatarToLargeErrorText||`The file must not be larger than ${Math.round((e.avatarMaxSize||5242880)/1048576)} MB.`),onInvalidTypeError:()=>_("avatar",e.avatarWrongFormatErrorText||"Invalid file format.")})),b.createElement(y.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||x.fieldError},g.avatar)),!o&&b.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},b.createElement(Ht,{ref:e.submitRef,type:"submit",variant:"primary",className:e.submitButtonClassName||x.submitButton},e.labelSubmitButton||"Submit")))):b.createElement("div",null,"Loading..."))};var Ne={fetcher:async(e,t,r="get",n=null,o=void 0,a="1.0")=>{switch(r=r.toLowerCase(),r){case"post":return c.post(e,t,n,o,a);case"put":return c.put(e,t,n,o,a);case"patch":return c.patch(e,t,n,o,a);case"delete":return c.delete(e,t,n,o,a);default:return c.get(e,t,n,o,a)}}};var xa={client:c,swr:Ne,utils:s};import{AbstractUploader as Vt}from"@d4us1/remawy";import*as Oe from"@rails/activestorage";var ge=class{uploader;authInfo;apiVersion;constructor(t,r,n){this.uploader=t,this.authInfo=r,this.apiVersion=n}directUploadWillCreateBlobWithXHR(t){let r=c.defaultHttpHeader(this.authInfo,this.apiVersion);Object.keys(r).forEach(n=>{t.setRequestHeader(n,r[n])}),t.upload.addEventListener("progress",n=>this.uploader.onDirectUploadProgress(n))}},ae=class extends Vt{baseUrl;authInfo;apiVersion;constructor(t,r,n){super(),t.endsWith("/")||(t=`${t}/`),this.baseUrl=t,this.authInfo=r,this.apiVersion=n}startUpload(t){let r=new ge(this,this.authInfo,this.apiVersion);return new Oe.DirectUpload(t,`${this.baseUrl}api/active_storage/blobs/create_direct_upload`,r).create((o,a)=>{if(o)this.onError(o);else{let d=`${this.baseUrl}rails/active_storage/blobs/${a.signed_id}/${a.filename}`,u={signedId:a.signed_id,fileName:a.filename};this.onFinish(d,t,u)}}),Promise.resolve(void 0)}onDirectUploadProgress(t){this.onProgress(t.loaded/t.total)}};var Ie={uploader:ae};var Oa={remawy:Ie};export{fe as ActiveStorageDropzone,_t as DevelopmentHint,Ue as EzOnRails,xa as EzOnRailsHttp,W as EzOnRailsHttpError,Oa as EzOnRailsIntegrations,dt as LoginForm,gt as LostPasswordForm,Lt as ProtectedPage,it as RegistrationForm,Pt as ResendConfirmationForm,kt as ResetPasswordForm,Mt as UpdateUserForm,Ke as useEzApi,le as useEzApiHttpClient,P as useEzOnRails,et as useEzScaff};
//# sourceMappingURL=index.js.map
