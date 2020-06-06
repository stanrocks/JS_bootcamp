const createAutoComplete = ({ root, renderOption }) => {
	// create output area (root) with html-structure
	root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

	const input = root.querySelector('input');
	const dropdown = root.querySelector('.dropdown');
	const resultsWrapper = root.querySelector('.results');

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
			option.classList.add('dropdown-item');
			option.innerHTML = renderOption(movie);

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
};
