!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react-dom")):"function"==typeof define&&define.amd?define(["react-dom"],t):"object"==typeof exports?exports.ezParagraphConfig=t(require("react-dom")):(e.eZ=e.eZ||{},e.eZ.ezAlloyEditor=e.eZ.ezAlloyEditor||{},e.eZ.ezAlloyEditor.ezParagraphConfig=t(e.ReactDOM))}(this,function(e){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=62)}({13:function(t,n){t.exports=e},17:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(13),i=function(e){return e&&e.__esModule?e:{default:e}}(a),l=function(){function e(){o(this,e)}return r(e,[{key:"getStyles",value:function(){return{name:"styles",cfg:{showRemoveStylesItem:!1,styles:[{name:"Heading 1",style:{element:"h1"}},{name:"Heading 2",style:{element:"h2"}},{name:"Heading 3",style:{element:"h3"}},{name:"Heading 4",style:{element:"h4"}},{name:"Heading 5",style:{element:"h5"}},{name:"Heading 6",style:{element:"h6"}},{name:"Paragraph",style:{element:"p"}}]}}}},{key:"getArrowBoxClasses",value:function(){return"ae-arrow-box ae-arrow-box-bottom ez-ae-arrow-box-left"}},{key:"setPosition",value:function(t){var n=t.editor.get("nativeEditor"),o=n.elementPath().block;return o||(o=new CKEDITOR.dom.element(t.editorEvent.data.nativeEvent.target)),e.setPositionFor.call(this,o,n)}}],[{key:"outlineTotalWidth",value:function(e){var t=parseInt(e.getComputedStyle("outline-offset"),10),n=parseInt(e.getComputedStyle("outline-width"),10);return isNaN(t)&&(t=1),t+n}},{key:"isEmpty",value:function(e){var t=e.$.childNodes.length;return 0===t||1===t&&"br"===e.$.childNodes.item(0).localName}},{key:"setPositionFor",value:function(t,n){var o=t.getClientRect(),r=e.outlineTotalWidth(t),a=e.isEmpty(t),l=t,u=0;if(n.widgets.getByElement(t))u=o.left;else{a&&(t.appendHtml("<span>&nbsp;</span>"),l=t.findOne("span"));var c=document.createRange();c.selectNodeContents(l.$),u=c.getBoundingClientRect().left,a&&l.remove()}var s=this.getWidgetXYPoint(o.left-r,o.top+t.getWindow().getScrollPosition().y-r,CKEDITOR.SELECTION_BOTTOM_TO_TOP),f=new CKEDITOR.dom.element(i.default.findDOMNode(this));return f.addClass("ae-toolbar-transition"),f.setStyles({left:u-r+"px",top:s[1]+"px"}),!0}}]),e}();t.default=l},62:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(17),u=function(e){return e&&e.__esModule?e:{default:e}}(l),c=function(e){function t(){o(this,t);var e=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.name="paragraph",e.buttons=["ezmoveup","ezmovedown",e.getStyles(),"ezblocktextalignleft","ezblocktextaligncenter","ezblocktextalignright","ezblocktextalignjustify","ezblockremove"],e}return a(t,e),i(t,[{key:"test",value:function(e){var t=e.editor.get("nativeEditor"),n=t.elementPath();return t.isSelectionEmpty()&&n.contains("p")}}]),t}(u.default);t.default=c}}).default});
//# sourceMappingURL=ezParagraphConfig.js.map