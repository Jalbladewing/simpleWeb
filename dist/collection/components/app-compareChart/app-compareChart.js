import { SocketIoService } from './app-io';
export class AppCompareChart {
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
    static get style() { return "/**style-placeholder:app-compareChart:**/"; }
}
