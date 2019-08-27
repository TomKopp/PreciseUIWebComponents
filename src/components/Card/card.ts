import { customelementprefix } from '../../../package.json';
import { BaseElement } from '../Base/base-element';
import { defineElement, property } from '../../decorators';

//* Class *********************************************************************
@defineElement(`${customelementprefix}-card`)
export class Card extends BaseElement {
//* Constructor ***************************************************************



//* Properties/Getter/Setter **************************************************
  public direction: 'row' | 'column' = 'column'; //! API change, was: orientation: 'horizontal' | 'vertical' = 'vertical';
  public layout: string = '';
  protected get layoutCSS () {
    return (this.layout.match(/\d/gu) || [])
      .map((val, key) => `.card > :nth-child(${key + 1}) {flex:${val} 1 auto;}`)
      .join('\n');
  }
  //@ts-ignore-next-line
  @property({ optTest: 'optTest'}) test = 'test';



//* Template ******************************************************************
  protected renderTemplate() {
    this.template.innerHTML = `${this.renderStyles()}
<section class="card">
  <div class="card-header"><slot name=header></slot></div>
  <div class="card-media"><slot name=media></slot></div>
  <div class="card-body"><slot name=body></slot></div>
  <div class="card-footer"><slot name=footer></slot></div>
</section>`;
  }

  protected renderStyles() {
    return `<style>
.card {
  box-sizing: border-box;
  display: flex;
  flex-direction: ${this.direction};
  justify-content: flex-start;
  padding: 1rem;
}
${this.layoutCSS}
</style>`
  }



//* Obervers/Handlers *********************************************************
  static get observedAttributes() { return ['direction', 'layout']; }

  protected attributeChangedCallback(attrName: string, oldValue: any, newValue: string) {
    //@ts-ignore-next-line
    this[attrName] = newValue;
  }



//* Life Cycle Callbacks ******************************************************

}
