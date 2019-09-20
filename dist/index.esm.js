function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");

  return typeof key === "symbol" ? key : String(key);
}

function _decorate(decorators, factory, superClass, mixins) {
  var api = _getDecoratorsApi();

  if (mixins) {
    for (var i = 0; i < mixins.length; i++) {
      api = mixins[i](api);
    }
  }

  var r = factory(function initialize(O) {
    api.initializeInstanceElements(O, decorated.elements);
  }, superClass);
  var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);
  api.initializeClassElements(r.F, decorated.elements);
  return api.runClassFinishers(r.F, decorated.finishers);
}

function _getDecoratorsApi() {
  _getDecoratorsApi = function () {
    return api;
  };

  var api = {
    elementsDefinitionOrder: [["method"], ["field"]],
    initializeInstanceElements: function (O, elements) {
      ["method", "field"].forEach(function (kind) {
        elements.forEach(function (element) {
          if (element.kind === kind && element.placement === "own") {
            this.defineClassElement(O, element);
          }
        }, this);
      }, this);
    },
    initializeClassElements: function (F, elements) {
      var proto = F.prototype;
      ["method", "field"].forEach(function (kind) {
        elements.forEach(function (element) {
          var placement = element.placement;

          if (element.kind === kind && (placement === "static" || placement === "prototype")) {
            var receiver = placement === "static" ? F : proto;
            this.defineClassElement(receiver, element);
          }
        }, this);
      }, this);
    },
    defineClassElement: function (receiver, element) {
      var descriptor = element.descriptor;

      if (element.kind === "field") {
        var initializer = element.initializer;
        descriptor = {
          enumerable: descriptor.enumerable,
          writable: descriptor.writable,
          configurable: descriptor.configurable,
          value: initializer === void 0 ? void 0 : initializer.call(receiver)
        };
      }

      Object.defineProperty(receiver, element.key, descriptor);
    },
    decorateClass: function (elements, decorators) {
      var newElements = [];
      var finishers = [];
      var placements = {
        static: [],
        prototype: [],
        own: []
      };
      elements.forEach(function (element) {
        this.addElementPlacement(element, placements);
      }, this);
      elements.forEach(function (element) {
        if (!_hasDecorators(element)) return newElements.push(element);
        var elementFinishersExtras = this.decorateElement(element, placements);
        newElements.push(elementFinishersExtras.element);
        newElements.push.apply(newElements, elementFinishersExtras.extras);
        finishers.push.apply(finishers, elementFinishersExtras.finishers);
      }, this);

      if (!decorators) {
        return {
          elements: newElements,
          finishers: finishers
        };
      }

      var result = this.decorateConstructor(newElements, decorators);
      finishers.push.apply(finishers, result.finishers);
      result.finishers = finishers;
      return result;
    },
    addElementPlacement: function (element, placements, silent) {
      var keys = placements[element.placement];

      if (!silent && keys.indexOf(element.key) !== -1) {
        throw new TypeError("Duplicated element (" + element.key + ")");
      }

      keys.push(element.key);
    },
    decorateElement: function (element, placements) {
      var extras = [];
      var finishers = [];

      for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
        var keys = placements[element.placement];
        keys.splice(keys.indexOf(element.key), 1);
        var elementObject = this.fromElementDescriptor(element);
        var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);
        element = elementFinisherExtras.element;
        this.addElementPlacement(element, placements);

        if (elementFinisherExtras.finisher) {
          finishers.push(elementFinisherExtras.finisher);
        }

        var newExtras = elementFinisherExtras.extras;

        if (newExtras) {
          for (var j = 0; j < newExtras.length; j++) {
            this.addElementPlacement(newExtras[j], placements);
          }

          extras.push.apply(extras, newExtras);
        }
      }

      return {
        element: element,
        finishers: finishers,
        extras: extras
      };
    },
    decorateConstructor: function (elements, decorators) {
      var finishers = [];

      for (var i = decorators.length - 1; i >= 0; i--) {
        var obj = this.fromClassDescriptor(elements);
        var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj);

        if (elementsAndFinisher.finisher !== undefined) {
          finishers.push(elementsAndFinisher.finisher);
        }

        if (elementsAndFinisher.elements !== undefined) {
          elements = elementsAndFinisher.elements;

          for (var j = 0; j < elements.length - 1; j++) {
            for (var k = j + 1; k < elements.length; k++) {
              if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
                throw new TypeError("Duplicated element (" + elements[j].key + ")");
              }
            }
          }
        }
      }

      return {
        elements: elements,
        finishers: finishers
      };
    },
    fromElementDescriptor: function (element) {
      var obj = {
        kind: element.kind,
        key: element.key,
        placement: element.placement,
        descriptor: element.descriptor
      };
      var desc = {
        value: "Descriptor",
        configurable: true
      };
      Object.defineProperty(obj, Symbol.toStringTag, desc);
      if (element.kind === "field") obj.initializer = element.initializer;
      return obj;
    },
    toElementDescriptors: function (elementObjects) {
      if (elementObjects === undefined) return;
      return _toArray(elementObjects).map(function (elementObject) {
        var element = this.toElementDescriptor(elementObject);
        this.disallowProperty(elementObject, "finisher", "An element descriptor");
        this.disallowProperty(elementObject, "extras", "An element descriptor");
        return element;
      }, this);
    },
    toElementDescriptor: function (elementObject) {
      var kind = String(elementObject.kind);

      if (kind !== "method" && kind !== "field") {
        throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"');
      }

      var key = _toPropertyKey(elementObject.key);

      var placement = String(elementObject.placement);

      if (placement !== "static" && placement !== "prototype" && placement !== "own") {
        throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"');
      }

      var descriptor = elementObject.descriptor;
      this.disallowProperty(elementObject, "elements", "An element descriptor");
      var element = {
        kind: kind,
        key: key,
        placement: placement,
        descriptor: Object.assign({}, descriptor)
      };

      if (kind !== "field") {
        this.disallowProperty(elementObject, "initializer", "A method descriptor");
      } else {
        this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");
        this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");
        this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");
        element.initializer = elementObject.initializer;
      }

      return element;
    },
    toElementFinisherExtras: function (elementObject) {
      var element = this.toElementDescriptor(elementObject);

      var finisher = _optionalCallableProperty(elementObject, "finisher");

      var extras = this.toElementDescriptors(elementObject.extras);
      return {
        element: element,
        finisher: finisher,
        extras: extras
      };
    },
    fromClassDescriptor: function (elements) {
      var obj = {
        kind: "class",
        elements: elements.map(this.fromElementDescriptor, this)
      };
      var desc = {
        value: "Descriptor",
        configurable: true
      };
      Object.defineProperty(obj, Symbol.toStringTag, desc);
      return obj;
    },
    toClassDescriptor: function (obj) {
      var kind = String(obj.kind);

      if (kind !== "class") {
        throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"');
      }

      this.disallowProperty(obj, "key", "A class descriptor");
      this.disallowProperty(obj, "placement", "A class descriptor");
      this.disallowProperty(obj, "descriptor", "A class descriptor");
      this.disallowProperty(obj, "initializer", "A class descriptor");
      this.disallowProperty(obj, "extras", "A class descriptor");

      var finisher = _optionalCallableProperty(obj, "finisher");

      var elements = this.toElementDescriptors(obj.elements);
      return {
        elements: elements,
        finisher: finisher
      };
    },
    runClassFinishers: function (constructor, finishers) {
      for (var i = 0; i < finishers.length; i++) {
        var newConstructor = (0, finishers[i])(constructor);

        if (newConstructor !== undefined) {
          if (typeof newConstructor !== "function") {
            throw new TypeError("Finishers must return a constructor.");
          }

          constructor = newConstructor;
        }
      }

      return constructor;
    },
    disallowProperty: function (obj, name, objectType) {
      if (obj[name] !== undefined) {
        throw new TypeError(objectType + " can't have a ." + name + " property.");
      }
    }
  };
  return api;
}

