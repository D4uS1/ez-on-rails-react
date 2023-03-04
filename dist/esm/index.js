import ke,{useMemo as Le,useState as ie}from"react";import{createContext as Se}from"react";var Z=Se({apiVersion:"1.0",backendUrl:"http://localhost:3000",authInfo:null,setBackendUrl:e=>{},setAuthInfo:e=>{},setApiVersion:e=>{}});var Ue=e=>{let[t,r]=ie(e.backendUrl),[n,s]=ie(e.authInfo||null),[i,l]=ie(e.apiVersion),u=Le(()=>{let a={backendUrl:t,authInfo:n||null,apiVersion:i,setBackendUrl:r,setAuthInfo:s,setApiVersion:l};return a.backendUrl.endsWith("/")&&(a.backendUrl=a.backendUrl.slice(0,-1)),a},[t,n,i]);return ke.createElement(Z.Provider,{value:u},e.children)};import h,{useState as tt}from"react";import*as U from"yup";import{Formik as rt}from"formik";import{useCallback as Xe,useEffect as Ze,useState as me}from"react";import{useCallback as We}from"react";import{toCamel as Ae,toSnake as Be}from"convert-keys";var se=e=>e.startsWith("/")?e.slice(1):e,oe=e=>e.endsWith("/")?e.slice(0,-1):e,He=(e,t)=>`${oe(e)}/${se(t)}`,Me=(e,t)=>`${oe(e)}/api/${se(t)}`,Ve=e=>(e=e.replace(/[A-Z]/g,(t,r)=>r===0?t.toLowerCase():"_"+t.toLowerCase()),e=e.replace(/::_/g,"/"),e=e.replace(/\/_/g,"/"),e),Ee=e=>e&&Be(e),he=e=>e&&Ae(e),qe=e=>Object.keys(e).map(t=>t+"="+e[t]).join("&"),J=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}/.test(e)?new Date(e):Array.isArray(e)?e.map(t=>J(t)):(typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=J(e[t])}),e),K=e=>e instanceof Date?e.toISOString():Array.isArray(e)?e.map(t=>K(t)):(typeof e=="object"&&Object.keys(e).forEach(t=>{e[t]=K(e[t])}),e),De=e=>K(Ee(e)),Ge=e=>!e||typeof e!="object"?e:J(he(e)),o={cleanupUrl:oe,cleanupPath:se,toBaseUrl:He,toApiUrl:Me,toSnakeCase:Ee,toSnakeCasePath:Ve,toCamelCase:he,toGetParameters:qe,toDates:J,toDateStrings:K,toBackendParams:De,toFrontendParams:Ge};var W=class extends Error{httpStatusCode;constructor(t,r){super(),this.message=t,this.httpStatusCode=r}};var $e=e=>{if(e)return{uid:e.uid,client:e.client,expiry:e.expiry,"token-type":e.tokenType,"access-token":e.accessToken}},je=e=>({uid:e.uid,client:e.client,expiry:e.expiry,tokenType:e["token-type"],accessToken:e["access-token"]}),N=(e,t)=>({"Content-Type":"application/json",Accept:"application/json","api-version":t,...$e(e)}),O=async(e,t,r,n)=>{let s=await fetch(t,{method:e,headers:n,body:r?JSON.stringify(r):null});if(s.status>=400)throw new W(JSON.stringify(s.body),s.status);let i={},l=null;try{s.headers.forEach((u,a)=>{i[a]=u}),l=await s.json()}catch{}return{headers:i,body:l}},c={signUp:async(e,t,r)=>{t=o.toBackendParams(t),await O("POST",o.toBaseUrl(e,"users"),{user:t},N(null,r))},signIn:async(e,t,r)=>{t=o.toBackendParams(t);let n=await O("POST",o.toApiUrl(e,"auth/sign_in"),t,N(null,r));return je(n.headers)},signOut:async(e,t,r)=>{await O("DELETE",o.toApiUrl(e,"auth/sign_out"),null,N(t,r))},passwordResetInstructions:async(e,t,r)=>{t=o.toBackendParams(t),await O("POST",o.toBaseUrl(e,"users/password"),{user:t},N(null,r))},passwordReset:async(e,t,r)=>{t=o.toBackendParams(t),await O("PUT",o.toBaseUrl(e,"users/password"),{user:t},N(null,r))},getUser:async(e,t,r)=>{let n=await O("GET",o.toApiUrl(e,"users/me"),null,N(t,r));return o.toFrontendParams(n.body)},updateUser:async(e,t,r,n)=>{let s=t.avatar?.signedId,i={...o.toBackendParams(t),avatar:s},l=await O("PATCH",o.toApiUrl(e,"users/me"),{user:i},N(r,n));return o.toFrontendParams(l.body)},confirmationInstructions:async(e,t,r)=>{t=o.toBackendParams(t),await O("POST",o.toBaseUrl(e,"users/confirmation"),{user:t},N(null,r))},confirmation:async(e,t,r)=>{let n=o.toBaseUrl(e,"users/confirmation");t=o.toBackendParams(t),n=`${n}?${o.toGetParameters(t)}`,await O("GET",n,null,N(null,r))},get:async(e,t,r,n=null,s="1.0",i=void 0)=>{let l=o.toApiUrl(e,t);r&&(r=o.toBackendParams(r)),i&&(r=i(r)),r&&(l=`${l}?${o.toGetParameters(r)}`);let u=await O("GET",l,null,N(n,s));return o.toFrontendParams(u.body)},post:async(e,t,r,n=null,s="1.0",i=void 0)=>{let l=o.toApiUrl(e,t);r&&(r=o.toBackendParams(r)),i&&(r=i(r));let u=await O("POST",l,r,N(n,s));return o.toFrontendParams(u.body)},patch:async(e,t,r,n=null,s="1.0",i=void 0)=>{let l=o.toApiUrl(e,t);r&&(r=o.toBackendParams(r)),i&&(r=i(r));let u=await O("PATCH",l,r,N(n,s));return o.toFrontendParams(u.body)},put:async(e,t,r,n=null,s="1.0",i=void 0)=>{let l=o.toApiUrl(e,t);r&&(r=o.toBackendParams(r)),i&&(r=i(r));let u=await O("PUT",l,r,N(n,s));return o.toFrontendParams(u.body)},delete:async(e,t,r,n=null,s="1.0",i=void 0)=>{let l=o.toApiUrl(e,t);r&&(r=o.toBackendParams(r)),i&&(r=i(r)),r&&(l=`${l}?${o.toGetParameters(r)}`);let u=await O("DELETE",l,null,N(n,s));return o.toFrontendParams(u.body)},defaultHttpHeader:(e,t)=>N(e,t)};import{useContext as Ye}from"react";var P=()=>Ye(Z);var le=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=P();return{call:We(async(i,l,u)=>{let a=e?o.cleanupPath(o.cleanupUrl(e)):null,m=o.cleanupPath(i),p=`${a?a+"/":""}${m}`;switch(l){case"POST":return c.post(t,p,u,r,n);case"PUT":return c.put(t,p,u,r,n);case"PATCH":return c.patch(t,p,u,r,n);case"DELETE":return c.delete(t,p,u,r,n);default:return c.get(t,p,u,r,n)}},[])}};var Je=(e,t="GET",r,n)=>{let{backendUrl:s,authInfo:i,apiVersion:l}=P(),[u,a]=me(null),[m,p]=me(null),[B,T]=me(!1),{call:g}=le(),y=Xe(async d=>{try{T(!0),p(null),a(null);let f=await g(e,t,d||r);return a(f),T(!1),f}catch(f){p(f),T(!1)}},[]);return Ze(()=>{(async()=>n?.skipInitialCall||await y())()},[i,s,l]),{data:u,error:m,inProgress:B,callApi:y}};import{useCallback as G,useMemo as Ke,useState as Q}from"react";var Qe=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=P(),[s,i]=Q(null),[l,u]=Q(null),[a,m]=Q(!1),[p,B]=Q(null),T=Ke(()=>o.toSnakeCasePath(e),[e]),g=G(async E=>{B(null),m(!0);try{let F=await E();return m(!1),F}catch(F){return m(!1),B(F),null}},[]),y=G(()=>g(async()=>{let E=await c.get(t,T,null,r,n);return u(E),E}),[t,r,n,T]),d=G(E=>g(async()=>{let F=await c.get(t,`${T}/${E}`,null,r,n);return i(F),F}),[t,r,n,T]),f=G(E=>g(async()=>{let F=await c.get(t,T,E,r,n);return u(F),F}),[t,r,n,T]),z=G(E=>g(async()=>{let F=await c.post(t,T,E,r,n);return i(F),F}),[t,r,n,T]),S=G((E,F)=>g(async()=>{let be=await c.patch(t,`${T}/${E}`,F,r,n);return i(be),be}),[t,r,n,T]),R=G(E=>g(async()=>{await c.delete(t,`${T}/${E}`,null,r,n),i(null)}),[t,r,n,T]);return{record:s,records:l,inProgress:a,error:p,getAll:y,getOne:d,search:f,create:z,update:S,remove:R}};import{Button as nt,Form as v}from"react-bootstrap";var Ce="3b24ec1455a1c6b9b66613d607aefe2a5eedda38d3540c763b31003f03ab4414",et=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ce)){var e=document.createElement("style");e.id=Ce,e.textContent=et,document.head.appendChild(e)}})();var _={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var at=e=>{let{backendUrl:t,apiVersion:r}=P(),[n,s]=tt(!1),i=async a=>{s(!0);try{await c.signUp(t,a,r),e.onRegisterSuccess(a.email),s(!1)}catch(m){e.onRegisterError(m),s(!1)}},l=U.object().shape({username:U.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must not have more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:U.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must have not more than ${e.maxEmailLength||100} characters.`),password:U.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:U.string().oneOf([U.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation must match."),privacyPolicyAccepted:U.boolean().isTrue(e.privacyPolicyNotAcceptedErrorText||"The privacy policy must be accepted.")}).defined();return h.createElement(rt,{initialValues:{username:"",email:"",password:"",passwordConfirmation:"",privacyPolicyAccepted:!1},validationSchema:l,onSubmit:a=>{i(a)}},({errors:a,handleChange:m,handleSubmit:p})=>h.createElement("form",{onSubmit:p,className:e.containerClassName||_.container},h.createElement(v.Group,{id:"username-container",className:e.fieldContainerClassName||_.fieldContainer},h.createElement(v.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelUsername||"Username"),h.createElement(v.Control,{id:"username",className:e.fieldInputClassName||_.formField,type:"text",onChange:m,isInvalid:!!a.username}),h.createElement(v.Control.Feedback,{className:e.fieldErrorClassName||_.fieldError,type:"invalid"},a.username)),h.createElement(v.Group,{id:"email-container",className:e.fieldContainerClassName||_.fieldContainer},h.createElement(v.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelEmail||"Email address"),h.createElement(v.Control,{id:"email",className:e.fieldInputClassName||_.formField,type:"email",onChange:m,isInvalid:!!a.email}),h.createElement(v.Control.Feedback,{className:e.fieldErrorClassName||_.fieldError,type:"invalid"},a.email)),h.createElement(v.Group,{id:"password-container",className:e.fieldContainerClassName||_.fieldContainer},h.createElement(v.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelPassword||"Password"),h.createElement(v.Control,{id:"password",className:e.fieldInputClassName||_.formField,type:"password",onChange:m,isInvalid:!!a.password}),h.createElement(v.Control.Feedback,{className:e.fieldErrorClassName||_.fieldError,type:"invalid"},a.password)),h.createElement(v.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||_.fieldContainer},h.createElement(v.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),h.createElement(v.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||_.formField,type:"password",onChange:m,isInvalid:!!a.passwordConfirmation}),h.createElement(v.Control.Feedback,{className:e.fieldErrorClassName||_.fieldError,type:"invalid"},a.passwordConfirmation)),h.createElement(v.Group,{id:"privacy-policy-accepted-container",className:e.fieldCheckboxContainerClassName||_.fieldContainer},h.createElement(v.Check,{id:"privacyPolicyAccepted",className:e.fieldCheckboxInputClassName||_.formField,type:"checkbox",label:e.labelPrivacyPolicyAccepted||h.createElement("span",null,"I have read and accept the"," ",h.createElement("a",{href:e.privacyPolicyUrl,target:"_blank",rel:"noopener noreferrer"},"privacy policy")," ","and"," ",h.createElement("a",{href:e.generalTermsUrl,target:"_blank",rel:"noopener noreferrer"},"terms and conditions")," ","."),onChange:m,isInvalid:!!a.privacyPolicyAccepted,feedbackType:"invalid",feedback:a.privacyPolicyAccepted})),!n&&h.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},h.createElement(nt,{className:e.submitButtonClassName||_.submitButton,type:"submit",variant:"primary"},e.labelSubmitButton||"Register"))))};import{Formik as st}from"formik";import H from"react-bootstrap/Form";import ot from"react-bootstrap/Button";import I,{useState as lt}from"react";import*as X from"yup";var Pe="1dbcd37a5c1959b2908653f7c30e3b962236eb08c067b0a4a77b87e7cea94a53",it=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Pe)){var e=document.createElement("style");e.id=Pe,e.textContent=it,document.head.appendChild(e)}})();var k={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var mt=e=>{let{backendUrl:t,apiVersion:r,setAuthInfo:n}=P(),[s,i]=lt(!1),l=X.object().shape({email:X.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required."),password:X.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"The password is required.")}).defined(),u=async m=>{i(!0);try{let p=await c.signIn(t,m,r);if(!p)throw"No authentication object returned";n(p),await e.onLoginSuccess(m.email,p,m.stayLoggedIn)}catch(p){e.onLoginError(p),i(!1)}};return I.createElement(st,{initialValues:{email:"",password:"",stayLoggedIn:!1},onSubmit:m=>{u(m)},validationSchema:l},({errors:m,handleChange:p,handleSubmit:B})=>I.createElement("form",{onSubmit:B,className:e.containerClassName||k.container},I.createElement(H.Group,{id:"email-container",className:e.fieldContainerClassName||k.fieldContainer},I.createElement(H.Label,{className:e.fieldLabelClassName||k.fieldLabel},e.labelEmail||"Email address"),I.createElement(H.Control,{id:"email",type:"email",onChange:p,className:e.fieldInputClassName||k.formField,isInvalid:!!m.email}),I.createElement(H.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||k.fieldError},m.email)),I.createElement(H.Group,{id:"password-container",className:e.fieldContainerClassName||k.fieldContainer},I.createElement(H.Label,{className:e.fieldLabelClassName||k.fieldLabel},e.labelPassword||"Password"),I.createElement(H.Control,{id:"password",type:"password",onChange:p,className:e.fieldInputClassName||k.formField,isInvalid:!!m.password}),I.createElement(H.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||k.fieldError},m.password)),!e.hideStayLoggedIn&&I.createElement(H.Group,{id:"stay-logged-in-container",className:e.fieldCheckboxContainerClassName||k.fieldContainer},I.createElement(H.Check,{id:"stayLoggedIn",className:e.fieldCheckboxInputClassName||k.formField,type:"checkbox",label:e.labelStayLoggedIn||"Stay logged in.",onChange:p})),!s&&I.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},I.createElement(ot,{variant:"primary",type:"submit",className:e.submitButtonClassName||k.submitButton},e.labelSubmitButton||"Login"))))};import V,{useState as ct}from"react";import*as te from"yup";import{Formik as ut}from"formik";import ee from"react-bootstrap/Form";import ft from"react-bootstrap/Button";var xe="a7a72e7de50f7fb0d5ca1e8e9b1bb32ad635ba87a01254a45f81139a4b638a2c",dt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(xe)){var e=document.createElement("style");e.id=xe,e.textContent=dt,document.head.appendChild(e)}})();var $={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var pt=e=>{let{backendUrl:t,apiVersion:r}=P(),[n,s]=ct(!1),i=te.object().shape({email:te.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required.")}).defined(),l=a=>{s(!0),c.passwordResetInstructions(t,a,r).then(()=>{e.onLostPasswordSuccess(a.email),s(!1)}).catch(m=>{e.onLostPasswordError(m),s(!1)})};return V.createElement(ut,{initialValues:{email:""},onSubmit:a=>{l(a)},validationSchema:i},({errors:a,handleChange:m,handleSubmit:p})=>V.createElement("form",{onSubmit:p,className:e.containerClassName||$.container},V.createElement(ee.Group,{id:"email-container",className:e.fieldContainerClassName||$.fieldContainer},V.createElement(ee.Label,{className:e.fieldLabelClassName||$.fieldLabel},e.labelEmail||"Email address"),V.createElement(ee.Control,{id:"email",type:"email",onChange:m,className:e.fieldInputClassName||$.formField,isInvalid:!!a.email}),V.createElement(ee.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||$.fieldError},a.email)),!n&&V.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},V.createElement(ft,{variant:"primary",type:"submit",className:e.submitButtonClassName||$.submitButton},e.labelSubmitButton||"Submit"))))};import q,{useState as bt}from"react";import*as ne from"yup";import{Formik as Et}from"formik";import re from"react-bootstrap/Form";import ht from"react-bootstrap/Button";var Te="d5a9d45ddbb734403a1b289a7bc998ab471a5850846bdb2dcc3cd92abd13e5a9",gt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Te)){var e=document.createElement("style");e.id=Te,e.textContent=gt,document.head.appendChild(e)}})();var j={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Ct=e=>{let{backendUrl:t,apiVersion:r}=P(),[n,s]=bt(!1),i=ne.object().shape({email:ne.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.")}).defined(),l=a=>{s(!0),c.confirmationInstructions(t,a,r).then(()=>{e.onResendConfirmationSuccess(a.email),s(!1)}).catch(m=>{e.onResendConfirmationError(m),s(!1)})};return q.createElement(Et,{initialValues:{email:""},onSubmit:a=>{l(a)},validationSchema:i},({errors:a,handleChange:m,handleSubmit:p})=>q.createElement("form",{onSubmit:p,className:e.containerClassName||j.container},q.createElement(re.Group,{id:"email-container",className:e.fieldContainerClassName||j.fieldContainer},q.createElement(re.Label,{className:e.fieldLabelClassName||j.fieldLabel},e.labelEmail||"Email address"),q.createElement(re.Control,{id:"email",type:"email",onChange:m,className:e.fieldInputClassName||j.formField,isInvalid:!!a.email}),q.createElement(re.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||j.fieldError},a.email)),!n&&q.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},q.createElement(ht,{variant:"primary",type:"submit",className:e.submitButtonClassName||j.submitButton},e.labelSubmitButton||"Submit"))))};import we,{useState as xt}from"react";var _e="dfffe9637f7a60407aac13517bbfb11ff47b3851dabc1a2667ff9fbba65f0561",Pt=`._container_q2u8x_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(_e)){var e=document.createElement("style");e.id=_e,e.textContent=Pt,document.head.appendChild(e)}})();var de={container:"_container_q2u8x_1",text:"_text_q2u8x_13"};var Tt=e=>{let[t,r]=xt(e.visible),n=()=>{r(!0)};return t?we.createElement("div",{onClick:()=>{r(!1),setTimeout(n,e.dismissTimeout||2e4)},className:de.container},we.createElement("span",{className:de.text},"development")):null};import C from"react";import*as ve from"@rails/activestorage";import{useState as wt}from"react";import yt,{ErrorCode as ue,useDropzone as vt}from"react-dropzone";var ye="257630eca6a3db5ac1f345639fdf03bb30897c494d2583e7ac4165a93a5df40e",_t=`._dropzoneContainer_14oft_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(ye)){var e=document.createElement("style");e.id=ye,e.textContent=_t,document.head.appendChild(e)}})();var ce={dropzoneContainer:"_dropzoneContainer_14oft_1",pastezoneContainer:"_pastezoneContainer_14oft_19"};var Ft=(e,t)=>`rails/active_storage/blobs/${e}/${t}`,fe=e=>{let{backendUrl:t,authInfo:r,apiVersion:n}=P(),[s,i]=wt(0),l=C.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",className:"bi bi-cloud-arrow-up",viewBox:"0 0 16 16"},C.createElement("path",{fillRule:"evenodd",d:"M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"}),C.createElement("path",{d:"M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"})),u=async d=>{await c.delete(t,`active_storage/blobs/${d}`,null,r,n)},a=async(d,f)=>{await u(f);let z=[...e.files];z=z.filter(S=>f!==S.signedId),e.onChange(z),d.stopPropagation()},m=d=>{d.loaded/d.total>=.9999999},p=d=>{if(d.length){if(e.maxFiles){let f=e.maxFiles-(e.files.length+s);if(f<d.length&&e.onMaxFilesError(e.maxFiles),f<=0)return;d=d.slice(0,f)}if(e.maxSize){let f=d.filter(z=>z.size<=e.maxSize);f.length<d.length&&e.onMaxSizeError(e.maxSize),d=f}i(f=>f+d.length),d.forEach(f=>{new ve.DirectUpload(f,o.toApiUrl(t,"active_storage/blobs/create_direct_upload"),{directUploadWillCreateBlobWithXHR:S=>{let R=c.defaultHttpHeader(r,n);Object.keys(R).forEach(E=>{S.setRequestHeader(E,R[E])}),S.upload.addEventListener("progress",m)}}).create((S,R)=>{if(i(E=>E-1),!S){let E={signedId:R.signed_id};f.type.includes("image")?E.path=Ft(R.signed_id,R.filename):E.filename=R.filename;let F=e.files;F.push(E),e.onChange([...F])}})})}},B=d=>{if(!d.clipboardData)return;let f=d.clipboardData.items;if(f===void 0)return;let z=[];for(let S of f){if(e.accept&&!Object.keys(e.accept).some(E=>S.type.match(E)))continue;let R=S.getAsFile();R&&z.push(R)}p(z)},T=e.files.map(d=>C.createElement("div",{key:d.signedId,className:"card w-25 animate__animated animate__fadeIn mb-4",style:{flex:"0 0 auto"}},C.createElement("div",{className:"card-header p-1"},C.createElement("button",{onClick:f=>a(f,d.signedId||""),type:"button",className:"close","aria-label":"Close"},C.createElement("span",{"aria-hidden":"true"},"\xD7"))),C.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},C.createElement("img",{src:o.toBaseUrl(t,d.path||""),alt:d.filename,className:"d-block mw-100 m-auto m-0 rounded p-1"})))),g=[];for(let d=0;d<s;d++)g.push(C.createElement("div",{key:d,className:"card w-25 mb-4",style:{flex:"0 0 auto"}},C.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},C.createElement("div",{className:"p-4 text-center"},C.createElement("div",{className:"spinner-border",role:"status"},C.createElement("span",{className:"sr-only"},"Loading..."))))));let y=d=>{d.some(f=>f.errors[0].code===ue.TooManyFiles)&&e.onMaxFilesError(e.maxFiles),d.some(f=>f.errors[0].code===ue.FileInvalidType)&&e.onInvalidTypeError(e.accept),d.some(f=>f.errors[0].code===ue.FileTooLarge)&&e.onMaxSizeError(e.maxSize)};return C.createElement("div",null,e.pasteZone&&C.createElement("input",{type:"text",className:`w-100 p-2 ${ce.pastezoneContainer}`,value:e.textPastezone||"Copy and paste some files here",onPaste:B,readOnly:!0}),C.createElement(yt,{onDropAccepted:p,multiple:e.multiple,maxFiles:e.maxFiles,maxSize:e.maxSize,onDropRejected:y,accept:e.accept},({getRootProps:d,getInputProps:f}=vt())=>C.createElement("section",null,C.createElement("div",{...d(),className:`${ce.dropzoneContainer} p-4 ${e.className}`},C.createElement("input",{...f()}),C.createElement("p",{className:"m-0"},e.textDropzone||"Drag 'n' drop some files here, or click to select files"),T.length>0?C.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},T):C.createElement("div",{className:"m-0"},e.customIcon||l),g.length>0&&C.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},g)))))};import{Formik as Rt}from"formik";import D from"react-bootstrap/Form";import Nt from"react-bootstrap/Button";import L,{useCallback as Ot,useState as It}from"react";import*as Y from"yup";var Fe="8a2305251feb8dba8478bd90d4aceb776083a8b93c5b9d48d6ece853b17ccf91",zt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Fe)){var e=document.createElement("style");e.id=Fe,e.textContent=zt,document.head.appendChild(e)}})();var A={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var St=e=>{let{backendUrl:t,apiVersion:r}=P(),[n,s]=It(!1),i=Y.object().shape({password:Y.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:Y.string().oneOf([Y.ref("password")],e.passwordConfirmationMatchErrorText||"The password and its confirmation must match.")}).defined(),l=Ot(async a=>{s(!0);try{await c.passwordReset(t,{...a,resetPasswordToken:e.resetPasswordToken},r),await e.onResetPasswordSuccess()}catch(m){e.onResetPasswordError(m),s(!1)}},[e.resetPasswordToken]);return L.createElement(Rt,{initialValues:{password:"",passwordConfirmation:""},onSubmit:a=>{l(a)},validationSchema:i},({errors:a,handleChange:m,handleSubmit:p})=>L.createElement("form",{onSubmit:p,className:e.containerClassName||A.container},L.createElement(D.Group,{id:"password-container",className:e.fieldContainerClassName||A.fieldContainer},L.createElement(D.Label,{className:e.fieldLabelClassName||A.fieldLabel},e.labelPassword||"Password"),L.createElement(D.Control,{id:"password",type:"password",onChange:m,className:e.fieldInputClassName||A.formField,isInvalid:!!a.password}),L.createElement(D.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||A.fieldError},a.password)),L.createElement(D.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||A.fieldContainer},L.createElement(D.Label,{className:e.fieldLabelClassName||A.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),L.createElement(D.Control,{id:"passwordConfirmation",type:"password",onChange:m,className:e.fieldInputClassName||A.formField,isInvalid:!!a.passwordConfirmation}),L.createElement(D.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||A.fieldError},a.passwordConfirmation)),!n&&L.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},L.createElement(Nt,{variant:"primary",type:"submit",className:e.submitButtonClassName||A.submitButton},e.labelSubmitButton||"Submit"))))};import ze from"react";var kt=e=>{let{authInfo:t}=P();return ze.createElement("div",null,t?e.children:ze.createElement("div",{className:e.accessDeniedClassName||"ez-on-rails-protected-page-access-denied-container"},e.accessDeniedText||"You must be signed in to see this content."))};import b,{useEffect as Ut,useState as pe}from"react";import*as M from"yup";import{Formik as At}from"formik";import{Button as Bt,Form as w}from"react-bootstrap";var Re="f24d84b729dce6829e73eb0f9c426d5b526f061b37a123df0cf69945976fa522",Lt=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Re)){var e=document.createElement("style");e.id=Re,e.textContent=Lt,document.head.appendChild(e)}})();var x={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Ht=e=>{let{authInfo:t,backendUrl:r,apiVersion:n}=P(),[s,i]=pe(!1),[l,u]=pe(null),[a,m]=pe(void 0),p=g=>{u(g),m(g.unconfirmedEmail)};Ut(()=>{(async()=>t&&p(await c.getUser(r,t,n)))()},[]);let B=async g=>{if(t){i(!0);try{let y=await c.updateUser(r,g,t,n);e.onUserUpdateSuccess(y),p(y),i(!1)}catch(y){e.onUserUpdateError(y),i(!1)}}},T=M.object().shape({username:M.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must have not more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:M.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must not have more than ${e.maxEmailLength||100} characters.`),password:M.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`),passwordConfirmation:M.string().oneOf([M.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation do not match.")}).defined();return t&&b.createElement("div",{className:"ez-on-rails-form-outer-container"},l?b.createElement(At,{initialValues:l,validationSchema:T,enableReinitialize:!0,onSubmit:g=>{B(g)}},({errors:g,values:y,handleChange:d,setFieldValue:f,setFieldError:z,handleSubmit:S})=>b.createElement("form",{onSubmit:S,className:e.containerClassName||x.container},!e.hideUsername&&b.createElement(w.Group,{id:"username-container",className:e.fieldContainerClassName||x.fieldContainer},b.createElement(w.Label,{className:e.fieldLabelClassName||x.fieldLabel},e.labelUsername||"Username"),b.createElement(w.Control,{id:"username",className:e.fieldInputClassName||x.formField,type:"text",value:y.username,onChange:d,isInvalid:!!g.username}),b.createElement(w.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||x.fieldError},g.username)),!e.hideEmail&&b.createElement(w.Group,{id:"email-container",className:e.fieldContainerClassName||x.fieldContainer},b.createElement(w.Label,{className:e.fieldLabelClassName||x.fieldLabel},e.labelEmail||"Email address"),b.createElement(w.Control,{id:"email",className:e.fieldInputClassName||x.formField,type:"email",value:y.email,onChange:d,isInvalid:!!g.email}),a&&b.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-unconfirmed-email-text"},e.unconfirmedEmailText||"The following email is not yet confirmed: "," ",a),b.createElement(w.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||x.fieldError},g.email)),!e.hidePassword&&b.createElement(w.Group,{id:"password-container",className:e.fieldContainerClassName||x.fieldContainer},b.createElement(w.Label,{className:e.fieldLabelClassName||x.fieldLabel},e.labelPassword||"Password"),b.createElement(w.Control,{id:"password",className:e.fieldInputClassName||x.formField,type:"password",value:y.password,onChange:d,isInvalid:!!g.password}),b.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-password-optional-text"},e.passwordChangeOptionalText||"You must only provide this if you want to change the password."),b.createElement(w.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||x.fieldError},g.password)),!e.hidePassword&&b.createElement(w.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||x.fieldContainer},b.createElement(w.Label,{className:e.fieldLabelClassName||x.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),b.createElement(w.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||x.formField,type:"password",value:y.passwordConfirmation,onChange:d,isInvalid:!!g.passwordConfirmation}),b.createElement(w.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||x.fieldError},g.passwordConfirmation)),!e.hideAvatar&&b.createElement(w.Group,{id:"avatar-container",className:e.fieldContainerClassName||x.fieldContainer},b.createElement(w.Label,{className:e.fieldLabelClassName||x.fieldLabel},e.labelAvatar||"Avatar"),b.createElement("div",{className:e.dropzoneContainerClassName||x.formField},b.createElement(fe,{onChange:R=>f("avatar",R.length>0?R[0]:null),files:y.avatar?[y.avatar]:[],multiple:!1,maxFiles:1,onMaxFilesError:()=>z("avatar",e.avatarToManyFilesErrorText||"Only one file is allowed"),maxSize:e.avatarMaxSize||5242880,onMaxSizeError:()=>z("avatar",e.avatarToLargeErrorText||`The file must not be larger than ${Math.round((e.avatarMaxSize||5242880)/1048576)} MB.`),onInvalidTypeError:()=>z("avatar",e.avatarWrongFormatErrorText||"Invalid file format.")})),b.createElement(w.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||x.fieldError},g.avatar)),!s&&b.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},b.createElement(Bt,{ref:e.submitRef,type:"submit",variant:"primary",className:e.submitButtonClassName||x.submitButton},e.labelSubmitButton||"Submit")))):b.createElement("div",null,"Loading..."))};var Ne={fetcher:async(e,t,r="get",n=null,s=void 0,i="1.0")=>{switch(r=r.toLowerCase(),r){case"post":return c.post(e,t,n,s,i);case"put":return c.put(e,t,n,s,i);case"patch":return c.patch(e,t,n,s,i);case"delete":return c.delete(e,t,n,s,i);default:return c.get(e,t,n,s,i)}}};var Pa={client:c,swr:Ne,utils:o};import{AbstractUploader as Mt}from"@d4us1/remawy";import*as Oe from"@rails/activestorage";var ge=class{uploader;authInfo;apiVersion;constructor(t,r,n){this.uploader=t,this.authInfo=r,this.apiVersion=n}directUploadWillCreateBlobWithXHR(t){let r=c.defaultHttpHeader(this.authInfo,this.apiVersion);Object.keys(r).forEach(n=>{t.setRequestHeader(n,r[n])}),t.upload.addEventListener("progress",n=>this.uploader.onDirectUploadProgress(n))}},ae=class extends Mt{baseUrl;authInfo;apiVersion;constructor(t,r,n){super(),t.endsWith("/")||(t=`${t}/`),this.baseUrl=t,this.authInfo=r,this.apiVersion=n}startUpload(t){let r=new ge(this,this.authInfo,this.apiVersion);return new Oe.DirectUpload(t,`${this.baseUrl}api/active_storage/blobs/create_direct_upload`,r).create((s,i)=>{if(s)this.onError(s);else{let l=`${this.baseUrl}rails/active_storage/blobs/${i.signed_id}/${i.filename}`,u={signedId:i.signed_id,fileName:i.filename};this.onFinish(l,t,u)}}),Promise.resolve(void 0)}onDirectUploadProgress(t){this.onProgress(t.loaded/t.total)}};var Ie={uploader:ae};var Na={remawy:Ie};export{fe as ActiveStorageDropzone,Tt as DevelopmentHint,Ue as EzOnRails,Pa as EzOnRailsHttp,W as EzOnRailsHttpError,Na as EzOnRailsIntegrations,mt as LoginForm,pt as LostPasswordForm,kt as ProtectedPage,at as RegistrationForm,Ct as ResendConfirmationForm,St as ResetPasswordForm,Ht as UpdateUserForm,Je as useEzApi,le as useEzApiHttpClient,P as useEzOnRails,Qe as useEzScaff};
//# sourceMappingURL=index.js.map
