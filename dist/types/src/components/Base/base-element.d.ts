import { PropertyDeclaration } from '../../types';
export declare abstract class BaseElement extends HTMLElement {
    constructor();
    private static _classProperties;
    protected renderRoot: any;
    protected _template: HTMLTemplateElement | undefined;
    readonly template: HTMLTemplateElement;
    static addClassProperty(propertyKey: PropertyKey, propertyDeclaration?: PropertyDeclaration): void;
    protected renderTemplate(): void;
    static readonly observedAttributes: string[];
    protected attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string | null): void;
    protected connectedCallback(): void;
    protected preCommitHook(): void;
    protected commit(): void;
}
