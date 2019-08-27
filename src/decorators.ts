// type Constructor<T> = { new(...args: any[]): {} };

// // From the TC39 Decorators proposal
// interface ClassElement {
//   kind: 'field'|'method';
//   key: PropertyKey;
//   placement: 'static'|'prototype'|'own';
//   initializer?: Function;
//   extras?: ClassElement[];
//   finisher?: <T extends { new(...args: any[]): {} }>(classConstructor: T) => any;
//   descriptor?: PropertyDescriptor;
// }

// // From the TC39 Decorators proposal
// interface ClassDescriptor {
//   kind: 'class';
//   elements: ClassElement[];
//   finisher?: <T extends { new(...args: any[]): {} }>(classConstructor: T) => any;
// }

export const defineElement = (name: string, options?: Object) =>
  (classDescriptor: any) => {
    classDescriptor.finisher = <T extends { new(...args: any[]): {} }>(classConstructor: T) => customElements.define(name, classConstructor, options);
    return classDescriptor;
  }

//TODO - unnecessary?
// export const defineElementLegacy = (name: string, options?: Object) =>
//   <T extends { new(...args: any[]): {} }>(classConstructor: T) => {
//     customElements.define(name, classConstructor, options);
//     return classConstructor;
//   }

export const property = (options?: any) =>
  (classDescriptorOrPrototype: any) => {
    let myDescriptor = { opts: options };
    return myDescriptor;
  }
