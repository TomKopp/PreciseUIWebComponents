import { BaseElement } from '../Base/base-element';
export declare class Container extends BaseElement {
    align: 'center' | 'left' | 'right';
    maxWidth: number | null;
    updateTemplate(): string;
    updateStyle(): string;
}
