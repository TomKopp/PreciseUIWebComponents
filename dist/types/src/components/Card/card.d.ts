import { BaseElement } from '../Base/base-element';
export declare class Card extends BaseElement {
    direction: 'row' | 'column';
    layout: string;
    protected readonly layoutCSS: string;
    disabled: boolean;
    protected renderTemplate(): string;
    protected renderStyle(): string;
}
