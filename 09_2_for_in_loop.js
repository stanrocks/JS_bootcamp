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

// ================================================

const jeopardyWinnings = {
	regularPlay: 2522700,
	watsonChallenge: 300000,
	tournamentOfChampions: 500000,
	battleOfTheDecades: 100000
};

for (let prop in jeopardyWinnings) {
	console.log(prop); // regularPlay... prints keys each on new line
	console.log(jeopardyWinnings[prop]); // 2522700 ...
}

let total = 0;
for (let prop in jeopardyWinnings) {
	total += jeopardyWinnings[prop]; // 3422700
}

console.log(`Ken Jennings Total Earnings: ${total}`);
