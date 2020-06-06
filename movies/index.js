// config for movie search
// common autocomplete config properties
const autoCompleteConfig = {
	// render options
	renderOption(movie) {
		// make src empty if get no poster from API (N/A). else - put poster url into img src
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
    <img src="${imgSrc}" />
    ${movie.Title} (${movie.Year})
    `;
	},
	// get more info about that particular movie
	onOptionSelect(movie) {
		onMovieSelect(movie);
	},
	// put movie title to input
	inputValue(movie) {
		return movie.Title;
	},
	// search request to OMDB API
	async fetchData(searchTerm) {
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
		// return response from API
		return response.data.Search;
	}
};

// AutoComplete - instance #1
createAutoComplete({
	// use common autocomplete config properties
	...autoCompleteConfig,
	// add to common config unique properties
	// define output area
	root: document.querySelector('#left-autocomplete')
});

// AutoComplete - instance #2
createAutoComplete({
	// use common autocomplete config properties
	...autoCompleteConfig,
	// add to common config unique properties
	// define output area
	root: document.querySelector('#right-autocomplete')
});

// get details about selected movie from API
const onMovieSelect = async (movie) => {
	// check how movie object looks like
	// console.log(movie);
	// fetch data on selected movie
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'c4a8ca95',
			i: movie.imdbID
		}
	});
	// check response from API
	// console.log(response.data);

	// render response (movie details) in summary area
	document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
	return `
  <article class="media">
    <figure class="media-left"> 
      <p class="image">
        <img src="${movieDetail.Poster}" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <h1>${movieDetail.Title}</h1>
        <h4>${movieDetail.Genre}</h4>
        <p>${movieDetail.Plot}</p>
      </div>
    </div>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
  </article>
  `;
};
