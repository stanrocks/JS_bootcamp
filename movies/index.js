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

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

// get data from API
// async mode since gonna use promise
const onInput = async (event) => {
	// await for promise to be resolved
	const movies = await fetchData(event.target.value);
	// make dropdown visible
	dropdown.classList.add('is-active');
	// create new div with poster and title for every movie
	for (let movie of movies) {
		const option = document.createElement('a');
		option.classList.add('dropdown-item');
		option.innerHTML = `
    <img src="${movie.Poster}" />
    ${movie.Title}
    `;
		// put that option to results output area
		resultsWrapper.appendChild(option);
	}
};
// debounce user input (delay 0.5 sec), then run onInput func (get data from API)
input.addEventListener('input', debounce(onInput, 500));
