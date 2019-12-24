import { h } from '../app.core.js';

class SocketIoService {
    constructor(path) {
        this.lib = false;
        if (SocketIoService.instance) {
            throw new Error("Error - use SocketIoService.getInstance()");
        }
        this.path = path;
        this.attachLibrary();
    }
    static getInstance(path = "/assets/lib/socket.io.js") {
        SocketIoService.instance = SocketIoService.instance || new SocketIoService(path);
        return SocketIoService.instance;
    }
    attachLibrary() {
        if (!this.lib) {
            const scriptTag = document.createElement('script');
            scriptTag.src = this.path;
            document.querySelector('head').appendChild(scriptTag);
            this.ensureIoPresent().then(function () {
                this._io = window['io'];
                this._socket = this._io('http://localhost:3000');
                this.lib = true;
            }.bind(this));
        }
    }
    ensureIoPresent() {
        const waitForIo = (resolve) => {
            if (window['io'] !== undefined) {
                return resolve();
            }
            setTimeout(waitForIo, 30, resolve);
        };
        return new Promise(function (resolve) {
            waitForIo(resolve);
        }.bind(this));
    }
    ensureSocketPresent() {
        const waitForSocket = (resolve) => {
            if (this._socket !== undefined) {
                return resolve();
            }
            setTimeout(waitForSocket, 30, resolve);
        };
        return new Promise(function (resolve) {
            waitForSocket(resolve);
        }.bind(this));
    }
    onSocketReady(callback) {
        return this.ensureIoPresent().then(function () {
            callback();
        }.bind(this));
    }
    onSocket(identifier, callback) {
        this.ensureSocketPresent().then(function () {
            this._socket.on(identifier, callback);
        }.bind(this));
    }
    emitSocket(identifier, payload) {
        console.log(identifier, payload);
        this.ensureSocketPresent().then(function () {
            this._socket.emit(identifier, payload);
        }.bind(this));
    }
    socket() {
        return this._socket;
    }
}

class AppRoot {
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
    static get style() { return "header.sc-app-root{background:#5851ff;height:56px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);box-shadow:0 2px 5px 0 rgba(0,0,0,.26)}h1.sc-app-root, header.sc-app-root{color:#fff}h1.sc-app-root{font-size:1.4rem;font-weight:500;padding:0 12px}.md-v-line.sc-app-root{position:absolute;border-left:1px solid rgba(0,0,0,.125);height:50px;top:0;left:54px}"; }
}

export { AppRoot };
