import '../../stencil.core';
import { SocketIoService } from './app-io';
import 'stencil-apexcharts';
export declare class AppTable {
    /**
     * socket io instance
     */
    _socketService: SocketIoService;
    list: any[];
    type: string;
    entityid: string;
    filter: string;
    service_url: string;
    page_url: string;
    constructor();
    componentWillLoad(): void;
    /**
     * inital socket usage
     */
    componentDidLoad(): void;
    render(): JSX.Element;
}
