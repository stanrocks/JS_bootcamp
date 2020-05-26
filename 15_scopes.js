// =========== FUNCTION SCOPE ===========

//These variables are SCOPED to the function
function lol() {
	let person = 'Tom';
	const age = 45;
	var color = 'teal';
	console.log(age);
}
// These variables are SCOPED to changeColor()
function changeColor() {
	let color = 'purple';
	const age = 19;
	console.log(age);
}
lol();
changeColor();
age; //DOES NOT EXIST!
color; //DOES NOT EXIST!
person; //DOES NOT EXIST!

let bird = 'mandarin duck';

function birdWatch() {
	//this bird is scoped to birdWatch()
	let bird = 'golden pheasant';
	console.log(bird); //"golden pheasant"
}
birdWatch();
console.log(bird); //"mandarin duck"

// =========== BLOCK SCOPE ===========

// let & const are BLOCK SCOPED
if (true) {
	const animal = 'eel';
	console.log(animal); //'eel'
}
console.log(animal); //NOT DEFINED!

// VAR IS NOT BLOCK SCOPED
if (true) {
	var animal = 'eel';
	console.log(animal); //'eel'
}
console.log(animal); //'eel'

// let animals = ['grizzly bear', 'panda bear', 'spectacled bear'];
// var i = 10;
// for (var i = 0; i < animals.length; i++) {
//   console.log(i, animals[i])
// }
// console.log(i)

// let animals = ['grizzly bear', 'panda bear', 'spectacled bear'];
// let i = 10;
// for (let i = 0; i < animals.length; i++) {
//   console.log(i, animals[i])
// }
// console.log(i)

function doubleArr(arr) {
	const result = []; //scoped to the doubleArr function
	for (let num of arr) {
		let double = num * 2; //scoped to this loop
		result.push(double);
	}
	return result;
}

// =========== LEXICAL SCOPE ===========

function outer() {
	let movie = 'Amadeus';

	function inner() {
		// let movie = "The Shining";

		function extraInner() {
			//movie is not defined in this function
			//but it has access to parent function's variables
			console.log(movie.toUpperCase());
		}
		extraInner();
	}
	inner();
}

outer(); //'AMADEUS'
