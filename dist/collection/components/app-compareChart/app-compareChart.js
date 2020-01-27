import { SocketIoService } from './app-io';
export class AppCompareChart {
    constructor() {
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
        this._socketService = SocketIoService.getInstance(this.service_url);
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
        this.maxData = 0.0;
        this.list.map((entity) => {
            entity.values.map((entityValue) => {
                if (entityValue.name == this.attributeSelected) {
                    if (entity.name == this.entity_to_compare)
                        this.roomData = entityValue.value;
                    if (parseFloat(this.maxData) < parseFloat(entityValue.value)) {
                        this.maxData = entityValue.value;
                    }
                }
            });
        });
    }
    updateAttributeList() {
        if (this.list.length > 0) {
            this.attributeList = [];
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].name == this.entity_to_compare) {
                    for (var j = 0; j < this.list[i].values.length; j++) {
                        if (j == 0)
                            this.attributeSelected = this.list[i].values[j].name;
                        this.attributeList.push(this.list[i].values[j].name);
                    }
                    break;
                }
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
        switch (event.detail.split(":")[0]) {
            case "attributeCombo":
                this.auxAttributeSelected = event.detail.split(":")[1];
                return;
        }
    }
    render() {
        return (h("div", { class: "wrapContent" },
            h("div", { id: "myModal", class: "modal", ref: el => this.modalDialog = el },
                h("div", { class: "modal-content" },
                    h("div", { class: "modal-header" },
                        h("span", { class: "close", onClick: this.closeModal }, "\u00D7"),
                        h("h2", null, "Radial Chart Attribute Selection")),
                    h("div", { class: "modal-body" },
                        h("app-comboBox", { combodata: this.attributeList, comboid: "attributeCombo" }),
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
    static get style() { return "/**style-placeholder:app-compareChart:**/"; }
}
