const { forEach, map } = require('./index');

// helper function
const test = (desc, fn) => {
	console.log('----', desc);
	try {
		fn();
	} catch (err) {
		console.log(err.message);
	}
};

// test forEach
test('The forEach function', () => {
	let sum = 0;
	forEach([ 1, 2, 3 ], (value) => {
		sum += value;
	});

	if (sum !== 7) {
		throw new Error('Expected summing array to equal 6');
	}
});

// test map
test('The map function', () => {
	const result = map([ 1, 2, 3 ], (value) => {
		return value * 2;
	});
	// result === [2,4,6]

	if (result[0] !== 2) {
		throw new Error(`Expected to find 2, but bound ${result[0]}`);
	}
	if (result[1] !== 4) {
		throw new Error(`Expected to find 4, but bound ${result[1]}`);
	}
	if (result[2] !== 6) {
		throw new Error(`Expected to find 2, but bound ${result[2]}`);
	}
});
