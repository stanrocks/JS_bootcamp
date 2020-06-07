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
	root: document.querySelector('#left-autocomplete'),
	// get more info about that particular movie
	onOptionSelect(movie) {
		// hide tutorial element
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
	}
});

// AutoComplete - instance #2
createAutoComplete({
	// use common autocomplete config properties
	...autoCompleteConfig,
	// add to common config unique properties
	// define output area
	root: document.querySelector('#right-autocomplete'),
	// get more info about that particular movie
	onOptionSelect(movie) {
		// hide tutorial element
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
	}
});

// vars to store movies to compare
let leftMovie;
let rightMovie;

// get details about selected movie from API
const onMovieSelect = async (movie, summaryElement, side) => {
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
	summaryElement.innerHTML = movieTemplate(response.data);

	// store response for particular search side
	if (side === 'left') {
		leftMovie = response.data;
	}
	if (side === 'right') {
		rightMovie = response.data;
	}

	// if response exist for both searches - let's compare
	if (leftMovie && rightMovie) {
		runComparison();
	}
};

const runComparison = () => {
	// make arrays of html elements that consist statistics for both movies
	const leftSideStats = document.querySelectorAll('#left-summary .notification');
	const rightSideStats = document.querySelectorAll('#right-summary .notification');

	// compare every html element (stat)
	leftSideStats.forEach((leftStat, index) => {
		// for every stat of left move fine corresponding stat of right movie
		const rightStat = rightSideStats[index];
		// console.log(leftStat, rightStat);
		// get data from 'data-value' attribute of those html elements
		const leftSideValue = leftStat.dataset.value;
		const rightSideValue = rightStat.dataset.value;

		// change color of html element depending on value
		if (rightSideValue > leftSideValue) {
			leftStat.classList.remove('is-primary');
			leftStat.classList.add('is-warning');
		} else {
			rightStat.classList.remove('is-primary');
			rightStat.classList.add('is-warning');
		}
	});
};

const movieTemplate = (movieDetail) => {
	// parse details
	// convert box office ('$629,000,000' -> 629000000)
	// delete $ sign and commas and convert string to int
	const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
	// convert metascore string to int
	const metascore = parseInt(movieDetail.Metascore);
	// convert imdbRating string to float
	const imdbRating = parseFloat(movieDetail.imdbRating);
	// delete commas and convert string to int ('1,254,123' -> 1254123)
	const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
	// check parsing results
	// console.log(dollars, metascore, imdbRating, imdbVotes);

	// split awards string to array of words and check if word is a number
	const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
		const value = parseInt(word);
		if (isNaN(value)) {
			return prev;
		} else {
			// if word is a number - sum up with previous number
			return prev + value;
		}
	}, 0);
	// check how awards counted
	// console.log(awards);

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
  <article data-value=${awards} class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
  </article>
  <article data-value=${dollars} class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
  </article>
  <article data-value=${metascore} class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore</p>
  </article>
  <article data-value=${imdbRating} class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
  </article>
  <article data-value=${imdbVotes} class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
  </article>
  `;
};
