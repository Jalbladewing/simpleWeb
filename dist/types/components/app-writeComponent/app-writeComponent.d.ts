import '../../stencil.core';
export declare class AppWriteComponent {
    filter: string;
    typelist: string[];
    htmlRender: string;
    selectedType: string;
    page_url: string;
    service_url: string;
    constructor();
    handleSubmit(e: any): void;
    handleChange(event: any): void;
    componentWillLoad(): void;
    entitySelected(event: CustomEvent): void;
    render(): JSX.Element;
}
