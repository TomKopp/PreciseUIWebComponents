import { customelementprefix } from '../../../package.json';
import { BaseElement, defineElement, property } from '../Base/base-element';

@defineElement(`${customelementprefix}-container`)
export class Container extends BaseElement {
  @property({ reflect: true })
  align: 'center' | 'left' | 'right' = 'center';

  @property({ reflect: true })
  maxWidth: number | null = null;

  updateTemplate() {
    return `<div class=container>
  <slot></slot>
</div>`;
  }

  updateStyle() {
    return `.container {
  display: flex;
  justify-content: ${this.align === 'center' ? 'center' : `flex-${this.align === 'left' ? 'left' : 'right'}`};
  ${this.maxWidth === null ? `max-width: ${this.maxWidth}` : ''}
}`;
  }
}
