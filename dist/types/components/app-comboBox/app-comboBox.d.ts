import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class AppComboBox {
    combodata: string[];
    comboid: string;
    componentWidth: string;
    selectedData: string;
    private dropDownParent?;
    private dropDown?;
    private dropDownSearch?;
    constructor();
    componentDidLoad(): void;
    dropDownClick(): void;
    filterFunction(): void;
    clickElement(event: any): void;
    entitySelected: EventEmitter;
    render(): JSX.Element;
}
