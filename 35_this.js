// ========= this in functions =========

function sayHi() {
	console.log('HI');
	//this refers to the window (global scope object in the browser)
	console.log(this);
}

const greet = function() {
	//this refers to the window (global scope object in the browser)
	console.log(this);
};

// ========= this in methods =========

const person = {
	first: 'Cherilyn',
	last: 'Sarkisian',
	nickName: 'Cher',
	fullName() {
		//In a method, this refers to the object the method "lives" in:
		const { first, last, nickName } = this;
		return `${first} ${last} AKA ${nickName}`;
	},
	printBio() {
		const fullName = this.fullName();
		console.log(`${fullName} is a person!`);
	}
};

// ========= this and invocation context =========

function sayHi() {
	console.log('HI');
	//this refers to the window (global scope object in the browser)
	console.log(this);
}

const person = {
	first: 'Cherilyn',
	last: 'Sarkisian',
	nickName: 'Cher',
	fullName() {
		//In a method, this refers to the object the method "lives" in
		const { first, last, nickName } = this;
		return `${first} ${last} AKA ${nickName}`;
	},
	printBio() {
		console.log(this);
		const fullName = this.fullName();
		console.log(`${fullName} is a person!`);
	},
	laugh: () => {
		//Arrow functions don't get their 'own' this. this refers to window object
		// this is why arrow functions is not usually used as methods, unless... check annoyer
		console.log(this);
		console.log(`${this.nickName} says HAHAHAHAH`);
	}
};

// INVOCATION CONTEXT MATTERS!!!
person.printBio(); //THIS refers to the person object

const printBio = person.printBio;
printBio(); //THIS refers to window object

// ========= annoyer =========

const annoyer = {
	phrases: [ 'literally', 'cray cray', "I can't even", 'Totes!', 'YOLO', "Can't Stop, Won't Stop" ],
	pickPhrase() {
		const { phrases } = this;
		const idx = Math.floor(Math.random() * phrases.length);
		return phrases[idx];
	},
	start() {
		//Use an arrow function to avoid getting a different 'this':
		this.timerId = setInterval(() => {
			console.log(this.pickPhrase());
		}, 3000);
	},
	stop() {
		clearInterval(this.timerId);
		console.log('PHEW THANK HEAVENS THAT IS OVER!');
	}
};

annoyer.start();
annoyer.stop();
