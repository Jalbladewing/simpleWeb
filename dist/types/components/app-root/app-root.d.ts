import '../../stencil.core';
import { SocketIoService } from './app-io';
export declare class AppRoot {
    list: any[];
    type: string;
    id: string;
    service_url: string;
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
    render(): JSX.Element;
}
