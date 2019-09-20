import { customelementprefix } from '../../../package.json';
import { BaseElement, defineElement, property, attr2bool, bool2attr } from '../Base/base-element';

@defineElement(`${customelementprefix}-card`)
export class Card extends BaseElement {
  //! API change, was: orientation: 'horizontal' | 'vertical' = 'vertical';
  @property({ reflect: true })
  direction: 'row' | 'column' = 'column';

  @property({ reflect: true })
  layout: string = '';

  get layoutCSS () {
    return (this.layout.match(/\d/gu) || [])
      .map((val, key) => `.card > :nth-child(${key + 1}) {flex:${val} 1 auto;}`)
      .join('\n');
  }



  updateTemplate() {
    return `<section class="card">
  <div class="card-header"><slot name=header></slot></div>
  <div class="card-media"><slot name=media></slot></div>
  <div class="card-body"><slot name=body></slot></div>
  <div class="card-footer"><slot name=footer></slot></div>
</section>`;
  }

  updateStyle() {
    return `
.card {
  box-sizing: border-box;
  display: flex;
  flex-direction: ${this.direction};
  justify-content: flex-start;
  padding: 1rem;
}
${this.layoutCSS}`;
  }
}
