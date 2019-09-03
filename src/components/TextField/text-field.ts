import { customelementprefix } from '../../../package.json';
import { InputType, AutocompleteValue } from '../../types';
import { BaseElement, defineElement, debounce, booleanAttribute2Boolean } from '../Base/base-element';


//* Class **********************************************************************
@defineElement(`${customelementprefix}-textfield`)
export class TextField extends BaseElement {
//* Constructor ****************************************************************



//* Properties - Getter/Setter *************************************************
  private _formElement: HTMLInputElement | HTMLTextAreaElement | undefined;
  get formElement(): HTMLInputElement | HTMLTextAreaElement {
    if (!this._formElement) this._formElement = this.template.content.querySelector('#form-elem')! as HTMLInputElement | HTMLTextAreaElement;
    return this._formElement;
  }

  private _labelElem: HTMLLabelElement | undefined;
  get labelElement(): HTMLLabelElement {
    if (!this._labelElem) this._labelElem = this.template.content.querySelector('label')!;
    return this._labelElem;
  }

  // General Input attr
  private _autocomplete: AutocompleteValue | boolean = false;
  get autocomplete() { return this._autocomplete as AutocompleteValue; }
  set autocomplete(val: AutocompleteValue) {
    this._autocomplete = val;
    Reflect.set(this.formElement, 'autocomplete', this._autocomplete);
  }

  private _autofocus: boolean = false;
  get autofocus() { return this._autofocus; }
  set autofocus(val) {
    this._autofocus = booleanAttribute2Boolean(val);
    Reflect.set(this.formElement, 'autofocus', this._autofocus);
  }

  private _disabled: boolean = false;
  get disabled() { return this._disabled; }
  set disabled(val) {
    this._disabled = booleanAttribute2Boolean(val);
    Reflect.set(this.formElement, 'disabled', this._disabled);
  }

  private _form: string | null = null;
  // get form() { return this.formElem.getAttribute('form') || ''; }
  // set form(val: string) { this.formElem.setAttribute('form', val); }

  private _list: string | null = null;
  // get list() { return this.formElem.getAttribute('list') || ''; }
  // set list(val: string) { this.formElem.setAttribute('list', val)}

  private _name: string = '';
  get name() { return this._name; }
  set name(val) { this.formElement.name = this._name = val; }

  private _readOnly: boolean = false;
  get readOnly() { return this._readOnly; }
  set readOnly(val) { this.formElement.readOnly = this._readOnly = booleanAttribute2Boolean(val); }

  private _required: boolean = false;
  get required() { return this._required; }
  set required(val) { this.formElement.required = this._required = booleanAttribute2Boolean(val); }

  private _type: InputType = 'text';
  get type() { return this._type as InputType; }
  set type(val) { if (this.formElement instanceof HTMLInputElement) this.formElement.type = this._type = val; }

  private _value: string = '';
  get value() { return this._value; }
  set value(val) {
    this._value = val;
    if (this.formElement.value !== this._value) this.formElement.value = this._value;
  }

  private _placeholder: string = '';
  get placeholder() { return this._placeholder; }
  set placeholder(val) { this.formElement.placeholder = this._placeholder = val; }

  private _multiline: boolean | number = false;
  get multiline() { return this._multiline; }
  set multiline(val) { this._multiline = val; }

