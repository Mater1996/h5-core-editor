!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("vue-quill-editor")):"function"==typeof define&&define.amd?define(["exports","vue-quill-editor"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self)["lbp-text"]={},t.vueQuillEditor)}(this,(function(t,e){"use strict";var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function n(t){var e={exports:{}};return t(e,e.exports),e.exports}var o=function(t){return t&&t.Math==Math&&t},i=o("object"==typeof globalThis&&globalThis)||o("object"==typeof window&&window)||o("object"==typeof self&&self)||o("object"==typeof r&&r)||function(){return this}()||Function("return this")(),u=function(t){try{return!!t()}catch(e){return!0}},c=!u((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),a={}.propertyIsEnumerable,l=Object.getOwnPropertyDescriptor,f={f:l&&!a.call({1:2},1)?function(t){var e=l(this,t);return!!e&&e.enumerable}:a},s=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}},p={}.toString,d=function(t){return p.call(t).slice(8,-1)},v="".split,y=u((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==d(t)?v.call(t,""):Object(t)}:Object,b=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},h=function(t){return y(b(t))},g=function(t){return"object"==typeof t?null!==t:"function"==typeof t},m=function(t,e){if(!g(t))return t;var r,n;if(e&&"function"==typeof(r=t.toString)&&!g(n=r.call(t)))return n;if("function"==typeof(r=t.valueOf)&&!g(n=r.call(t)))return n;if(!e&&"function"==typeof(r=t.toString)&&!g(n=r.call(t)))return n;throw TypeError("Can't convert object to primitive value")},w={}.hasOwnProperty,O=function(t,e){return w.call(t,e)},S=i.document,E=g(S)&&g(S.createElement),j=function(t){return E?S.createElement(t):{}},x=!c&&!u((function(){return 7!=Object.defineProperty(j("div"),"a",{get:function(){return 7}}).a})),_=Object.getOwnPropertyDescriptor,N={f:c?_:function(t,e){if(t=h(t),e=m(e,!0),x)try{return _(t,e)}catch(r){}if(O(t,e))return s(!f.f.call(t,e),t[e])}},I=function(t){if(!g(t))throw TypeError(String(t)+" is not an object");return t},T=Object.defineProperty,P={f:c?T:function(t,e,r){if(I(t),e=m(e,!0),I(r),x)try{return T(t,e,r)}catch(n){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(t[e]=r.value),t}},A=c?function(t,e,r){return P.f(t,e,s(1,r))}:function(t,e,r){return t[e]=r,t},C=function(t,e){try{A(i,t,e)}catch(r){i[t]=e}return e},M="__core-js_shared__",k=i[M]||C(M,{}),F=Function.toString;"function"!=typeof k.inspectSource&&(k.inspectSource=function(t){return F.call(t)});var q,V,L,R=k.inspectSource,W=i.WeakMap,D="function"==typeof W&&/native code/.test(R(W)),G=n((function(t){(t.exports=function(t,e){return k[t]||(k[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.7.0",mode:"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})})),z=0,B=Math.random(),H=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++z+B).toString(36)},X=G("keys"),Y=function(t){return X[t]||(X[t]=H(t))},U={},$=i.WeakMap;if(D){var K=k.state||(k.state=new $),Q=K.get,J=K.has,Z=K.set;q=function(t,e){return e.facade=t,Z.call(K,t,e),e},V=function(t){return Q.call(K,t)||{}},L=function(t){return J.call(K,t)}}else{var tt=Y("state");U[tt]=!0,q=function(t,e){return e.facade=t,A(t,tt,e),e},V=function(t){return O(t,tt)?t[tt]:{}},L=function(t){return O(t,tt)}}var et,rt,nt={set:q,get:V,has:L,enforce:function(t){return L(t)?V(t):q(t,{})},getterFor:function(t){return function(e){var r;if(!g(e)||(r=V(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return r}}},ot=n((function(t){var e=nt.get,r=nt.enforce,n=String(String).split("String");(t.exports=function(t,e,o,u){var c,a=!!u&&!!u.unsafe,l=!!u&&!!u.enumerable,f=!!u&&!!u.noTargetGet;"function"==typeof o&&("string"!=typeof e||O(o,"name")||A(o,"name",e),(c=r(o)).source||(c.source=n.join("string"==typeof e?e:""))),t!==i?(a?!f&&t[e]&&(l=!0):delete t[e],l?t[e]=o:A(t,e,o)):l?t[e]=o:C(e,o)})(Function.prototype,"toString",(function(){return"function"==typeof this&&e(this).source||R(this)}))})),it=i,ut=function(t){return"function"==typeof t?t:void 0},ct=function(t,e){return arguments.length<2?ut(it[t])||ut(i[t]):it[t]&&it[t][e]||i[t]&&i[t][e]},at=Math.ceil,lt=Math.floor,ft=function(t){return isNaN(t=+t)?0:(t>0?lt:at)(t)},st=Math.min,pt=function(t){return t>0?st(ft(t),9007199254740991):0},dt=Math.max,vt=Math.min,yt=function(t){return function(e,r,n){var o,i=h(e),u=pt(i.length),c=function(t,e){var r=ft(t);return r<0?dt(r+e,0):vt(r,e)}(n,u);if(t&&r!=r){for(;u>c;)if((o=i[c++])!=o)return!0}else for(;u>c;c++)if((t||c in i)&&i[c]===r)return t||c||0;return!t&&-1}},bt={includes:yt(!0),indexOf:yt(!1)}.indexOf,ht=function(t,e){var r,n=h(t),o=0,i=[];for(r in n)!O(U,r)&&O(n,r)&&i.push(r);for(;e.length>o;)O(n,r=e[o++])&&(~bt(i,r)||i.push(r));return i},gt=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],mt=gt.concat("length","prototype"),wt={f:Object.getOwnPropertyNames||function(t){return ht(t,mt)}},Ot={f:Object.getOwnPropertySymbols},St=ct("Reflect","ownKeys")||function(t){var e=wt.f(I(t)),r=Ot.f;return r?e.concat(r(t)):e},Et=function(t,e){for(var r=St(e),n=P.f,o=N.f,i=0;i<r.length;i++){var u=r[i];O(t,u)||n(t,u,o(e,u))}},jt=/#|\.prototype\./,xt=function(t,e){var r=Nt[_t(t)];return r==Tt||r!=It&&("function"==typeof e?u(e):!!e)},_t=xt.normalize=function(t){return String(t).replace(jt,".").toLowerCase()},Nt=xt.data={},It=xt.NATIVE="N",Tt=xt.POLYFILL="P",Pt=xt,At=N.f,Ct=Array.isArray||function(t){return"Array"==d(t)},Mt=function(t){return Object(b(t))},kt=function(t,e,r){var n=m(e);n in t?P.f(t,n,s(0,r)):t[n]=r},Ft=!!Object.getOwnPropertySymbols&&!u((function(){return!String(Symbol())})),qt=Ft&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,Vt=G("wks"),Lt=i.Symbol,Rt=qt?Lt:Lt&&Lt.withoutSetter||H,Wt=function(t){return O(Vt,t)||(Ft&&O(Lt,t)?Vt[t]=Lt[t]:Vt[t]=Rt("Symbol."+t)),Vt[t]},Dt=Wt("species"),Gt=function(t,e){var r;return Ct(t)&&("function"!=typeof(r=t.constructor)||r!==Array&&!Ct(r.prototype)?g(r)&&null===(r=r[Dt])&&(r=void 0):r=void 0),new(void 0===r?Array:r)(0===e?0:e)},zt=ct("navigator","userAgent")||"",Bt=i.process,Ht=Bt&&Bt.versions,Xt=Ht&&Ht.v8;Xt?rt=(et=Xt.split("."))[0]+et[1]:zt&&(!(et=zt.match(/Edge\/(\d+)/))||et[1]>=74)&&(et=zt.match(/Chrome\/(\d+)/))&&(rt=et[1]);var Yt,Ut=rt&&+rt,$t=Wt("species"),Kt=Wt("isConcatSpreadable"),Qt=9007199254740991,Jt="Maximum allowed index exceeded",Zt=Ut>=51||!u((function(){var t=[];return t[Kt]=!1,t.concat()[0]!==t})),te=(Yt="concat",Ut>=51||!u((function(){var t=[];return(t.constructor={})[$t]=function(){return{foo:1}},1!==t[Yt](Boolean).foo}))),ee=function(t){if(!g(t))return!1;var e=t[Kt];return void 0!==e?!!e:Ct(t)};!function(t,e){var r,n,o,u,c,a=t.target,l=t.global,f=t.stat;if(r=l?i:f?i[a]||C(a,{}):(i[a]||{}).prototype)for(n in e){if(u=e[n],o=t.noTargetGet?(c=At(r,n))&&c.value:r[n],!Pt(l?n:a+(f?".":"#")+n,t.forced)&&void 0!==o){if(typeof u==typeof o)continue;Et(u,o)}(t.sham||o&&o.sham)&&A(u,"sham",!0),ot(r,n,u,t)}}({target:"Array",proto:!0,forced:!Zt||!te},{concat:function(t){var e,r,n,o,i,u=Mt(this),c=Gt(u,0),a=0;for(e=-1,n=arguments.length;e<n;e++)if(ee(i=-1===e?u:arguments[e])){if(a+(o=pt(i.length))>Qt)throw TypeError(Jt);for(r=0;r<o;r++,a++)r in i&&kt(c,a,i[r])}else{if(a>=Qt)throw TypeError(Jt);kt(c,a++,i)}return c.length=a,c}});var re,ne=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,r={};try{(t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(r,[]),e=r instanceof Array}catch(n){}return function(r,n){return I(r),function(t){if(!g(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype")}(n),e?t.call(r,n):r.__proto__=n,r}}():void 0),oe=function(t,e,r){var n,o;return ne&&"function"==typeof(n=e.constructor)&&n!==r&&g(o=n.prototype)&&o!==r.prototype&&ne(t,o),t},ie=Object.keys||function(t){return ht(t,gt)},ue=c?Object.defineProperties:function(t,e){I(t);for(var r,n=ie(e),o=n.length,i=0;o>i;)P.f(t,r=n[i++],e[r]);return t},ce=ct("document","documentElement"),ae=Y("IE_PROTO"),le=function(){},fe=function(t){return"<script>"+t+"</"+"script>"},se=function(){try{re=document.domain&&new ActiveXObject("htmlfile")}catch(n){}var t,e;se=re?function(t){t.write(fe("")),t.close();var e=t.parentWindow.Object;return t=null,e}(re):((e=j("iframe")).style.display="none",ce.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write(fe("document.F=Object")),t.close(),t.F);for(var r=gt.length;r--;)delete se.prototype[gt[r]];return se()};U[ae]=!0;var pe=Object.create||function(t,e){var r;return null!==t?(le.prototype=I(t),r=new le,le.prototype=null,r[ae]=t):r=se(),void 0===e?r:ue(r,e)},de="[\t\n\v\f\r                　\u2028\u2029\ufeff]",ve=RegExp("^"+de+de+"*"),ye=RegExp(de+de+"*$"),be=function(t){return function(e){var r=String(b(e));return 1&t&&(r=r.replace(ve,"")),2&t&&(r=r.replace(ye,"")),r}},he={start:be(1),end:be(2),trim:be(3)},ge=wt.f,me=N.f,we=P.f,Oe=he.trim,Se="Number",Ee=i.Number,je=Ee.prototype,xe=d(pe(je))==Se,_e=function(t){var e,r,n,o,i,u,c,a,l=m(t,!1);if("string"==typeof l&&l.length>2)if(43===(e=(l=Oe(l)).charCodeAt(0))||45===e){if(88===(r=l.charCodeAt(2))||120===r)return NaN}else if(48===e){switch(l.charCodeAt(1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+l}for(u=(i=l.slice(2)).length,c=0;c<u;c++)if((a=i.charCodeAt(c))<48||a>o)return NaN;return parseInt(i,n)}return+l};if(Pt(Se,!Ee(" 0o1")||!Ee("0b1")||Ee("+0x1"))){for(var Ne,Ie=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof Ie&&(xe?u((function(){je.valueOf.call(r)})):d(r)!=Se)?oe(new Ee(_e(e)),r,Ie):_e(e)},Te=c?ge(Ee):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),Pe=0;Te.length>Pe;Pe++)O(Ee,Ne=Te[Pe])&&!O(Ie,Ne)&&we(Ie,Ne,me(Ee,Ne));Ie.prototype=je,je.constructor=Ie,ot(i,Se,Ie)}var Ae={},Ce=(Boolean,Boolean,function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.label,r=void 0===e?"文字颜色":e,n=t.defaultValue,o=void 0===n?"#000000":n,i=t.visible,u=void 0===i||i;return{type:String,default:o,visible:u,editor:{type:"colors-panel",label:r,props:{size:"mini",showAlpha:!0},require:!0}}}),Me=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.label,r=void 0===e?"数值":e,n=t.defaultValue,o=void 0===n?10:n,i=t.props,u=void 0===i?Ae:i,c=t.visible,a=void 0===c||c;return{type:Number,default:o,visible:a,editor:{type:"a-input-number",label:r,require:!0,props:u}}},ke=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.label,r=void 0===e?"按钮文字":e,n=t.defaultValue,o=void 0===n?"按钮":n,i=t.component,u=void 0===i?"a-input":i,c=t.props,a=void 0===c?{}:c,l=t.extra,f=t.visible,s=void 0===f||f;return{type:String,default:o,visible:s,editor:{type:u,label:r,require:!0,props:a,extra:l}}},Fe={render:function(t){var r=this,n=this.canEdit&&"edit"===this.editorMode,o={position:"relative",color:"".concat(this.color," !important"),textDecoration:"none",backgroundColor:this.backgroundColor||"rgba(255, 255, 255, 0.2)",lineHeight:"".concat(this.lineHeight,"em"),border:"".concat(this.borderWidth,"px solid ").concat(this.borderColor),borderRadius:"".concat(this.borderRadius,"px")},i=t("div",{class:"ql-snow"},[t("div",{domProps:{innerHTML:this.text},class:"ql-editor ql-container"})]);return t("div",{on:{dblclick:function(t){r.canEdit=!0,t.stopPropagation()},mousedown:function(t){r.canEdit&&t.stopPropagation()},keydown:function(t){var e=t.keyCode||t.charCode;8!==e&&46!==e||t.stopPropagation()}},style:o},[n?t(e.quillEditor,{attrs:{content:this.text,options:{modules:{toolbar:[["bold","italic","underline","strike"],[{list:"ordered"},{list:"bullet"}],[{color:[]},{background:[]}],[{align:[]}],["clean"],[{header:[1,2,3,4,5,6,!1]}]]},theme:"snow"}},on:{change:function(t){t.quill;var e=t.html;t.text;r.$emit("input",{value:e,pluginName:"lbp-text"})}}}):i])},name:"lbp-text",data:function(){return{canEdit:!1,innerText:this.text||"双击修改文字"}},props:{backgroundColor:Ce({label:"背景色",defaultValue:"rgba(0, 0, 0, 0)"}),borderWidth:Me({label:"边框宽度(px)",defaultValue:0}),borderRadius:Me({label:"圆角(px)"}),borderColor:Ce({label:"边框颜色"}),text:ke({label:"内容",defaultValue:"双击修改文字",visible:!1}),editorMode:ke({defaultValue:"preview",label:"模式",visible:!1})},editorConfig:{}};t.default=Fe,Object.defineProperty(t,"__esModule",{value:!0})}));
