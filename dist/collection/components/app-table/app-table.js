import { SocketIoService } from './app-io';
export class AppTable {
    constructor() {
        this._socketService = SocketIoService.getInstance();
        this._socketService;
        this.list = [];
        this.filter = "";
    }
    componentWillLoad() {
        fetch('http://' + this.service_url + ':3000/subscription?entity=' + this.type + '&id=' + this.entityid + '&queryFilter=' + this.filter)
            .then((response) => response.json())
            .then(response => {
            this.list = JSON.parse(JSON.stringify(response)).entities;
        });
    }
    componentDidLoad() {
        this._socketService.onSocketReady(() => {
            this._socketService.onSocket(this.type + "-" + this.entityid + "-" + this.filter, (msg) => {
                this.list = JSON.parse(JSON.stringify(msg)).entities;
            });
        });
    }
    render() {
        return (h("div", { class: "container body" },
            h("div", { class: "table-wrapper" },
                h("div", { class: "table-title" },
                    h("div", { class: "row" },
                        h("div", { class: "col-sm-6" },
                            h("h2", null,
                                h("b", null, this.type),
                                " Devices")))),
                h("table", { class: "table table-striped table-hover" },
                    h("thead", null,
                        h("tr", null,
                            h("th", null,
                                h("span", { class: "custom-checkbox" },
                                    h("input", { type: "checkbox", id: "selectAll" }),
                                    h("label", { htmlFor: "selectAll" }))),
                            h("th", null, "Name"),
                            this.list.length > 0 ? this.list[0].values.map((entityValue) => h("th", null, entityValue.name)) : h("th", null, "No items found"))),
                    h("tbody", null, this.list.map((entity) => h("tr", null,
                        h("td", null,
                            h("span", { class: "custom-checkbox" },
                                h("input", { type: "checkbox", id: "checkbox2", name: "options[]", value: "1" }),
                                h("label", { htmlFor: "checkbox2" }))),
                        h("td", null, entity.name),
                        entity.values.map((entityValue) => h("td", null, entityValue.value)),
                        this.entityid == "" ? h("td", { class: "button-td" },
                            h("a", { href: this.page_url + "?type=" + this.type + "&id=" + entity.name, class: " next round" }, "\u203A")) : h("td", { class: "no-display" }))))),
                h("div", { class: "clearfix" },
                    h("div", { class: "hint-text" },
                        "Showing ",
                        h("b", null, this.list.length),
                        " out of ",
                        h("b", null, this.list.length),
                        " entries"),
                    h("ul", { class: "pagination" },
                        h("li", { class: "page-item disabled" },
                            h("a", { href: "#" }, "Previous")),
                        h("li", { class: "page-item active" },
                            h("a", { href: "#", class: "page-link" }, "1")),
                        h("li", { class: "page-item" },
                            h("a", { href: "#", class: "page-link" }, "Next")))))));
    }
    static get is() { return "app-table"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "entityid": {
            "type": String,
            "attr": "entityid"
        },
        "filter": {
            "type": String,
            "attr": "filter"
        },
        "list": {
            "state": true
        },
        "page_url": {
            "type": String,
            "attr": "page_url"
        },
        "service_url": {
            "type": String,
            "attr": "service_url"
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get style() { return "/**style-placeholder:app-table:**/"; }
}
