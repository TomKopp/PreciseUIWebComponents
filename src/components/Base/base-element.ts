import { PropertyDeclaration, defaultPropertyDeclaration, identity, isDifferent } from '../../utility';

export * from './../../decorators';
export * from '../../utility';


/**
 * @module BaseElement
 */


//* Class *********************************************************************
/**
 * Base class for web components
 *
 * @exports
 * @class BaseElement
 * @extends {HTMLElement}
 */
export class BaseElement extends HTMLElement {
  //* Constructor ***********************************************************
  constructor() {
    // If you define a constructor, always call super() first to apply the right property chain!
    // This is specific to custom elements and required by the spec.
    super();

    this.attachShadow({ mode: 'open' });
    if (!this.shadowRoot) {
      this._renderRoot = this;
      throw new Error('No ShadowRoot');
    }
    this._renderRoot = this.shadowRoot;
  }



  //* Properties/Getter/Setter **********************************************
  // TS mockery...
  // ['constructor']: typeof BaseElement;

	/**
	 * Specify observed attributes names to be notified in attributeChangedCallback
	 *
	 * @readonly
	 * @protected
	 * @static
	 * @returns {string[]} array of property names that will be observed as attributes
	 * @memberof BaseElement
	 */
  static get observedAttributes(): string[] {
    const ret: string[] = [];
    this.classProperties.forEach((propertyDeclaration, propertyKey) => {
      if (propertyDeclaration.observe && typeof propertyKey === 'string') { ret.push(propertyKey); }
    });
    return ret;
  }

  // static get templateProperties() {
  // 	const ret = [];
  // 	this._classProperties.forEach((propertyDeclaration, propertyKey) => {
  // 		if ((propertyDeclaration.observe || propertyDeclaration.templateProp)
  // 			&& typeof propertyKey === 'string'
  // 		) { ret.push(propertyKey); }
  // 	});
  // 	return ret;
  // }

  // static get styleProperties() {
  // 	const ret = [];
  // 	this._classProperties.forEach((propertyDeclaration, propertyKey) => {
  // 		if ((propertyDeclaration.observe || propertyDeclaration.styleProp)
  // 			&& typeof propertyKey === 'string'
  // 		) { ret.push(propertyKey); }
  // 	});
  // 	return ret;
  // }

	/**
	 * Protected map of properties of the class with special flags.
	 *
	 * @readonly
	 * @static
	 * @returns {Map.<(string|number|symbol), module:utility.PropertyDeclaration>} property key - property decaration map
	 * @memberof BaseElement
	 */
  static get classProperties(): Map<PropertyKey, PropertyDeclaration> {
    if (!Object.prototype.hasOwnProperty.call(this, '_classProperties')) {
      Object.defineProperty(this, '_classProperties', { enumerable: true, value: new Map() });
    }
    //@ts-ignore
    return this._classProperties;
  }

  static addClassProperty(propertyKey: string, propertyDeclaration?: PropertyDeclaration) {
    this.classProperties.set(propertyKey, Object.assign({}, defaultPropertyDeclaration, propertyDeclaration));
  }

	/**
	 * Protected property that holds a reference where to render the DOM to.
	 *
	 * @protected
	 * @type {(HTMLElement | ShadowRoot)}
	 * @memberof BaseElement
	 */
  _renderRoot: (HTMLElement | ShadowRoot);

	/**
	 * Flag to indicate a scheduled requestAnimationFrame
	 *
	 * @protected
	 * @type {boolean}
	 * @memberof BaseElement
	 */
  _rAFScheduled: boolean = false;

	/**
	 * Template element
	 *
	 * @protected
	 * @type {HTMLTemplateElement | undefined}
	 * @memberof BaseElement
	 */
  _template: HTMLTemplateElement | undefined;

	/**
	 * Get the internal template
	 *
	 * @readonly
	 * @returns {HTMLTemplateElement} template
	 * @memberof BaseElement
	 */
  get template(): HTMLTemplateElement {
    if (!this._template) { this._template = document.createElement('template'); }
    return this._template;
  }

	/**
	 * Style element
	 *
	 * @protected
	 * @type {HTMLStyleElement | undefined}
	 * @memberof BaseElement
	 */
  _styleElement: HTMLStyleElement | undefined;

	/**
	 * get the internal style
	 *
	 * @readonly
	 * @returns {HTMLStyleElement} style
	 * @memberof BaseElement
	 */
  get styleElement(): HTMLStyleElement {
    if (!this._styleElement) { this._styleElement = document.createElement('style'); }
    return this._styleElement;
  }



  //* Template ****************************************************************
	/**
	 * Override to set a template
	 *
	 * @abstract
	 * @example return '<div><slot name=test></slot></div>';
	 * @returns {string} the template string
	 * @memberof BaseElement
	 */
  updateTemplate(): string { throw new Error('must be implemented by subclass!'); }

