export declare const defineElement: (name: string, options?: Object | undefined) => (classDescriptor: any) => any;
export declare const defineElementLegacy: (name: string, options?: Object | undefined) => <T extends new (...args: any[]) => {}>(classConstructor: T) => T;
