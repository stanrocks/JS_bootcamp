const fs = require('fs');

// collects files to be tested
class Runner {
	constructor() {
		this.files = [];
	}

	async collectFiles(targetPath) {
		const files = await fs.promises.readdir(targetPath);

		return files;
	}
}

module.exports = Runner;
