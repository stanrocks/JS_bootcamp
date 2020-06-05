class Timer {
	constructor(durationInput, startButton, pauseButton, callbacks) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;
		// callbacks are optional
		if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}
		this.startButton.addEventListener('click', this.start);
		this.pauseButton.addEventListener('click', this.pause);
	}

	// start timer
	start = () => {
		if (this.onStart) {
			this.onStart();
		}
		// run tick once immediately right after start
		this.tick();
		// store timer ID inside this.timer
		// and repeating ticks after 1 sec pause
		this.interval = setInterval(this.tick, 1000);
	};

	// pause timer
	pause = () => {
		// cancel setInterval method
		clearInterval(this.interval);
	};

	tick = () => {
		if (this.timeRemaining <= 0) {
			// stop timer if time ran out
			this.pause();
			if (this.onComplete) {
				this.onComplete();
			}
		} else {
			// subtract 1 sec and put it to input field (which in this case works as output)
			// calling setter timeRem = calling getter timeRem - 1
			// no parentheses needed, cause those are called automatically with use of get and set keywords
			this.timeRemaining = this.timeRemaining - 1;
			if (this.onTick) {
				this.onTick();
			}
		}
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
