// helper function
// helps solve issue when tested function is executed after some time (i.e. debounce)
const waitFor = (selector) => {
	return new Promise((resolve, reject) => {
		// check periodically if function is resolved
		const interval = setInterval(() => {
			if (document.querySelector(selector)) {
				// stop interval and timeout timer
				clearInterval(interval);
				clearTimeout(timeout);
				resolve();
			}
		}, 30);

		// wait for long time, if function is not resolved - means it's been rejected
		const timeout = setTimeout(() => {
			// stop interval running if time is out
			clearInterval(interval);
			reject();
		}, 2000);
	});
};

// code that runs before each 'it'
beforeEach(() => {
	// reset dropdown area
	document.querySelector('#target').innerHTML = '';

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

// check if dropdown is not active (expected behavior)
it('Dropdown starts closed', () => {
	const dropdown = document.querySelector('.dropdown');
	// chai-expect manual: https://www.chaijs.com/guide/styles/#expect
	expect(dropdown.className).not.to.include('is-active');
});

it('After searching. dropdown opens up', async () => {
	const input = document.querySelector('input');
	// put text to text input
	input.value = 'avengers';
	// fake DOM event as if user typed text into text input
	input.dispatchEvent(new Event('input'));

	await waitFor('.dropdown-item');

	const dropdown = document.querySelector('.dropdown');
	// dropdown should be active
	expect(dropdown.className).to.include('is-active');
});
