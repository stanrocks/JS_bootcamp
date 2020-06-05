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

// create global variable to pass between timer methods
let duration;

// run new Timer instance
const timer = new Timer(durationInput, startButton, pauseButton, {
	onStart(totalDuration) {
		// timer total duration (set by user at start)
		duration = totalDuration;
	},
	onTick(timeRemaining) {
		// calculate offset with formula
		circle.setAttribute('stroke-dashoffset', perimeter * timeRemaining / duration - perimeter);
	},
	onComplete() {
		console.log('Timer is completed');
	}
});
