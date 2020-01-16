export class AppWriteComponent {
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
    static get style() { return "/**style-placeholder:app-writeComponent:**/"; }
}
