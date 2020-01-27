import '../../stencil.core';
import { SocketIoService } from './app-io';
import 'stencil-apexcharts';
export declare class AppTable {
    list: any[];
    attributeList: string[];
    type: string;
    entityid: string;
    filter: string;
    service_url: string;
    page_url: string;
    /**
   * socket io instance
   */
    _socketService: SocketIoService;
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
