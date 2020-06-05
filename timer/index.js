class Timer {
	constructor(durationInput, startButton, pauseButton) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;

		this.startButton.addEventListener('click', this.start);
		this.pauseButton.addEventListener('click', this.pause);
	}

	start = () => {
		// run tick once immediately right after start
		this.tick();
		// store timer ID inside this.timer
		// and repeating ticks after 1 sec pause
		this.interval = setInterval(this.tick, 1000);
	};

	pause = () => {
		clearInterval(this.interval);
	};

	tick = () => {
		// subtract 1 sec and put it to input field (which in this case works as output)
		// calling setter timeRem = calling getter timeRem - 1
		// no parentheses needed, cause those are called automatically with use of get and set keywords
		this.timeRemaining = this.timeRemaining - 1;
	};

	// get current time from user input area
	get timeRemaining() {
		// get time from user timer duration input. convert to float
		return parseFloat(this.durationInput.value);
	}

	// set value in user input area (update timer with calculated time)
	set timeRemaining(time) {
		// set timer to time passed to that setter
		this.durationInput.value = time;
	}
}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

const timer = new Timer(durationInput, startButton, pauseButton);
