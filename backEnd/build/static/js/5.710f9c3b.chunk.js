(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{125:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(332),c=t.n(o);a.a=function(e){var a=null,t=[c.a.InputElement];switch(e.invalid&&e.shouldValidate&&e.touched&&t.push(c.a.Invalid),e.register&&t.push(c.a.Register),e.elementType){case"input":a=r.a.createElement("input",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"textarea":a=r.a.createElement("textarea",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"select":a=r.a.createElement("select",{className:t.join(" "),value:e.value,onChange:e.changed},e.elementConfig.options.map(function(e){return r.a.createElement("option",{key:e.value,value:e.value},e.displayValue)}));break;default:a=r.a.createElement("input",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}))}return r.a.createElement("div",{className:c.a.Input,style:{padding:e.padding}},r.a.createElement("label",{className:c.a.Label},e.label),a)}},157:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(191),c=t.n(o),i=t(192),l=t.n(i),s=function(e){return e.show?r.a.createElement("div",{className:l.a.Backdrop,onClick:e.clicked}):null};a.a=r.a.memo(function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(s,{show:e.show,clicked:e.modalClosed}),r.a.createElement("div",{className:c.a.Modal,style:{transform:e.show?"translateY(0)":"translateY(-100vh)",opacity:e.show?"1":"0"}},e.children))},function(e,a){return a.show===e.show&&a.children===e.children})},171:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(25),c=t(19),i=t(27),l=t(188),s=t.n(l),m=function(e){var a=e.navHeaderArr,t=e.onClickHandler,n=e.appLanguage,o=e.company;return r.a.createElement("nav",{className:s.a.Nav},r.a.createElement("ul",null,o?r.a.createElement("li",{className:s.a.Company},o):null,a?a.map(function(e){return r.a.createElement("li",{key:e.text,onClick:n!==e.text.toLowerCase()?function(){return t(e.fn)}:null,className:n===e.text.toLowerCase()?s.a.Active:null},e.text)}):null))},u=t(6);a.a=Object(c.f)(Object(o.b)(function(e){return{navHeader:e.initLang.textHome.navHeader,navHeaderSigned:e.initLang.textHome.navHeaderSigned,navHeaderOwner:e.initLang.textHome.navHeaderOwner,appLanguage:e.initLang.language,demoData:e.initLang.textHome.demoData,token:e.authReducer.token,_csrf:e.initLang._csrf,company:e.authReducer.company}},function(e){return{onDemo:function(a){return e(u.authProcess(a))},onLogout:function(){return e(u.logoutUser())}}})(function(e){var a=Object(n.useContext)(i.a),t=a.choiceLang,o=a.setShowLogIn,c=a.setShowRegister,l=a.showRegister,s=a.setShowOwner,u=a.showOwner,d=e.navHeader;e.token&&(d=e.navHeaderSigned),e.token&&u&&(d=e.navHeaderOwner);return r.a.createElement(m,{onClickHandler:function(a){switch(a){case"onLoginHandler":n=!0,l||u||o(n);break;case"onSignInHandler":c(!l);break;case"onSetLangPl":t("pl");break;case"onSetLangEs":t("es");break;case"toSytemPage":s(!0);break;case"toHomePage":s(!1);break;case"onLogoutHandler":s(!1),e.onLogout();break;case"onDemoHandler":!function(){var a={email:e.demoData.email,password:e.demoData.pass,_csrf:e._csrf};e.onDemo(a)}();break;default:console.log("default")}var n},navHeaderArr:d,appLanguage:e.appLanguage,company:e.company})}))},172:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(171),c=t(189),i=t.n(c);a.a=function(){return r.a.createElement("div",{className:i.a.NavForBigDevices},r.a.createElement(o.a,null))}},179:function(e,a,t){"use strict";var n=t(0),r=t.n(n).a.createContext({allActiveDrivers:{},getActiveDrivers:function(){},allActiveTrucks:{},getActiveTrucks:function(){}});a.a=r},186:function(e,a,t){e.exports={Header:"Header__Header__3aN7j"}},187:function(e,a,t){e.exports={Slogan:"Slogan__Slogan__xcvpl"}},188:function(e,a,t){e.exports={Nav:"Nav__Nav__1mRS5",Company:"Nav__Company__24Xj9",Active:"Nav__Active__2_UBu"}},189:function(e,a,t){e.exports={NavForBigDevices:"NavForBigDevices__NavForBigDevices__U1s_o"}},190:function(e,a,t){e.exports={NavForSmallDevices:"NavForSmallDevices__NavForSmallDevices__3SbK5"}},191:function(e,a,t){e.exports={Modal:"Modal__Modal__1nRg4"}},192:function(e,a,t){e.exports={Backdrop:"Backdrop__Backdrop__3t-VJ"}},193:function(e,a,t){e.exports={DrowerContainer:"DrawerToggle__DrowerContainer__TOIK0",DrawerToggle:"DrawerToggle__DrawerToggle__1mC6i"}},223:function(e,a,t){"use strict";var n=t(0),r=t.n(n),o=t(186),c=t.n(o),i=t(25),l=t(187),s=t.n(l),m=Object(i.b)(function(e){return{headerSlogan:e.initLang.textHome.headerSlogan}})(function(e){var a=e.headerSlogan;return r.a.createElement("section",{className:s.a.Slogan},r.a.createElement("h1",null,a))}),u=t(172),d=t(21),p=t(27),w=t(171),y=t(190),g=t.n(y),f=t(157),z=t(193),v=t.n(z),k=function(e){return r.a.createElement("div",{className:v.a.DrowerContainer},r.a.createElement("div",{onClick:e.clicked,className:v.a.DrawerToggle},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null)))},E=function(){var e=Object(n.useContext)(p.a),a=e.showRegister,t=e.showLogIn,o=Object(n.useState)(!1),c=Object(d.a)(o,2),i=c[0],l=c[1],s=function(){l(!i)};return Object(n.useEffect)(function(){(a||t)&&s()},[a,t]),r.a.createElement("div",{className:g.a.NavForSmallDevices},r.a.createElement(k,{clicked:s}),r.a.createElement(f.a,{show:i&&!a&&!t,modalClosed:s},r.a.createElement(w.a,null)))};a.a=function(){return r.a.createElement("header",{className:c.a.Header},r.a.createElement(m,null),r.a.createElement(u.a,null),r.a.createElement(E,null))}},323:function(e,a,t){e.exports=t.p+"static/media/motorway_trucks.24dec4a3.jpg"},324:function(e,a,t){e.exports=t.p+"static/media/norm_load.d81cd4e3.jpg"},325:function(e,a,t){e.exports=t.p+"static/media/panek1.b9e3ed8a.png"},326:function(e,a,t){e.exports=t.p+"static/media/panek2.e433909a.png"},327:function(e,a,t){e.exports=t.p+"static/media/panek5.bfca4768.png"},328:function(e,a,t){e.exports=t.p+"static/media/effectiveDriveDark.aa30570f.jpg"},329:function(e,a,t){e.exports=t.p+"static/media/successCharts.af5a1769.jpg"},330:function(e,a,t){e.exports=t.p+"static/media/succsessBusines.c88cd3fa.jpg"},331:function(e,a,t){e.exports=t.p+"static/media/efficient_drivers.f2f49b68.jpg"},332:function(e,a,t){e.exports={Input:"Input__Input__1R09y",Label:"Input__Label__3fwHt",InputElement:"Input__InputElement__Te560",Invalid:"Input__Invalid__3TwcL",Register:"Input__Register__2glUe"}},493:function(e,a,t){"use strict";t.r(a);var n,r=t(21),o=t(0),c=t.n(o),i=t(25),l=(t(128),t(135)),s=t(116),m=t(117),u=t(137),d=t(129),p=t(138),w=t(9),y=t(6),g=t(14),f=t.n(g),z=t(323),v=t.n(z),k=t(37),E=t(223),b=t(324),j=t.n(b),h=t(325),x=t.n(h),N=t(326),_=t.n(N),O=t(327),T=t.n(O),S=t(328),C=t.n(S),L=t(329),H=t.n(L),D=t(330),P=t.n(D),R=t(331),I=t.n(R),F=function(){return c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"d-flex-row mt-5"},c.a.createElement("h1",{className:"text-center text-danger"},"Redukcja przepa\u0142\xf3w poprzez optymalizacj\u0119 stylu jazdy"),c.a.createElement("h5",{className:"text-center text-secondary mt-3"},"to jeden ze sposob\xf3w zmniejszenia koszt\xf3w w firmach transportowych."),c.a.createElement("hr",null)),c.a.createElement("div",{className:"d-flex mt-5 justify-content-center"},c.a.createElement("div",{className:"card",style:{width:"35rem"}},c.a.createElement("img",{className:"card-img-top",src:C.a,alt:""}),c.a.createElement("div",{className:"card-body"},c.a.createElement("h5",{className:"card-title text-center"},"Kontrola utrzymania normy spalania to podstawa ekonomicznej przysz\u0142o\u015bci ka\u017cdej firmy transportowej.")))),c.a.createElement("div",{className:"d-flex-row mt-5"},c.a.createElement("div",{className:"p-2"},c.a.createElement("h2",{className:"text-danger"},"System kontroli 40ton.online")),c.a.createElement("div",{className:"p-2"},c.a.createElement("p",{className:"text-justify text-secondary"},"Program przeznaczony jest dla firm transportowych, dla kt\xf3rych istotna jest analiza koszt\xf3w wynikaj\u0105cych z efektywnego sposobu prowadzenie pojazd\xf3w. Podstaw\u0105 dzia\u0142ania aplikacji jest obliczanie \u015brednich rzeczywistego zu\u017cycia paliwa oraz wyliczanie norm spalania uzale\u017cnionych od wagi przewo\u017conego \u0142adunku na poszczeg\xf3lnych odcinkach tras dla ka\u017cdego pojazdu i dla ka\u017cdego kierowcy firmy. Oznacza to, \u017ce brane s\u0105 pod uwag\u0119 procentowe udzia\u0142y odcink\xf3w z danym obci\u0105\u017ceniem w ca\u0142o\u015bci trasy i w wyniku oblicze\u0144 otrzymujemy norm\u0119 do por\xf3wnania z rzeczywistym zu\u017cyciem paliwa."))),c.a.createElement("div",{className:"d-flex-row mt-4 justify-content-center"},c.a.createElement("div",null,c.a.createElement("h6",{className:"p-2 text-center text-danger"},"System posiada cztery typy por\xf3wnywania danych dla pojazd\xf3w i dla kierowc\xf3w, kt\xf3re odwzorowywane s\u0105 graficznie w postaci wykres\xf3w.")),c.a.createElement("div",null,c.a.createElement("img",{src:j.a,className:"img-fluid mx-auto d-block",alt:""})),c.a.createElement("div",{className:"mt-3"},c.a.createElement("p",{className:"p-2 text-justify text-secondary"},'Przyk\u0142adowe zestawienie okresowe efektywno\u015bci dla wszystkich wprowadzonych do systemu pojazd\xf3w. Wykres obrazuje stopie\u0144 utrzymania normy dla zale\u017cno\u015bci: spalanie rzeczywiste pojazdu w stosunku do obliczonego spalania przy danym obci\u0105\u017ceniu. W tym przypadku im mniejszy wsp\xf3\u0142czynnik tym bardziej efektywna jest praca pojazdu, wskazania powy\u017cej warto\u015bci 1 oznaczaj\u0105 przekrocznie normy. Ustawienie daty pocz\u0105tkowej pozwala na zaw\u0119\u017cenie "od do\u0142u" okresu obliczeniowego tak aby uzyska\u0107 raport wsteczny za miesi\u0105c, kwarta\u0142 czy dowolny czas do dnia bie\u017c\u0105cego.')),c.a.createElement("div",{className:"mt-2"},c.a.createElement("p",{className:"p-2 text-justify text-secondary"},"Jednym ze sposob\xf3w na obni\u017cenie koszt\xf3w paliwa jest nauka kierowc\xf3w ekonomicznej jazdy (tak zwany eco-driving). Umiej\u0119tno\u015b\u0107 utrzymywania optymalnej pr\u0119dko\u015bci, prawid\u0142owy spos\xf3b przyspieszenia, hamowania i pokonywania wzniesie\u0144 to tylko pocz\u0105tek tego jak kierowca mo\u017ce optymalizowa\u0107 spalanie. Je\u015bli firma b\u0119dzie zarabia\u0142a pieni\u0105dze, a analiza danych poprzez nasz system wyka\u017ce, \u017ce kierowca prowadzi ekonomicznie, to taki pracownik mo\u017ce liczy\u0107 na rekompensat\u0119."))),c.a.createElement("hr",null),c.a.createElement("div",{className:"d-flex-row mt-5 pl-3"},c.a.createElement("h2",{className:"text-danger"},"Aplikacja - Panel kierowcy"),c.a.createElement("div",{className:""},c.a.createElement("p",{className:"text-justify text-secondary"},'Jeden z najwa\u017cniejszych element\xf3w szybkiego i wydajnego dzia\u0142ania programu opiera si\u0119 na danych wprowadzanych poprzez aplikacj\u0119 "Panel kierowcy",kt\xf3ra jest udost\u0119pniana ka\u017cdemu kierowcy na telefonie firmowym. Telefon musi mie\u0107 zainstalowan\u0105 przegl\u0105dark\u0119 Chrome oraz podstawowy dost\u0119p do internetu aby m\xf3c na bie\u017c\u0105co przesy\u0142a\u0107 dane do bazy firmy. Bezp\u0142atna wersja programu dost\u0119pna jest po zarejestrowaniu firmy poprzez panel Rejestracja. Wi\u0119cej informacji na temat dzia\u0142ania systemu znajduje si\u0119 w dziale Instrukcje i szczeg\xf3\u0142owy opis aplikacji.'))),c.a.createElement("div",{className:"row mt-5 justify-content-center"},c.a.createElement("div",{className:"card p-3 m-3",style:{width:"13.3rem"}},c.a.createElement("img",{className:"card-img-top",src:x.a,alt:""}),c.a.createElement("div",{className:"card-body"},c.a.createElement("p",{className:"card-text"},"Panel logowania kierowcy do systemu"))),c.a.createElement("div",{className:"card p-3 m-3",style:{width:"13.3rem"}},c.a.createElement("img",{className:"card-img-top",src:_.a,alt:""}),c.a.createElement("div",{className:"card-body"},c.a.createElement("p",{className:"card-text"},"Panel czynno\u015bci wraz z ostatnim wpisem pojazdu"))),c.a.createElement("div",{className:"card p-3 m-3",style:{width:"13.3rem"}},c.a.createElement("img",{className:"card-img-top",src:T.a,alt:""}),c.a.createElement("div",{className:"card-body"},c.a.createElement("p",{className:"card-text"},"Przyk\u0142adowy panel dla czynno\u015bci tankowanie")))),c.a.createElement("div",{className:"d-flex-row mt-4"},c.a.createElement("div",{className:"p-2"},c.a.createElement("p",{className:"text-justify text-secondary"},"Dane przesy\u0142ane przez aplikacj\u0119 zapisywane s\u0105 w bazie danych klienta i mog\u0105 by\u0107 doskona\u0142ym \u017ar\xf3d\u0142em szczeg\xf3owych informacji na temat ka\u017cdej trasy pojazdu. Nasz system udost\u0119pnia dane w postaci gotowych tabel zawieraj\u0105cych dat\u0119, kierowc\u0119, rodzaj czynno\u015bci (za\u0142adunek, roz\u0142adunek, tankowanie, zmiana kierowcy), wag\u0119 \u0142adunku, ilo\u015b\u0107 tankowanego paliwa, stan licznika, kod pocztowy oraz kraj. Istnieje mo\u017cliwo\u015b\u0107 wydruku tabeli dla ka\u017cdego pojazdu w zadanym okresie, co umo\u017cliwia zast\u0105pienie stosowanych jeszcze cz\u0119sto papierowych kart drogowych wype\u0142nianych przez kierowc\xf3w."),c.a.createElement("p",{className:"text-justify text-secondary"},'W przypadku kiedy kierowcy firmy nie s\u0105 wyposa\u017ceni w telefony typu smartfon z podstawowym dost\u0119pem do internetu istnieje mo\u017cliwo\u015b\u0107 "r\u0119cznego" wpisywania tras poprzez osob\u0119 obs\u0142uguj\u0105c\u0105 system w firmie porzez panel udost\u0119pniony w systemie klienta.'))),c.a.createElement("hr",null),c.a.createElement("div",{className:"d-flex-row mt-4 justify-content-center"},c.a.createElement("div",null,c.a.createElement("h6",{className:"p-2 text-center text-danger"},"Dzi\u0119ki aplikacji firma otrzymuje dok\u0142adne rozliczenie paliwowe ka\u017cdej trasy wraz z danymi umo\u017cliwiaj\u0105cymi ocen\u0119 efektywno\u015bci ka\u017cdego kierowcy.")),c.a.createElement("div",null,c.a.createElement("img",{src:I.a,className:"img-fluid mx-auto d-block",alt:""})),c.a.createElement("div",{className:"mt-3"},c.a.createElement("p",{className:"p-2 text-justify text-secondary"},'Wykres por\xf3wnawczy utrzymania normy dla wielu wybranych kierowc\xf3w. Na jednym uk\u0142adzie wsp\xf3\u0142rz\u0119dnych mo\u017cna umie\u015bci\u0107 wyliczenia stopnia utrzymania normy kilku kierowc\xf3w w celu analizy r\xf3\u017cnic pomi\u0119dzy efektywno\u015bci\u0105 ich jazdy. Wykres jasno ilustruje r\xf3\u017cnice w efektywno\u015bci r\xf3\u017cnych kierowc\xf3w. Do oblicze\u0144 norm przyjmowane s\u0105 warto\u015bci \u015bredniej zu\u017cycia paliwa dla zestawu bez \u0142adunku oraz wsp\xf3\u0142czynnika zwi\u0119kszenia spalania "od tony \u0142adunku". Warto\u015bci te przyj\u0119to na poziomie: 24 l/100 km dla zestawu bez \u0142adunku oraz wzrost 0,4 l dla ka\u017cdej tony przewo\u017conego \u0142adunku, jednak ka\u017cda z nich mo\u017ce by\u0107 ustawiona indywidualnie przez u\u017cytkownika dla r\xf3\u017cnych pojazd\xf3w firmy.'))),c.a.createElement("hr",null),c.a.createElement("div",{className:["row mt-5 justify-content-center"].join(" ")},c.a.createElement("div",{className:"card m-3",style:{width:"20rem"}},c.a.createElement("img",{className:"card-img-top",src:H.a,alt:""}),c.a.createElement("div",{className:"card-body"},c.a.createElement("h5",{className:"card-title"},"Wersja Demo"),c.a.createElement("p",{className:"card-text"},"Zapraszamy do zapoznania si\u0119 z funkcjonalo\u015bci\u0105 systemu poprzez wersj\u0119 demonstarcyjn\u0105."),c.a.createElement("button",{className:"btn btn-primary"},"Demo"))),c.a.createElement("div",{className:"card m-3",style:{width:"20rem"}},c.a.createElement("img",{className:"card-img-top",src:P.a,alt:""}),c.a.createElement("div",{className:"card-body"},c.a.createElement("h5",{className:"card-title"},"40 dni gratis"),c.a.createElement("p",{className:"card-text"},"Rejestracja pozwala na bezp\u0142atne testowanie aplikacji dla ka\u017cdego pojazdu firmy przez 40 dni. "),c.a.createElement("button",{className:"btn btn-primary"},"SignIn")))),c.a.createElement("div",{className:"card"},c.a.createElement("h5",{className:"card-header"},"Featured"),c.a.createElement("div",{className:"card-body"},c.a.createElement("h5",{className:"card-title"},"Special title treatment"),c.a.createElement("p",{className:"card-text"},"With supporting text below as a natural lead-in to additional content."),c.a.createElement("button",{className:"btn btn-primary"},"Go somewhere"))))},A=t(125),B=t(27),W=Object(i.b)(function(e){return{_csrf:e.initLang._csrf,error:e.authReducer.error,loading:e.authReducer.loading,errorText:e.initLang.textHome.serverResErrors,loginText:e.initLang.textHome.logIn,token:e.authReducer.token}},function(e){return{onSubmitHandler:function(a){return e(y.authProcess(a))},clearError:function(){return e(y.authClearError())}}})(function(e){var a=Object(o.useState)({email:{elementType:"input",elementConfig:{type:"email",placeholder:e.loginText.email},value:"",validation:{required:!0,isEmail:!0},valid:!1,touched:!1},password:{elementType:"input",elementConfig:{type:"password",placeholder:e.loginText.password},value:"",validation:{required:!0,minLength:4},valid:!1,touched:!1}}),t=Object(r.a)(a,2),n=t[0],i=t[1],l=Object(o.useState)(!1),s=Object(r.a)(l,2),m=s[0],u=s[1],d=Object(o.useContext)(B.a),p=d.setShowLogIn,y=d.setShowNewPass,g=[],f=[];for(var z in n)g.push({id:z,config:n[z]}),f.push(z);Object(o.useEffect)(function(){Object(w.i)(n,u)},[n]),Object(o.useEffect)(function(){Object(w.b)(n,f,e.loginText,i)},[e.loginText]),Object(o.useEffect)(function(){e.token&&v()},[e.token]);var v=function(a){a&&a.preventDefault(),Object(w.a)(n,f,i),e.clearError(),p()},E=g.map(function(e){return c.a.createElement(A.a,{key:e.id,elementType:e.config.elementType,elementConfig:e.config.elementConfig,value:e.config.value,invalid:!e.config.valid,shouldValidate:e.config.validation,touched:e.config.touched,changed:function(a){return Object(w.f)(a,n,e.id,i)}})});return c.a.createElement(c.a.Fragment,null,e.loading?c.a.createElement(k.a,null):null,c.a.createElement("form",{onSubmit:function(a){a.preventDefault();var t={email:n.email.value,password:n.password.value,_csrf:e._csrf};e.onSubmitHandler(t)}},e.error?c.a.createElement("p",null,e.errorText[e.error.toString()]||e.error):null,E,c.a.createElement("button",{className:"btn btn-primary btn-sm",disabled:!m||e.loading,style:{marginRight:"1rem"}},e.loginText.submit),c.a.createElement("button",{onClick:v,className:"btn btn-secondary btn-sm"},e.loginText.cancel)),c.a.createElement("p",{style:{marginTop:"2rem",cursor:"pointer"},onClick:function(e){v(e),y()}},e.loginText.forgotPsw))}),J=Object(i.b)(function(e){return{_csrf:e.initLang._csrf,error:e.authReducer.error,loading:e.authReducer.loading,errorText:e.initLang.textHome.serverResErrors,loginText:e.initLang.textHome.logIn,newPassEmail:e.authReducer.newPassEmail,newPassError:e.authReducer.newPassError}},function(e){return{onSubmitHandler:function(a){return e(y.newPassProcess(a))},clearError:function(){return e(y.authClearError())}}})(function(e){var a=Object(o.useState)({email:{elementType:"input",elementConfig:{type:"email",placeholder:e.loginText.email},value:"",validation:{required:!0,isEmail:!0},valid:!1,touched:!1}}),t=Object(r.a)(a,2),n=t[0],i=t[1],l=Object(o.useState)(!1),s=Object(r.a)(l,2),m=s[0],u=s[1],d=Object(o.useContext)(B.a).setShowNewPass,p=[],y=[];for(var g in n)p.push({id:g,config:n[g]}),y.push(g);Object(o.useEffect)(function(){Object(w.i)(n,u)},[n]),Object(o.useEffect)(function(){Object(w.b)(n,y,e.loginText,i)},[e.loginText]);var f=p.map(function(e){return c.a.createElement(A.a,{key:e.id,elementType:e.config.elementType,elementConfig:e.config.elementConfig,value:e.config.value,invalid:!e.config.valid,shouldValidate:e.config.validation,touched:e.config.touched,changed:function(a){return Object(w.f)(a,n,e.id,i)}})}),z=c.a.createElement("button",{className:"btn btn-primary btn-sm",disabled:!m||e.loading||e.newPassEmail,style:{marginRight:"1rem"}},e.loginText.newPassSubmit),v=c.a.createElement("button",{onClick:function(a){a&&a.preventDefault(),Object(w.a)(n,y,i),e.clearError(),d(!1)},className:"btn btn-secondary btn-sm"},e.loginText.cancel),E=c.a.createElement("div",null,c.a.createElement("p",null,e.loginText.newPassInfoP1," ",e.newPassEmail,c.a.createElement("br",null),e.loginText.newPassInfoP2));return c.a.createElement(c.a.Fragment,null,e.loading?c.a.createElement(k.a,null):null,c.a.createElement("form",{onSubmit:function(a){a.preventDefault();var t={email:n.email.value,_csrf:e._csrf};e.onSubmitHandler(t)}},e.error?c.a.createElement("p",null,e.errorText[e.error.toString()]||e.error):null,e.newPassError?c.a.createElement("p",null,e.errorText[e.newPassError.toString()]||e.error):null,e.newPassEmail?E:c.a.createElement(c.a.Fragment,null,c.a.createElement("p",null,e.loginText.newPassRequest),f),e.newPassEmail?null:z,v))}),U=t(179),M=t(157),V=c.a.lazy(function(){return t.e(8).then(t.bind(null,494))}),q=c.a.lazy(function(){return Promise.all([t.e(2),t.e(7)]).then(t.bind(null,492))});a.default=Object(i.b)(function(e){return{_csrf:e.initLang._csrf,textHome:e.initLang.textHome,error:e.initLang.error,registerText:e.initLang.textHome.registerForm,isLoading:e.authReducer.loading}})((n=function(e){var a=Object(o.useContext)(B.a),t=a.showLogIn,n=a.showNewPass,i=a.showRegister,l=a.showOwner,s=Object(o.useState)({}),m=Object(r.a)(s,2),u=m[0],d=m[1],p=Object(o.useState)({}),y=Object(r.a)(p,2),g=y[0],z=y[1],b=Object(o.useState)(!1),j=Object(r.a)(b,2),h=j[0],x=j[1],N=Object(o.useState)(!1),_=Object(r.a)(N,2),O=_[0],T=_[1],S=function(){x(!1),f.a.get("/system/activeDrivers").then(function(e){x(!0),d(e.data)}).catch(function(e){return console.log(e)})},C=function(){T(!1),f.a.get("/system/activeTrucks").then(function(e){T(!0),z(e.data)}).catch(function(e){return console.log(e)})},L=c.a.createElement(c.a.Fragment,null,c.a.createElement(M.a,{show:t},c.a.createElement(W,null)),c.a.createElement(M.a,{show:n},c.a.createElement(J,null)),c.a.createElement(E.a,null),c.a.createElement(c.a.Suspense,null,i?c.a.createElement(V,{formName:e.registerText.formName}):c.a.createElement(F,null)));l&&h&&O&&(L=c.a.createElement(c.a.Suspense,null,c.a.createElement(U.a.Provider,{value:{getActiveDrivers:S,allActiveDrivers:u,getActiveTrucks:C,allActiveTrucks:g}},c.a.createElement(q,null))));var H=Object(o.useState)(!1),D=Object(r.a)(H,2),P=D[0],R=D[1];return Object(o.useEffect)(function(){Object(w.g)(v.a).then(function(e){return R(e)})},[]),Object(o.useEffect)(function(){l&&(S(),C())},[l]),c.a.createElement(c.a.Fragment,null,!P||36!==e._csrf.length&&e.textHome||e.isLoading?c.a.createElement(k.a,null):L)},function(e){function a(){var e,t;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=Object(u.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(r)))).state={warningTime:18e5},t.resetTimeout=function(){t.clearTimeoutFunc(),t.setTimeout()},t.setTimeout=function(){t.warnTimeout=setTimeout(function(){return Object(w.e)(15,l.a,t.props.dispatch,y,t.props.textHome.autoLogout)},t.state.warningTime)},t.clearTimeoutFunc=function(){t.warnTimeout&&clearTimeout(t.warnTimeout)},t}return Object(p.a)(a,e),Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.events=["load","mousemove","mousedown","click","scroll","keypress"],this.events.forEach(function(a){return window.addEventListener(a,e.resetTimeout)}),this.setTimeout()}},{key:"render",value:function(){return c.a.createElement(n,this.props)}}]),a}(c.a.Component)))}}]);
//# sourceMappingURL=5.710f9c3b.chunk.js.map