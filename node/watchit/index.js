#!/usr/bin/env node

console.log('I was executed');

// nodemon-clone app
// Issues:
// 1. Need to detect when a file changes -> use a package called 'chokidar' to detect file changes
// 2. Provide some help to users of our CLI tool -> use a package called 'caporal' to build our CLI tool
// 3. Need to figure out how to execute some JS code from within a JS program -> use standard library module 'child_process' to execute a program

// https://www.npmjs.com/package/chokidar
// https://www.npmjs.com/package/caporal
