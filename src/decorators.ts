import { PropertyDeclaration } from './types';
import { BaseElement } from './components/Base/base-element';

export const defineElement = (name: string, options?: Object) =>
  function (classDescriptor: any) {
    classDescriptor.finisher = <T extends { new(...args: any[]): {} }>(classConstructor: T) => customElements.define(name, classConstructor, options);
    return classDescriptor;
  }

export function property(propertyDeclaration?: PropertyDeclaration) {
  // Second parameter (name) just to please TypeScript...
  return function(propertyDescriptor: any, name?: PropertyKey): any {
    const value = propertyDescriptor.initializer();
    // propertyDescriptor.initializer = function initializer() {
    //   console.log('initializer: ', this);
    //   return value;
    // }
    propertyDescriptor.finisher = function finisher(classConstructor: typeof BaseElement) {
      classConstructor.addClassProperty(propertyDescriptor.key, propertyDeclaration);
      // console.log('classConstructor: ', classConstructor, ' value: ', value);
    }
    return propertyDescriptor;
  }
}
