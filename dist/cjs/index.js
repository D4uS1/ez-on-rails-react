"use strict";var ir=Object.create;var ne=Object.defineProperty;var or=Object.getOwnPropertyDescriptor;var sr=Object.getOwnPropertyNames;var lr=Object.getPrototypeOf,mr=Object.prototype.hasOwnProperty;var dr=(e,r)=>{for(var t in r)ne(e,t,{get:r[t],enumerable:!0})},be=(e,r,t,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of sr(r))!mr.call(e,a)&&a!==t&&ne(e,a,{get:()=>r[a],enumerable:!(n=or(r,a))||n.enumerable});return e};var C=(e,r,t)=>(t=e!=null?ir(lr(e)):{},be(r||!e||!e.__esModule?ne(t,"default",{value:e,enumerable:!0}):t,e)),cr=e=>be(ne({},"__esModule",{value:!0}),e);var Or={};dr(Or,{ActiveStorageDropzone:()=>de,DevelopmentHint:()=>De,EzOnRails:()=>Ce,EzOnRailsHttp:()=>Nr,EzOnRailsHttpError:()=>K,EzOnRailsIntegrations:()=>Rr,LoginForm:()=>Ie,LostPasswordForm:()=>Ue,ProtectedPage:()=>Ze,RegistrationForm:()=>ze,ResendConfirmationForm:()=>Me,ResetPasswordForm:()=>Xe,UpdateUserForm:()=>Qe,useEzApi:()=>we,useEzOnRails:()=>T,useEzScaff:()=>ye});module.exports=cr(Or);var $=C(require("react"));var Ee=require("react"),ae=(0,Ee.createContext)({apiVersion:"1.0",backendUrl:"http://localhost:3000",authInfo:null,setBackendUrl:e=>{},setAuthInfo:e=>{},setApiVersion:e=>{}});var Ce=e=>{let[r,t]=(0,$.useState)(e.backendUrl),[n,a]=(0,$.useState)(e.authInfo||null),[i,l]=(0,$.useState)(e.apiVersion),p=(0,$.useMemo)(()=>{let o={backendUrl:r,authInfo:n||null,apiVersion:i,setBackendUrl:t,setAuthInfo:a,setApiVersion:l};return o.backendUrl.endsWith("/")&&(o.backendUrl=o.backendUrl.slice(0,-1)),o},[r,n,i]);return $.default.createElement(ae.Provider,{value:p},e.children)};var E=C(require("react")),B=C(require("yup")),Fe=require("formik");var Y=require("react");var se=require("convert-keys"),he=e=>e.startsWith("/")?e.slice(1):e,xe=e=>e.endsWith("/")?e.slice(0,-1):e,ur=(e,r)=>`${xe(e)}/${he(r)}`,fr=(e,r)=>`${xe(e)}/api/${he(r)}`,pr=e=>e.replace(/[A-Z]/g,(r,t)=>t===0?r.toLowerCase():"_"+r.toLowerCase()),Pe=e=>e&&(0,se.toSnake)(e),Te=e=>e&&(0,se.toCamel)(e),gr=e=>Object.keys(e).map(r=>r+"="+e[r]).join("&"),ie=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}/.test(e)?new Date(e):Array.isArray(e)?e.map(r=>ie(r)):(typeof e=="object"&&Object.keys(e).forEach(r=>{e[r]=ie(e[r])}),e),oe=e=>e instanceof Date?e.toISOString():Array.isArray(e)?e.map(r=>oe(r)):(typeof e=="object"&&Object.keys(e).forEach(r=>{e[r]=oe(e[r])}),e),br=e=>oe(Pe(e)),Er=e=>!e||typeof e!="object"?e:ie(Te(e)),m={toBaseUrl:ur,toApiUrl:fr,toSnakeCase:Pe,toSnakeCaseString:pr,toCamelCase:Te,toGetParameters:gr,toDates:ie,toDateStrings:oe,toBackendParams:br,toFrontendParams:Er};var K=class extends Error{httpStatusCode;constructor(r,t){super(),this.message=r,this.httpStatusCode=t}};var Cr=e=>{if(e)return{uid:e.uid,client:e.client,expiry:e.expiry,"token-type":e.tokenType,"access-token":e.accessToken}},hr=e=>({uid:e.uid,client:e.client,expiry:e.expiry,tokenType:e["token-type"],accessToken:e["access-token"]}),I=(e,r)=>({"Content-Type":"application/json",Accept:"application/json","api-version":r,...Cr(e)}),k=async(e,r,t,n)=>{let a=await fetch(r,{method:e,headers:n,body:t?JSON.stringify(t):null});if(a.status>=400)throw new K(JSON.stringify(a.body),a.status);let i={},l=null;try{a.headers.forEach((p,o)=>{i[o]=p}),l=await a.json()}catch{}return{headers:i,body:l}},u={signUp:async(e,r,t)=>{r=m.toBackendParams(r),await k("POST",m.toBaseUrl(e,"users"),{user:r},I(null,t))},signIn:async(e,r,t)=>{r=m.toBackendParams(r);let n=await k("POST",m.toApiUrl(e,"auth/sign_in"),r,I(null,t));return hr(n.headers)},signOut:async(e,r,t)=>{await k("DELETE",m.toApiUrl(e,"auth/sign_out"),null,I(r,t))},passwordResetInstructions:async(e,r,t)=>{r=m.toBackendParams(r),await k("POST",m.toBaseUrl(e,"users/password"),{user:r},I(null,t))},passwordReset:async(e,r,t)=>{r=m.toBackendParams(r),await k("PUT",m.toBaseUrl(e,"users/password"),{user:r},I(null,t))},getUser:async(e,r,t)=>{let n=await k("GET",m.toApiUrl(e,"users/me"),null,I(r,t));return m.toFrontendParams(n.body)},updateUser:async(e,r,t,n)=>{let a=r.avatar?.signedId,i={...m.toBackendParams(r),avatar:a},l=await k("PATCH",m.toApiUrl(e,"users/me"),{user:i},I(t,n));return m.toFrontendParams(l.body)},confirmationInstructions:async(e,r,t)=>{r=m.toBackendParams(r),await k("POST",m.toBaseUrl(e,"users/confirmation"),{user:r},I(null,t))},confirmation:async(e,r,t)=>{let n=m.toBaseUrl(e,"users/confirmation");r=m.toBackendParams(r),n=`${n}?${m.toGetParameters(r)}`,await k("GET",n,null,I(null,t))},get:async(e,r,t,n=null,a="1.0",i=void 0)=>{let l=m.toApiUrl(e,r);t&&(t=m.toBackendParams(t)),i&&(t=i(t)),t&&(l=`${l}?${m.toGetParameters(t)}`);let p=await k("GET",l,null,I(n,a));return m.toFrontendParams(p.body)},post:async(e,r,t,n=null,a="1.0",i=void 0)=>{let l=m.toApiUrl(e,r);t&&(t=m.toBackendParams(t)),i&&(t=i(t));let p=await k("POST",l,t,I(n,a));return m.toFrontendParams(p.body)},patch:async(e,r,t,n=null,a="1.0",i=void 0)=>{let l=m.toApiUrl(e,r);t&&(t=m.toBackendParams(t)),i&&(t=i(t));let p=await k("PATCH",l,t,I(n,a));return m.toFrontendParams(p.body)},put:async(e,r,t,n=null,a="1.0",i=void 0)=>{let l=m.toApiUrl(e,r);t&&(t=m.toBackendParams(t)),i&&(t=i(t));let p=await k("PUT",l,t,I(n,a));return m.toFrontendParams(p.body)},delete:async(e,r,t,n=null,a="1.0",i=void 0)=>{let l=m.toApiUrl(e,r);t&&(t=m.toBackendParams(t)),i&&(t=i(t)),t&&(l=`${l}?${m.toGetParameters(t)}`);let p=await k("DELETE",l,null,I(n,a));return m.toFrontendParams(p.body)},defaultHttpHeader:(e,r)=>I(e,r)};var _e=require("react");var T=()=>(0,_e.useContext)(ae);var we=(e,r="GET",t,n)=>{let{backendUrl:a,authInfo:i,apiVersion:l}=T(),[p,o]=(0,Y.useState)(null),[d,b]=(0,Y.useState)(null),[H,w]=(0,Y.useState)(!1),g=(0,Y.useCallback)(async F=>{w(!0),b(null),o(null);let s=F||t,c=null;try{switch(r){case"POST":c=await u.post(a,e,s,i,l);break;case"PUT":c=await u.put(a,e,s,i,l);break;case"PATCH":c=await u.patch(a,e,s,i,l);break;case"DELETE":c=await u.delete(a,e,s,i,l);break;default:c=await u.get(a,e,s,i,l)}return o(c),w(!1),c}catch(z){b(z),w(!1)}},[]);return(0,Y.useEffect)(()=>{(async()=>n?.skipInitialCall||await g())()},[i,a,l]),{data:p,error:d,inProgress:H,callApi:g}};var S=require("react");var ye=e=>{let{backendUrl:r,authInfo:t,apiVersion:n}=T(),[a,i]=(0,S.useState)(null),[l,p]=(0,S.useState)(null),[o,d]=(0,S.useState)(!1),[b,H]=(0,S.useState)(null),w=(0,S.useMemo)(()=>m.toSnakeCaseString(e),[e]),g=(0,S.useCallback)(x=>{(async()=>{H(null),d(!0);try{await x(),d(!1)}catch(A){d(!1),H(A)}})()},[]),F=(0,S.useCallback)(()=>{g(async()=>{let x=await u.get(r,w,null,t,n);p(x)})},[r,t,n,w]),s=(0,S.useCallback)(x=>{g(async()=>{let A=await u.get(r,`${w}/${x}`,null,t,n);i(A)})},[r,t,n,w]),c=(0,S.useCallback)(x=>{g(async()=>{let A=await u.get(r,w,x,t,n);p(A)})},[r,t,n,w]),z=(0,S.useCallback)(x=>{g(async()=>{let A=await u.post(r,w,x,t,n);i(A)})},[r,t,n,w]),L=(0,S.useCallback)((x,A)=>{g(async()=>{let ar=await u.patch(r,`${w}/${x}`,A,t,n);i(ar)})},[r,t,n,w]),O=(0,S.useCallback)(x=>{g(async()=>{await u.delete(r,`${w}/${x}`,null,t,n),i(null)})},[r,t,n,w]);return{record:a,records:l,inProgress:o,error:b,getAll:F,getOne:s,search:c,create:z,update:L,remove:O}};var v=require("react-bootstrap");var ve="184b78f771b5a241c7bfec84028f8a6293ef4cd81c949507f42398c35855848d",xr=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(ve)){var e=document.createElement("style");e.id=ve,e.textContent=xr,document.head.appendChild(e)}})();var y={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var ze=e=>{let{backendUrl:r,apiVersion:t}=T(),[n,a]=(0,E.useState)(!1),i=async o=>{a(!0);try{await u.signUp(r,o,t),e.onRegisterSuccess(o.email),a(!1)}catch(d){e.onRegisterError(d),a(!1)}},l=B.object().shape({username:B.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must not have more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:B.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must have not more than ${e.maxEmailLength||100} characters.`),password:B.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:B.string().oneOf([B.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation must match."),privacyPolicyAccepted:B.boolean().isTrue(e.privacyPolicyNotAcceptedErrorText||"The privacy policy must be accepted.")}).defined();return E.default.createElement(Fe.Formik,{initialValues:{username:"",email:"",password:"",passwordConfirmation:"",privacyPolicyAccepted:!1},validationSchema:l,onSubmit:o=>{i(o)}},({errors:o,handleChange:d,handleSubmit:b})=>E.default.createElement("form",{onSubmit:b,className:e.containerClassName||y.container},E.default.createElement(v.Form.Group,{id:"username-container",className:e.fieldContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Label,{className:e.fieldLabelClassName||y.fieldLabel},e.labelUsername||"Username"),E.default.createElement(v.Form.Control,{id:"username",className:e.fieldInputClassName||y.formField,type:"text",onChange:d,isInvalid:!!o.username}),E.default.createElement(v.Form.Control.Feedback,{className:e.fieldErrorClassName||y.fieldError,type:"invalid"},o.username)),E.default.createElement(v.Form.Group,{id:"email-container",className:e.fieldContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Label,{className:e.fieldLabelClassName||y.fieldLabel},e.labelEmail||"Email address"),E.default.createElement(v.Form.Control,{id:"email",className:e.fieldInputClassName||y.formField,type:"email",onChange:d,isInvalid:!!o.email}),E.default.createElement(v.Form.Control.Feedback,{className:e.fieldErrorClassName||y.fieldError,type:"invalid"},o.email)),E.default.createElement(v.Form.Group,{id:"password-container",className:e.fieldContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Label,{className:e.fieldLabelClassName||y.fieldLabel},e.labelPassword||"Password"),E.default.createElement(v.Form.Control,{id:"password",className:e.fieldInputClassName||y.formField,type:"password",onChange:d,isInvalid:!!o.password}),E.default.createElement(v.Form.Control.Feedback,{className:e.fieldErrorClassName||y.fieldError,type:"invalid"},o.password)),E.default.createElement(v.Form.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Label,{className:e.fieldLabelClassName||y.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),E.default.createElement(v.Form.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||y.formField,type:"password",onChange:d,isInvalid:!!o.passwordConfirmation}),E.default.createElement(v.Form.Control.Feedback,{className:e.fieldErrorClassName||y.fieldError,type:"invalid"},o.passwordConfirmation)),E.default.createElement(v.Form.Group,{id:"privacy-policy-accepted-container",className:e.fieldCheckboxContainerClassName||y.fieldContainer},E.default.createElement(v.Form.Check,{id:"privacyPolicyAccepted",className:e.fieldCheckboxInputClassName||y.formField,type:"checkbox",label:e.labelPrivacyPolicyAccepted||E.default.createElement("span",null,"I have read and accept the"," ",E.default.createElement("a",{href:e.privacyPolicyUrl,target:"_blank",rel:"noopener noreferrer"},"privacy policy")," ","and"," ",E.default.createElement("a",{href:e.generalTermsUrl,target:"_blank",rel:"noopener noreferrer"},"terms and conditions")," ","."),onChange:d,isInvalid:!!o.privacyPolicyAccepted,feedbackType:"invalid",feedback:o.privacyPolicyAccepted})),!n&&E.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},E.default.createElement(v.Button,{className:e.submitButtonClassName||y.submitButton,type:"submit",variant:"primary"},e.labelSubmitButton||"Register"))))};var Re=require("formik"),V=C(require("react-bootstrap/Form")),Oe=C(require("react-bootstrap/Button")),N=C(require("react")),Q=C(require("yup"));var Ne="1ced5992128b2373e529afb6c9d18e1a38e47e17bc21e470c8d685fbef280e02",Pr=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ne)){var e=document.createElement("style");e.id=Ne,e.textContent=Pr,document.head.appendChild(e)}})();var U={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Ie=e=>{let{backendUrl:r,apiVersion:t,setAuthInfo:n}=T(),[a,i]=(0,N.useState)(!1),l=Q.object().shape({email:Q.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required."),password:Q.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"The password is required.")}).defined(),p=async d=>{i(!0);try{let b=await u.signIn(r,d,t);if(!b)throw"No authentication object returned";n(b),await e.onLoginSuccess(d.email,b,d.stayLoggedIn)}catch(b){e.onLoginError(b),i(!1)}};return N.default.createElement(Re.Formik,{initialValues:{email:"",password:"",stayLoggedIn:!1},onSubmit:d=>{p(d)},validationSchema:l},({errors:d,handleChange:b,handleSubmit:H})=>N.default.createElement("form",{onSubmit:H,className:e.containerClassName||U.container},N.default.createElement(V.default.Group,{id:"email-container",className:e.fieldContainerClassName||U.fieldContainer},N.default.createElement(V.default.Label,{className:e.fieldLabelClassName||U.fieldLabel},e.labelEmail||"Email address"),N.default.createElement(V.default.Control,{id:"email",type:"email",onChange:b,className:e.fieldInputClassName||U.formField,isInvalid:!!d.email}),N.default.createElement(V.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||U.fieldError},d.email)),N.default.createElement(V.default.Group,{id:"password-container",className:e.fieldContainerClassName||U.fieldContainer},N.default.createElement(V.default.Label,{className:e.fieldLabelClassName||U.fieldLabel},e.labelPassword||"Password"),N.default.createElement(V.default.Control,{id:"password",type:"password",onChange:b,className:e.fieldInputClassName||U.formField,isInvalid:!!d.password}),N.default.createElement(V.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||U.fieldError},d.password)),!e.hideStayLoggedIn&&N.default.createElement(V.default.Group,{id:"stay-logged-in-container",className:e.fieldCheckboxContainerClassName||U.fieldContainer},N.default.createElement(V.default.Check,{id:"stayLoggedIn",className:e.fieldCheckboxInputClassName||U.formField,type:"checkbox",label:e.labelStayLoggedIn||"Stay logged in.",onChange:b})),!a&&N.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},N.default.createElement(Oe.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||U.submitButton},e.labelSubmitButton||"Login"))))};var M=C(require("react")),le=C(require("yup"));var ke=require("formik"),ee=C(require("react-bootstrap/Form")),Le=C(require("react-bootstrap/Button"));var Se="7e6e9d3476df316f599dacca7b14adb07957a7b8dc1d0e9b7c5e39cfe0affcbc",Tr=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Se)){var e=document.createElement("style");e.id=Se,e.textContent=Tr,document.head.appendChild(e)}})();var X={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Ue=e=>{let{backendUrl:r,apiVersion:t}=T(),[n,a]=(0,M.useState)(!1),i=le.object().shape({email:le.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required.")}).defined(),l=o=>{a(!0),u.passwordResetInstructions(r,o,t).then(()=>{e.onLostPasswordSuccess(o.email),a(!1)}).catch(d=>{e.onLostPasswordError(d),a(!1)})};return M.default.createElement(ke.Formik,{initialValues:{email:""},onSubmit:o=>{l(o)},validationSchema:i},({errors:o,handleChange:d,handleSubmit:b})=>M.default.createElement("form",{onSubmit:b,className:e.containerClassName||X.container},M.default.createElement(ee.default.Group,{id:"email-container",className:e.fieldContainerClassName||X.fieldContainer},M.default.createElement(ee.default.Label,{className:e.fieldLabelClassName||X.fieldLabel},e.labelEmail||"Email address"),M.default.createElement(ee.default.Control,{id:"email",type:"email",onChange:d,className:e.fieldInputClassName||X.formField,isInvalid:!!o.email}),M.default.createElement(ee.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||X.fieldError},o.email)),!n&&M.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},M.default.createElement(Le.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||X.submitButton},e.labelSubmitButton||"Submit"))))};var q=C(require("react")),me=C(require("yup"));var Be=require("formik"),re=C(require("react-bootstrap/Form")),Ve=C(require("react-bootstrap/Button"));var Ae="08faa1fc3d8d44ac793d64f9044157186548fdbc461a48c463085815552fa55e",_r=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ae)){var e=document.createElement("style");e.id=Ae,e.textContent=_r,document.head.appendChild(e)}})();var Z={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Me=e=>{let{backendUrl:r,apiVersion:t}=T(),[n,a]=(0,q.useState)(!1),i=me.object().shape({email:me.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.")}).defined(),l=o=>{a(!0),u.confirmationInstructions(r,o,t).then(()=>{e.onResendConfirmationSuccess(o.email),a(!1)}).catch(d=>{e.onResendConfirmationError(d),a(!1)})};return q.default.createElement(Be.Formik,{initialValues:{email:""},onSubmit:o=>{l(o)},validationSchema:i},({errors:o,handleChange:d,handleSubmit:b})=>q.default.createElement("form",{onSubmit:b,className:e.containerClassName||Z.container},q.default.createElement(re.default.Group,{id:"email-container",className:e.fieldContainerClassName||Z.fieldContainer},q.default.createElement(re.default.Label,{className:e.fieldLabelClassName||Z.fieldLabel},e.labelEmail||"Email address"),q.default.createElement(re.default.Control,{id:"email",type:"email",onChange:d,className:e.fieldInputClassName||Z.formField,isInvalid:!!o.email}),q.default.createElement(re.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||Z.fieldError},o.email)),!n&&q.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},q.default.createElement(Ve.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||Z.submitButton},e.labelSubmitButton||"Submit"))))};var te=C(require("react"));var qe="dfffe9637f7a60407aac13517bbfb11ff47b3851dabc1a2667ff9fbba65f0561",wr=`._container_q2u8x_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(qe)){var e=document.createElement("style");e.id=qe,e.textContent=wr,document.head.appendChild(e)}})();var ue={container:"_container_q2u8x_1",text:"_text_q2u8x_13"};var De=e=>{let[r,t]=(0,te.useState)(e.visible),n=()=>{t(!0)};return r?te.default.createElement("div",{onClick:()=>{t(!1),setTimeout(n,e.dismissTimeout||2e4)},className:ue.container},te.default.createElement("span",{className:ue.text},"development")):null};var h=C(require("react")),Ge=C(require("@rails/activestorage")),je=require("react"),W=C(require("react-dropzone"));var He="2013c8a62515dd4a9efd3fcc3573094b9682aa9201896f90ad5202d6d823fae2",yr=`._dropzoneContainer_14oft_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(He)){var e=document.createElement("style");e.id=He,e.textContent=yr,document.head.appendChild(e)}})();var fe={dropzoneContainer:"_dropzoneContainer_14oft_1",pastezoneContainer:"_pastezoneContainer_14oft_19"};var vr=(e,r)=>`rails/active_storage/blobs/${e}/${r}`,de=e=>{let{backendUrl:r,authInfo:t,apiVersion:n}=T(),[a,i]=(0,je.useState)(0),l=h.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",className:"bi bi-cloud-arrow-up",viewBox:"0 0 16 16"},h.default.createElement("path",{fillRule:"evenodd",d:"M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"}),h.default.createElement("path",{d:"M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"})),p=async s=>{await u.delete(r,`active_storage/blobs/${s}`,null,t,n)},o=async(s,c)=>{await p(c);let z=[...e.files];z=z.filter(L=>c!==L.signedId),e.onChange(z),s.stopPropagation()},d=s=>{s.loaded/s.total>=.9999999},b=s=>{if(s.length){if(e.maxFiles){let c=e.maxFiles-(e.files.length+a);if(c<s.length&&e.onMaxFilesError(e.maxFiles),c<=0)return;s=s.slice(0,c)}if(e.maxSize){let c=s.filter(z=>z.size<=e.maxSize);c.length<s.length&&e.onMaxSizeError(e.maxSize),s=c}i(c=>c+s.length),s.forEach(c=>{new Ge.DirectUpload(c,m.toApiUrl(r,"active_storage/blobs/create_direct_upload"),{directUploadWillCreateBlobWithXHR:L=>{let O=u.defaultHttpHeader(t,n);Object.keys(O).forEach(x=>{L.setRequestHeader(x,O[x])}),L.upload.addEventListener("progress",d)}}).create((L,O)=>{if(i(x=>x-1),!L){let x={signedId:O.signed_id};c.type.includes("image")?x.path=vr(O.signed_id,O.filename):x.filename=O.filename;let A=e.files;A.push(x),e.onChange([...A])}})})}},H=s=>{if(!s.clipboardData)return;let c=s.clipboardData.items;if(c===void 0)return;let z=[];for(let L of c){if(e.accept&&!Object.keys(e.accept).some(x=>L.type.match(x)))continue;let O=L.getAsFile();O&&z.push(O)}b(z)},w=e.files.map(s=>h.default.createElement("div",{key:s.signedId,className:"card w-25 animate__animated animate__fadeIn mb-4",style:{flex:"0 0 auto"}},h.default.createElement("div",{className:"card-header p-1"},h.default.createElement("button",{onClick:c=>o(c,s.signedId||""),type:"button",className:"close","aria-label":"Close"},h.default.createElement("span",{"aria-hidden":"true"},"\xD7"))),h.default.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},h.default.createElement("img",{src:m.toBaseUrl(r,s.path||""),alt:s.filename,className:"d-block mw-100 m-auto m-0 rounded p-1"})))),g=[];for(let s=0;s<a;s++)g.push(h.default.createElement("div",{key:s,className:"card w-25 mb-4",style:{flex:"0 0 auto"}},h.default.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},h.default.createElement("div",{className:"p-4 text-center"},h.default.createElement("div",{className:"spinner-border",role:"status"},h.default.createElement("span",{className:"sr-only"},"Loading..."))))));let F=s=>{s.some(c=>c.errors[0].code===W.ErrorCode.TooManyFiles)&&e.onMaxFilesError(e.maxFiles),s.some(c=>c.errors[0].code===W.ErrorCode.FileInvalidType)&&e.onInvalidTypeError(e.accept),s.some(c=>c.errors[0].code===W.ErrorCode.FileTooLarge)&&e.onMaxSizeError(e.maxSize)};return h.default.createElement("div",null,e.pasteZone&&h.default.createElement("input",{type:"text",className:`w-100 p-2 ${fe.pastezoneContainer}`,value:e.textPastezone||"Copy and paste some files here",onPaste:H,readOnly:!0}),h.default.createElement(W.default,{onDropAccepted:b,multiple:e.multiple,maxFiles:e.maxFiles,maxSize:e.maxSize,onDropRejected:F,accept:e.accept},({getRootProps:s,getInputProps:c}=(0,W.useDropzone)())=>h.default.createElement("section",null,h.default.createElement("div",{...s(),className:`${fe.dropzoneContainer} p-4 ${e.className}`},h.default.createElement("input",{...c()}),h.default.createElement("p",{className:"m-0"},e.textDropzone||"Drag 'n' drop some files here, or click to select files"),w.length>0?h.default.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},w):h.default.createElement("div",{className:"m-0"},e.customIcon||l),g.length>0&&h.default.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},g)))))};var Ye=require("formik"),G=C(require("react-bootstrap/Form")),We=C(require("react-bootstrap/Button")),R=C(require("react")),J=C(require("yup"));var $e="89ae8ceb5715a97634b604b77e8db8c51a73ff369719b1b41c5393911516fb24",Fr=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById($e)){var e=document.createElement("style");e.id=$e,e.textContent=Fr,document.head.appendChild(e)}})();var D={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Xe=e=>{let{backendUrl:r,apiVersion:t}=T(),[n,a]=(0,R.useState)(!1),i=J.object().shape({password:J.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:J.string().oneOf([J.ref("password")],e.passwordConfirmationMatchErrorText||"The password and its confirmation must match.")}).defined(),l=(0,R.useCallback)(async o=>{a(!0);try{await u.passwordReset(r,{...o,resetPasswordToken:e.resetPasswordToken},t),await e.onResetPasswordSuccess()}catch(d){e.onResetPasswordError(d),a(!1)}},[e.resetPasswordToken]);return R.default.createElement(Ye.Formik,{initialValues:{password:"",passwordConfirmation:""},onSubmit:o=>{l(o)},validationSchema:i},({errors:o,handleChange:d,handleSubmit:b})=>R.default.createElement("form",{onSubmit:b,className:e.containerClassName||D.container},R.default.createElement(G.default.Group,{id:"password-container",className:e.fieldContainerClassName||D.fieldContainer},R.default.createElement(G.default.Label,{className:e.fieldLabelClassName||D.fieldLabel},e.labelPassword||"Password"),R.default.createElement(G.default.Control,{id:"password",type:"password",onChange:d,className:e.fieldInputClassName||D.formField,isInvalid:!!o.password}),R.default.createElement(G.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||D.fieldError},o.password)),R.default.createElement(G.default.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||D.fieldContainer},R.default.createElement(G.default.Label,{className:e.fieldLabelClassName||D.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),R.default.createElement(G.default.Control,{id:"passwordConfirmation",type:"password",onChange:d,className:e.fieldInputClassName||D.formField,isInvalid:!!o.passwordConfirmation}),R.default.createElement(G.default.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||D.fieldError},o.passwordConfirmation)),!n&&R.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},R.default.createElement(We.default,{variant:"primary",type:"submit",className:e.submitButtonClassName||D.submitButton},e.labelSubmitButton||"Submit"))))};var pe=C(require("react"));var Ze=e=>{let{authInfo:r}=T();return pe.default.createElement("div",null,r?e.children:pe.default.createElement("div",{className:e.accessDeniedClassName||"ez-on-rails-protected-page-access-denied-container"},e.accessDeniedText||"You must be signed in to see this content."))};var f=C(require("react")),j=C(require("yup")),Ke=require("formik");var _=require("react-bootstrap");var Je="a563a7ebb3e648e97f9484abfe6d2e49b279541947d0d1e8c32963c80c0b3f08",zr=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Je)){var e=document.createElement("style");e.id=Je,e.textContent=zr,document.head.appendChild(e)}})();var P={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Qe=e=>{let{authInfo:r,backendUrl:t,apiVersion:n}=T(),[a,i]=(0,f.useState)(!1),[l,p]=(0,f.useState)(null),[o,d]=(0,f.useState)(void 0),b=g=>{p(g),d(g.unconfirmedEmail)};(0,f.useEffect)(()=>{(async()=>r&&b(await u.getUser(t,r,n)))()},[]);let H=async g=>{if(r){i(!0);try{let F=await u.updateUser(t,g,r,n);e.onUserUpdateSuccess(F),b(F),i(!1)}catch(F){e.onUserUpdateError(F),i(!1)}}},w=j.object().shape({username:j.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must have not more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:j.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must not have more than ${e.maxEmailLength||100} characters.`),password:j.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`),passwordConfirmation:j.string().oneOf([j.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation do not match.")}).defined();return r&&f.default.createElement("div",{className:"ez-on-rails-form-outer-container"},l?f.default.createElement(Ke.Formik,{initialValues:l,validationSchema:w,enableReinitialize:!0,onSubmit:g=>{H(g)}},({errors:g,values:F,handleChange:s,setFieldValue:c,setFieldError:z,handleSubmit:L})=>f.default.createElement("form",{onSubmit:L,className:e.containerClassName||P.container},!e.hideUsername&&f.default.createElement(_.Form.Group,{id:"username-container",className:e.fieldContainerClassName||P.fieldContainer},f.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||P.fieldLabel},e.labelUsername||"Username"),f.default.createElement(_.Form.Control,{id:"username",className:e.fieldInputClassName||P.formField,type:"text",value:F.username,onChange:s,isInvalid:!!g.username}),f.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||P.fieldError},g.username)),!e.hideEmail&&f.default.createElement(_.Form.Group,{id:"email-container",className:e.fieldContainerClassName||P.fieldContainer},f.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||P.fieldLabel},e.labelEmail||"Email address"),f.default.createElement(_.Form.Control,{id:"email",className:e.fieldInputClassName||P.formField,type:"email",value:F.email,onChange:s,isInvalid:!!g.email}),o&&f.default.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-unconfirmed-email-text"},e.unconfirmedEmailText||"The following email is not yet confirmed: "," ",o),f.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||P.fieldError},g.email)),!e.hidePassword&&f.default.createElement(_.Form.Group,{id:"password-container",className:e.fieldContainerClassName||P.fieldContainer},f.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||P.fieldLabel},e.labelPassword||"Password"),f.default.createElement(_.Form.Control,{id:"password",className:e.fieldInputClassName||P.formField,type:"password",value:F.password,onChange:s,isInvalid:!!g.password}),f.default.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-password-optional-text"},e.passwordChangeOptionalText||"You must only provide this if you want to change the password."),f.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||P.fieldError},g.password)),!e.hidePassword&&f.default.createElement(_.Form.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||P.fieldContainer},f.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||P.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),f.default.createElement(_.Form.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||P.formField,type:"password",value:F.passwordConfirmation,onChange:s,isInvalid:!!g.passwordConfirmation}),f.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||P.fieldError},g.passwordConfirmation)),!e.hideAvatar&&f.default.createElement(_.Form.Group,{id:"avatar-container",className:e.fieldContainerClassName||P.fieldContainer},f.default.createElement(_.Form.Label,{className:e.fieldLabelClassName||P.fieldLabel},e.labelAvatar||"Avatar"),f.default.createElement("div",{className:e.dropzoneContainerClassName||P.formField},f.default.createElement(de,{onChange:O=>c("avatar",O.length>0?O[0]:null),files:F.avatar?[F.avatar]:[],multiple:!1,maxFiles:1,onMaxFilesError:()=>z("avatar",e.avatarToManyFilesErrorText||"Only one file is allowed"),maxSize:e.avatarMaxSize||5242880,onMaxSizeError:()=>z("avatar",e.avatarToLargeErrorText||`The file must not be larger than ${Math.round((e.avatarMaxSize||5242880)/1048576)} MB.`),onInvalidTypeError:()=>z("avatar",e.avatarWrongFormatErrorText||"Invalid file format.")})),f.default.createElement(_.Form.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||P.fieldError},g.avatar)),!a&&f.default.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},f.default.createElement(_.Button,{ref:e.submitRef,type:"submit",variant:"primary",className:e.submitButtonClassName||P.submitButton},e.labelSubmitButton||"Submit")))):f.default.createElement("div",null,"Loading..."))};var er={fetcher:async(e,r,t="get",n=null,a=void 0,i="1.0")=>{switch(t=t.toLowerCase(),t){case"post":return u.post(e,r,n,a,i);case"put":return u.put(e,r,n,a,i);case"patch":return u.patch(e,r,n,a,i);case"delete":return u.delete(e,r,n,a,i);default:return u.get(e,r,n,a,i)}}};var Nr={client:u,swr:er,utils:m};var rr=require("@d4us1/remawy"),tr=C(require("@rails/activestorage")),ge=class{uploader;authInfo;apiVersion;constructor(r,t,n){this.uploader=r,this.authInfo=t,this.apiVersion=n}directUploadWillCreateBlobWithXHR(r){let t=u.defaultHttpHeader(this.authInfo,this.apiVersion);Object.keys(t).forEach(n=>{r.setRequestHeader(n,t[n])}),r.upload.addEventListener("progress",n=>this.uploader.onDirectUploadProgress(n))}},ce=class extends rr.AbstractUploader{baseUrl;authInfo;apiVersion;constructor(r,t,n){super(),r.endsWith("/")||(r=`${r}/`),this.baseUrl=r,this.authInfo=t,this.apiVersion=n}startUpload(r){let t=new ge(this,this.authInfo,this.apiVersion);return new tr.DirectUpload(r,`${this.baseUrl}api/active_storage/blobs/create_direct_upload`,t).create((a,i)=>{if(a)this.onError(a);else{let l=`${this.baseUrl}rails/active_storage/blobs/${i.signed_id}/${i.filename}`,p={signedId:i.signed_id,fileName:i.filename};this.onFinish(l,r,p)}}),Promise.resolve(void 0)}onDirectUploadProgress(r){this.onProgress(r.loaded/r.total)}};var nr={uploader:ce};var Rr={remawy:nr};
//# sourceMappingURL=index.js.map
