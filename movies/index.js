const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'c4a8ca95',
			s: searchTerm
		}
	});
	console.log(response.data);
};

const input = document.querySelector('input');

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

const onInput = (event) => {
	fetchData(event.target.value);
};
// debounce user input (delay 0.5 sec), then get data from API
input.addEventListener('input', debounce(onInput, 500));
