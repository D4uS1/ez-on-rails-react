import Se,{useMemo as ke,useState as ie}from"react";import{createContext as Ie}from"react";var Z=Ie({apiVersion:"1.0",backendUrl:"http://localhost:3000",authInfo:null,setBackendUrl:e=>{},setAuthInfo:e=>{},setApiVersion:e=>{}});var Le=e=>{let[r,t]=ie(e.backendUrl),[n,i]=ie(e.authInfo||null),[a,l]=ie(e.apiVersion),f=ke(()=>{let o={backendUrl:r,authInfo:n||null,apiVersion:a,setBackendUrl:t,setAuthInfo:i,setApiVersion:l};return o.backendUrl.endsWith("/")&&(o.backendUrl=o.backendUrl.slice(0,-1)),o},[r,n,a]);return Se.createElement(Z.Provider,{value:f},e.children)};import E,{useState as Qe}from"react";import*as U from"yup";import{Formik as er}from"formik";import{useCallback as Ye,useEffect as We,useState as oe}from"react";import{toCamel as Ue,toSnake as Ae}from"convert-keys";var fe=e=>e.startsWith("/")?e.slice(1):e,pe=e=>e.endsWith("/")?e.slice(0,-1):e,Be=(e,r)=>`${pe(e)}/${fe(r)}`,Ve=(e,r)=>`${pe(e)}/api/${fe(r)}`,Me=e=>e.replace(/[A-Z]/g,(r,t)=>t===0?r.toLowerCase():"_"+r.toLowerCase()),ge=e=>e&&Ae(e),be=e=>e&&Ue(e),qe=e=>Object.keys(e).map(r=>r+"="+e[r]).join("&"),J=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}/.test(e)?new Date(e):Array.isArray(e)?e.map(r=>J(r)):(typeof e=="object"&&Object.keys(e).forEach(r=>{e[r]=J(e[r])}),e),K=e=>e instanceof Date?e.toISOString():Array.isArray(e)?e.map(r=>K(r)):(typeof e=="object"&&Object.keys(e).forEach(r=>{e[r]=K(e[r])}),e),De=e=>K(ge(e)),He=e=>!e||typeof e!="object"?e:J(be(e)),m={toBaseUrl:Be,toApiUrl:Ve,toSnakeCase:ge,toSnakeCaseString:Me,toCamelCase:be,toGetParameters:qe,toDates:J,toDateStrings:K,toBackendParams:De,toFrontendParams:He};var W=class extends Error{httpStatusCode;constructor(r,t){super(),this.message=r,this.httpStatusCode=t}};var Ge=e=>{if(e)return{uid:e.uid,client:e.client,expiry:e.expiry,"token-type":e.tokenType,"access-token":e.accessToken}},je=e=>({uid:e.uid,client:e.client,expiry:e.expiry,tokenType:e["token-type"],accessToken:e["access-token"]}),N=(e,r)=>({"Content-Type":"application/json",Accept:"application/json","api-version":r,...Ge(e)}),R=async(e,r,t,n)=>{let i=await fetch(r,{method:e,headers:n,body:t?JSON.stringify(t):null});if(i.status>=400)throw new W(JSON.stringify(i.body),i.status);let a={},l=null;try{i.headers.forEach((f,o)=>{a[o]=f}),l=await i.json()}catch{}return{headers:a,body:l}},u={signUp:async(e,r,t)=>{r=m.toBackendParams(r),await R("POST",m.toBaseUrl(e,"users"),{user:r},N(null,t))},signIn:async(e,r,t)=>{r=m.toBackendParams(r);let n=await R("POST",m.toApiUrl(e,"auth/sign_in"),r,N(null,t));return je(n.headers)},signOut:async(e,r,t)=>{await R("DELETE",m.toApiUrl(e,"auth/sign_out"),null,N(r,t))},passwordResetInstructions:async(e,r,t)=>{r=m.toBackendParams(r),await R("POST",m.toBaseUrl(e,"users/password"),{user:r},N(null,t))},passwordReset:async(e,r,t)=>{r=m.toBackendParams(r),await R("PUT",m.toBaseUrl(e,"users/password"),{user:r},N(null,t))},getUser:async(e,r,t)=>{let n=await R("GET",m.toApiUrl(e,"users/me"),null,N(r,t));return m.toFrontendParams(n.body)},updateUser:async(e,r,t,n)=>{let i=r.avatar?.signedId,a={...m.toBackendParams(r),avatar:i},l=await R("PATCH",m.toApiUrl(e,"users/me"),{user:a},N(t,n));return m.toFrontendParams(l.body)},confirmationInstructions:async(e,r,t)=>{r=m.toBackendParams(r),await R("POST",m.toBaseUrl(e,"users/confirmation"),{user:r},N(null,t))},confirmation:async(e,r,t)=>{let n=m.toBaseUrl(e,"users/confirmation");r=m.toBackendParams(r),n=`${n}?${m.toGetParameters(r)}`,await R("GET",n,null,N(null,t))},get:async(e,r,t,n=null,i="1.0",a=void 0)=>{let l=m.toApiUrl(e,r);t&&(t=m.toBackendParams(t)),a&&(t=a(t)),t&&(l=`${l}?${m.toGetParameters(t)}`);let f=await R("GET",l,null,N(n,i));return m.toFrontendParams(f.body)},post:async(e,r,t,n=null,i="1.0",a=void 0)=>{let l=m.toApiUrl(e,r);t&&(t=m.toBackendParams(t)),a&&(t=a(t));let f=await R("POST",l,t,N(n,i));return m.toFrontendParams(f.body)},patch:async(e,r,t,n=null,i="1.0",a=void 0)=>{let l=m.toApiUrl(e,r);t&&(t=m.toBackendParams(t)),a&&(t=a(t));let f=await R("PATCH",l,t,N(n,i));return m.toFrontendParams(f.body)},put:async(e,r,t,n=null,i="1.0",a=void 0)=>{let l=m.toApiUrl(e,r);t&&(t=m.toBackendParams(t)),a&&(t=a(t));let f=await R("PUT",l,t,N(n,i));return m.toFrontendParams(f.body)},delete:async(e,r,t,n=null,i="1.0",a=void 0)=>{let l=m.toApiUrl(e,r);t&&(t=m.toBackendParams(t)),a&&(t=a(t)),t&&(l=`${l}?${m.toGetParameters(t)}`);let f=await R("DELETE",l,null,N(n,i));return m.toFrontendParams(f.body)},defaultHttpHeader:(e,r)=>N(e,r)};import{useContext as $e}from"react";var T=()=>$e(Z);var Xe=(e,r="GET",t,n)=>{let{backendUrl:i,authInfo:a,apiVersion:l}=T(),[f,o]=oe(null),[d,b]=oe(null),[B,P]=oe(!1),p=Ye(async v=>{P(!0),b(null),o(null);let s=v||t,c=null;try{switch(r){case"POST":c=await u.post(i,e,s,a,l);break;case"PUT":c=await u.put(i,e,s,a,l);break;case"PATCH":c=await u.patch(i,e,s,a,l);break;case"DELETE":c=await u.delete(i,e,s,a,l);break;default:c=await u.get(i,e,s,a,l)}return o(c),P(!1),c}catch(F){b(F),P(!1)}},[]);return We(()=>{(async()=>n?.skipInitialCall||await p())()},[a,i,l]),{data:f,error:d,inProgress:B,callApi:p}};import{useCallback as G,useMemo as Ze,useState as Q}from"react";var Je=e=>{let{backendUrl:r,authInfo:t,apiVersion:n}=T(),[i,a]=Q(null),[l,f]=Q(null),[o,d]=Q(!1),[b,B]=Q(null),P=Ze(()=>m.toSnakeCaseString(e),[e]),p=G(C=>{(async()=>{B(null),d(!0);try{await C(),d(!1)}catch(k){d(!1),B(k)}})()},[]),v=G(()=>{p(async()=>{let C=await u.get(r,P,null,t,n);f(C)})},[r,t,n,P]),s=G(C=>{p(async()=>{let k=await u.get(r,`${P}/${C}`,null,t,n);a(k)})},[r,t,n,P]),c=G(C=>{p(async()=>{let k=await u.get(r,P,C,t,n);f(k)})},[r,t,n,P]),F=G(C=>{p(async()=>{let k=await u.post(r,P,C,t,n);a(k)})},[r,t,n,P]),I=G((C,k)=>{p(async()=>{let Oe=await u.patch(r,`${P}/${C}`,k,t,n);a(Oe)})},[r,t,n,P]),z=G(C=>{p(async()=>{await u.delete(r,`${P}/${C}`,null,t,n),a(null)})},[r,t,n,P]);return{record:i,records:l,inProgress:o,error:b,getAll:v,getOne:s,search:c,create:F,update:I,remove:z}};import{Button as rr,Form as y}from"react-bootstrap";var Ee="26f9b305c337d82f23e38492352522e21d65c6459993e27ae5faf0621aacf97f",Ke=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ee)){var e=document.createElement("style");e.id=Ee,e.textContent=Ke,document.head.appendChild(e)}})();var _={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var tr=e=>{let{backendUrl:r,apiVersion:t}=T(),[n,i]=Qe(!1),a=async o=>{i(!0);try{await u.signUp(r,o,t),e.onRegisterSuccess(o.email),i(!1)}catch(d){e.onRegisterError(d),i(!1)}},l=U.object().shape({username:U.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must not have more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:U.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must have not more than ${e.maxEmailLength||100} characters.`),password:U.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:U.string().oneOf([U.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation must match."),privacyPolicyAccepted:U.boolean().isTrue(e.privacyPolicyNotAcceptedErrorText||"The privacy policy must be accepted.")}).defined();return E.createElement(er,{initialValues:{username:"",email:"",password:"",passwordConfirmation:"",privacyPolicyAccepted:!1},validationSchema:l,onSubmit:o=>{a(o)}},({errors:o,handleChange:d,handleSubmit:b})=>E.createElement("form",{onSubmit:b,className:e.containerClassName||_.container},E.createElement(y.Group,{id:"username-container",className:e.fieldContainerClassName||_.fieldContainer},E.createElement(y.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelUsername||"Username"),E.createElement(y.Control,{id:"username",className:e.fieldInputClassName||_.formField,type:"text",onChange:d,isInvalid:!!o.username}),E.createElement(y.Control.Feedback,{className:e.fieldErrorClassName||_.fieldError,type:"invalid"},o.username)),E.createElement(y.Group,{id:"email-container",className:e.fieldContainerClassName||_.fieldContainer},E.createElement(y.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelEmail||"Email address"),E.createElement(y.Control,{id:"email",className:e.fieldInputClassName||_.formField,type:"email",onChange:d,isInvalid:!!o.email}),E.createElement(y.Control.Feedback,{className:e.fieldErrorClassName||_.fieldError,type:"invalid"},o.email)),E.createElement(y.Group,{id:"password-container",className:e.fieldContainerClassName||_.fieldContainer},E.createElement(y.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelPassword||"Password"),E.createElement(y.Control,{id:"password",className:e.fieldInputClassName||_.formField,type:"password",onChange:d,isInvalid:!!o.password}),E.createElement(y.Control.Feedback,{className:e.fieldErrorClassName||_.fieldError,type:"invalid"},o.password)),E.createElement(y.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||_.fieldContainer},E.createElement(y.Label,{className:e.fieldLabelClassName||_.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),E.createElement(y.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||_.formField,type:"password",onChange:d,isInvalid:!!o.passwordConfirmation}),E.createElement(y.Control.Feedback,{className:e.fieldErrorClassName||_.fieldError,type:"invalid"},o.passwordConfirmation)),E.createElement(y.Group,{id:"privacy-policy-accepted-container",className:e.fieldCheckboxContainerClassName||_.fieldContainer},E.createElement(y.Check,{id:"privacyPolicyAccepted",className:e.fieldCheckboxInputClassName||_.formField,type:"checkbox",label:e.labelPrivacyPolicyAccepted||E.createElement("span",null,"I have read and accept the"," ",E.createElement("a",{href:e.privacyPolicyUrl,target:"_blank",rel:"noopener noreferrer"},"privacy policy")," ","and"," ",E.createElement("a",{href:e.generalTermsUrl,target:"_blank",rel:"noopener noreferrer"},"terms and conditions")," ","."),onChange:d,isInvalid:!!o.privacyPolicyAccepted,feedbackType:"invalid",feedback:o.privacyPolicyAccepted})),!n&&E.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},E.createElement(rr,{className:e.submitButtonClassName||_.submitButton,type:"submit",variant:"primary"},e.labelSubmitButton||"Register"))))};import{Formik as ar}from"formik";import V from"react-bootstrap/Form";import ir from"react-bootstrap/Button";import O,{useState as or}from"react";import*as X from"yup";var Ce="1b2b7d0082579b5f3b82558d8d63cd1ca5254acc2ba179d1791f3b7274e3007a",nr=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Ce)){var e=document.createElement("style");e.id=Ce,e.textContent=nr,document.head.appendChild(e)}})();var S={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var sr=e=>{let{backendUrl:r,apiVersion:t,setAuthInfo:n}=T(),[i,a]=or(!1),l=X.object().shape({email:X.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required."),password:X.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"The password is required.")}).defined(),f=async d=>{a(!0);try{let b=await u.signIn(r,d,t);if(!b)throw"No authentication object returned";n(b),await e.onLoginSuccess(d.email,b,d.stayLoggedIn)}catch(b){e.onLoginError(b),a(!1)}};return O.createElement(ar,{initialValues:{email:"",password:"",stayLoggedIn:!1},onSubmit:d=>{f(d)},validationSchema:l},({errors:d,handleChange:b,handleSubmit:B})=>O.createElement("form",{onSubmit:B,className:e.containerClassName||S.container},O.createElement(V.Group,{id:"email-container",className:e.fieldContainerClassName||S.fieldContainer},O.createElement(V.Label,{className:e.fieldLabelClassName||S.fieldLabel},e.labelEmail||"Email address"),O.createElement(V.Control,{id:"email",type:"email",onChange:b,className:e.fieldInputClassName||S.formField,isInvalid:!!d.email}),O.createElement(V.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||S.fieldError},d.email)),O.createElement(V.Group,{id:"password-container",className:e.fieldContainerClassName||S.fieldContainer},O.createElement(V.Label,{className:e.fieldLabelClassName||S.fieldLabel},e.labelPassword||"Password"),O.createElement(V.Control,{id:"password",type:"password",onChange:b,className:e.fieldInputClassName||S.formField,isInvalid:!!d.password}),O.createElement(V.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||S.fieldError},d.password)),!e.hideStayLoggedIn&&O.createElement(V.Group,{id:"stay-logged-in-container",className:e.fieldCheckboxContainerClassName||S.fieldContainer},O.createElement(V.Check,{id:"stayLoggedIn",className:e.fieldCheckboxInputClassName||S.formField,type:"checkbox",label:e.labelStayLoggedIn||"Stay logged in.",onChange:b})),!i&&O.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},O.createElement(ir,{variant:"primary",type:"submit",className:e.submitButtonClassName||S.submitButton},e.labelSubmitButton||"Login"))))};import q,{useState as mr}from"react";import*as re from"yup";import{Formik as dr}from"formik";import ee from"react-bootstrap/Form";import cr from"react-bootstrap/Button";var he="f9f52e78e174bf1d2ef410620bc0a8a1cdfe4cf1721e3e0c1621166cce52d43b",lr=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(he)){var e=document.createElement("style");e.id=he,e.textContent=lr,document.head.appendChild(e)}})();var j={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var ur=e=>{let{backendUrl:r,apiVersion:t}=T(),[n,i]=mr(!1),a=re.object().shape({email:re.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"The email address is required.")}).defined(),l=o=>{i(!0),u.passwordResetInstructions(r,o,t).then(()=>{e.onLostPasswordSuccess(o.email),i(!1)}).catch(d=>{e.onLostPasswordError(d),i(!1)})};return q.createElement(dr,{initialValues:{email:""},onSubmit:o=>{l(o)},validationSchema:a},({errors:o,handleChange:d,handleSubmit:b})=>q.createElement("form",{onSubmit:b,className:e.containerClassName||j.container},q.createElement(ee.Group,{id:"email-container",className:e.fieldContainerClassName||j.fieldContainer},q.createElement(ee.Label,{className:e.fieldLabelClassName||j.fieldLabel},e.labelEmail||"Email address"),q.createElement(ee.Control,{id:"email",type:"email",onChange:d,className:e.fieldInputClassName||j.formField,isInvalid:!!o.email}),q.createElement(ee.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||j.fieldError},o.email)),!n&&q.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},q.createElement(cr,{variant:"primary",type:"submit",className:e.submitButtonClassName||j.submitButton},e.labelSubmitButton||"Submit"))))};import D,{useState as pr}from"react";import*as ne from"yup";import{Formik as gr}from"formik";import te from"react-bootstrap/Form";import br from"react-bootstrap/Button";var xe="57a0afebb13a94fca8de1a2c9f0e2be84368d84516625ca5aa2dc7c2093e9ee9",fr=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(xe)){var e=document.createElement("style");e.id=xe,e.textContent=fr,document.head.appendChild(e)}})();var $={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Er=e=>{let{backendUrl:r,apiVersion:t}=T(),[n,i]=pr(!1),a=ne.object().shape({email:ne.string().email(e.invalidEmailErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.")}).defined(),l=o=>{i(!0),u.confirmationInstructions(r,o,t).then(()=>{e.onResendConfirmationSuccess(o.email),i(!1)}).catch(d=>{e.onResendConfirmationError(d),i(!1)})};return D.createElement(gr,{initialValues:{email:""},onSubmit:o=>{l(o)},validationSchema:a},({errors:o,handleChange:d,handleSubmit:b})=>D.createElement("form",{onSubmit:b,className:e.containerClassName||$.container},D.createElement(te.Group,{id:"email-container",className:e.fieldContainerClassName||$.fieldContainer},D.createElement(te.Label,{className:e.fieldLabelClassName||$.fieldLabel},e.labelEmail||"Email address"),D.createElement(te.Control,{id:"email",type:"email",onChange:d,className:e.fieldInputClassName||$.formField,isInvalid:!!o.email}),D.createElement(te.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||$.fieldError},o.email)),!n&&D.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},D.createElement(br,{variant:"primary",type:"submit",className:e.submitButtonClassName||$.submitButton},e.labelSubmitButton||"Submit"))))};import Te,{useState as hr}from"react";var Pe="1a37a232d6538b666a3098b0793d592912f4208a31298523eb30dc04b75fe58b",Cr=`._container_q2u8x_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Pe)){var e=document.createElement("style");e.id=Pe,e.textContent=Cr,document.head.appendChild(e)}})();var se={container:"_container_q2u8x_1",text:"_text_q2u8x_13"};var xr=e=>{let[r,t]=hr(e.visible),n=()=>{t(!0)};return r?Te.createElement("div",{onClick:()=>{t(!1),setTimeout(n,e.dismissTimeout||2e4)},className:se.container},Te.createElement("span",{className:se.text},"development")):null};import h from"react";import*as we from"@rails/activestorage";import{useState as Tr}from"react";import _r,{ErrorCode as me,useDropzone as wr}from"react-dropzone";var _e="257630eca6a3db5ac1f345639fdf03bb30897c494d2583e7ac4165a93a5df40e",Pr=`._dropzoneContainer_14oft_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(_e)){var e=document.createElement("style");e.id=_e,e.textContent=Pr,document.head.appendChild(e)}})();var le={dropzoneContainer:"_dropzoneContainer_14oft_1",pastezoneContainer:"_pastezoneContainer_14oft_19"};var yr=(e,r)=>`rails/active_storage/blobs/${e}/${r}`,de=e=>{let{backendUrl:r,authInfo:t,apiVersion:n}=T(),[i,a]=Tr(0),l=h.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",className:"bi bi-cloud-arrow-up",viewBox:"0 0 16 16"},h.createElement("path",{fillRule:"evenodd",d:"M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"}),h.createElement("path",{d:"M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"})),f=async s=>{await u.delete(r,`active_storage/blobs/${s}`,null,t,n)},o=async(s,c)=>{await f(c);let F=[...e.files];F=F.filter(I=>c!==I.signedId),e.onChange(F),s.stopPropagation()},d=s=>{s.loaded/s.total>=.9999999},b=s=>{if(s.length){if(e.maxFiles){let c=e.maxFiles-(e.files.length+i);if(c<s.length&&e.onMaxFilesError(e.maxFiles),c<=0)return;s=s.slice(0,c)}if(e.maxSize){let c=s.filter(F=>F.size<=e.maxSize);c.length<s.length&&e.onMaxSizeError(e.maxSize),s=c}a(c=>c+s.length),s.forEach(c=>{new we.DirectUpload(c,m.toApiUrl(r,"active_storage/blobs/create_direct_upload"),{directUploadWillCreateBlobWithXHR:I=>{let z=u.defaultHttpHeader(t,n);Object.keys(z).forEach(C=>{I.setRequestHeader(C,z[C])}),I.upload.addEventListener("progress",d)}}).create((I,z)=>{if(a(C=>C-1),!I){let C={signedId:z.signed_id};c.type.includes("image")?C.path=yr(z.signed_id,z.filename):C.filename=z.filename;let k=e.files;k.push(C),e.onChange([...k])}})})}},B=s=>{if(!s.clipboardData)return;let c=s.clipboardData.items;if(c===void 0)return;let F=[];for(let I of c){if(e.accept&&!Object.keys(e.accept).some(C=>I.type.match(C)))continue;let z=I.getAsFile();z&&F.push(z)}b(F)},P=e.files.map(s=>h.createElement("div",{key:s.signedId,className:"card w-25 animate__animated animate__fadeIn mb-4",style:{flex:"0 0 auto"}},h.createElement("div",{className:"card-header p-1"},h.createElement("button",{onClick:c=>o(c,s.signedId||""),type:"button",className:"close","aria-label":"Close"},h.createElement("span",{"aria-hidden":"true"},"\xD7"))),h.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},h.createElement("img",{src:m.toBaseUrl(r,s.path||""),alt:s.filename,className:"d-block mw-100 m-auto m-0 rounded p-1"})))),p=[];for(let s=0;s<i;s++)p.push(h.createElement("div",{key:s,className:"card w-25 mb-4",style:{flex:"0 0 auto"}},h.createElement("div",{className:"d-flex justify-content-center align-items-center w-100 h-100"},h.createElement("div",{className:"p-4 text-center"},h.createElement("div",{className:"spinner-border",role:"status"},h.createElement("span",{className:"sr-only"},"Loading..."))))));let v=s=>{s.some(c=>c.errors[0].code===me.TooManyFiles)&&e.onMaxFilesError(e.maxFiles),s.some(c=>c.errors[0].code===me.FileInvalidType)&&e.onInvalidTypeError(e.accept),s.some(c=>c.errors[0].code===me.FileTooLarge)&&e.onMaxSizeError(e.maxSize)};return h.createElement("div",null,e.pasteZone&&h.createElement("input",{type:"text",className:`w-100 p-2 ${le.pastezoneContainer}`,value:e.textPastezone||"Copy and paste some files here",onPaste:B,readOnly:!0}),h.createElement(_r,{onDropAccepted:b,multiple:e.multiple,maxFiles:e.maxFiles,maxSize:e.maxSize,onDropRejected:v,accept:e.accept},({getRootProps:s,getInputProps:c}=wr())=>h.createElement("section",null,h.createElement("div",{...s(),className:`${le.dropzoneContainer} p-4 ${e.className}`},h.createElement("input",{...c()}),h.createElement("p",{className:"m-0"},e.textDropzone||"Drag 'n' drop some files here, or click to select files"),P.length>0?h.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},P):h.createElement("div",{className:"m-0"},e.customIcon||l),p.length>0&&h.createElement("aside",{className:"card-deck justify-content-center w-100 m-4"},p)))))};import{Formik as Fr}from"formik";import H from"react-bootstrap/Form";import zr from"react-bootstrap/Button";import L,{useCallback as Nr,useState as Rr}from"react";import*as Y from"yup";var ye="6597fb2ef423f9fe9e38df405cbcfac366421233e5f29a986f3e16fcc9f48e38",vr=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(ye)){var e=document.createElement("style");e.id=ye,e.textContent=vr,document.head.appendChild(e)}})();var A={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Or=e=>{let{backendUrl:r,apiVersion:t}=T(),[n,i]=Rr(!1),a=Y.object().shape({password:Y.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`).required(e.passwordRequiredErrorText||"A password is required."),passwordConfirmation:Y.string().oneOf([Y.ref("password")],e.passwordConfirmationMatchErrorText||"The password and its confirmation must match.")}).defined(),l=Nr(async o=>{i(!0);try{await u.passwordReset(r,{...o,resetPasswordToken:e.resetPasswordToken},t),await e.onResetPasswordSuccess()}catch(d){e.onResetPasswordError(d),i(!1)}},[e.resetPasswordToken]);return L.createElement(Fr,{initialValues:{password:"",passwordConfirmation:""},onSubmit:o=>{l(o)},validationSchema:a},({errors:o,handleChange:d,handleSubmit:b})=>L.createElement("form",{onSubmit:b,className:e.containerClassName||A.container},L.createElement(H.Group,{id:"password-container",className:e.fieldContainerClassName||A.fieldContainer},L.createElement(H.Label,{className:e.fieldLabelClassName||A.fieldLabel},e.labelPassword||"Password"),L.createElement(H.Control,{id:"password",type:"password",onChange:d,className:e.fieldInputClassName||A.formField,isInvalid:!!o.password}),L.createElement(H.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||A.fieldError},o.password)),L.createElement(H.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||A.fieldContainer},L.createElement(H.Label,{className:e.fieldLabelClassName||A.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),L.createElement(H.Control,{id:"passwordConfirmation",type:"password",onChange:d,className:e.fieldInputClassName||A.formField,isInvalid:!!o.passwordConfirmation}),L.createElement(H.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||A.fieldError},o.passwordConfirmation)),!n&&L.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},L.createElement(zr,{variant:"primary",type:"submit",className:e.submitButtonClassName||A.submitButton},e.labelSubmitButton||"Submit"))))};import ve from"react";var Ir=e=>{let{authInfo:r}=T();return ve.createElement("div",null,r?e.children:ve.createElement("div",{className:e.accessDeniedClassName||"ez-on-rails-protected-page-access-denied-container"},e.accessDeniedText||"You must be signed in to see this content."))};import g,{useEffect as kr,useState as ce}from"react";import*as M from"yup";import{Formik as Lr}from"formik";import{Button as Ur,Form as w}from"react-bootstrap";var Fe="22f0744f7499dc4dc3931a831ce214b61be2117ea7faef8309e6e4972d40a28b",Sr=`._container_1c59p_1 {
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
`;(function(){if(!(typeof document>"u")&&!document.getElementById(Fe)){var e=document.createElement("style");e.id=Fe,e.textContent=Sr,document.head.appendChild(e)}})();var x={container:"_container_1c59p_1",fieldContainer:"_fieldContainer_1c59p_8",fieldLabel:"_fieldLabel_1c59p_15",formField:"_formField_1c59p_19",fieldError:"_fieldError_1c59p_23",submitButton:"_submitButton_1c59p_32"};var Ar=e=>{let{authInfo:r,backendUrl:t,apiVersion:n}=T(),[i,a]=ce(!1),[l,f]=ce(null),[o,d]=ce(void 0),b=p=>{f(p),d(p.unconfirmedEmail)};kr(()=>{(async()=>r&&b(await u.getUser(t,r,n)))()},[]);let B=async p=>{if(r){a(!0);try{let v=await u.updateUser(t,p,r,n);e.onUserUpdateSuccess(v),b(v),a(!1)}catch(v){e.onUserUpdateError(v),a(!1)}}},P=M.object().shape({username:M.string().min(e.minUsernameLength||5,e.usernameToShortErrorText||`The username is too short. It must have at least ${e.minUsernameLength||5} characters.`).max(e.maxUsernameLength||50,e.usernameToLongErrorText||`The username is too long. It must have not more than ${e.maxUsernameLength||50} characters.`).required(e.usernameRequiredErrorText||"An username is required."),email:M.string().email(e.emailInvalidErrorText||"Invalid email address.").required(e.emailRequiredErrorText||"An email address is required.").max(e.maxEmailLength||100,e.emailToLongErrorText||`The email address is too long. It must not have more than ${e.maxEmailLength||100} characters.`),password:M.string().min(e.minPasswordLength||8,e.passwordToShortErrorText||`The password is too short. It must have at least ${e.minPasswordLength||8} characters.`),passwordConfirmation:M.string().oneOf([M.ref("password")],e.passwordsMustMatchErrorText||"The password and its confirmation do not match.")}).defined();return r&&g.createElement("div",{className:"ez-on-rails-form-outer-container"},l?g.createElement(Lr,{initialValues:l,validationSchema:P,enableReinitialize:!0,onSubmit:p=>{B(p)}},({errors:p,values:v,handleChange:s,setFieldValue:c,setFieldError:F,handleSubmit:I})=>g.createElement("form",{onSubmit:I,className:e.containerClassName||x.container},!e.hideUsername&&g.createElement(w.Group,{id:"username-container",className:e.fieldContainerClassName||x.fieldContainer},g.createElement(w.Label,{className:e.fieldLabelClassName||x.fieldLabel},e.labelUsername||"Username"),g.createElement(w.Control,{id:"username",className:e.fieldInputClassName||x.formField,type:"text",value:v.username,onChange:s,isInvalid:!!p.username}),g.createElement(w.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||x.fieldError},p.username)),!e.hideEmail&&g.createElement(w.Group,{id:"email-container",className:e.fieldContainerClassName||x.fieldContainer},g.createElement(w.Label,{className:e.fieldLabelClassName||x.fieldLabel},e.labelEmail||"Email address"),g.createElement(w.Control,{id:"email",className:e.fieldInputClassName||x.formField,type:"email",value:v.email,onChange:s,isInvalid:!!p.email}),o&&g.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-unconfirmed-email-text"},e.unconfirmedEmailText||"The following email is not yet confirmed: "," ",o),g.createElement(w.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||x.fieldError},p.email)),!e.hidePassword&&g.createElement(w.Group,{id:"password-container",className:e.fieldContainerClassName||x.fieldContainer},g.createElement(w.Label,{className:e.fieldLabelClassName||x.fieldLabel},e.labelPassword||"Password"),g.createElement(w.Control,{id:"password",className:e.fieldInputClassName||x.formField,type:"password",value:v.password,onChange:s,isInvalid:!!p.password}),g.createElement("div",{className:e.fieldInfoClassName||"ez-on-rails-password-optional-text"},e.passwordChangeOptionalText||"You must only provide this if you want to change the password."),g.createElement(w.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||x.fieldError},p.password)),!e.hidePassword&&g.createElement(w.Group,{id:"password-confirmation-container",className:e.fieldContainerClassName||x.fieldContainer},g.createElement(w.Label,{className:e.fieldLabelClassName||x.fieldLabel},e.labelPasswordConfirmation||"Password confirmation"),g.createElement(w.Control,{id:"passwordConfirmation",className:e.fieldInputClassName||x.formField,type:"password",value:v.passwordConfirmation,onChange:s,isInvalid:!!p.passwordConfirmation}),g.createElement(w.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||x.fieldError},p.passwordConfirmation)),!e.hideAvatar&&g.createElement(w.Group,{id:"avatar-container",className:e.fieldContainerClassName||x.fieldContainer},g.createElement(w.Label,{className:e.fieldLabelClassName||x.fieldLabel},e.labelAvatar||"Avatar"),g.createElement("div",{className:e.dropzoneContainerClassName||x.formField},g.createElement(de,{onChange:z=>c("avatar",z.length>0?z[0]:null),files:v.avatar?[v.avatar]:[],multiple:!1,maxFiles:1,onMaxFilesError:()=>F("avatar",e.avatarToManyFilesErrorText||"Only one file is allowed"),maxSize:e.avatarMaxSize||5242880,onMaxSizeError:()=>F("avatar",e.avatarToLargeErrorText||`The file must not be larger than ${Math.round((e.avatarMaxSize||5242880)/1048576)} MB.`),onInvalidTypeError:()=>F("avatar",e.avatarWrongFormatErrorText||"Invalid file format.")})),g.createElement(w.Control.Feedback,{type:"invalid",className:e.fieldErrorClassName||x.fieldError},p.avatar)),!i&&g.createElement("div",{className:e.submitButtonContainerClassName||"ez-on-rails-form-submit-container"},g.createElement(Ur,{ref:e.submitRef,type:"submit",variant:"primary",className:e.submitButtonClassName||x.submitButton},e.labelSubmitButton||"Submit")))):g.createElement("div",null,"Loading..."))};var ze={fetcher:async(e,r,t="get",n=null,i=void 0,a="1.0")=>{switch(t=t.toLowerCase(),t){case"post":return u.post(e,r,n,i,a);case"put":return u.put(e,r,n,i,a);case"patch":return u.patch(e,r,n,i,a);case"delete":return u.delete(e,r,n,i,a);default:return u.get(e,r,n,i,a)}}};var ua={client:u,swr:ze,utils:m};import{AbstractUploader as Br}from"@d4us1/remawy";import*as Ne from"@rails/activestorage";var ue=class{uploader;authInfo;apiVersion;constructor(r,t,n){this.uploader=r,this.authInfo=t,this.apiVersion=n}directUploadWillCreateBlobWithXHR(r){let t=u.defaultHttpHeader(this.authInfo,this.apiVersion);Object.keys(t).forEach(n=>{r.setRequestHeader(n,t[n])}),r.upload.addEventListener("progress",n=>this.uploader.onDirectUploadProgress(n))}},ae=class extends Br{baseUrl;authInfo;apiVersion;constructor(r,t,n){super(),r.endsWith("/")||(r=`${r}/`),this.baseUrl=r,this.authInfo=t,this.apiVersion=n}startUpload(r){let t=new ue(this,this.authInfo,this.apiVersion);return new Ne.DirectUpload(r,`${this.baseUrl}api/active_storage/blobs/create_direct_upload`,t).create((i,a)=>{if(i)this.onError(i);else{let l=`${this.baseUrl}rails/active_storage/blobs/${a.signed_id}/${a.filename}`,f={signedId:a.signed_id,fileName:a.filename};this.onFinish(l,r,f)}}),Promise.resolve(void 0)}onDirectUploadProgress(r){this.onProgress(r.loaded/r.total)}};var Re={uploader:ae};var Ta={remawy:Re};export{de as ActiveStorageDropzone,xr as DevelopmentHint,Le as EzOnRails,ua as EzOnRailsHttp,W as EzOnRailsHttpError,Ta as EzOnRailsIntegrations,sr as LoginForm,ur as LostPasswordForm,Ir as ProtectedPage,tr as RegistrationForm,Er as ResendConfirmationForm,Or as ResetPasswordForm,Ar as UpdateUserForm,Xe as useEzApi,T as useEzOnRails,Je as useEzScaff};
//# sourceMappingURL=index.js.map
