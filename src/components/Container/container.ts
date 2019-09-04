import { customelementprefix } from '../../../package.json';
import { BaseElement, defineElement, property } from "../Base/base-element";

@defineElement(`${customelementprefix}-container`)
export class Container extends BaseElement {
  constructor() { super(); }

  @property({observe: true, reflect: true})
  align: 'center' | 'left' | 'right' = 'center';

  @property({observe: true, reflect: true})
  maxWidth: number | undefined = undefined;

  renderTemplate() {
    return `<div class=container>
  <slot></slot>
</div>`;
  }

  renderStyle() {
    return `.container {
  display: flex;
  justify-content: ${this.align === 'center' ? 'center' : `flex-${this.align === 'left' ? 'left' : 'right'}`};
  ${this.maxWidth ? `max-width: ${this.maxWidth}` : ''}
}`;
  }
}
