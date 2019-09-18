import { PropertyDeclaration } from './utility';
export declare function defineElement(name: string, options?: ElementDefinitionOptions): (classDescriptor: any) => any;
export declare function property(propertyDeclaration?: PropertyDeclaration): (propertyDescriptor: any, name?: string | number | symbol | undefined) => any;
