import { SocketIoService } from './app-io';
import 'apexcharts';
export class AppRealChart {
    constructor() {
        this._socketService = SocketIoService.getInstance();
        this._socketService;
        this.list = [];
        this.attributeList = [];
        this.attributeSelected = "";
        this.auxAttributeSelected = "";
        this.filter = "";
        this.valueList = [];
        this.dateList = [];
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
        if (this.list.length > 0) {
            this.list[0].values.map((entityValue) => {
                if (entityValue.name == this.attributeSelected) {
                    this.valueList.push(entityValue.value);
                    this.dateList.push(new Date().getTime());
                }
            });
        }
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
        this.valueList = [];
        this.dateList = [];
    }
    entitySelected(event) {
        this.auxAttributeSelected = event.detail;
    }
    getAttributeName() {
        return this.attributeSelected.charAt(0).toUpperCase() + this.attributeSelected.substring(1, this.attributeSelected.length);
    }
    render() {
        return (h("div", { class: "wrapContent" },
            h("div", { id: "myModal", class: "modal", ref: el => this.modalDialog = el },
                h("div", { class: "modal-content" },
                    h("div", { class: "modal-header" },
                        h("span", { class: "close", onClick: this.closeModal }, "\u00D7"),
                        h("h2", null, "Linear Chart Attribute Selection")),
                    h("div", { class: "modal-body" },
                        h("app-comboBox", { combodata: this.attributeList }),
                        h("input", { class: 'button -blue center', type: "submit", value: "Submit", onClick: this.submitNewAttribute })))),
            h("h1", null, this.getAttributeName()),
            h("button", { class: 'button -blue center editBtn', onClick: this.modalButtonClick }, "Edit"),
            h("apex-chart", { type: "line", width: "100%", height: "300px", series: [{
                        name: this.attributeSelected,
                        data: this.valueList
                    }], options: {
                    xaxis: {
                        categories: this.dateList,
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
        "attributeList": {
            "state": true
        },
        "attributeSelected": {
            "state": true
        },
        "auxAttributeSelected": {
            "state": true
        },
        "dateList": {
            "state": true
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
        "service_url": {
            "type": String,
            "attr": "service_url"
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "valueList": {
            "state": true
        }
    }; }
    static get listeners() { return [{
            "name": "entitySelected",
            "method": "entitySelected"
        }]; }
    static get style() { return "/**style-placeholder:app-realChart:**/"; }
}
