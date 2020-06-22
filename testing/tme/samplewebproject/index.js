document.querySelector('form').addEventListener('submit', (event) => {
	event.preventDefault();

	const { value } = document.querySelector('input');

	const header = document.querySelector('h1');

	// test if input is a valid email
	if (value.includes('@')) {
		// must be valid
		header.innerHTML = 'Looks good!';
	} else {
		// must be invalid
		header.innerHTML = 'Invalid email';
	}
});