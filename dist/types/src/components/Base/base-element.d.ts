export declare abstract class BaseElement extends HTMLElement {
    constructor();
    protected renderRoot: any;
    protected _template: HTMLTemplateElement | undefined;
    readonly template: HTMLTemplateElement;
    protected renderTemplate(): void;
    protected connectedCallback(): void;
    protected preCommitHook(): void;
    protected commit(): void;
}
