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
        this.attributeList = [];
        this.attributeSelected = "";
        this.auxAttributeSelected = "";
        this.filter = "";
        this.roomData = 0;
        this.maxData = 0;
        this.modalButtonClick = this.modalButtonClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitNewAttribute = this.submitNewAttribute.bind(this);
    }
    componentWillLoad() {
        fetch('http://' + this.service_url + ':3000/subscription?entity=' + this.type + '&id=' + this.entityid + '&queryFilter=' + this.filter)
            .then((response) => response.json())
            .then(response => {
            this.list = JSON.parse(JSON.stringify(response)).entities;
            this.updateAttributeList();
            this.updateGraphValues();
        });
    }
    componentDidLoad() {
        this._socketService.onSocketReady(() => {
            this._socketService.onSocket(this.type + "-" + this.entityid + "-" + this.filter, (msg) => {
                this.list = JSON.parse(JSON.stringify(msg)).entities;
                this.updateGraphValues();
            });
        });
    }
    updateGraphValues() {
        this.maxData = 0;
        this.list.map((entity) => {
            entity.values.map((entityValue) => {
                if (entityValue.name == this.attributeSelected) {
                    if (entity.name == this.entity_to_compare)
                        this.roomData = entityValue.value;
                    if (this.maxData < entityValue.value)
                        this.maxData = entityValue.value;
                }
            });
        });
    }
    updateAttributeList() {
        if (this.list.length > 0) {
            this.attributeList = [];
            for (var i = 0; i < this.list[0].values.length; i++) {
                if (i == 0)
                    this.attributeSelected = this.list[0].values[i].name;
                this.attributeList.push(this.list[0].values[i].name);
            }
        }
    }
    valueToPercent(value) {
        return (value * 100) / this.maxData;
    }
    modalButtonClick() {
        this.modalDialog.style.display = "block";
    }
    closeModal() {
        this.modalDialog.style.display = "none";
    }
    submitNewAttribute() {
        this.attributeSelected = this.auxAttributeSelected;
        this.closeModal();
        this.updateGraphValues();
    }
    entitySelected(event) {
        this.auxAttributeSelected = event.detail;
    }
    render() {
        return (h("div", { class: "wrapContent" },
            h("div", { id: "myModal", class: "modal", ref: el => this.modalDialog = el },
                h("div", { class: "modal-content" },
                    h("div", { class: "modal-header" },
                        h("span", { class: "close", onClick: this.closeModal }, "\u00D7"),
                        h("h2", null, "Radial Chart Attribute Selection")),
                    h("div", { class: "modal-body" },
                        h("app-comboBox", { combodata: this.attributeList }),
                        h("input", { class: 'button -blue center', type: "submit", value: "Submit", onClick: this.submitNewAttribute })))),
            h("button", { class: 'button -blue center editBtn', onClick: this.modalButtonClick }, "Edit"),
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
                    labels: ['Percent of ' + this.attributeSelected],
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
        "attributeList": {
            "state": true
        },
        "attributeSelected": {
            "state": true
        },
        "auxAttributeSelected": {
            "state": true
        },
        "entity_to_compare": {
            "type": String,
            "attr": "entity_to_compare"
        },
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
    static get listeners() { return [{
            "name": "entitySelected",
            "method": "entitySelected"
        }]; }
    static get style() { return ".wrapContent{position:relative;width:600px}.editBtn{position:absolute;top:0;right:0;z-index:1;width:auto!important}.button{margin-top:20px;width:100px;overflow:hidden;padding:12px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-align:center;white-space:nowrap;text-decoration:none!important;text-transform:none;text-transform:capitalize;color:#fff;border:0;border-radius:4px;font-size:13px;font-weight:500;line-height:1.3;-webkit-appearance:none;-moz-appearance:none;appearance:none;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;-ms-flex:0 0 160px;flex:0 0 160px;-webkit-box-shadow:2px 5px 10px var(--color-smoke);box-shadow:2px 5px 10px var(--color-smoke)}.button,.button:hover{-webkit-transition:all .15s linear;transition:all .15s linear}.button:hover{opacity:.85}.button:active{-webkit-transition:all .15s linear;transition:all .15s linear;opacity:.75}.button:focus{outline:1px dotted #959595;outline-offset:-4px}.button.-blue{color:#fff;background:#416dea}.modal{display:none;position:fixed;z-index:6;padding-top:100px;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.4)}.modal-content{position:relative;background-color:#fefefe;margin:auto;padding:0;border:1px solid #888;width:20%;-webkit-box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);-webkit-animation-name:animatetop;-webkit-animation-duration:.4s;animation-name:animatetop;animation-duration:.4s}\@-webkit-keyframes animatetop{0%{top:-300px;opacity:0}to{top:0;opacity:1}}\@keyframes animatetop{0%{top:-300px;opacity:0}to{top:0;opacity:1}}.close{color:#fff;float:right;font-size:28px;font-weight:700}.close:focus,.close:hover{color:#8e8e8e;text-decoration:none;cursor:pointer}.modal-header{padding:2px 16px;background-color:#000;color:#fff}.modal-body{padding:15px;text-align:center}"; }
}

export { AppCompareChart as AppComparechart };
