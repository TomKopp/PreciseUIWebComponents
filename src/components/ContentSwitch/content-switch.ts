import { customelementprefix } from '../../../package.json';
import { BaseElement, defineElement, property } from "../Base/base-element";

@defineElement(`${customelementprefix}-content-switch`)
export class ContentSwitch extends BaseElement {
  @property({
    reflect: true
    , attr2prop(val: string) { return Number(val); }
    , prop2attr(val: number) { return String(val); }
  })
  defaultIndex: number = 1;

  @property({
    reflect: true
    , attr2prop(val: string) { return Number(val); }
    , prop2attr(val: number) { return String(val); }
  })
  selectedIndex: number = 1;

  @property({ reflect: true })
  orientation: 'vertical' | 'horizontal' = 'horizontal';

  updateTemplate() {
    return `<div class=content-switch>
  <slot></slot>
</div>`;
  }

  updateStyle() {
    return ``;
  }
}
