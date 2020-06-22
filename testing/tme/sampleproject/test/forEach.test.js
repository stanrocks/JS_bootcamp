const assert = require('assert');
const { forEach } = require('../index');

let numbers;
beforeEach(() => {
	// initialize array with those numbers before each test (for the sake of fake testing)
	numbers = [ 1, 2, 3 ];
});

it('should sum an array', () => {
	let total = 0;
	forEach(numbers, (value) => {
		total += value;
	});

	assert.strictEqual(total, 6);
	// trying to destroy array to brake test (will brake testing if beforeEach is not working)
	numbers.push(3);
	numbers.push(3);
	numbers.push(3);
	numbers.push(3);
});

it('beforeEach is ran each time', () => {
	// array should be reset to initial state with beforeEach
	assert.strictEqual(numbers.length, 4);
});