	/**
	 * Override to set the style element
	 *
	 * @abstract
	 * @example return 'div {background-color: blue;}'
	 * @returns {string} css ruleset
	 * @memberof BaseElement
	 */
  updateStyle(): string { throw new Error('must be implemented by subclass!'); }

	/**
	 * Sets or removes attributes of the component, based on the 'reflect' flag of the property.
	 *
	 * @protected
	 * @memberof BaseElement
	 */
  reflectAttributes() {
    const reflector = (propertyDeclaration: PropertyDeclaration, propertyKey: PropertyKey) => {
      if (!propertyDeclaration.reflect && typeof propertyKey !== 'string') { return; }

      const { prop2attr = identity } = propertyDeclaration;
      const prop = prop2attr.call(this, this[propertyKey as keyof BaseElement]);

      if (prop === null) { this.removeAttribute(propertyKey as string); }
      else { this.setAttribute(propertyKey as string, prop); }
    };

    (this.constructor as typeof BaseElement).classProperties.forEach(reflector);
  }



  //* Obervers/Handlers *****************************************************
	/**
	 * Called when an observed attribute has been added, removed, updated, or replaced.
	 * Also called for initial values when an element is created by the parser, or upgraded.
	 * Note: only attributes listed in the observedAttributes property will receive this callback.
	 *
	 * @param {string} attrName attribute name
	 * @param {(string | null)} oldValue old value of the attribute
	 * @param {(string | null)} newValue new value of the attribute
	 * @memberof BaseElement
	 */
  attributeChangedCallback(attrName: string, oldValue: (string | null), newValue: (string | null)) {
    if (oldValue === newValue) { return; }
    const { attr2prop = identity } = (this.constructor as typeof BaseElement).classProperties.get(attrName) || defaultPropertyDeclaration;
    //@ts-ignore
    this[attrName] = attr2prop.call(this, newValue);
  }



  //* Life Cycle Callbacks **************************************************
	/**
	 * Invoked each time the custom element is appended into a document-connected
	 * element. This will happen each time the node is moved, and may happen before
	 * the element's contents have been fully parsed.
	 *
	 * Useful for running setup code, such as fetching resources or rendering.
	 * Generally, you should try to delay work until this time.
	 *
	 * @memberof BaseElement
	 */
  connectedCallback() {
    if (!this.isConnected) { return; }
    this.requestRender(true, true, true);
  }

	/**
	 * Invoked each time the custom element is disconnected from the document's DOM.
	 * Useful for running clean up code.
	 *
	 * @memberof BaseElement
	 */
  // disconnectedCallback() {}

	/**
	 * Invoked each time the custom element is moved to a new document.
	 *
	 * @memberof BaseElement
	 */
  // adoptedCallback() {}

	/**
	 * Invoked if custom elem is "form-associative = true".
	 *
	 * @memberof BaseElement
	 */
  // formResetCallback() {}

	/**
	 * Requests an update of the component. Checks if the value changed.
	 *
	 * @param {string} propertyKey property name
	 * @param {*} oldValue old value of the property
	 * @param {*} newValue new value of the property
	 * @memberof BaseElement
	 */
  requestUpdate(propertyKey: string, oldValue: any, newValue: any) {
    const {
      modified = isDifferent
      // , templateProp = false
      // , styleProp = false
      , reflect = false
    } = (this.constructor as typeof BaseElement).classProperties.get(propertyKey) || defaultPropertyDeclaration;

    if (modified.call(this, oldValue, newValue)) {
      this.styleElement.innerHTML = this.updateStyle();
      this.template.innerHTML = this.updateTemplate();

      // ! set template and style render flags correctly
      this.requestRender(true, true, reflect);
    }
  }

  requestRender(dirtyTemplate: boolean, dirtyStyle: boolean, dirtyAttribute: boolean) {
    this.preRenderHook();

    if (!this._rAFScheduled) {
      this._rAFScheduled = true;
      requestAnimationFrame(() => {
        this.render(dirtyTemplate, dirtyStyle, dirtyAttribute);
        this._rAFScheduled = false;
      });
    }
  }

	/**
	 * Invoked each time the custom element will becommitted to the DOM.
	 *
	 * @override
	 * @memberof BaseElement
	 */
  // eslint-disable-next-line
  preRenderHook() { }

	/**
	 * Invoked each time the custom element is committed to the DOM
	 *
	 * @protected
	 * @param {boolean} dirtyTemplate Flag indicating template rerender
	 * @param {boolean} dirtyStyle Flag indicating style rerender
	 * @param {boolean} dirtyAttribute Flag indicating attribute update
	 * @memberof BaseElement
	 */
  render(dirtyTemplate: boolean, dirtyStyle: boolean, dirtyAttribute: boolean) {
    if (dirtyStyle) { this._renderRoot.appendChild(this.styleElement); }

    // Does not clone the DocumentFragment, instead rips it from the template and
    // places it into the render node. This way the element will retain the references
    // of objects within the template.
    if (dirtyTemplate) { this._renderRoot.appendChild(this.template.content); }
    if (dirtyAttribute) { this.reflectAttributes(); }
  }
}
