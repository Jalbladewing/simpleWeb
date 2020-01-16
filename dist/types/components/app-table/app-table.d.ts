import '../../stencil.core';
import { SocketIoService } from './app-io';
import 'stencil-apexcharts';
export declare class AppTable {
    /**
     * socket io instance
     */
    _socketService: SocketIoService;
    list: any[];
    attributeList: string[];
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
    updateAttributeList(): void;
    writeRows(entityAttributes: any, attribute: any): JSX.Element;
    render(): JSX.Element;
}
