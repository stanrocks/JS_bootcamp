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

// create output area (root) with html-structure
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
	// hide dropdown and stop function if no movies found
	if (!movies.length) {
		dropdown.classList.remove('is-active');
		return;
	}
	// clear results (from previous search)
	resultsWrapper.innerHTML = '';
	// make dropdown visible
	dropdown.classList.add('is-active');
	// create new div with poster and title for every movie
	for (let movie of movies) {
		const option = document.createElement('a');
		// make src empty if get no poster from API (N/A). else - put poster url into img src
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		option.classList.add('dropdown-item');
		option.innerHTML = `
    <img src="${imgSrc}" />
    ${movie.Title}
    `;

		// movie selection
		option.addEventListener('click', () => {
			// hide dropdown
			dropdown.classList.remove('is-active');
			// put movie title to input
			input.value = movie.Title;
			// get more info about that particular movie
			onMovieSelect(movie);
		});
		// put that option to results output area
		resultsWrapper.appendChild(option);
	}
};
// debounce user input (delay 0.5 sec), then run onInput func (get data from API)
input.addEventListener('input', debounce(onInput, 500));

// close dropdown
document.addEventListener('click', (event) => {
	// shows element that's been clicked by user
	// console.log(event.target);
	// hide dropdown menu if clicked outside root-area (area with input and dropdown)
	if (!root.contains(event.target)) {
		dropdown.classList.remove('is-active');
	}
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
