import { BaseElement } from "../Base/base-element";
export declare class ContentSwitch extends BaseElement {
    constructor();
    defaultIndex: number;
    selectedIndex: number;
    orientation: 'vertical' | 'horizontal';
    renderTemplate(): string;
    renderStyle(): string;
}
