it('Shows an autocomplete', () => {
	createAutoComplete({
		root: document.querySelector('#target'),
		// fake response from API
		fetchData() {
			return [ { Title: 'Avengers' }, { Title: 'Not Avengers' }, { Title: 'Some other movie' } ];
		},
		renderOption(movie) {
			return movie.Title;
		}
	});
});
