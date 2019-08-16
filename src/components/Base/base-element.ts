//* Class *********************************************************************
export abstract class BaseElement extends HTMLElement {
//* Constructor ***************************************************************
  constructor() {
    /**
     * If you define a constructor, always call super() first to apply the right property chain!
     * This is specific to CE and required by the spec.
     */
    super();

    this.attachShadow({ mode: 'open' });
    if (!this.shadowRoot) {
      this.renderRoot = this;
      throw new Error('No ShadowRoot');
    }
    this.renderRoot = this.shadowRoot;
  }



//* Properties/Getter/Setter **************************************************
  protected renderRoot: any;

  protected _template: HTMLTemplateElement | undefined;
  get template(): HTMLTemplateElement {
    if (!this._template) this._template = document.createElement('template');
    return this._template;
  }

  // protected _styleElement: HTMLStyleElement | undefined;
  // get styleElement(): HTMLStyleElement {
  //   if (!this._styleElement) this._styleElement = document.createElement('style');
  //   return this._styleElement;
  // }



//* Template ******************************************************************
  protected renderTemplate() { /* this.template.innerHTML = ''; */ }



//* Obervers/Handlers *********************************************************
  /**
   * Specify observed attributes names to be notified in attributeChangedCallback
   */
  // static get observedAttributes() { return []; }

  /**
   * Called when an observed attribute has been added, removed, updated, or replaced.
   * Also called for initial values when an element is created by the parser, or upgraded.
   * Note: only attributes listed in the observedAttributes property will receive this callback.
   */
  // protected attributeChangedCallback(attrName: string, oldValue: any, newValue: string) {}



//* Life Cycle Callbacks ******************************************************
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
    this.renderTemplate();
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
    /*
    Does not clone the DocumentFragment, instead rips it from the template and
    places it into the render node. This way the element will retain the references
    of objects within the template.
    */
    this.renderRoot.appendChild(this.template.content);
  }
}