function _createElementDescriptor(def) {
  var key = _toPropertyKey(def.key);

  var descriptor;

  if (def.kind === "method") {
    descriptor = {
      value: def.value,
      writable: true,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "get") {
    descriptor = {
      get: def.value,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "set") {
    descriptor = {
      set: def.value,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "field") {
    descriptor = {
      configurable: true,
      writable: true,
      enumerable: true
    };
  }

  var element = {
    kind: def.kind === "field" ? "field" : "method",
    key: key,
    placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
    descriptor: descriptor
  };
  if (def.decorators) element.decorators = def.decorators;
  if (def.kind === "field") element.initializer = def.value;
  return element;
}

function _coalesceGetterSetter(element, other) {
  if (element.descriptor.get !== undefined) {
    other.descriptor.get = element.descriptor.get;
  } else {
    other.descriptor.set = element.descriptor.set;
  }
}

function _coalesceClassElements(elements) {
  var newElements = [];

  var isSameElement = function (other) {
    return other.kind === "method" && other.key === element.key && other.placement === element.placement;
  };

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var other;

    if (element.kind === "method" && (other = newElements.find(isSameElement))) {
      if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
        if (_hasDecorators(element) || _hasDecorators(other)) {
          throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
        }

        other.descriptor = element.descriptor;
      } else {
        if (_hasDecorators(element)) {
          if (_hasDecorators(other)) {
            throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ").");
          }

          other.decorators = element.decorators;
        }

        _coalesceGetterSetter(element, other);
      }
    } else {
      newElements.push(element);
    }
  }

  return newElements;
}

