import { h } from '../app.core.js';

class AppWriteComponent {
    constructor() {
        this.htmlRender = this.page_url;
        this.typelist = [];
        this.attributeList = [];
        this.operationList = ["==", "!=", "<", ">", "<=", ">="];
        this.attributeHasSelected = "";
        this.attributeSelected = "";
        this.operationSelected = "";
    }
    handleSubmit(e) {
        e.preventDefault();
        var selected = this.selectedType;
        if (this.selectedType == "All")
            selected = "";
        if (this.filter == undefined)
            this.filter = "";
        var fullFilter = this.attributeHasSelected + ";" + this.attributeSelected + this.operationSelected + this.filter;
        if (fullFilter == ";")
            fullFilter = "";
        var renderType = this.page_url.split('type="');
        var afterType = renderType[1].substring(renderType[1].indexOf('"') + 1, renderType[1].length);
        this.htmlRender = renderType[0] + 'type="' + selected + '"' + afterType;
        var renderFilter = this.htmlRender.split('filter="');
        var afterFilter = renderFilter[1].substring(renderFilter[1].indexOf('"') + 1, renderFilter[1].length);
        this.htmlRender = renderFilter[0] + 'filter="' + fullFilter + '"' + afterFilter;
    }
    handleChange(event) {
        this.filter = event.target.value;
    }
    componentWillLoad() {
        this.htmlRender = this.page_url;
        fetch('http://' + this.service_url + ':3000/typeList')
            .then((response) => response.json())
            .then(response => {
            this.typelist = [];
            this.typelist.push("All");
            response.forEach(element => {
                this.typelist.push(element);
            });
            if (this.typelist.length > 0) {
                this.selectedType = this.typelist[0];
                var selected = this.selectedType;
                if (this.selectedType == "All")
                    selected = "";
                var renderType = this.page_url.split('type="');
                var afterType = renderType[1].substring(renderType[1].indexOf('"') + 1, renderType[1].length);
                this.htmlRender = renderType[0] + 'type="' + selected + '"' + afterType;
                this.updateAttributeList();
            }
        });
    }
    updateAttributeList() {
        var selected = this.selectedType;
        if (this.selectedType == "All")
            selected = "";
        fetch('http://' + this.service_url + ':3000/attributeList?type=' + selected)
            .then((response) => response.json())
            .then(response => {
            this.attributeList = response;
        });
    }
    clearFields() {
        this.attributeHasSelected = "";
        this.attributeSelected = "";
        this.operationSelected = "";
        this.filter = "";
    }
    entitySelected(event) {
        switch (event.detail.split(":")[0]) {
            case "typeCombo":
                this.selectedType = event.detail.split(":")[1];
                this.updateAttributeList();
                this.clearFields();
                return;
            case "attributeHasCombo":
                this.attributeHasSelected = event.detail.split(":")[1];
                return;
            case "attributeCombo":
                this.attributeSelected = event.detail.split(":")[1];
                return;
            case "operationCombo":
                this.operationSelected = event.detail.split(":")[1];
                return;
        }
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
                                            h("app-comboBox", { combodata: this.typelist, comboid: "typeCombo", selectedData: this.selectedType })))))),
                        this.selectedType == "All" ? h("th", null,
                            h("div", null,
                                h("h2", { class: "inputLabel" }, "Has Attribute"),
                                h("table", null,
                                    h("tr", null,
                                        h("th", null,
                                            h("app-comboBox", { combodata: this.attributeList, comboid: "attributeHasCombo", componentWidth: "200", selectedData: this.attributeHasSelected })))))) : h("th", null),
                        h("th", null,
                            h("div", null,
                                h("h2", { class: "inputLabel" }, "Filter"),
                                h("table", null,
                                    h("tr", null,
                                        h("th", null,
                                            h("app-comboBox", { combodata: this.attributeList, comboid: "attributeCombo", componentWidth: "200", selectedData: this.attributeSelected })),
                                        h("th", null,
                                            h("app-comboBox", { combodata: this.operationList, comboid: "operationCombo", componentWidth: "70", selectedData: this.operationSelected })),
                                        h("th", null,
                                            h("input", { class: "input", type: "text", value: this.filter, onInput: (event) => this.handleChange(event) })),
                                        h("th", null,
                                            h("input", { class: 'button -blue center', type: "submit", value: "Submit" })),
                                        h("th", null,
                                            h("input", { class: 'button -orange center', type: "button", value: "Clear", onClick: this.clearFields.bind(this) }))))))))),
            h("h1", { innerHTML: this.htmlRender })));
    }
    static get is() { return "app-writeComponent"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "attributeHasSelected": {
            "state": true
        },
        "attributeList": {
            "state": true
        },
        "attributeSelected": {
            "state": true
        },
        "filter": {
            "state": true
        },
        "htmlRender": {
            "state": true
        },
        "operationList": {
            "state": true
        },
        "operationSelected": {
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
    static get style() { return ".filterHeader.sc-app-writeComponent{background:rgba(67,93,125,.95);color:#fff;border-radius:6px;padding:0 30px 16px;margin:25px;border:3px solid #435d7d}.input.sc-app-writeComponent{background-image:url(searchicon.png);background-position:14px 12px;background-repeat:no-repeat;font-size:16px;padding:10px 20px 10px 15px;width:200px!important;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid #d0d0d0;border-radius:4px}.inputLabel.sc-app-writeComponent{text-align:left}.button.sc-app-writeComponent{display:-ms-flexbox;display:flex;overflow:hidden;padding:12px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-align:center;white-space:nowrap;text-decoration:none!important;text-transform:none;text-transform:capitalize;color:#fff;border:0;border-radius:4px;font-size:13px;font-weight:500;line-height:1.3;-webkit-appearance:none;-moz-appearance:none;appearance:none;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;-ms-flex:0 0 160px;flex:0 0 160px;-webkit-box-shadow:2px 5px 10px var(--color-smoke);box-shadow:2px 5px 10px var(--color-smoke)}.button.sc-app-writeComponent, .button.sc-app-writeComponent:hover{-webkit-transition:all .15s linear;transition:all .15s linear}.button.sc-app-writeComponent:hover{opacity:.85}.button.sc-app-writeComponent:active{-webkit-transition:all .15s linear;transition:all .15s linear;opacity:.75}.button.sc-app-writeComponent:focus{outline:1px dotted #959595;outline-offset:-4px}.button.-blue.sc-app-writeComponent{color:#fff;background:#416dea}.button.-orange.sc-app-writeComponent{color:#fff;background:#ce5f29}"; }
}

export { AppWriteComponent as AppWritecomponent };
