!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@luban-h5/support")):"function"==typeof define&&define.amd?define(["exports","@luban-h5/support"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self)["lbp-form-input"]={},e.LubanH5Support)}(this,(function(e,t){"use strict";var n=function(e){try{return!!e()}catch(t){return!0}},o=!n((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},i=function(e){return e&&e.Math==Math&&e},l=i("object"==typeof globalThis&&globalThis)||i("object"==typeof window&&window)||i("object"==typeof self&&self)||i("object"==typeof r&&r)||function(){return this}()||Function("return this")(),u=function(e){return"object"==typeof e?null!==e:"function"==typeof e},a=l.document,f=u(a)&&u(a.createElement),p=!o&&!n((function(){return 7!=Object.defineProperty((e="div",f?a.createElement(e):{}),"a",{get:function(){return 7}}).a;var e})),c=function(e){if(!u(e))throw TypeError(String(e)+" is not an object");return e},d=Object.defineProperty,b={f:o?d:function(e,t,n){if(c(e),t=function(e,t){if(!u(e))return e;var n,o;if(t&&"function"==typeof(n=e.toString)&&!u(o=n.call(e)))return o;if("function"==typeof(n=e.valueOf)&&!u(o=n.call(e)))return o;if(!t&&"function"==typeof(n=e.toString)&&!u(o=n.call(e)))return o;throw TypeError("Can't convert object to primitive value")}(t,!0),c(n),p)try{return d(e,t,n)}catch(o){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(e[t]=n.value),e}}.f,s=Function.prototype,h=s.toString,y=/^\s*function ([^ (]*)/,g="name";o&&!(g in s)&&b(s,g,{configurable:!0,get:function(){try{return h.call(this).match(y)[1]}catch(e){return""}}});var m={name:"lbp-form-input",render:function(e){var t={color:this.color,textAlign:this.textAlign,backgroundColor:this.backgroundColor,fontSize:this.fontSize+"px",lineHeight:this.lineHeight+"em",borderColor:this.borderColor,borderRadius:this.borderRadius+"px",borderWidth:this.borderWidth+"px",padding:"0 5px"};return e("input",{attrs:{disabled:this.disabled,type:this.type,name:this.name,placeholder:this.placeholder,autocomplete:"off","data-type":"lbp-form-input"},style:t})},props:{type:t.Select({label:"类型",props:{options:[{label:"文字",value:"text"},{label:"密码",value:"password"},{label:"日期",value:"date"},{label:"邮箱",value:"email"},{label:"手机号",value:"tel"}]}}),name:t.Input({label:"name"}),disabled:t.Switch({label:"disabled"}),fontSize:t.InputNumber({label:"字号(px)"}),placeholder:t.Input({label:"提示信息"}),borderWidth:t.InputNumber({label:"边框宽度(px)"}),borderRadius:t.InputNumber({label:"圆角(px)"}),vertical:t.Switch(),lineHeight:t.InputNumber({label:"行高(px)"})}};e.default=m,Object.defineProperty(e,"__esModule",{value:!0})}));
