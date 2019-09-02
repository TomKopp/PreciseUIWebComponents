import { customelementprefix } from '../../../package.json';
import { BaseElement } from '../Base/base-element';
import { defineElement, property } from '../../decorators';

//* Class *********************************************************************
@defineElement(`${customelementprefix}-card`)
export class Card extends BaseElement {
  //* Constructor *************************************************************
  //* Properties/Getter/Setter ************************************************
  @property({ reflect: true })
  public direction: 'row' | 'column' = 'column'; //! API change, was: orientation: 'horizontal' | 'vertical' = 'vertical';

  @property({ reflect: true })
  public layout: string = '';
  protected get layoutCSS () {
    return (this.layout.match(/\d/gu) || [])
      .map((val, key) => `.card > :nth-child(${key + 1}) {flex:${val} 1 auto;}`)
      .join('\n');
  }

  @property({ reflect: true })
  test = 'test';



  //* Template ****************************************************************
  protected renderTemplate() {
    return `<section class="card">
  <div class="card-header"><slot name=header></slot></div>
  <div class="card-media"><slot name=media></slot></div>
  <div class="card-body"><slot name=body></slot></div>
  <div class="card-footer"><slot name=footer></slot></div>
</section>`;
  }

  protected renderStyle() {
    return `
.card {
  box-sizing: border-box;
  display: flex;
  flex-direction: ${this.direction};
  justify-content: flex-start;
  padding: 1rem;
}
${this.layoutCSS}`
  }



  //* Obervers/Handlers *******************************************************
  //* Life Cycle Callbacks ****************************************************
}
