!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("luban-h5-support"),require("vant")):"function"==typeof define&&define.amd?define(["exports","luban-h5-support","vant"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self)["lbp-rate"]={},e.PropTypes,e.vant)}(this,(function(e,t,l){"use strict";function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var u=o(t),a={name:"lbp-rate",props:{value:u.default.number({label:"当前分值"}),count:u.default.number({label:"图标总数"}),size:u.default.number({label:"图标大小"}),gutter:u.default.number({label:"图标间距"}),mode:u.default.select({label:"模式",props:{options:[{label:"star",value:"star"},{label:"点赞",value:"like"},{label:"Good",value:"good-job"}]}})},render:function(){var e=arguments[0];return e(l.Rate,{attrs:{value:this.value,count:this.count,size:this.size,color:this.color,gutter:this.gutter,"void-icon":"star","void-color":"#eee"}})}};e.default=a,Object.defineProperty(e,"__esModule",{value:!0})}));
