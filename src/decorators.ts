export const defineElement = (name: string, options?: Object) =>
  <T extends { new(...args: any[]): {} }>(classConstructor: T) => {
    customElements.define(name, classConstructor, options);
    return classConstructor;
  }
