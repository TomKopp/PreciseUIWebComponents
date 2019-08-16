import { customelementprefix } from '../../../package.json';
import { LitElement, html, css, customElement, property } from 'lit-element';

@customElement(`${customelementprefix}-link`)
export class Link extends LitElement {
  static get styles() {
    return css`:host {
      display: inline;
    }
    a {
      text-decoration: none
    }
    `;
  }

  @property({ type: String, reflect: true }) href = null;

  render() {
    return html`<a href="${this.href}" @click="${(e:any) => {console.log(e);}}"><slot></slot></a>`;
  }
}
