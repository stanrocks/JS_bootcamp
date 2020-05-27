// =========== spread for function calls ===========

Math.max(3, 4, 5, 6, 7, 12, 19, 99, 3); // 99
const nums = [ 45, 23, 34, 7, 5 ];
Math.max(nums); // NaN - since nums is array, not a number
Math.max(...nums); // 45

// other example:

function giveMeFour(a, b, c, d) {
	console.log('a', a);
	console.log('b', b);
	console.log('c', c);
	console.log('d', d);
}

const colors = [ 'red', 'orange', 'yellow', 'green' ];

// Without spread:
giveMeFour(colors);
// a ["red", "orange", "yellow", "green"]
// b undefined
// c undefined
// d undefined

// WITH SPREAD!!!
// Values are passed as separate args:
giveMeFour(...colors);
// a 'red'
// b 'orange'
// c 'yellow'
// d 'green'

//We can also spread strings!
giveMeFour(...'GOAT');
// a G
// b O
// c A
// d T

// =========== spread in array literals ===========

const cephalopods = [ 'dumbo octopus', 'humboldt squid', 'flamboyant cuttlefish' ];

const gastropods = [ 'giant african snail', 'banana slug', 'variable neon slug' ];

const cnidaria = [ 'fire coral', 'moon jelly' ];

const mollusca = [ ...cephalopods, ...gastropods ];
//["dumbo octopus", "humboldt squid", "flamboyant cuttlefish", "giant african snail", "banana slug", "variable neon slug"]

const inverts = [ ...cnidaria, ...gastropods, ...cephalopods ];
//["fire coral", "moon jelly", "giant african snail", "banana slug", "variable neon slug", "dumbo octopus", "humboldt squid", "flamboyant cuttlefish"]

const cephCopy = [ ...cephalopods ];
//["dumbo octopus", "humboldt squid", "flamboyant cuttlefish"]

// =========== spread in object literals ===========

const feline = {
	legs: 4,
	family: 'Felidae'
};

const canine = {
	family: 'Caninae',
	furry: true,
	legs: 4
};

const dog = {
	...canine,
	isPet: true,
	adorable: true
};
//{family: "Caninae", furry: true, legs: 4, isPet: true, adorable: true}

const houseCat = {
	...feline,
	isGrumpy: true,
	personality: 'unpredictable'
};
//{legs: 4, family: "Felidae", isGrumpy: true, personality: "unpredictable"}

const catDog = {
	...canine,
	...feline
};
//{family: "Felidae", furry: true, legs: 4}

//Order matters! Legs will be 3 here, because we set it AFTER spreading canine.
const tripod = {
	...canine,
	legs: 3
};
//{family: "Caninae", furry: true, legs: 3}

const catDogClone = {
	...catDog
};

const random = [
	...'hello',
	{
		...catDog
	}
];
