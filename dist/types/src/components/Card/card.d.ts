import { BaseElement } from '../Base/base-element';
export declare class Card extends BaseElement {
    direction: 'row' | 'column';
    protected renderTemplate(): void;
    protected renderStyles(): string;
    static readonly observedAttributes: string[];
    protected attributeChangedCallback(attrName: string, oldValue: any, newValue: string): void;
}
