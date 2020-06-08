// ****************************
// require instances and cache
// ****************************
const counterObject = require('./myscript.js');
// debugger;
console.log(counterObject.getCounter()); // 0
counterObject.incrementCounter();
console.log(counterObject.getCounter()); // 1

const newCounterObject = require('./myscript.js');
console.log(newCounterObject.getCounter()); // 0 or 1? Answer is: 1

// second 'require' do not make new instance of counter because myscript.js has been cached, and new require calls cached version of counter

// ****************************
// debugging with node
// ****************************

// pause execution whenever 'debugger' statement is hit:
// option 1:
// node --inspect index.js
// option 2:
// node --inspect-brk=[127.0.0.1:9229] index.js
// option 3 (works in my environment):
// node --inspect-brk index.js

// https://nodejs.org/en/docs/guides/debugging-getting-started/

// c - continue until next debugger
// n - run next line
// s - step into a function
// o - step out of the current function
