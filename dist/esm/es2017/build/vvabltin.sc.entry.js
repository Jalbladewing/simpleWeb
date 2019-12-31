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
    static getInstance(path = "dist/collection/assets/lib/socket.io.js") {
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

class AppRealChart {
    constructor() {
        this._socketService = SocketIoService.getInstance();
        this._socketService;
        this.list = [];
        this.listo = [];
        this.lista = [];
    }
    componentWillLoad() {
        fetch('http://' + this.service_url + ':3000/subscription?entity=' + this.type + '&id=' + this.entityid)
            .then((response) => response.json())
            .then(response => {
            this.list = JSON.parse(JSON.stringify(response)).entities;
            this.list[0].values.map((entityValue) => {
                console.log(entityValue.name);
                console.log(entityValue.value);
                if (entityValue.name == this.data_to_compare) {
                    this.listo.push(parseInt(entityValue.value));
                    console.log(this.listo);
                    this.lista.push(new Date().getTime());
                }
            });
        });
    }
    componentDidLoad() {
        this._socketService.onSocketReady(() => {
            this._socketService.onSocket(this.type + "-" + this.entityid, (msg) => {
                this.list = JSON.parse(JSON.stringify(msg)).entities;
                this.list[0].values.map((entityValue) => {
                    if (entityValue.name == this.data_to_compare) {
                        this.listo.push(entityValue.value);
                        this.lista.push(new Date().getTime());
                    }
                });
            });
        });
    }
    render() {
        return (h("div", null,
            h("apex-chart", { type: "line", width: "100%", height: "300px", series: [{
                        name: this.data_to_compare,
                        data: this.listo
                    }], options: {
                    xaxis: {
                        categories: this.lista,
                        type: "datetime",
                        range: 3000,
                        labels: {
                            datetimeFormatter: {
                                year: 'yyyy',
                                month: 'MMM \'yy',
                                day: 'dd MMM',
                                hour: 'HH:mm'
                            }
                        }
                    },
                    chart: {
                        animations: {
                            enabled: true,
                            easing: 'linear',
                            dynamicAnimation: {
                                enabled: true,
                                speed: 500
                            },
                            zoom: {
                                enabled: false
                            }
                        },
                        toolbar: {
                            show: false
                        }
                    },
                    stroke: {
                        curve: 'smooth'
                    }
                } })));
    }
    static get is() { return "app-realChart"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "data_to_compare": {
            "type": String,
            "attr": "data_to_compare"
        },
        "entityid": {
            "type": String,
            "attr": "entityid"
        },
        "list": {
            "state": true
        },
        "lista": {
            "state": true
        },
        "listo": {
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
    static get style() { return ""; }
}

export { AppRealChart as AppRealchart };
