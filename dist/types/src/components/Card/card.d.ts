import { BaseElement } from '../Base/base-element';
export declare class Card extends BaseElement {
    direction: 'row' | 'column';
    layout: string;
    protected readonly layoutCSS: string;
    test: string;
    protected renderTemplate(): void;
    protected renderStyles(): string;
    static readonly observedAttributes: string[];
    protected attributeChangedCallback(attrName: string, oldValue: any, newValue: string): void;
}
