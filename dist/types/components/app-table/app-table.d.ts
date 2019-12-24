import '../../stencil.core';
import { SocketIoService } from './app-io';
export declare class AppTable {
    /**
     * socket io instance
     */
    _socketService: SocketIoService;
    list: any[];
    type: string;
    id: string;
    service_url: string;
    constructor();
    componentWillLoad(): void;
    /**
     * inital socket usage
     */
    componentDidLoad(): void;
    render(): JSX.Element;
}
