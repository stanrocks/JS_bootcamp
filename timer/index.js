// get user inputs
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

// get circle view
const circle = document.querySelector('circle');
// calculate circle perimeter length
const perimeter = circle.getAttribute('r') * 2 * Math.PI;
// set stroke-dasharray equals to perimeter
circle.setAttribute('stroke-dasharray', perimeter);

let currentOffset = 0;

// run new Timer instance
const timer = new Timer(durationInput, startButton, pauseButton, {
	onStart() {
		console.log('Timer started');
	},
	onTick() {
		circle.setAttribute('stroke-dashoffset', currentOffset);
		currentOffset = currentOffset - 50;
	},
	onComplete() {
		console.log('Timer is completed');
	}
});