function _hasDecorators(element) {
  return element.decorators && element.decorators.length;
}

function _isDataDescriptor(desc) {
  return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);
}

function _optionalCallableProperty(obj, name) {
  var value = obj[name];

  if (value !== undefined && typeof value !== "function") {
    throw new TypeError("Expected '" + name + "' to be a function");
  }

  return value;
}

const customelementprefix="pui";

function identity(a){return a}function attr2bool(a){return null!==a}function isDifferent(a,b){return !Object.is(a,b)}const debounce=(a,b,c=!1)=>{if("function"!=typeof a)throw new TypeError("Expected a function");let d;return function(...e){const f=c&&!d;clearTimeout(d),d=setTimeout(()=>{d=null,c||a.apply(this,e);},b),f&&a.apply(this,e);}};const defaultPropertyDeclaration={observe:!0,reflect:!1,prop2attr:identity,attr2prop:identity,modified:isDifferent};

function defineElement(a,b){return function(c){return c.finisher=function(c){customElements.define(a,c,b);},c}}function property(a){return function(b){if("field"===b.kind){const a=`__${b.key}`;b.extras=[{key:a,kind:b.kind,placement:b.placement,initializer:b.initializer,descriptor:{configurable:!0,enumerable:!0,writable:!0}}],b.kind="method",b.placement="prototype",delete b.initializer,b.descriptor={get(){return this[a]},set(c){const d=this[a];this[a]=c,this.requestUpdate(b.key,d,c);},configurable:!0,enumerable:!0};}return b.finisher=function(c){c.addClassProperty(b.key,a);},b}}

class BaseElement extends HTMLElement{constructor(){if(super(),_defineProperty(this,"_renderRoot",void 0),_defineProperty(this,"_rAFScheduled",!1),_defineProperty(this,"_template",void 0),_defineProperty(this,"_styleElement",void 0),this.attachShadow({mode:"open"}),!this.shadowRoot)throw this._renderRoot=this,new Error("No ShadowRoot");this._renderRoot=this.shadowRoot;}static get observedAttributes(){const a=[];return this.classProperties.forEach((b,c)=>{b.observe&&"string"==typeof c&&a.push(c);}),a}static get classProperties(){return Object.prototype.hasOwnProperty.call(this,"_classProperties")||Object.defineProperty(this,"_classProperties",{enumerable:!0,value:new Map}),this._classProperties}static addClassProperty(a,b){this.classProperties.set(a,Object.assign({},defaultPropertyDeclaration,b));}get template(){return this._template||(this._template=document.createElement("template")),this._template}get styleElement(){return this._styleElement||(this._styleElement=document.createElement("style")),this._styleElement}updateTemplate(){throw new Error("must be implemented by subclass!")}updateStyle(){throw new Error("must be implemented by subclass!")}reflectAttributes(){this.constructor.classProperties.forEach((a,b)=>{if(!a.reflect&&"string"!=typeof b)return;const{prop2attr:c=identity}=a,d=c.call(this,this[b]);null===d?this.removeAttribute(b):this.setAttribute(b,d);});}attributeChangedCallback(a,b,c){if(b!==c){const{attr2prop:b=identity}=this.constructor.classProperties.get(a)||defaultPropertyDeclaration;this[a]=b.call(this,c);}}connectedCallback(){this.isConnected&&this.requestRender(!0,!0,!0);}requestUpdate(a,b,c){const{modified:d=isDifferent,reflect:e=!1}=this.constructor.classProperties.get(a)||defaultPropertyDeclaration;d.call(this,b,c)&&(this.styleElement.innerHTML=this.updateStyle(),this.template.innerHTML=this.updateTemplate(),this.requestRender(!0,!0,e));}requestRender(a,b,c){this.preRenderHook(),this._rAFScheduled||(this._rAFScheduled=!0,requestAnimationFrame(()=>{this.render(a,b,c),this._rAFScheduled=!1;}));}preRenderHook(){}render(a,b,c){b&&this._renderRoot.appendChild(this.styleElement),a&&this._renderRoot.appendChild(this.template.content),c&&this.reflectAttributes();}}

