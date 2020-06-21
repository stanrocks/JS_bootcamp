const fs = require('fs'); // https://nodejs.org/docs/latest/api/fs.html
const path = require('path'); // https://nodejs.org/docs/latest/api/path.html

// collects files to be tested
class Runner {
	constructor() {
		this.testFiles = [];
	}

	async runTests() {
		for (let file of this.testFiles) {
			require(file.name);
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
