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

const onInput = (event) => {
	fetchData(event.target.value);
};
// debounce user input (delay 0.5 sec), then get data from API
input.addEventListener('input', debounce(onInput, 500));
