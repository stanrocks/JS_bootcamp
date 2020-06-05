// get user inputs
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

// run new Timer instance
const timer = new Timer(durationInput, startButton, pauseButton, {
	onStart() {
		console.log('Timer started');
	},
	onTick() {
		console.log('Timer just ticked down');
	},
	onComplete() {
		console.log('Timer is completed');
	}
});
