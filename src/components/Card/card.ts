import { customelementprefix } from '../../../package.json';
import { BaseElement } from '../Base/base-element';

//* Class *********************************************************************
export class Card extends BaseElement {
//* Constructor ***************************************************************



//* Properties/Getter/Setter **************************************************
  public direction: 'row' | 'column' = 'column'; //! API change, was: orientation: 'horizontal' | 'vertical' = 'vertical';



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
</style>`
  }



//* Obervers/Handlers *********************************************************
  static get observedAttributes() { return ['direction']; }

  protected attributeChangedCallback(attrName: string, oldValue: any, newValue: string) {
    //@ts-ignore-next-line
    this[attrName] = newValue;
  }



//* Life Cycle Callbacks ******************************************************

}

customElements.define(`${customelementprefix}-card`, Card);
