const form = document.querySelector('#signup-form');

const creditCardInput = document.querySelector('#cc');
const termsCheckbox = document.querySelector('#terms');
const veggieSelect = document.querySelector('#veggie');

form.addEventListener('submit', function(e) {
	e.preventDefault(); // form is not submitting anymore!!!
	// alert('SUBMITTED THE FORM!');
	// console.log(e);
	// extracting information from form:
	console.log('cc', creditCardInput.value);
	console.log('terms', termsCheckbox.checked); // since its a checkbox
	console.log('veggie', veggieSelect.value);
});
