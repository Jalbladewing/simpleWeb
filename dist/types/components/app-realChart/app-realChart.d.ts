import '../../stencil.core';
import { SocketIoService } from './app-io';
import 'stencil-apexcharts';
export declare class AppRealChart {
    /**
     * socket io instance
     */
    _socketService: SocketIoService;
    list: any[];
    listo: any[];
    lista: any[];
    type: string;
    entityid: string;
    service_url: string;
    data_to_compare: string;
    constructor();
    componentWillLoad(): void;
    /**
     * inital socket usage
     */
    componentDidLoad(): void;
    render(): JSX.Element;
}
