import '../../stencil.core';
export declare class AppWriteComponent {
    filter: string;
    typelist: string[];
    selectedType: string;
    attributeList: string[];
    attributeSelected: string;
    attributeHasSelected: string;
    operationList: string[];
    operationSelected: string;
    htmlRender: string;
    page_url: string;
    service_url: string;
    constructor();
    handleSubmit(e: any): void;
    handleChange(event: any): void;
    componentWillLoad(): void;
    updateAttributeList(): void;
    clearFields(): void;
    entitySelected(event: CustomEvent): void;
    render(): JSX.Element;
}
