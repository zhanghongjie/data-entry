﻿var toolBar={};var ToolBar=function(a){toolBar=this;this.panelBarId=a.panelBarId||"panelBarDiv";this.items=a.items||[];this.onBulid=a.onBulid;this.init()};ToolBar.prototype={init:function(){if(this.items.length>0){this._bulidHtml()}this._panelBar()},_bulidHtml:function(){var a=$("#"+this.panelBarId);if(!($.browser.msie&&$.browser.version=="6.0")){a.css({position:"fixed",top:0,left:0,"z-index":9999,width:"100%"});if($("#_fill_div_").length<1){a.after("<div id='_fill_div_' style='height:24px;'></div>")}}var c=[];c.push("<ul>");for(var b=0;b<this.items.length;b++){if(this.items[b]!==null&&typeof(this.items[b].id)!="undefined"){c.push(this._itemHtml(this.items[b],b,true))}}c.push("</ul>");c.push("<div class=clear_float></div>");a.html(c.join(""));if($.isFunction(this.onBulid)){this.onBulid()}},_itemHtml:function(a,e,b){var c=a.enable===false?false:true;var d=[];if(c){d.push("<li><a id=");d.push(a.id);d.push(" onclick="+a.func+" class=");d.push(a.className);d.push(" ><span>");d.push(a.text+"</span></a>")}else{d.push("<li enable=false><span style='cursor:default;padding-left:20px;padding-right:5px;color:#778899;'>");d.push(a.text+"</span>")}d.push("</li>");return d.join("")},_panelBar:function(){$("#"+this.panelBarId).find("ul>li[enable != 'false' ]").hoverClass("hover")},addBut:function(a,b){if(Number(b)==="NaN"||b>=this.items.length||b<0){this.items.push(a)}else{this.items.splice(b,0,a)}this.init()},enableBut:function(a){var b;if($.isArray(a)){for(var c=0;c<a.length;c++){b=this.getButConf(a[c]);if(b){b.enable=true}}}else{b=this.getButConf(a);if(b){b.enable=true}}this.init()},disableBut:function(a){var b;if($.isArray(a)){for(var c=0;c<a.length;c++){b=this.getButConf(a[c]);if(b){b.enable=false}}}else{b=this.getButConf(a);if(b){b.enable=false}}this.init()},setButAction:function(c,b){var a=this.getButConf(c);if(a===null){return}a.func=b;this.init()},removeBut:function(b){for(var a=0;a<this.items.length;a++){if(this.items[a].id==b){this.items.splice(a,1);return}}},getButConf:function(b){for(var a=0;a<this.items.length;a++){if(this.items[a].id==b){return this.items[a]}}return null}};