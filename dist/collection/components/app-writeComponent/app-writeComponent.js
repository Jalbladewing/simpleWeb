export class AppWriteComponent {
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
    static get style() { return "/**style-placeholder:app-writeComponent:**/"; }
}
