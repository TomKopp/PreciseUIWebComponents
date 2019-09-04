import { BaseElement } from "../Base/base-element";
export declare class Container extends BaseElement {
    constructor();
    align: 'center' | 'left' | 'right';
    maxWidth: number | undefined;
    renderTemplate(): string;
    renderStyle(): string;
}
