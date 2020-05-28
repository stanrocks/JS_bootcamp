// ARRAYS ARE NOT IDEAL FOR STORING ALL TYPES OF DATA.

// We could use an array if we made sure we always follow the same pattern:
//index 0: total steps
//index 1: total floors
//etc.
const fitbitData = [ 308756, 1814, 211 ];

//We have no insight into WHAT we are storing at each index

//And we could mess things up super easily if we're not careful
const lucyFitbitData = [ 12344, 1814, 211 ];

// OBJECTS TO THE RESCUE!

// ===============

const palette = {
	red: '#eb4d4b',
	yellow: '#f9ca24',
	blue: '#30336b'
};

//DOT NOTATION
palette.red; //'#eb4d4b'

//SQUARE BRACKET NOTATION
palette['yellow']; //'#f9ca24'

//With square brackets, we can also use dynamic key names:

let mysteryColor = 'blue';
palette[mysteryColor]; //'#30336b'

// ==============
const userReviews = {};

//Adding a new property:
userReviews['queenBee49'] = 4.0;
userReviews.mrSmith78 = 3.5;

//Updating existing properties
userReviews['queenBee49'] += 2;
userReviews.mrSmith78++;

// ==============

const student = {
	firstName: 'David',
	lastName: 'Jones',
	strengths: [ 'Music', 'Art' ],
	exams: {
		midterm: 92,
		final: 88
	}
};

const avg = (student.exams.midterm + student.exams.final) / 2;

const shoppingCart = [
	{
		product: 'Jenga Classic',
		price: 6.88,
		quantity: 1
	},
	{
		product: 'Echo Dot',
		price: 29.99,
		quantity: 3
	},
	{
		product: 'Fire Stick',
		price: 39.99,
		quantity: 2
	}
];

const game = {
	player1: {
		username: 'Blue',
		playingAs: 'X'
	},
	player2: {
		username: 'Muffins',
		playingAs: 'O'
	},
	board: [ [ 'O', null, 'X' ], [ 'X', 'O', 'X' ], [ null, 'O', 'X' ] ]
};

// ============
const palette = {
	red: '#eb4d4b',
	yellow: '#f9ca24',
	blue: '#30336b'
};
//Objects & Arrays are reference types
const palette2 = palette;
//If we change one value...
palette2.green = '#ebf876';

//Both variables reflect that change...
palette.green; //"#ebf876"
palette2.green; //"#ebf876"

// ============

let nums = [ 1, 2, 3 ];
let mystery = [ 1, 2, 3 ];
let moreNums = nums;

//They 'look' the same, but refer to different arrays
nums === mystery; // false

//These two arrays reference the exact same array, so we get true:
nums === moreNums; //true

const user = {
	username: 'CherryGarcia8',
	email: 'garcia@gmail.com',
	notifications: [ 'message', 'alert' ]
};

//THIS WILL NOT WORK!
if (user.notifications === []) {
	console.log('NO NEW NOTIFICATIONS!');
}
// THIS VERSION DOES WORK!
if (!user.notifications.length) {
	console.log('NO NEW NOTIFICATIONS!');
}

// ============= shorthand object properties =============

// const getStats = (arr) => {
//   const max = Math.max(...arr);
//   const min = Math.min(...arr);
//   const sum = arr.reduce((sum, r) => sum + r);
//   const avg = sum / arr.length;
// The "old" way:
//   return {
//     max: max,
//     min: min,
//     sum: sum,
//     avg: avg
//   }
// }

const getStats = (arr) => {
	const max = Math.max(...arr);
	const min = Math.min(...arr);
	const sum = arr.reduce((sum, r) => sum + r);
	const avg = sum / arr.length;
	// Using the new shorthand property syntax:
	return {
		max,
		min,
		sum,
		avg
	};
};
const reviews = [ 4.5, 5.0, 3.44, 2.8, 3.5, 4.0, 3.5 ];

const stats = getStats(reviews);

function pick(arr) {
	//return random element from arr
	const idx = Math.floor(Math.random() * arr.length);
	return arr[idx];
}

function getCard() {
	const values = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ];
	const suits = [ 'clubs', 'spades', 'hearts', 'diamonds' ];
	const value = pick(values);
	const suit = pick(suits);
	return {
		value,
		suit
	};
}

// ============= computed object properties =============

const role = 'host';
const person = 'Jools Holland';
const role2 = 'Director';
const person2 = 'James Cameron';

// The old way:
// Make the object
// const team = {};
// Then add a property using dynamic key:
// team[role] = person;
// team[role2] = person2;

// USING COMPUTED PROPERTIES!
const team = {
	[role]: person,
	[role2]: person2,
	[1 + 6 + 9]: 'sixteen'
};

// function addProp(obj, k, v) {
//   const copy = {
//     ...obj
//   };
//   copy[k] = v;
//   return copy;
// }

// const addProp = (obj, k, v) => {
//   return {
//     ...obj,
//     [k]: v
//   }
// }

const addProp = (obj, k, v) => ({
	...obj,
	[k]: v
});
const res = addProp(team, 'happy', ':)');
