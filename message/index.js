// destruct hash
const { hash } = window.location;

// remove # from hash
const message = atob(hash.replace('#', ''));

if (message) {
	document.querySelector('#message-form').classList.add('hide');
	document.querySelector('#message-show').classList.remove('hide');

	document.querySelector('h1').innerHTML = message;
}

document.querySelector('form').addEventListener('submit', (event) => {
	event.preventDefault();

	document.querySelector('#message-form').classList.add('hide');
	document.querySelector('#link-form').classList.remove('hide');

	const input = document.querySelector('#message-input');
	// console.log(input.value);
	const encrypted = btoa(input.value);

	const linkInput = document.querySelector('#link-input');
	linkInput.value = `${window.location}#${encrypted}`;
	linkInput.select();
});
