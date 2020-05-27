Math.max(1, 5, 7, 6, 23, 56, 4, 7);
// but how function can be ready to get to any number of arguments?

//The arguments object is available in every function you write (except arrow functions)
//It contains all the arguments passed in.
function sum() {
	//It is NOT an array, we have to turn it into one if we want to use array methods
	const argsArr = [ ...arguments ];
	return argsArr.reduce((total, currVal) => {
		return total + currVal;
	});
}

// No arguments object inside of arrow functions :(
const multiply = () => {
	console.log(arguments);
};

// ============= rest intro ==============
// rest collects elements into array
// its kinda the opposite of spread

// OLD WAY!
// function sum() {
//   const argsArr = [...arguments]
//   return argsArr.reduce((total, currVal) => {
//     return total + currVal
//   })
// }

// New way using rest:
// nums is an array
function sum(...nums) {
	return nums.reduce((total, currVal) => {
		return total + currVal;
	});
}

//We can have named params and then collect the rest into an array:
function fullName(first, last, ...titles) {
	console.log('first', first);
	console.log('last', last);
	console.log('titles', titles);
}

// We can use rest parameters in arrow functions!
const multiply = (...nums) => nums.reduce((total, currVal) => total * currVal);
