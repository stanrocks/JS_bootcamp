// Adding methods to an object!
const math = {
	numbers: [ 1, 2, 3, 4, 5 ],
	add: function(x, y) {
		return x + y;
	},
	multiply: function(x, y) {
		return x * y;
	}
};

// To execute multiply:
math.multiply(5, 9); //45

// Method shorthand syntax:
const math = {
	add(x, y) {
		return x + y;
	},
	multiply(x, y) {
		return x * y;
	}
};

// Method shorthand syntax, example 2:
const auth = {
	username: 'TommyBot',
	login() {
		console.log('LOGGED YOU IN!');
	},
	logout() {
		console.log('GOODBYE');
	}
};
