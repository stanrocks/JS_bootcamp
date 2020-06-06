// debounce an input - delay (default = 1 sec) on input
const debounce = (func, delay = 1000) => {
	let timeoutId;
	// take all possible arguments
	return (...args) => {
		// reset timer after second or more inputs
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		// run function if timer goes out
		timeoutId = setTimeout(() => {
			// passing all arguments inside function
			func.apply(null, args);
		}, delay);
	};
};
