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

let timeoutId;

// filtering user input. wait while user typing, then fetch
const onInput = (event) => {
	// after second or next inputs - reset timer
	if (timeoutId) {
		clearTimeout(timeoutId);
	}
	// if timer goes out - fetch data
	timeoutId = setTimeout(() => {
		fetchData(event.target.value);
	}, 1000);
};

input.addEventListener('input', onInput);
