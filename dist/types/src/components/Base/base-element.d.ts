import { PropertyDeclaration } from '../../utility';
export * from './../../decorators';
export * from '../../utility';
export declare class BaseElement extends HTMLElement {
    constructor();
    static readonly observedAttributes: string[];
    static readonly classProperties: Map<PropertyKey, PropertyDeclaration>;
    static addClassProperty(propertyKey: string, propertyDeclaration?: PropertyDeclaration): void;
    _renderRoot: (HTMLElement | ShadowRoot);
    _rAFscheduled: (...args: any[]) => void;
    _template: HTMLTemplateElement | undefined;
    readonly template: HTMLTemplateElement;
    _styleElement: HTMLStyleElement | undefined;
    readonly styleElement: HTMLStyleElement;
    updateTemplate(): string;
    updateStyle(): string;
    reflectAttributes(): void;
    attributeChangedCallback(attrName: string, oldValue: (string | null), newValue: (string | null)): void;
    connectedCallback(): void;
    requestUpdate(propertyKey: string, oldValue: any, newValue: any): void;
    requestRender(dirtyTemplate: boolean, dirtyStyle: boolean, dirtyAttribute: boolean): void;
    preRenderHook(): void;
    render(dirtyTemplate: boolean, dirtyStyle: boolean, dirtyAttribute: boolean): void;
}
