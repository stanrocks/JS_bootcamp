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
			// once at start pass timeRemaining (defines timer total duration)
			this.onStart(this.timeRemaining);
		}
		// run tick once immediately right after start
		this.tick();
		// store timer ID inside this.timer
		// and repeating ticks after 20 ms pause (high freq for smooth animation)
		this.interval = setInterval(this.tick, 20);
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
			// subtract 0.02 sec and put it to input field (which in this case works as output)
			// calling setter timeRem = calling getter timeRem - 0.05 s
			// no parentheses needed, cause those are called automatically with use of get and set keywords
			this.timeRemaining = this.timeRemaining - 0.02;
			if (this.onTick) {
				// with every tick pass time remaining
				this.onTick(this.timeRemaining);
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
		this.durationInput.value = time.toFixed(2);
	}
}
