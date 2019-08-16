export declare class Test extends HTMLElement {
    constructor();
    private _disabled;
    disabled: boolean;
    private _multiline;
    multiline: number | boolean;
    private _value;
    value: string;
    protected _template: HTMLTemplateElement | undefined;
    readonly template: HTMLTemplateElement;
    private _formElement;
    readonly formElement: HTMLInputElement | HTMLTextAreaElement;
    private renderTemplate;
    private renderAttributes;
    private input;
    private textarea;
    static readonly observedAttributes: string[];
    attributeChangedCallback(attrName: string, oldValue: any, newValue: string): void;
    forwardProperty(targetElement: HTMLElement, key: string | number, val: any): void;
    connectedCallback(): void;
}