let TextField=_decorate([defineElement(`${customelementprefix}-textfield`)],function(a,b){return {F:class extends b{constructor(...b){super(...b),a(this);}},d:[{kind:"field",key:"_formElement",value:void 0},{kind:"get",key:"formElement",value:function formElement(){return this._formElement||(this._formElement=this.template.content.querySelector("#form-elem")),this._formElement}},{kind:"field",key:"_labelElem",value:void 0},{kind:"get",key:"labelElement",value:function labelElement(){return this._labelElem||(this._labelElem=this.template.content.querySelector("label")),this._labelElem}},{kind:"field",key:"_autocomplete",value(){return !1}},{kind:"get",key:"autocomplete",value:function autocomplete(){return this._autocomplete}},{kind:"set",key:"autocomplete",value:function autocomplete(a){this._autocomplete=a,Reflect.set(this.formElement,"autocomplete",this._autocomplete);}},{kind:"field",key:"_autofocus",value(){return !1}},{kind:"get",key:"autofocus",value:function autofocus(){return this._autofocus}},{kind:"set",key:"autofocus",value:function autofocus(a){this._autofocus=attr2bool(a),Reflect.set(this.formElement,"autofocus",this._autofocus);}},{kind:"field",key:"_disabled",value(){return !1}},{kind:"get",key:"disabled",value:function disabled(){return this._disabled}},{kind:"set",key:"disabled",value:function disabled(a){this._disabled=attr2bool(a),Reflect.set(this.formElement,"disabled",this._disabled);}},{kind:"field",key:"_form",value(){return null}},{kind:"field",key:"_list",value(){return null}},{kind:"field",key:"_name",value(){return ""}},{kind:"get",key:"name",value:function name(){return this._name}},{kind:"set",key:"name",value:function name(a){this.formElement.name=this._name=a;}},{kind:"field",key:"_readOnly",value(){return !1}},{kind:"get",key:"readOnly",value:function readOnly(){return this._readOnly}},{kind:"set",key:"readOnly",value:function readOnly(a){this.formElement.readOnly=this._readOnly=attr2bool(a);}},{kind:"field",key:"_required",value(){return !1}},{kind:"get",key:"required",value:function required(){return this._required}},{kind:"set",key:"required",value:function required(a){this.formElement.required=this._required=attr2bool(a);}},{kind:"field",key:"_type",value(){return "text"}},{kind:"get",key:"type",value:function type(){return this._type}},{kind:"set",key:"type",value:function type(a){this.formElement instanceof HTMLInputElement&&(this.formElement.type=this._type=a);}},{kind:"field",key:"_value",value(){return ""}},{kind:"get",key:"value",value:function value(){return this._value}},{kind:"set",key:"value",value:function value(a){this._value=a,this.formElement.value!==this._value&&(this.formElement.value=this._value);}},{kind:"field",key:"_placeholder",value(){return ""}},{kind:"get",key:"placeholder",value:function placeholder(){return this._placeholder}},{kind:"set",key:"placeholder",value:function placeholder(a){this.formElement.placeholder=this._placeholder=a;}},{kind:"field",key:"_multiline",value(){return !1}},{kind:"get",key:"multiline",value:function multiline(){return this._multiline}},{kind:"set",key:"multiline",value:function multiline(a){this._multiline=a;}},{kind:"field",key:"borderless",value(){return !1}},{kind:"field",key:"className",value(){return ""}},{kind:"field",key:"clearable",value(){return !1}},{kind:"field",key:"defaultValue",value(){return ""}},{kind:"field",key:"error",value(){return ""}},{kind:"field",key:"icon",value:void 0},{kind:"field",key:"info",value(){return ""}},{kind:"field",key:"label",value(){return ""}},{kind:"field",key:"maxLength",value(){return -1}},{kind:"field",key:"minLenght",value(){return -1}},{kind:"field",key:"prefix",value(){return ""}},{kind:"field",key:"resizable",value(){return "none"}},{kind:"method",key:"renderStyle",value://! API change, was: boolean | 'auto' | 'vertical' | 'horizontal' = false
function renderStyle(){return `
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
}`}},{kind:"field",key:"renderIcon",value(){return ()=>this.icon?this.icon:`Icon/ErrorIco`}},{kind:"field",key:"attr2string",value(){return ()=>this.constructor.observedAttributes.map(a=>a in this?`${a}="${this[a]}"`:"").join(" ")}},{kind:"field",key:"renderInput",value(){return ()=>`<input id=form-elem ${this.attr2string()} />`}},{kind:"field",key:"renderTextarea",value(){return ()=>`<textarea id=form-elem ${this.attr2string()} ${"number"==typeof this._multiline?`row=${this._multiline}`:""}></textarea>`}},{kind:"method",key:"renderTemplate",value:function renderTemplate(){return `
<div class=text-field-container>
  <div class=stack-pannel>
    <span id=prefix><slot name=prefix>Prefix</slot></span>
    <label>
      ${this._multiline?this.renderTextarea():this.renderInput()}
      <span id=description><slot>Description/Label/Error/Info</slot></span>
      <i class=defaultIcon><slot name=icon>${this.renderIcon()}</slot></i>
    </label>
    <span id=suffix><slot name=suffix>Suffix</slot></span>
  </div>
</div>`}},{kind:"get",static:!0,key:"observedAttributes",value:function observedAttributes(){return ["autocomplete","autofocus","disabled","form","list","multiline","name","placeholder","readOnly","required","type","value"]}},{kind:"method",key:"attributeChangedCallback",value:function attributeChangedCallback(a,b,c){a in this&&(this[a]=c);}},{kind:"method",key:"forwardProperty",value:function forwardProperty(a,b,c){a&&b in a&&(a[b]=c);}},{kind:"method",key:"preCommitHook",value:function preCommitHook(){this.formElement.addEventListener("change",debounce(()=>this.value=this.formElement.value,50));}}]}},BaseElement);

