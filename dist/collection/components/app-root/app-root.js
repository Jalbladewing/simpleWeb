import { SocketIoService } from './app-io';
export class AppRoot {
    constructor() {
        this._socketService = SocketIoService.getInstance();
        this._socketService;
        this.list = [];
    }
    componentWillLoad() {
        fetch('http://' + this.service_url + ':3000/subscription?entity=' + this.type + '&id=' + this.id)
            .then((response) => response.json())
            .then(response => {
            this.list = JSON.parse(JSON.stringify(response)).entities;
        });
    }
    componentDidLoad() {
        this._socketService.onSocketReady(() => {
            this._socketService.onSocket(this.type + "-" + this.id, (msg) => {
                this.list = JSON.parse(JSON.stringify(msg)).entities;
            });
        });
    }
    render() {
        return (h("div", null,
            h("header", null,
                h("h1", null, "Stencil App Starter")),
            h("main", null,
                h("ul", { class: "list-group" }, this.list.map((entity) => h("li", { class: "list-group-item active" },
                    h("div", { class: "md-v-line" }),
                    h("i", { class: "fas fa-laptop mr-4 pr-3" }),
                    entity.name,
                    " - (",
                    entity.values.map((entityValue) => h("span", null,
                        entityValue.name,
                        ": ",
                        entityValue.value,
                        ", ")),
                    ")"))))));
    }
    static get is() { return "app-root"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "id": {
            "type": String,
            "attr": "id"
        },
        "list": {
            "state": true
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
    static get style() { return "/**style-placeholder:app-root:**/"; }
}
