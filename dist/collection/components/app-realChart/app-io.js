export class SocketIoService {
    constructor(path) {
        this.lib = false;
        if (SocketIoService.instance) {
            throw new Error("Error - use SocketIoService.getInstance()");
        }
        this.path = path;
        this.attachLibrary();
    }
    static getInstance(path = "dist/collection/assets/lib/socket.io.js") {
        SocketIoService.instance = SocketIoService.instance || new SocketIoService(path);
        return SocketIoService.instance;
    }
    attachLibrary() {
        if (!this.lib) {
            const scriptTag = document.createElement('script');
            scriptTag.src = this.path;
            document.querySelector('head').appendChild(scriptTag);
            this.ensureIoPresent().then(function () {
                this._io = window['io'];
                this._socket = this._io('http://localhost:3000');
                this.lib = true;
            }.bind(this));
        }
    }
    ensureIoPresent() {
        const waitForIo = (resolve) => {
            if (window['io'] !== undefined) {
                return resolve();
            }
            setTimeout(waitForIo, 30, resolve);
        };
        return new Promise(function (resolve) {
            waitForIo(resolve);
        }.bind(this));
    }
    ensureSocketPresent() {
        const waitForSocket = (resolve) => {
            if (this._socket !== undefined) {
                return resolve();
            }
            setTimeout(waitForSocket, 30, resolve);
        };
        return new Promise(function (resolve) {
            waitForSocket(resolve);
        }.bind(this));
    }
    onSocketReady(callback) {
        return this.ensureIoPresent().then(function () {
            callback();
        }.bind(this));
    }
    onSocket(identifier, callback) {
        this.ensureSocketPresent().then(function () {
            this._socket.on(identifier, callback);
        }.bind(this));
    }
    emitSocket(identifier, payload) {
        console.log(identifier, payload);
        this.ensureSocketPresent().then(function () {
            this._socket.emit(identifier, payload);
        }.bind(this));
    }
    socket() {
        return this._socket;
    }
}
