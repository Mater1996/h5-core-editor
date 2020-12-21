!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self)["lbp-video"]={})}(this,(function(t){"use strict";var e=function(t){try{return!!t()}catch(e){return!0}},r=!e((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function i(t){var e={exports:{}};return t(e,e.exports),e.exports}var o=function(t){return t&&t.Math==Math&&t},c=o("object"==typeof globalThis&&globalThis)||o("object"==typeof window&&window)||o("object"==typeof self&&self)||o("object"==typeof n&&n)||function(){return this}()||Function("return this")(),u=/#|\.prototype\./,a=function(t,r){var n=l[f(t)];return n==p||n!=s&&("function"==typeof r?e(r):!!r)},f=a.normalize=function(t){return String(t).replace(u,".").toLowerCase()},l=a.data={},s=a.NATIVE="N",p=a.POLYFILL="P",I=a,g=function(t){return"object"==typeof t?null!==t:"function"==typeof t},d=c.document,y=g(d)&&g(d.createElement),M=function(t){return y?d.createElement(t):{}},b=!r&&!e((function(){return 7!=Object.defineProperty(M("div"),"a",{get:function(){return 7}}).a})),j=function(t){if(!g(t))throw TypeError(String(t)+" is not an object");return t},h=function(t,e){if(!g(t))return t;var r,n;if(e&&"function"==typeof(r=t.toString)&&!g(n=r.call(t)))return n;if("function"==typeof(r=t.valueOf)&&!g(n=r.call(t)))return n;if(!e&&"function"==typeof(r=t.toString)&&!g(n=r.call(t)))return n;throw TypeError("Can't convert object to primitive value")},N=Object.defineProperty,v={f:r?N:function(t,e,r){if(j(t),e=h(e,!0),j(r),b)try{return N(t,e,r)}catch(n){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(t[e]=r.value),t}},m=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}},w=r?function(t,e,r){return v.f(t,e,m(1,r))}:function(t,e,r){return t[e]=r,t},A={}.hasOwnProperty,C=function(t,e){return A.call(t,e)},D=function(t,e){try{w(c,t,e)}catch(r){c[t]=e}return e},T="__core-js_shared__",O=c[T]||D(T,{}),S=Function.toString;"function"!=typeof O.inspectSource&&(O.inspectSource=function(t){return S.call(t)});var z,E,P,x=O.inspectSource,L=c.WeakMap,k="function"==typeof L&&/native code/.test(x(L)),G=i((function(t){(t.exports=function(t,e){return O[t]||(O[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.7.0",mode:"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})})),Z=0,U=Math.random(),_=G("keys"),W=function(t){return _[t]||(_[t]=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++Z+U).toString(36)}(t))},Y={},Q=c.WeakMap;if(k){var B=O.state||(O.state=new Q),F=B.get,R=B.has,V=B.set;z=function(t,e){return e.facade=t,V.call(B,t,e),e},E=function(t){return F.call(B,t)||{}},P=function(t){return R.call(B,t)}}else{var H=W("state");Y[H]=!0,z=function(t,e){return e.facade=t,w(t,H,e),e},E=function(t){return C(t,H)?t[H]:{}},P=function(t){return C(t,H)}}var X,J={set:z,get:E,has:P,enforce:function(t){return P(t)?E(t):z(t,{})},getterFor:function(t){return function(e){var r;if(!g(e)||(r=E(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return r}}},K=i((function(t){var e=J.get,r=J.enforce,n=String(String).split("String");(t.exports=function(t,e,i,o){var u,a=!!o&&!!o.unsafe,f=!!o&&!!o.enumerable,l=!!o&&!!o.noTargetGet;"function"==typeof i&&("string"!=typeof e||C(i,"name")||w(i,"name",e),(u=r(i)).source||(u.source=n.join("string"==typeof e?e:""))),t!==c?(a?!l&&t[e]&&(f=!0):delete t[e],f?t[e]=i:w(t,e,i)):f?t[e]=i:D(e,i)})(Function.prototype,"toString",(function(){return"function"==typeof this&&e(this).source||x(this)}))})),$={}.toString,q=function(t){return $.call(t).slice(8,-1)},tt=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,r={};try{(t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(r,[]),e=r instanceof Array}catch(n){}return function(r,n){return j(r),function(t){if(!g(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype")}(n),e?t.call(r,n):r.__proto__=n,r}}():void 0),et=function(t,e,r){var n,i;return tt&&"function"==typeof(n=e.constructor)&&n!==r&&g(i=n.prototype)&&i!==r.prototype&&tt(t,i),t},rt="".split,nt=e((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==q(t)?rt.call(t,""):Object(t)}:Object,it=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},ot=function(t){return nt(it(t))},ct=Math.ceil,ut=Math.floor,at=function(t){return isNaN(t=+t)?0:(t>0?ut:ct)(t)},ft=Math.min,lt=Math.max,st=Math.min,pt=function(t){return function(e,r,n){var i,o,c=ot(e),u=(i=c.length)>0?ft(at(i),9007199254740991):0,a=function(t,e){var r=at(t);return r<0?lt(r+e,0):st(r,e)}(n,u);if(t&&r!=r){for(;u>a;)if((o=c[a++])!=o)return!0}else for(;u>a;a++)if((t||a in c)&&c[a]===r)return t||a||0;return!t&&-1}},It={includes:pt(!0),indexOf:pt(!1)}.indexOf,gt=function(t,e){var r,n=ot(t),i=0,o=[];for(r in n)!C(Y,r)&&C(n,r)&&o.push(r);for(;e.length>i;)C(n,r=e[i++])&&(~It(o,r)||o.push(r));return o},dt=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],yt=Object.keys||function(t){return gt(t,dt)},Mt=r?Object.defineProperties:function(t,e){j(t);for(var r,n=yt(e),i=n.length,o=0;i>o;)v.f(t,r=n[o++],e[r]);return t},bt=c,jt=function(t){return"function"==typeof t?t:void 0},ht=function(t,e){return arguments.length<2?jt(bt[t])||jt(c[t]):bt[t]&&bt[t][e]||c[t]&&c[t][e]}("document","documentElement"),Nt=W("IE_PROTO"),vt=function(){},mt=function(t){return"<script>"+t+"</"+"script>"},wt=function(){try{X=document.domain&&new ActiveXObject("htmlfile")}catch(n){}var t,e;wt=X?function(t){t.write(mt("")),t.close();var e=t.parentWindow.Object;return t=null,e}(X):((e=M("iframe")).style.display="none",ht.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write(mt("document.F=Object")),t.close(),t.F);for(var r=dt.length;r--;)delete wt.prototype[dt[r]];return wt()};Y[Nt]=!0;var At=Object.create||function(t,e){var r;return null!==t?(vt.prototype=j(t),r=new vt,vt.prototype=null,r[Nt]=t):r=wt(),void 0===e?r:Mt(r,e)},Ct=dt.concat("length","prototype"),Dt={f:Object.getOwnPropertyNames||function(t){return gt(t,Ct)}},Tt={}.propertyIsEnumerable,Ot=Object.getOwnPropertyDescriptor,St={f:Ot&&!Tt.call({1:2},1)?function(t){var e=Ot(this,t);return!!e&&e.enumerable}:Tt},zt=Object.getOwnPropertyDescriptor,Et={f:r?zt:function(t,e){if(t=ot(t),e=h(e,!0),b)try{return zt(t,e)}catch(r){}if(C(t,e))return m(!St.f.call(t,e),t[e])}},Pt="[\t\n\v\f\r                　\u2028\u2029\ufeff]",xt=RegExp("^"+Pt+Pt+"*"),Lt=RegExp(Pt+Pt+"*$"),kt=function(t){return function(e){var r=String(it(e));return 1&t&&(r=r.replace(xt,"")),2&t&&(r=r.replace(Lt,"")),r}},Gt={start:kt(1),end:kt(2),trim:kt(3)},Zt=Dt.f,Ut=Et.f,_t=v.f,Wt=Gt.trim,Yt="Number",Qt=c.Number,Bt=Qt.prototype,Ft=q(At(Bt))==Yt,Rt=function(t){var e,r,n,i,o,c,u,a,f=h(t,!1);if("string"==typeof f&&f.length>2)if(43===(e=(f=Wt(f)).charCodeAt(0))||45===e){if(88===(r=f.charCodeAt(2))||120===r)return NaN}else if(48===e){switch(f.charCodeAt(1)){case 66:case 98:n=2,i=49;break;case 79:case 111:n=8,i=55;break;default:return+f}for(c=(o=f.slice(2)).length,u=0;u<c;u++)if((a=o.charCodeAt(u))<48||a>i)return NaN;return parseInt(o,n)}return+f};if(I(Yt,!Qt(" 0o1")||!Qt("0b1")||Qt("+0x1"))){for(var Vt,Ht=function(t){var r=arguments.length<1?0:t,n=this;return n instanceof Ht&&(Ft?e((function(){Bt.valueOf.call(n)})):q(n)!=Yt)?et(new Qt(Rt(r)),n,Ht):Rt(r)},Xt=r?Zt(Qt):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),Jt=0;Xt.length>Jt;Jt++)C(Qt,Vt=Xt[Jt])&&!C(Ht,Vt)&&_t(Ht,Vt,Ut(Qt,Vt));Ht.prototype=Bt,Bt.constructor=Ht,K(c,Yt,Ht)}var Kt=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.label,r=void 0===e?"开关":e,n=t.defaultValue,i=void 0!==n&&n,o=t.props,c=void 0===o?{}:o,u=t.visible,a=void 0===u||u;return{type:Boolean,default:i,visible:a,editor:{type:"a-switch",label:r,props:c}}},$t=(Boolean,Boolean,function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.label,r=void 0===e?"按钮文字":e,n=t.defaultValue,i=void 0===n?"按钮":n,o=t.component,c=void 0===o?"a-input":o,u=t.props,a=void 0===u?{}:u,f=t.extra,l=t.visible,s=void 0===l||l;return{type:String,default:i,visible:s,editor:{type:c,label:r,require:!0,props:a,extra:f}}}),qt="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjMyMHB4IiBoZWlnaHQ9IjE4MHB4IiB2aWV3Qm94PSIwIDAgMzIwIDE4MCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjMgKDU3NTQ0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4NCiAgICA8dGl0bGU+UmVjdGFuZ2xlIDM8L3RpdGxlPg0KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPg0KICAgIDxkZWZzPjwvZGVmcz4NCiAgICA8ZyBpZD0icGxheSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+DQogICAgICAgIDxnIGlkPSJHcm91cC0yOSIgZmlsbC1ydWxlPSJub256ZXJvIj4NCiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMyIgZmlsbD0iI0Q4RDhEOCIgb3BhY2l0eT0iMCIgeD0iMCIgeT0iMCIgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxODAiPjwvcmVjdD4NCiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjQuMDAwMDAwLCA1NC4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJDb21iaW5lZC1TaGFwZSIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMC40MDAwMDAwMDYiIGN4PSIzNiIgY3k9IjM2IiByPSIzNiI+PC9jaXJjbGU+DQogICAgICAgICAgICAgICAgPHBhdGggZD0iTTUyLjUwMTQ1NzEsMzguNDY4NzAzOSBMMjkuNTEyNTQ3NCw1My4wOTEwNDA2IEMyOC40MjUyMDE2LDUzLjc4MjY1ODMgMjYuOTgzMDY2Nyw1My40NjE4NTczIDI2LjI5MTQ0OSw1Mi4zNzQ1MTE0IEMyNi4wNTMzNzY0LDUyLjAwMDIxOSAyNS45MjY5Mjk1LDUxLjU2NTgxODMgMjUuOTI2OTI5NSw1MS4xMjIyMjY4IEwyNS45MjY5Mjk1LDIxLjg3NzU1MzQgQzI1LjkyNjkyOTUsMjAuNTg4ODg5IDI2Ljk3MTU5ODQsMTkuNTQ0MjIwMSAyOC4yNjAyNjI4LDE5LjU0NDIyMDEgQzI4LjcwMzg1NDMsMTkuNTQ0MjIwMSAyOS4xMzgyNTUsMTkuNjcwNjY3MSAyOS41MTI1NDc0LDE5LjkwODczOTcgTDUyLjUwMTQ1NzEsMzQuNTMxMDc2NCBDNTMuNTg4ODAyOSwzNS4yMjI2OTQxIDUzLjkwOTYwNCwzNi42NjQ4Mjg5IDUzLjIxNzk4NjMsMzcuNzUyMTc0NyBDNTMuMDM0NTE1OCwzOC4wNDA2MjI5IDUyLjc4OTkwNTIsMzguMjg1MjMzNSA1Mi41MDE0NTcxLDM4LjQ2ODcwMzkgWiIgaWQ9IlRyaWFuZ2xlLTIiIGZpbGw9IiMwMDAwMDAiIG9wYWNpdHk9IjAuNSI+PC9wYXRoPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+",te={name:"lbp-video",props:{src:$t({label:"视频地址"}),disabled:Kt({label:"disabled"}),useIframe:Kt({label:"使用iframe"}),iframeSrc:$t({default:"",label:"iframe 地址",props:{type:"textarea",placeholder:"只有使用iframe打开的时候，这个才有效"},extra:function(t){return"「使用iframe」打开的时候，这个才有效；上传视频请忽略该配置"}})},watch:{src:function(){this.appendIframe()},disabled:function(){this.appendIframe()},useIframe:function(){this.appendIframe()},iframeSrc:function(){this.appendIframe()}},mounted:function(){this.appendIframe()},methods:{appendIframe:function(){this.useIframe&&this.iframeSrc&&this.$refs.iframeWrapper&&(this.$refs.iframeWrapper.innerHTML=this.iframeSrc)}},render:function(t){return t("div",{class:"lbc-video",style:this.disabled?{"pointer-events":"none"}:{}},[this.useIframe?t("div",{ref:"iframeWrapper"},[t("img",{attrs:{src:qt,width:"100%",height:"100%"}})]):t("video",{attrs:{playsinline:"true","webkit-playsinline":"",width:"100%",height:"100%",poster:qt,controls:!0},ref:"videoTag"},[t("source",{attrs:{type:"video/mp4",src:this.src}})])])},componentsForPropsEditor:{}};t.default=te,Object.defineProperty(t,"__esModule",{value:!0})}));
