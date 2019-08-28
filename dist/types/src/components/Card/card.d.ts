import { BaseElement } from '../Base/base-element';
export declare class Card extends BaseElement {
    constructor();
    direction: 'row' | 'column';
    layout: string;
    protected readonly layoutCSS: string;
    test: string;
    protected renderTemplate(): void;
    protected renderStyles(): string;
}
