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
const fs = require('fs');
const { spawn } = require('child_process'); // https://nodejs.org/docs/latest/api/child_process.html - getting spawn from child process
const chalk = require('chalk'); // styling console output

// create CLI tool
program
	.version('0.0.1')
	.argument('[filename]', 'Name of a file to execute') // [optional argument] + comment for user (help is accessible with 'watchit -h')
	// destructuring 'args' to 'filename':
	.action(async ({ filename }) => {
		const name = filename || 'index.js'; // if filename doesn't defined by user - use index.js
		try {
			await fs.promises.access(name); // https://nodejs.org/docs/latest/api/fs.html#fs_fspromises_access_path_mode
		} catch (err) {
			throw new Error(`Could not find the file ${name}`);
		}

		let proc; // create undefined var to save process ID
		// Problem with 'add' event is chokidar sees hundreds of files around, register 'add' event for each file and runs callback function for each event.
		// That problem might be fixed with debounce function
		// debounce (waits 100 ms before running callback function)

		const start = debounce(() => {
			// if process exists - kill it (kills previous process if function started not for the first time)
			if (proc) {
				proc.kill();
			}
			// inform user that new process is starting
			console.log(chalk.blue('>>>> Starting process...'));
			// create new child process and save it's ID
			proc = spawn(
				'node',
				[
					name
				],
				{ stdio: 'inherit' }
			); // run new node child process to execute script (filename provided by user). standard IO is passing to same stream as watchit
		}, 200);

		// listen for events with files
		chokidar
			// watch directory
			.watch('.')
			// new file created inside directory
			.on('add', start)
			// file changed inside directory
			.on('change', start)
			// file deleted inside directory
			.on('unlink', start);
	});

program.parse(process.argv);

// test from CLI with this command:
// watchit test.js
