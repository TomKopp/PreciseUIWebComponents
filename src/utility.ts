export const noop = () => {};

export const booleanAttribute2Boolean = (val: any) => Boolean(val === '' ? true : val);

// I hate TypeScript and at this point it is just annoying.
export const debounce = (func: any, wait: number, immediate: boolean = false) => {
	if (typeof func !== 'function') {
		throw new TypeError('Expected a function');
	}

	let timeout: number | undefined;

	return function debounced(...args: any[]) {
		const later = () => {
			timeout = undefined;
			if (!immediate) {
        //@ts-ignore-next-line
				func.apply(this, args);
			}
    };

		const callNow = immediate && !timeout;

    clearTimeout(timeout);
    //@ts-ignore-next-line
    timeout = setTimeout(later, wait);

		if (callNow) {
      //@ts-ignore-next-line
			func.apply(this, args);
		}
	};
};
