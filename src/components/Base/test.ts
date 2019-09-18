import { customelementprefix } from '../../../package.json';
import { noop, debounce, attr2bool } from '../../utility';
import { defineElement } from '../../decorators';


//* Class **********************************************************************
@defineElement(`${customelementprefix}-test`)
export class Test extends HTMLElement {
  // _internals: any;
//* Constructor ****************************************************************
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    if (!this.shadowRoot) { throw new Error('No ShadowRoot'); }

    //this._internals = this.attachInternals();
  }


//* Properties/Getter/Setter ***************************************************
  private _disabled: boolean = false;
  get disabled() { return this._disabled; }
  set disabled(val: any) {
    this._disabled = attr2bool(val);
    this.forwardProperty(this.formElement, 'disabled', this._disabled);
  }

  private _multiline: boolean | number = false;
  get multiline() { return this._multiline; }
  set multiline(val) { this._multiline = val; }

  private _value: string = '';
  get value() { return this._value; }
  set value(val) { this._value = val; }

  protected _template: HTMLTemplateElement | undefined;
  get template(): HTMLTemplateElement {
    if (!this._template) this._template = document.createElement('template');
    return this._template;
  }

  private _formElement: HTMLInputElement | HTMLTextAreaElement | undefined;
  get formElement(): HTMLInputElement | HTMLTextAreaElement {
    if (!this._formElement) this._formElement = this.template.content.querySelector('#form-elem')! as HTMLInputElement | HTMLTextAreaElement;
    return this._formElement;
  }



//* Template *******************************************************************
  private renderTemplate = () => {
    this.template.innerHTML = `${this._multiline ? this.textarea() : this.input()}`;
  }

  //@ts-ignore-next-line
  private renderAttributes = () => Test.observedAttributes.map((val) => val in this ? `${val}=${this[val]}` : '').join(' ');
  private input = () => `<input id=form-elem ${this.renderAttributes()} />`;
  private textarea = () => `<textarea id=form-elem ${this.renderAttributes()} ${typeof this._multiline === 'number' ? `row=${this._multiline}` : ''}></textarea>`;




//* Obervers/Handlers **********************************************************
  static get observedAttributes() { return ['disabled', 'multiline', 'value']; }
  //@ts-ignore-next-line
  attributeChangedCallback(attrName: string, oldValue: any, newValue: string) { if (attrName in this) this[attrName] = newValue }

  //@ts-ignore-next-line
  forwardProperty(targetElement: HTMLElement, key: string | number, val: any) { if (targetElement && key in targetElement) targetElement[key] = val; }


//* Life Cycle Callbacks *******************************************************
  connectedCallback() {
    if (!this.isConnected) return;
    this.renderTemplate();
    // this.cloneTemplate();
    // requestAnimationFrame(() => this.shadowRoot!.appendChild(this.template.content));
    // this.shadowRoot!.appendChild(this.template.content.cloneNode(true));
    this.formElement.addEventListener('change', debounce(() => this.value = this.formElement.value, 50));
    this.shadowRoot!.appendChild(this.template.content)
  }

  // disconnectedCallback() {}

  // adoptedCallback() {}

  // formResetCallback() {} // if custom elem is "form-associative = true"
}
