// =========== FUNCTIONS ARE OBJECTS ===========

function add(x, y) {
	return x + y;
}

const subtract = function(x, y) {
	return x - y;
};

function multiply(x, y) {
	return x * y;
}

const divide = function(x, y) {
	return x / y;
};

//We can store functions in an array!
const operations = [ add, subtract, multiply, divide ];

//Loop over all the functions in operations
for (let func of operations) {
	let result = func(30, 5); //execute func!
	console.log(result);
}

// We can also store functions in objects!
const thing = {
	doSomething: multiply
};
thing.doSomething(4, 5); //20
// this is a method

// =========== HIGHER ORDER FUNCTIONS ===========

// This function accepts another function as an argument
function callThreeTimes(f) {
	//And calls it 3 times:
	f();
	f();
	f();
}

function cry() {
	console.log("BOO HOO I'M SO SAD!");
}

function rage() {
	console.log('I HATE EVERYTHING!');
}

function repeatNTimes(action, num) {
	// call action (a function) num number of times
	for (let i = 0; i < num; i++) {
		action();
	}
}

repeatNTimes(rage, 13);

// Accepts 2 functions as arguments
// Randomly selects 1 to execute
function pickOne(f1, f2) {
	let rand = Math.random();
	if (rand < 0.5) {
		f1();
	} else {
		f2();
	}
}

// RETURN A FUNCTION FROM WITHIN A FUNCTION

// This function returns a function!
function multiplyBy(num) {
	return function(x) {
		return x * num;
	};
}

//triple holds a function:
const triple = multiplyBy(3);
//we can call it:
triple(4); //12
triple(10); //30

const double = multiplyBy(2);
double(3); //6
double(9); //18

const halve = multiplyBy(0.5);
halve(5); //2.5
halve(100); //50

// This function also acts as a "function factory"
function makeBetweenFunc(x, y) {
	return function(num) {
		return num >= x && num <= y;
	};
}
// This function checks if a value is between 0 and 18
const isChild = makeBetweenFunc(0, 18);
isChild(10); //true
isChild(56); //false

const isInNineties = makeBetweenFunc(1990, 1999);
isInNineties(1994); //true
isInNineties(1987); //false

const isNiceWeather = makeBetweenFunc(60, 79);
isNiceWeather(68); //true
isNiceWeather(98); //false
