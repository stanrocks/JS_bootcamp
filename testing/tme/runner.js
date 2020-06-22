const fs = require('fs'); // https://nodejs.org/docs/latest/api/fs.html
const path = require('path'); // https://nodejs.org/docs/latest/api/path.html

// collects files to be tested
class Runner {
	constructor() {
		this.testFiles = [];
	}

	async runTests() {
		for (let file of this.testFiles) {
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
					console.log(`OK - ${desc}`);
				} catch (err) {
					console.log(`X - ${desc}`);
					console.log('\t', err.message);
				}
			};

			try {
				// get tested file
				require(file.name);
			} catch (err) {
				// error loading file (syntax errors, etc)
				console.log(err);
			}
		}
	}

	async collectFiles(targetPath) {
		const files = await fs.promises.readdir(targetPath);

		for (let file of files) {
			const filepath = path.join(targetPath, file);
			const stats = await fs.promises.lstat(filepath);
			// https://nodejs.org/docs/latest/api/fs.html#fs_stats_isdirectory

			// look for a file with name '*.test.js*'
			if (stats.isFile() && file.includes('.test.js')) {
				this.testFiles.push({ name: filepath });
			} else if (stats.isDirectory()) {
				const childFiles = await fs.promises.readdir(filepath);

				files.push(...childFiles.map((f) => path.join(file, f)));
			}
		}
	}
}

module.exports = Runner;
