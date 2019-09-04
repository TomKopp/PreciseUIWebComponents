import { PropertyDeclaration } from '../../types';
export * from './../../decorators';
export * from '../../utility';
export declare const defaultPropertyDeclaration: PropertyDeclaration;
export declare abstract class BaseElement extends HTMLElement {
    constructor();
    private static _classProperties;
    static addClassProperty(propertyKey: PropertyKey, propertyDeclaration?: PropertyDeclaration): void;
    protected renderRoot: ShadowRoot | HTMLElement;
    protected _template: HTMLTemplateElement | undefined;
    readonly template: HTMLTemplateElement;
    protected _styleElement: HTMLStyleElement | undefined;
    readonly styleElement: HTMLStyleElement;
    protected renderTemplate(): string;
    protected renderStyle(): string;
    protected requestUpdate(): void;
    protected renderAttributes(): void;
    private render;
    static readonly observedAttributes: string[];
    protected attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string | null): void;
    protected connectedCallback(): void;
    protected preCommitHook(): void;
    protected commit(): void;
}
