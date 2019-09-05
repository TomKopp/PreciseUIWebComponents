import { customelementprefix } from '../../../package.json';
import { BaseElement, defineElement, property } from "../Base/base-element";

@defineElement(`${customelementprefix}-content-switch`)
export class ContentSwitch extends BaseElement {
  constructor() { super(); }

  @property({
    observe: true
    , reflect: true
    , attributeToProperty(val: string) { return Number(val); }
    , propertyToAttribute(val: number) { return String(val); }
  })
  defaultIndex: number = 1;

  @property({
    observe: true
    , reflect: true
    , attributeToProperty(val: string) { return Number(val); }
    , propertyToAttribute(val: number) { return String(val); }
  })
  selectedIndex: number = 1;

  @property({ reflect: true })
  orientation: 'vertical' | 'horizontal' = 'horizontal';

  renderTemplate() {
    return `<div class=content-switch>
  <slot></slot>
</div>`;
  }

  renderStyle() {
    return ``;
  }
}
