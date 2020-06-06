const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'c4a8ca95',
			s: searchTerm
		}
	});

	// if no result found - return empty arr
	if (response.data.Error) {
		return [];
	}

	return response.data.Search;
};

const input = document.querySelector('input');

// get data from API
// async mode since gonna use promise
const onInput = async (event) => {
	// await for promise to be resolved
	const movies = await fetchData(event.target.value);
	// create new div with poster and title for every movie
	for (let movie of movies) {
		const div = document.createElement('div');
		div.innerHTML = `
    <img src="${movie.Poster}" />
    <h1>${movie.Title}</h1>
    `;
		// put that div to page target area
		document.querySelector('#target').appendChild(div);
	}
};
// debounce user input (delay 0.5 sec), then run onInput func (get data from API)
input.addEventListener('input', debounce(onInput, 500));
