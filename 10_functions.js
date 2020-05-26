// function declaration (or function statement)
// function funcName(){
// do something
// }

// run function once:
// funcName()

// ============= LETS ROLL DICES =============

// Define our first function
function rollDie() {
	// Pick a random number from 1-6
	// - Math.random() gives us a decimal from 0-1
	// - We multiply by 6, so now we have a random number between 0 up to 6 (but not including 6).  Something like 3.490823 or 5.991234
	// - Then we floor to remove the decimal,  leaving us with a whole number from 0-5
	//- Lastly we add one, to get a number between 1 and 6
	let roll = Math.floor(Math.random() * 6) + 1;
	console.log(`Rolled: ${roll}`);
}

// ============= ARGUMENTS =============

// EXAMPLE 2
function rollDie() {
	let roll = Math.floor(Math.random() * 6) + 1;
	console.log(`Rolled: ${roll}`);
}
// We can now specify how many dice to roll!
function throwDice(numRolls) {
	for (let i = 0; i < numRolls; i++) {
		rollDie();
	}
}

throwDice(2);
throwDice(6);

// ============= RETURN STATEMENT =============

// No return!
function add(x, y) {
	console.log(x + y);
}

// This version returns the sum of x & y;
function add(x, y) {
	return x + y;
}

// We can capture the return value:
const total = add(4, 9); //13

// MORE ON RETURN - return breaks execution

function square(x) {
	return x * x;
	console.log('ALL DONE!'); //this NEVER runs;
}

// One way of writing this function
function isPurple(color) {
	if (color.toLowerCase() === 'purple') {
		return true;
	} else {
		return false;
	}
}

// We don't need the else!
function isPurple(color) {
	if (color.toLowerCase() === 'purple') {
		return true;
	}
	return false;
}

// An even shorter way!
function isPurple(color) {
	return color.toLowerCase() === 'purple';
}

function containsPurple(arr) {
	for (let color of arr) {
		if (color === 'purple' || color === 'magenta') {
			return true;
		}
	}
	return false;
}
