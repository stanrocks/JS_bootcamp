const assert = require('assert');

it('has a text input', async () => {
	const dom = await render('index.html');

	// console.log(dom);
	const input = dom.window.document.querySelector('input');

	assert(input); // will throw an error if input doesn't exist
});

it('shows a success message with a valid email', async () => {
	const dom = await render('index.html');

	const input = dom.window.document.querySelector('input');
	input.value = 'alksd@skdljf.com'; // emulate user input of proper email (with '@')

	dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit')); // emulate user submitting form

	// check h1 that should change after user submit
	const h1 = dom.window.document.querySelector('h1');

	console.log('Contents of h1:', h1.innerHTML);
});
