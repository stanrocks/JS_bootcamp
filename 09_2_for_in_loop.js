// Use for…of to iterate over the values in an iterable, like an array
// Use for…in to iterate over the properties of an object (the object keys):

let oldCar = {
	make: 'Toyota',
	model: 'Tercel',
	year: '1996'
};

for (let key in oldCar) {
	console.log(`${key} --> ${oldCar[key]}`);
}
// make --> Toyota
// model --> Tercel

// You can also use for…in to iterate over the index values of an iterable like an array or a string:

let str = 'Turn the page';

for (let index in str) {
	console.log(`Index of ${str[index]}: ${index}`);
}

// Index of T: 0
// Index of u: 1