  // PreciseUI
  borderless: boolean = false;
  className: string = '';
  clearable: boolean = false;
  defaultValue: string = '';
  error: string = ''; // error message below input
  icon: any; // Sets an optional default icon (if any) to use when no error or clearable is given. - we have slots
  info: string = ''; // info instead of error
  label: string = '';
  maxLength: number = -1;
  minLenght: number = -1;
  prefix: string = '';
  resizable: 'both' | 'horizontal' | 'vertical' | 'none' = 'none'; //! API change, was: boolean | 'auto' | 'vertical' | 'horizontal' = false
  // style: string = ''; // not possible as string, has to be a CSSStyleDeclaration for this exact property name
  // suffix: string = '';
  // theme: string = ''; //TODO figure out how to use themes within wc
  // Eventhandler
  // onBlur: CallableFunction = noop;
  // onChange: CallableFunction = noop;
  // onClear: CallableFunction = noop;
  // onFocus: CallableFunction = noop;
  // onInput: CallableFunction = noop;



//* Template *******************************************************************
  protected renderStyle() {
    return `
.text-field-container {
  position: relative;
}
.stack-pannel {
  display: flex;
  justify-content: flex-start;
}
#prefix,
#suffix {
  align-items: center;
  background: rgb(239, 239, 239);
  color: rgb(114, 114, 114);
  display: flex;
  font-size: 1rem;
  padding: 1rem;
}
label {
  display: flex;
  flex-flow: column-reverse;
  flex-grow: 1;
  height: 100%;
  margin: auto;
  min-width: 0px;
  position: relative;

  align-items: center;
  background: rgb(248, 248, 248);
  border-bottom: 1px solid rgb(239, 239, 239);
  box-shadow: none;
  box-sizing: border-box;
  cursor: auto;
  display: flex;
  flex: 1 1 0%;
  margin: 0px;
  max-height: 112px;
  min-height: 54px;
  overflow-y: auto;
}
input {
  -webkit-appearance: none;
  background: none;
  border-color: initial;
  border-image: initial;
  border-radius: 0px;
  border-style: none;
  border-width: initial;
  box-shadow: none;
  box-sizing: border-box;
  color: rgb(62, 62, 62);
  cursor: auto;
  font-family: inherit;
  font-size: 1rem;
  height: 100%;
  margin: 0px;
  padding: 1.5rem 1rem 0.5rem;
  transition: all 0.2s ease 0s;
  width: 100%;
}
textarea {
  background: rgb(248, 248, 248);
  border-bottom: 1px solid rgb(211, 211, 211);
  border-image: initial;
  border-left-color: initial;
  border-left-width: initial;
  border-radius: 0px;
  border-right-color: initial;
  border-right-width: initial;
  border-style: none none solid;
  border-top-color: initial;
  border-top-width: initial;
  box-shadow: none;
  box-sizing: border-box;
  color: rgb(114, 114, 114);
  cursor: auto;
  font-family: inherit;
  font-size: 1rem;
  margin: 0px;
  padding: 1.5rem 1rem 0.5rem;
  resize: ${this.resizable};
  width: 100%;
}
#form-elem:disabled {
  -webkit-appearance: none;
  background: none;
  border-color: initial;
  border-image: initial;
  border-radius: 0px;
  border-style: none;
  border-width: initial;
  box-shadow: none;
  box-sizing: border-box;
  color: rgb(180, 180, 180);
  cursor: not-allowed;
  font-family: inherit;
  font-size: 1rem;
  height: 100%;
  margin: 0px;
  padding: 1rem;
  transition: all 0.2s ease 0s;
  width: 100%;
}
#description {
  background: transparent;
  box-sizing: border-box;
  /* color: rgb(114, 114, 114); */
  cursor: text;
  display: block;
  font-size: 0.75rem;
  left: 1rem;
  line-height: 1rem;
  max-width: 66.66%;
  overflow: hidden;
  padding-top: 0.5rem;
  position: absolute;
  right: 0px;
  text-overflow: ellipsis;
  top: 0px;
  transform-origin: left bottom;
  /* transform: translate(0px, 0.85rem) scale(1.33); */
  transition: all 0.2s ease 0s;
  white-space: nowrap;
}
#form-elem:focus + #description {
  color: rgb(0, 139, 208);
  /* transform: none; */
}`};

  private renderIcon = () => this.icon ? this.icon : `Icon/ErrorIco`;
  //@ts-ignore-next-line
  private renderAttributes = () => TextField.observedAttributes.map((val) => val in this ? `${val}="${this[val]}"` : '').join(' ');
  private renderInput = () => `<input id=form-elem ${this.renderAttributes()} />`;
  private renderTextarea = () => `<textarea id=form-elem ${this.renderAttributes()} ${typeof this._multiline === 'number' ? `row=${this._multiline}` : ''}></textarea>`;

  renderTemplate() {
    return `
<div class=text-field-container>
  <div class=stack-pannel>
    <span id=prefix><slot name=prefix>Prefix</slot></span>
    <label>
      ${this._multiline ? this.renderTextarea() : this.renderInput()}
      <span id=description><slot>Description/Label/Error/Info</slot></span>
      <i class=defaultIcon><slot name=icon>${this.renderIcon()}</slot></i>
    </label>
    <span id=suffix><slot name=suffix>Suffix</slot></span>
  </div>
</div>`;
  }



//* Obervers/Handlers **********************************************************
  static get observedAttributes() { return ['autocomplete', 'autofocus', 'disabled', 'form', 'list', 'multiline', 'name', 'placeholder', 'readOnly', 'required', 'type', 'value']; }

  //@ts-ignore-next-line
  attributeChangedCallback(attrName: string, oldValue: any, newValue: string) { if (attrName in this) this[attrName] = newValue }

  //@ts-ignore-next-line
  forwardProperty(targetElement: HTMLElement, key: string | number, val: any) { if (targetElement && key in targetElement) targetElement[key] = val; }



//* Life Cycle Callbacks *******************************************************
  preCommitHook() {
    this.formElement.addEventListener('change', debounce(() => this.value = this.formElement.value, 50));
  }
}
