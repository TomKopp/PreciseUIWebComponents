import { PropertyDeclaration } from './types';
import { BaseElement } from './components/Base/base-element';

export const defineElement = (name: string, options?: Object) =>
  function (classDescriptor: any) {
    classDescriptor.finisher = function finisher(classConstructor: typeof BaseElement) {
      customElements.define(name, classConstructor, options);
    }
    return classDescriptor;
  }

export function property(propertyDeclaration?: PropertyDeclaration) {
  // Second parameter (name) just to please TypeScript...
  return function (propertyDescriptor: any, name?: PropertyKey): any {
    /*
    If the decorator is invoked on an field property it generates accessors with that name
    and a somewhat hidden storage property.
    The accessors are necessary to react on property changes with an render update.
    */
    if (propertyDescriptor.kind === 'field') {
      const propertyKey = `__${propertyDescriptor.key}`;
      propertyDescriptor.extras = [{
        key: propertyKey,
        kind: propertyDescriptor.kind,
        placement: propertyDescriptor.placement,
        initializer: propertyDescriptor.initializer,
        descriptor: {
          configurable: true,
          enumerable: true,
          writable: true
        }
      }];

      propertyDescriptor.kind = 'method';
      propertyDescriptor.placement = 'prototype';
      delete propertyDescriptor.initializer;
      propertyDescriptor.descriptor = {
        get() { return this[propertyKey]; },
        set(val: any) {
          if (this[propertyKey] === val) return;
          this[propertyKey] = val;
          this.requestUpdate();
        },
        configurable: true,
        enumerable: true
      };
    }
    propertyDescriptor.finisher = function finisher(classConstructor: typeof BaseElement) {
      classConstructor.addClassProperty(propertyDescriptor.key, propertyDeclaration);
    }
    return propertyDescriptor;
  }
}
