let num = 7;

// example 1

// classic way:
if (num === 7) {
	console.log('lucky!');
} else {
	console.log('BAD!');
}

// using ternary operator:
// condition ? doThisIfTrue : doThisIfFalse
num === 7 ? console.log('lucky') : console.log('BAD!');

// example 2

let status = 'offline';

// classic way:
let color;
if (status === 'offline') {
	color = 'red';
} else {
	color = 'green';
}

let color = status === 'offline' ? 'red' : 'green';
