App.loadBundle("siuzgd0l",["exports"],function(e){var t=window.App.h,n=function(){function e(){this.htmlRender=this.page_url,this.typelist=[]}return e.prototype.handleSubmit=function(e){e.preventDefault(),null==this.filter&&(this.filter="");var t=this.page_url.split('type="'),n=t[1].substring(t[1].indexOf('"')+1,t[1].length);this.htmlRender=t[0]+'type="'+this.selectedType+'"'+n;var l=this.htmlRender.split('filter="'),r=l[1].substring(l[1].indexOf('"')+1,l[1].length);this.htmlRender=l[0]+'filter="'+this.filter+'"'+r},e.prototype.handleChange=function(e){this.filter=e.target.value},e.prototype.componentWillLoad=function(){var e=this;this.htmlRender=this.page_url,fetch("http://"+this.service_url+":3000/typeList").then(function(e){return e.json()}).then(function(t){e.typelist=t})},e.prototype.entitySelected=function(e){this.selectedType=e.detail},e.prototype.render=function(){var e=this;return t("div",null,t("form",{class:"filterHeader",onSubmit:function(t){return e.handleSubmit(t)}},t("table",null,t("tr",null,t("th",null,t("div",null,t("h2",{class:"inputLabel"},"Entity Types"),t("table",null,t("tr",null,t("th",null,t("app-comboBox",{combodata:this.typelist})))))),t("th",null,t("div",null,t("h2",{class:"inputLabel"},"Filter"),t("table",null,t("tr",null,t("th",null,t("input",{class:"input",type:"text",value:this.filter,placeholder:"location==Almeria;temperature<25...",onInput:function(t){return e.handleChange(t)}})),t("th",null,t("input",{class:"button -blue center",type:"submit",value:"Submit"}))))))))),t("h1",{innerHTML:this.htmlRender}))},Object.defineProperty(e,"is",{get:function(){return"app-writeComponent"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{filter:{state:!0},htmlRender:{state:!0},page_url:{type:String,attr:"page_url"},selectedType:{state:!0},service_url:{type:String,attr:"service_url"},typelist:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"entitySelected",method:"entitySelected"}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".filterHeader.sc-app-writeComponent{background:rgba(67,93,125,.95);color:#fff;border-radius:6px;padding:0 30px 16px;margin:25px;border:3px solid #435d7d}.input.sc-app-writeComponent{background-image:url(searchicon.png);background-position:14px 12px;background-repeat:no-repeat;font-size:16px;padding:10px 20px 10px 15px;width:300px!important;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid #d0d0d0;border-radius:4px}.inputLabel.sc-app-writeComponent{text-align:left}.button.sc-app-writeComponent{display:-ms-flexbox;display:flex;overflow:hidden;padding:12px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-align:center;white-space:nowrap;text-decoration:none!important;text-transform:none;text-transform:capitalize;color:#fff;border:0;border-radius:4px;font-size:13px;font-weight:500;line-height:1.3;-webkit-appearance:none;-moz-appearance:none;appearance:none;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;-ms-flex:0 0 160px;flex:0 0 160px;-webkit-box-shadow:2px 5px 10px var(--color-smoke);box-shadow:2px 5px 10px var(--color-smoke)}.button.sc-app-writeComponent, .button.sc-app-writeComponent:hover{-webkit-transition:all .15s linear;transition:all .15s linear}.button.sc-app-writeComponent:hover{opacity:.85}.button.sc-app-writeComponent:active{-webkit-transition:all .15s linear;transition:all .15s linear;opacity:.75}.button.sc-app-writeComponent:focus{outline:1px dotted #959595;outline-offset:-4px}.button.-blue.sc-app-writeComponent{color:#fff;background:#416dea}"},enumerable:!0,configurable:!0}),e}();e.AppWritecomponent=n,Object.defineProperty(e,"__esModule",{value:!0})});