const input = document.querySelector('#username');

// this includes things like shift, arrow-keys, tab, etc
input.addEventListener('keydown', function(e) {
	console.log('KEY DOWN!');
});

input.addEventListener('keyup', function(e) {
	console.log('KEY UP!');
});

// intended to listen for actual input that lead to symbol appearance
input.addEventListener('keypress', function(e) {
	console.log('KEY PRESS!');
});

const addItemInput = document.querySelector('#addItem');
const itemsUL = document.querySelector('#items');

addItemInput.addEventListener('keypress', function(e) {
	if (e.key === 'Enter') {
		if (!this.value) return; //if input is empty, skip everything
		//add a new item to list
		const newItemText = this.value;
		const newItem = document.createElement('li');
		newItem.innerText = newItemText;
		itemsUL.appendChild(newItem);
		this.value = '';
	}
});
