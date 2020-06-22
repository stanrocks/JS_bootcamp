const fs = require('fs'); // https://nodejs.org/docs/latest/api/fs.html
const path = require('path'); // https://nodejs.org/docs/latest/api/path.html
const chalk = require('chalk'); // https://www.npmjs.com/package/chalk
const render = require('./render'); // DOM emulation with jsdom

forbiddenDirs = [ 'node_modules' ];

class Runner {
	constructor() {
		this.testFiles = [];
	}

	async runTests() {
		for (let file of this.testFiles) {
			console.log(chalk.grey(`---- Testing: ${file.shortName}`));
			// DOM emulation
			global.render = render;

			// beforeEach
			const beforeEaches = [];
			global.beforeEach = (fn) => {
				beforeEaches.push(fn);
			};

			// it
			global.it = (desc, fn) => {
				// console.log(desc);
				beforeEaches.forEach((func) => func());
				try {
					fn();
					console.log(chalk.green('\t', `OK - ${desc}`));
				} catch (err) {
					const message = err.message.replace(/\n/g, '\n\t\t'); // find globally new line char and replace it with new line with 2 tabs
					console.log(chalk.red('\t', `X - ${desc}`));
					console.log(chalk.red('\t', message));
				}
			};

			try {
				// get tested file
				require(file.name);
			} catch (err) {
				// error loading file (syntax errors, etc)
				console.log(chalk.red(err));
			}
		}
	}

	// collects files to be tested
	async collectFiles(targetPath) {
		const files = await fs.promises.readdir(targetPath);

		for (let file of files) {
			const filepath = path.join(targetPath, file);
			const stats = await fs.promises.lstat(filepath);
			// https://nodejs.org/docs/latest/api/fs.html#fs_stats_isdirectory

			// look for a file with name '*.test.js*'
			if (stats.isFile() && file.includes('.test.js')) {
				// filepath - absolute path, file - relative path
				this.testFiles.push({ name: filepath, shortName: file });
			} else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
				const childFiles = await fs.promises.readdir(filepath);

				files.push(...childFiles.map((f) => path.join(file, f)));
			}
		}
	}
}

module.exports = Runner;
