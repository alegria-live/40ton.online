(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{506:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),i=a(20),l=a(25),o=a(9),s=a(121),c=a(37),m=a(163),u=a(27),d=a(6),g=Object(l.b)(function(e){return{_csrf:e.initLang._csrf,error:e.regReducer.error,loading:e.regReducer.loading,errorText:e.initLang.textHome.serverResErrors,registerText:e.initLang.textHome.registerForm,registerEmail:e.regReducer.registerEmail}},function(e){return{onSubmitHandler:function(t){return e(d.registerProcess(t))},clearError:function(){return e(d.registerClearError())}}})(function(e){var t=Object(r.useState)({name:{elementType:"input",elementConfig:{type:"text",placeholder:e.registerText.name},value:"",validation:{required:!0,minLength:2,maxLength:20},valid:!1,touched:!1},lastName:{elementType:"input",elementConfig:{type:"text",placeholder:e.registerText.lastName},value:"",validation:{required:!0,minLength:2,maxLength:20},valid:!1,touched:!1},company:{elementType:"input",elementConfig:{type:"text",placeholder:e.registerText.company},value:"",validation:{required:!0,minLength:2,maxLength:30},valid:!1,touched:!1},nip:{elementType:"input",elementConfig:{type:"text",placeholder:e.registerText.nip},value:"",validation:{required:!0,minLength:6,maxLength:20},valid:!1,touched:!1},street:{elementType:"input",elementConfig:{type:"text",placeholder:e.registerText.street},value:"",validation:{required:!0,minLength:2,maxLength:40},valid:!1,touched:!1},city:{elementType:"input",elementConfig:{type:"text",placeholder:e.registerText.city},value:"",validation:{required:!0,minLength:2,maxLength:30},valid:!1,touched:!1},post:{elementType:"input",elementConfig:{type:"text",placeholder:e.registerText.post},value:"",validation:{required:!0,minLength:2,maxLength:10},valid:!1,touched:!1},country:{elementType:"input",elementConfig:{type:"text",placeholder:e.registerText.country},value:"",validation:{required:!0,minLength:2,maxLength:30},valid:!1,touched:!1},email:{elementType:"input",elementConfig:{type:"email",placeholder:e.registerText.email},value:"",validation:{required:!0,isEmail:!0},valid:!1,touched:!1},email2:{elementType:"input",elementConfig:{type:"email",placeholder:e.registerText.email2},value:"",validation:{required:!0,isEmail:!0},valid:!1,touched:!1},password:{elementType:"input",elementConfig:{type:"password",placeholder:e.registerText.password},value:"",validation:{required:!0,minLength:4,maxLength:50},valid:!1,touched:!1},password2:{elementType:"input",elementConfig:{type:"password",placeholder:e.registerText.password2},value:"",validation:{required:!0,minLength:4,maxLength:50},valid:!1,touched:!1}}),a=Object(i.a)(t,2),l=a[0],d=a[1],g=Object(r.useState)({show:!1,message:null}),p=Object(i.a)(g,2),v=p[0],h=p[1],f=Object(r.useState)(!1),y=Object(i.a)(f,2),x=y[0],b=y[1],T=Object(r.useContext)(u.a).setShowRegister,E=[],w=[];for(var L in l)E.push({id:L,config:l[L]}),w.push(L);Object(r.useEffect)(function(){Object(o.i)(l,b)},[l]),Object(r.useEffect)(function(){window.scrollTo(0,400)},[]),Object(r.useEffect)(function(){Object(o.b)(l,w,e.registerText,d)},[e.registerText]),Object(r.useEffect)(function(){e.error&&h({show:!0,message:n.a.createElement("p",null,e.errorText[e.error.toString()])||n.a.createElement("p",null,e.error)})},[e.error]),Object(r.useEffect)(function(){e.registerEmail&&h({show:!0,message:n.a.createElement("p",null,e.registerText.registerSuccess1," ",e.registerEmail," ",n.a.createElement("br",null)," ",e.registerText.registerSuccess2)})},[e.registerEmail]);var j=function(){var t={dataSet:{name:l.name.value,lastName:l.lastName.value,company:l.company.value,nip:l.nip.value,street:l.street.value,city:l.city.value,post:l.post.value,country:l.country.value,email:l.email.value,password:l.password.value,date:(new Date).getTime(),workers:[],orders:[],invoices:[],activ:0,permission:1},_csrf:e._csrf};e.onSubmitHandler(t)},C=function(){Object(o.a)(l,w,d),e.clearError(),T(!1)},O=E.map(function(e){return n.a.createElement(s.a,{key:e.id,elementType:e.config.elementType,elementConfig:e.config.elementConfig,value:e.config.value,invalid:!e.config.valid,shouldValidate:e.config.validation,touched:e.config.touched,register:!0,padding:"3px",changed:function(t){return Object(o.f)(t,l,e.id,d)}})});return n.a.createElement(n.a.Fragment,null,e.loading?n.a.createElement(c.a,null):null,n.a.createElement(m.a,{show:v.show},n.a.createElement("div",null,v.message),n.a.createElement("button",{className:"btn btn-danger btn-sm mt-3",onClick:e.registerEmail?C:function(){e.clearError(),h({show:!1,message:null})}},e.registerText.cancel)),n.a.createElement("form",null,O,n.a.createElement("div",{style:{margin:"1rem 0"}},n.a.createElement("input",{style:{transform:"scale(1.5)"},type:"checkbox",required:!0}),n.a.createElement("small",{style:{padding:"1.5rem"}},e.registerText.clause)),n.a.createElement("button",{className:"btn btn-primary btn-sm",disabled:!x||e.loading,onClick:function(){return Object(o.d)(l.email.value,l.email2.value)?Object(o.d)(l.password.value,l.password2.value)?void j():h({show:!0,message:e.registerText.passwordNotIdentity}):h({show:!0,message:e.registerText.emailNotIdentity})},style:{marginRight:"1rem"}},e.registerText.submit),n.a.createElement("button",{onClick:C,className:"btn btn-secondary btn-sm"},e.registerText.cancel)))});t.default=function(e){return n.a.createElement("div",{className:"container mt-5 p-2"},n.a.createElement("div",{className:"card"},n.a.createElement("h5",{className:"card-header"},e.formName),n.a.createElement("div",{className:"card-body"},n.a.createElement(g,null))))}}}]);
//# sourceMappingURL=8.aebd139a.chunk.js.map