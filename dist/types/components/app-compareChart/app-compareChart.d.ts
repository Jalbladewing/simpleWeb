import '../../stencil.core';
import { SocketIoService } from './app-io';
import 'stencil-apexcharts';
export declare class AppCompareChart {
    /**
     * socket io instance
     */
    _socketService: SocketIoService;
    list: any[];
    roomData: any;
    maxData: any;
    type: string;
    entityid: string;
    service_url: string;
    entity_to_compare: string;
    data_to_compare: string;
    constructor();
    componentWillLoad(): void;
    /**
     * inital socket usage
     */
    componentDidLoad(): void;
    updateGraphValues(): void;
    valueToPercent(value: any): number;
    render(): JSX.Element;
}
