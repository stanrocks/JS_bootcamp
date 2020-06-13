#!/usr/bin/env node

// console.log('I was executed');

// nodemon-clone app
// Issues:
// 1. Need to detect when a file changes -> use a package called 'chokidar' to detect file changes
// 2. Provide some help to users of our CLI tool -> use a package called 'caporal' to build our CLI tool
// 3. Need to figure out how to execute some JS code from within a JS program -> use standard library module 'child_process' to execute a program

const debounce = require('lodash.debounce'); // https://www.npmjs.com/package/lodash.debounce
const chokidar = require('chokidar'); // https://www.npmjs.com/package/chokidar
const program = require('caporal'); // https://www.npmjs.com/package/caporal
// using 'program' name cause it is how it's called in documentation

// create CLI tool
// prettier-ignore
program
  .version('0.0.1')
  .argument('[filename]', 'Name of a file to execute') // [optional argument] + comment for user (help is accessible with 'watchit -h')
  .action((args) => console.log(args));

program.parse(process.argv);

// Problem with 'add' event is chokidar sees hundreds of files around, register 'add' event for each file and runs callback function for each event.
// That problem might be fixed with debounce function

// debounce example (waits 100 ms before running callback function)
// const start = debounce(() => {
// 	console.log('STARTING USERS PROGRAM');
// }, 100);

// listen for events with files
// chokidar
// 	// watch directory
// 	.watch('.')
// 	// new file created inside directory
// 	.on('add', start)
// 	// file changed inside directory
// 	.on('change', () => console.log('FILE CHANGED'))
// 	// file deleted inside directory
// 	.on('unlink', () => console.log('FILE UNLINKED'));
