export declare function noop(): void;
export declare function identity(val: any): any;
export declare function attr2bool(val: string): boolean;
export declare function bool2attr(val: boolean): "" | null;
export declare function isDifferent(oldValue: any, newValue: any): boolean;
export declare const debounce: (func: Function, wait: number, immediate?: boolean) => (...args: any[]) => void;
export declare const rAFthrottle: (func: Function, immediate?: boolean) => (...args: any[]) => void;
export interface PropertyDeclaration {
    observe?: boolean;
    reflect?: boolean;
    prop2attr?: Function;
    attr2prop?: Function;
    modified?: Function;
}
export declare const defaultPropertyDeclaration: {
    observe: boolean;
    reflect: boolean;
    prop2attr: typeof identity;
    attr2prop: typeof identity;
    modified: typeof isDifferent;
};
