for (let i = 1; i <= 10; i++) {
	console.log('Hello:', i); // Hello: 1-10
}

for (let i = 1; i <= 10; i += 3) {
	console.log('Hello:', i); // Hello: 1,4,7,10
}

// let's generate perfect squares:
for (let i = 1; i <= 20; i++) {
	console.log(`${i} x ${i} = ${i * i}`); // 1, 4, 9, 16...
}

// 50, 40, 30, 20, 10, 0
for (let i = 50; i >= 0; i -= 10) {
	console.log(i);
}

// for loops + arrays:

const animals = [ 'lions', 'tigers', 'bears' ];

for (let i = 0; i < animals.length; i++) {
	console.log(i, animals[i]);
}

// another example:

const myStudents = [
	{
		firstName: 'Zeus',
		grade: 86
	},
	{
		firstName: 'Artemis',
		grade: 97
	},
	{
		firstName: 'Hera',
		grade: 72
	},
	{
		firstName: 'Apollo',
		grade: 90
	}
];

for (let i = 0; i < myStudents.length; i++) {
	let student = myStudents[i];
	console.log(`${student.firstName} scored ${student.grade}`);
}

// Nested for loops:

for (let i = 1; i <= 10; i++) {
	console.log('OUTER LOOP:', i);
	for (let j = 10; j >= 0; j -= 2) {
		console.log('  INNER LOOP', j);
	}
}

// Nested for loops - EXAMPLE 2
// Sum all elements in our 2048 board
const gameBoard = [ [ 4, 32, 8, 4 ], [ 64, 8, 32, 2 ], [ 8, 32, 16, 4 ], [ 2, 8, 4, 2 ] ];

let totalScore = 0;
//outer loop iterates through the rows
for (let i = 0; i < gameBoard.length; i++) {
	let row = gameBoard[i];
	//inner loop iterates over each cell in a given row
	for (let j = 0; j < row.length; j++) {
		totalScore += row[j];
	}
}
