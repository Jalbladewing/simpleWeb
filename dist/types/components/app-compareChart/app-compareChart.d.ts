import '../../stencil.core';
import { SocketIoService } from './app-io';
import 'stencil-apexcharts';
export declare class AppCompareChart {
    /**
     * socket io instance
     */
    _socketService: SocketIoService;
    list: any[];
    attributeList: string[];
    attributeSelected: string;
    auxAttributeSelected: string;
    roomData: any;
    maxData: any;
    type: string;
    entityid: string;
    filter: string;
    service_url: string;
    entity_to_compare: string;
    private modalDialog?;
    constructor();
    componentWillLoad(): void;
    /**
     * inital socket usage
     */
    componentDidLoad(): void;
    updateGraphValues(): void;
    updateAttributeList(): void;
    valueToPercent(value: any): number;
    modalButtonClick(): void;
    closeModal(): void;
    submitNewAttribute(): void;
    entitySelected(event: CustomEvent): void;
    render(): JSX.Element;
}
