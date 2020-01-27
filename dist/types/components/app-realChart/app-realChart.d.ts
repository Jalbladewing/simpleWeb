import '../../stencil.core';
import { SocketIoService } from './app-io';
import 'apexcharts';
import 'stencil-apexcharts';
export declare class AppRealChart {
    list: any[];
    attributeList: string[];
    attributeSelected: string;
    auxAttributeSelected: string;
    valueList: any[];
    dateList: any[];
    type: string;
    entityid: string;
    filter: string;
    service_url: string;
    /**
     * socket io instance
     */
    _socketService: SocketIoService;
    private modalDialog?;
    constructor();
    componentWillLoad(): void;
    /**
     * inital socket usage
     */
    componentDidLoad(): void;
    updateGraphValues(): void;
    updateAttributeList(): void;
    modalButtonClick(): void;
    closeModal(): void;
    submitNewAttribute(): void;
    entitySelected(event: CustomEvent): void;
    getAttributeName(): string;
    render(): JSX.Element;
}