let Card=_decorate([defineElement(`${customelementprefix}-card`)],function(a,b){return {F:class extends b{constructor(...b){super(...b),a(this);}},d:[{kind:"field",decorators:[property({reflect:!0})],key:"direction",value(){return "column"}},{kind:"field",decorators:[property({reflect:!0})],key:"layout",value(){return ""}},{kind:"get",key:"layoutCSS",value://! API change, was: orientation: 'horizontal' | 'vertical' = 'vertical';
function layoutCSS(){return (this.layout.match(/[0-9]/gu)||[]).map((a,b)=>`.card > :nth-child(${b+1}) {flex:${a} 1 auto;}`).join("\n")}},{kind:"method",key:"updateTemplate",value:function updateTemplate(){return `<section class="card">
  <div class="card-header"><slot name=header></slot></div>
  <div class="card-media"><slot name=media></slot></div>
  <div class="card-body"><slot name=body></slot></div>
  <div class="card-footer"><slot name=footer></slot></div>
</section>`}},{kind:"method",key:"updateStyle",value:function updateStyle(){return `
.card {
  box-sizing: border-box;
  display: flex;
  flex-direction: ${this.direction};
  justify-content: flex-start;
  padding: 1rem;
}
${this.layoutCSS}`}}]}},BaseElement);

let Container=_decorate([defineElement(`${customelementprefix}-container`)],function(a,b){return {F:class extends b{constructor(...b){super(...b),a(this);}},d:[{kind:"field",decorators:[property({reflect:!0})],key:"align",value(){return "center"}},{kind:"field",decorators:[property({reflect:!0})],key:"maxWidth",value(){return null}},{kind:"method",key:"updateTemplate",value:function updateTemplate(){return `<div class=container>
  <slot></slot>
</div>`}},{kind:"method",key:"updateStyle",value:function updateStyle(){return `.container {
  display: flex;
  justify-content: ${"center"===this.align?"center":`flex-${"left"===this.align?"left":"right"}`};
  ${null===this.maxWidth?`max-width: ${this.maxWidth}`:""}
}`}}]}},BaseElement);

let ContentSwitch=_decorate([defineElement(`${customelementprefix}-content-switch`)],function(a,b){return {F:class extends b{constructor(...b){super(...b),a(this);}},d:[{kind:"field",decorators:[property({reflect:!0,attr2prop(a){return +a},prop2attr(a){return a+""}})],key:"defaultIndex",value(){return 1}},{kind:"field",decorators:[property({reflect:!0,attr2prop(a){return +a},prop2attr(a){return a+""}})],key:"selectedIndex",value(){return 1}},{kind:"field",decorators:[property({reflect:!0})],key:"orientation",value(){return "horizontal"}},{kind:"method",key:"updateTemplate",value:function updateTemplate(){return `<div class=content-switch>
  <slot></slot>
</div>`}},{kind:"method",key:"updateStyle",value:function updateStyle(){return ``}}]}},BaseElement);

export { Card, Container, ContentSwitch, TextField };
//# sourceMappingURL=index.esm.js.map
