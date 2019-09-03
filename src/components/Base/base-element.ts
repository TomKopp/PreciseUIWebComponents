import { PropertyDeclarationMap, PropertyDeclaration } from '../../types';
import { identity } from '../../utility';

export * from './../../decorators';
export * from '../../utility';

export const defaultPropertyDeclaration: PropertyDeclaration = {
  observe: true,
  reflect: false,
  convertToAttribute: identity,
  convertFromAttribute: identity
};

//* Class *********************************************************************
export abstract class BaseElement extends HTMLElement {
  //* Constructor *************************************************************
  constructor() {
    /**
     * If you define a constructor, always call super() first to apply the right property chain!
     * This is specific to custom elements and required by the spec.
     */
    super();

    this.attachShadow({ mode: 'open' });
    if (!this.shadowRoot) {
      this.renderRoot = this;
      throw new Error('No ShadowRoot');
    }
    this.renderRoot = this.shadowRoot;
  }



  //* Properties/Getter/Setter ************************************************
  private static _classProperties: PropertyDeclarationMap = new Map();
  static addClassProperty(propertyKey: PropertyKey, propertyDeclaration?: PropertyDeclaration) {
    this._classProperties.set(propertyKey, Object.assign({}, defaultPropertyDeclaration, propertyDeclaration));
  }

  protected renderRoot: ShadowRoot | HTMLElement;

  protected _template: HTMLTemplateElement | undefined;
  get template(): HTMLTemplateElement {
    if (!this._template) this._template = document.createElement('template');
    return this._template;
  }

  protected _styleElement: HTMLStyleElement | undefined;
  get styleElement(): HTMLStyleElement {
    if (!this._styleElement) this._styleElement = document.createElement('style');
    return this._styleElement;
  }



  //* Template ****************************************************************
  protected renderTemplate() { return ''; /* return '<div><slot name=test></slot></div>'; */ }
  protected renderStyle() { return ''; /* return 'div {background-color: blue;}' */ }



  //* Obervers/Handlers *******************************************************
  /**
   * Specify observed attributes names to be notified in attributeChangedCallback
   */
  static get observedAttributes() {
    const ret: string[] = [];
    this._classProperties.forEach((val: PropertyDeclaration, key: PropertyKey) => {
        if (val.observe && typeof key === 'string') ret.push(key);
      });
    return ret;
  }

  /**
   * Called when an observed attribute has been added, removed, updated, or replaced.
   * Also called for initial values when an element is created by the parser, or upgraded.
   * Note: only attributes listed in the observedAttributes property will receive this callback.
   */
  protected attributeChangedCallback(attrName: string, oldValue: string|null, newValue: string|null) {
    if (oldValue === newValue) return;
    const propertyDeclaration = (this.constructor as typeof BaseElement)._classProperties.get(attrName) || defaultPropertyDeclaration;
    const attr2prop = propertyDeclaration.convertFromAttribute || identity;
    // @ts-ignore-next-line
    this[attrName] = attr2prop(newValue);
  }

  protected requestUpdate() { console.log('requestUpdate: ', this); return; }



  //* Life Cycle Callbacks ****************************************************
  /**
   * Invoked each time the custom element is appended into a document-connected
   * element. This will happen each time the node is moved, and may happen before
   * the element's contents have been fully parsed.
   *
   * Useful for running setup code, such as fetching resources or rendering.
   * Generally, you should try to delay work until this time.
   */
  protected connectedCallback() {
    if (!this.isConnected) return;
    this.styleElement.innerHTML = this.renderStyle();
    this.template.innerHTML = this.renderTemplate();
    this.preCommitHook();
    requestAnimationFrame(this.commit.bind(this));
  }

  /**
   * Invoked each time the custom element is disconnected from the document's DOM.
   * Useful for running clean up code.
   */
  // protected disconnectedCallback() {}

  /**
   * Invoked each time the custom element is moved to a new document.
   */
  // protected adoptedCallback() {}

  /**
   * Invoked if custom elem is "form-associative = true".
   */
  // protected formResetCallback() {}

  protected preCommitHook() {}

  protected commit() {
    this.renderRoot.appendChild(this.styleElement);
    /*
    Does not clone the DocumentFragment, instead rips it from the template and
    places it into the render node. This way the element will retain the references
    of objects within the template.
    */
    this.renderRoot.appendChild(this.template.content);
  }
}
