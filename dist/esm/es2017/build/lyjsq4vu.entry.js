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

class AppCompareChart {
    constructor() {
        this._socketService = SocketIoService.getInstance();
        this._socketService;
        this.list = [];
        this.roomData = 0;
        this.maxData = 0;
    }
    componentWillLoad() {
        fetch('http://' + this.service_url + ':3000/subscription?entity=' + this.type + '&id=' + this.entityid)
            .then((response) => response.json())
            .then(response => {
            this.list = JSON.parse(JSON.stringify(response)).entities;
            this.updateGraphValues();
        });
    }
    componentDidLoad() {
        this._socketService.onSocketReady(() => {
            this._socketService.onSocket(this.type + "-" + this.entityid, (msg) => {
                this.list = JSON.parse(JSON.stringify(msg)).entities;
                this.updateGraphValues();
            });
        });
    }
    updateGraphValues() {
        this.maxData = 0;
        this.list.map((entity) => {
            entity.values.map((entityValue) => {
                if (entityValue.name == this.data_to_compare) {
                    if (entity.name == this.entity_to_compare)
                        this.roomData = entityValue.value;
                    if (this.maxData < entityValue.value)
                        this.maxData = entityValue.value;
                }
            });
        });
    }
    valueToPercent(value) {
        return (value * 100) / this.maxData;
    }
    render() {
        return (h("div", null,
            h("apex-chart", { type: "radialBar", width: "600px", options: {
                    plotOptions: {
                        radialBar: {
                            startAngle: -135,
                            endAngle: 225,
                            hollow: {
                                margin: 0,
                                size: '70%',
                                background: '#fff',
                                image: undefined,
                                imageOffsetX: 0,
                                imageOffsetY: 0,
                                position: 'front',
                                dropShadow: {
                                    enabled: true,
                                    top: 3,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.24
                                }
                            },
                            track: {
                                background: '#fff',
                                strokeWidth: '67%',
                                margin: 0,
                                dropShadow: {
                                    enabled: true,
                                    top: -3,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.35
                                }
                            },
                            dataLabels: {
                                showOn: 'always',
                                name: {
                                    offsetY: -10,
                                    show: true,
                                    color: '#888',
                                    fontSize: '17px'
                                },
                                value: {
                                    formatter: function (val) {
                                        return parseInt(val);
                                    },
                                    color: '#111',
                                    fontSize: '36px',
                                    show: true,
                                }
                            }
                        }
                    },
                    series: [this.valueToPercent(this.roomData)],
                    labels: ['Percent of ' + this.data_to_compare],
                    stroke: {
                        lineCap: 'round'
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shade: 'dark',
                            type: 'horizontal',
                            shadeIntensity: 0.5,
                            gradientToColors: ['#ABE5A1'],
                            inverseColors: true,
                            opacityFrom: 1,
                            opacityTo: 1,
                            stops: [0, 100]
                        }
                    },
                } })));
    }
    static get is() { return "app-compareChart"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "data_to_compare": {
            "type": String,
            "attr": "data_to_compare"
        },
        "entity_to_compare": {
            "type": String,
            "attr": "entity_to_compare"
        },
        "entityid": {
            "type": String,
            "attr": "entityid"
        },
        "list": {
            "state": true
        },
        "maxData": {
            "state": true
        },
        "roomData": {
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

export { AppCompareChart as AppComparechart };
