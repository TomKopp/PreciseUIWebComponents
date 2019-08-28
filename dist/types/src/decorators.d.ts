import { PropertyDeclaration } from './types';
export declare const defineElement: (name: string, options?: Object | undefined) => (classDescriptor: any) => any;
export declare function property(propertyDeclaration?: PropertyDeclaration): (propertyDescriptor: any, name?: string | number | symbol | undefined) => any;
