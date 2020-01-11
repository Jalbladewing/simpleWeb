import { h } from '../app.core.js';

class AppWriteComponent {
    constructor() {
        this.htmlRender = this.page_url;
        this.typelist = [];
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.filter == undefined)
            this.filter = "";
        var renderType = this.page_url.split('type="');
        var afterType = renderType[1].substring(renderType[1].indexOf('"') + 1, renderType[1].length);
        this.htmlRender = renderType[0] + 'type="' + this.selectedType + '"' + afterType;
        var renderFilter = this.htmlRender.split('filter="');
        var afterFilter = renderFilter[1].substring(renderFilter[1].indexOf('"') + 1, renderFilter[1].length);
        this.htmlRender = renderFilter[0] + 'filter="' + this.filter + '"' + afterFilter;
    }
    handleChange(event) {
        this.filter = event.target.value;
    }
    componentWillLoad() {
        this.htmlRender = this.page_url;
        fetch('http://' + this.service_url + ':3000/typeList')
            .then((response) => response.json())
            .then(response => {
            this.typelist = response;
        });
    }
    entitySelected(event) {
        this.selectedType = event.detail;
    }
    render() {
        return (h("div", null,
            h("form", { class: "filterHeader", onSubmit: (e) => this.handleSubmit(e) },
                h("table", null,
                    h("tr", null,
                        h("th", null,
                            h("div", null,
                                h("h2", { class: "inputLabel" }, "Entity Types"),
                                h("table", null,
                                    h("tr", null,
                                        h("th", null,
                                            h("app-comboBox", { combodata: this.typelist })))))),
                        h("th", null,
                            h("div", null,
                                h("h2", { class: "inputLabel" }, "Filter"),
                                h("table", null,
                                    h("tr", null,
                                        h("th", null,
                                            h("input", { class: "input", type: "text", value: this.filter, placeholder: "location==Almeria;temperature<25...", onInput: (event) => this.handleChange(event) })),
                                        h("th", null,
                                            h("input", { class: 'button -blue center', type: "submit", value: "Submit" }))))))))),
            h("h1", { innerHTML: this.htmlRender })));
    }
    static get is() { return "app-writeComponent"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "filter": {
            "state": true
        },
        "htmlRender": {
            "state": true
        },
        "page_url": {
            "type": String,
            "attr": "page_url"
        },
        "selectedType": {
            "state": true
        },
        "service_url": {
            "type": String,
            "attr": "service_url"
        },
        "typelist": {
            "state": true
        }
    }; }
    static get listeners() { return [{
            "name": "entitySelected",
            "method": "entitySelected"
        }]; }
    static get style() { return ".filterHeader.sc-app-writeComponent{background:rgba(67,93,125,.95);color:#fff;border-radius:6px;padding:0 30px 16px;margin:25px;border:3px solid #435d7d}.input.sc-app-writeComponent{background-image:url(searchicon.png);background-position:14px 12px;background-repeat:no-repeat;font-size:16px;padding:10px 20px 10px 15px;width:300px!important;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid #d0d0d0;border-radius:4px}.inputLabel.sc-app-writeComponent{text-align:left}.button.sc-app-writeComponent{display:-ms-flexbox;display:flex;overflow:hidden;padding:12px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-align:center;white-space:nowrap;text-decoration:none!important;text-transform:none;text-transform:capitalize;color:#fff;border:0;border-radius:4px;font-size:13px;font-weight:500;line-height:1.3;-webkit-appearance:none;-moz-appearance:none;appearance:none;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;-ms-flex:0 0 160px;flex:0 0 160px;-webkit-box-shadow:2px 5px 10px var(--color-smoke);box-shadow:2px 5px 10px var(--color-smoke)}.button.sc-app-writeComponent, .button.sc-app-writeComponent:hover{-webkit-transition:all .15s linear;transition:all .15s linear}.button.sc-app-writeComponent:hover{opacity:.85}.button.sc-app-writeComponent:active{-webkit-transition:all .15s linear;transition:all .15s linear;opacity:.75}.button.sc-app-writeComponent:focus{outline:1px dotted #959595;outline-offset:-4px}.button.-blue.sc-app-writeComponent{color:#fff;background:#416dea}"; }
}

export { AppWriteComponent as AppWritecomponent };
