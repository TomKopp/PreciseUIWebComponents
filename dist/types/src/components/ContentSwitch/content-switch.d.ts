import { BaseElement } from "../Base/base-element";
export declare class ContentSwitch extends BaseElement {
    defaultIndex: number;
    selectedIndex: number;
    orientation: 'vertical' | 'horizontal';
    updateTemplate(): string;
    updateStyle(): string;
}
