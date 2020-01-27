export interface Socket {
    emit: () => void;
    on: () => void;
}
export declare class SocketIoService {
    private static instance;
    static getInstance(url?: string, path?: string): SocketIoService;
    _socket: any;
    _io: any;
    path: string;
    lib: boolean;
    constructor(path: string, url: string);
    /**
     * attach lib to the head of the page
     */
    attachLibrary(url: string): void;
    /**
     * wait for io object presence on window
     */
    ensureIoPresent(): Promise<{}>;
    /**
     * wait for socket
     */
    ensureSocketPresent(): Promise<{}>;
    onSocketReady(callback: () => any): Promise<{}>;
    /**
     * register socket callback
     * @param identifier
     * @param callback
     */
    onSocket(identifier: string, callback: any): void;
    /**
     * emit on socket
     * @param identifier
     * @param callback
     */
    emitSocket(identifier: string, payload: string): void;
    /**
     * get socket
     */
    socket(): any;
}
