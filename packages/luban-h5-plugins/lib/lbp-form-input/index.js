!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("luban-h5-support")):"function"==typeof define&&define.amd?define(["exports","luban-h5-support"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self)["lbp-form-input"]={},e.PropTypes)}(this,(function(e,t){"use strict";function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=n(t),r=function(e){try{return!!e()}catch(t){return!0}},i=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),l="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},u=function(e){return e&&e.Math==Math&&e},a=u("object"==typeof globalThis&&globalThis)||u("object"==typeof window&&window)||u("object"==typeof self&&self)||u("object"==typeof l&&l)||function(){return this}()||Function("return this")(),f=function(e){return"object"==typeof e?null!==e:"function"==typeof e},d=a.document,p=f(d)&&f(d.createElement),c=!i&&!r((function(){return 7!=Object.defineProperty((e="div",p?d.createElement(e):{}),"a",{get:function(){return 7}}).a;var e})),b=function(e){if(!f(e))throw TypeError(String(e)+" is not an object");return e},s=Object.defineProperty,h={f:i?s:function(e,t,n){if(b(e),t=function(e,t){if(!f(e))return e;var n,o;if(t&&"function"==typeof(n=e.toString)&&!f(o=n.call(e)))return o;if("function"==typeof(n=e.valueOf)&&!f(o=n.call(e)))return o;if(!t&&"function"==typeof(n=e.toString)&&!f(o=n.call(e)))return o;throw TypeError("Can't convert object to primitive value")}(t,!0),b(n),c)try{return s(e,t,n)}catch(o){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(e[t]=n.value),e}}.f,y=Function.prototype,g=y.toString,m=/^\s*function ([^ (]*)/,v="name";i&&!(v in y)&&h(y,v,{configurable:!0,get:function(){try{return g.call(this).match(m)[1]}catch(e){return""}}});var x={name:"lbp-form-input",render:function(e){var t={color:this.color,textAlign:this.textAlign,backgroundColor:this.backgroundColor,fontSize:this.fontSize+"px",lineHeight:this.lineHeight+"em",borderColor:this.borderColor,borderRadius:this.borderRadius+"px",borderWidth:this.borderWidth+"px",padding:"0 5px"};return e("input",{attrs:{disabled:this.disabled,type:this.type,name:this.name,placeholder:this.placeholder,autocomplete:"off","data-type":"lbp-form-input"},style:t})},props:{type:o.default.select({label:"类型",props:{options:[{label:"文字",value:"text"},{label:"密码",value:"password"},{label:"日期",value:"date"},{label:"邮箱",value:"email"},{label:"手机号",value:"tel"}]}}),name:o.default.string({label:"name"}),disabled:o.default.boolean({label:"disabled"}),fontSize:o.default.number({label:"字号(px)"}),placeholder:o.default.string({label:"提示信息"}),borderWidth:o.default.number({label:"边框宽度(px)"}),borderRadius:o.default.number({label:"圆角(px)"}),vertical:o.default.boolean(),lineHeight:o.default.number({label:"行高(px)"})}};e.default=x,Object.defineProperty(e,"__esModule",{value:!0})}));
