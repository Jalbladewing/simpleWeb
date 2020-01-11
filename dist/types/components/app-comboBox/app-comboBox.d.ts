import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class AppComboBox {
    combodata: string[];
    selectedData: string;
    private dropDown?;
    private dropDownSearch?;
    constructor();
    dropDownClick(): void;
    filterFunction(): void;
    clickElement(event: any): void;
    entitySelected: EventEmitter;
    render(): JSX.Element;
}
