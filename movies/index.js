const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'c4a8ca95',
			s: searchTerm
		}
	});
	return response.data.Search;
};

const input = document.querySelector('input');

const onInput = async (event) => {
	const movies = await fetchData(event.target.value);
	console.log(movies);
};
// debounce user input (delay 0.5 sec), then get data from API
input.addEventListener('input', debounce(onInput, 500));
