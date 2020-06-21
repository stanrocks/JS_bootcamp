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

	// check if dropdown is not active (expected behavior)
	const dropdown = document.querySelector('.dropdown');

	// chai-expect manual: https://www.chaijs.com/guide/styles/#expect
	expect(dropdown.className).not.to.include('is-active');
});
