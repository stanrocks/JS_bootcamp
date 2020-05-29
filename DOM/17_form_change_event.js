const creditCardInput = document.querySelector('#cc');
const termsCheckbox = document.querySelector('#terms');
const veggieSelect = document.querySelector('#veggie');

const formData = {};

for (let input of [
	creditCardInput,
	termsCheckbox,
	veggieSelect
]) {
	// instead of 'input' we can use 'change' event - same, but not every typing in CC will trigger event. only blur or submit
	// destructuring event to target object that is a part of event object
	input.addEventListener('input', ({ target }) => {
		const { name, type, value, checked } = target; // destructuring target to several const
		formData[name] = type === 'checkbox' ? checked : value; // since checkbox doesn't have value, we check if type is checkbox, in that case save checked status, else save value
		console.log(formData);
	});
}

// // event is not 'submit' but 'input':
// creditCardInput.addEventListener('input', (e) => {
// 	console.log('CC changed', e);
// 	formData['cc'] = e.target.value;
// });

// veggieSelect.addEventListener('input', (e) => {
// 	console.log('Veggie changed', e);
// 	formData['veggie'] = e.target.value;
// });

// termsCheckbox.addEventListener('input', (e) => {
// 	console.log('Terms changed', e);
// 	formData['terms'] = e.target.checked;
// });
