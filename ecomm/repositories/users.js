const fs = require('fs');

class UsersRepository {
	constructor(filename) {
		if (!filename) {
			throw new Error('Creating a repository requires a filename');
		}
		// storing passed filename in instance variable
		this.filename = filename;

		// https://nodejs.org/docs/latest/api/fs.html
		// There are 3 versions:
		// 1. fs.access (using callback)
		// 2. fs.accessSync (sync version - pauses execution - bad for performance)
		// it is better to use option 2, cause we need file to exist at first for all other code to work. and we call that only one time for entire lifecycle of our app.
		// 3. fsPromises.access - access based on promise
		try {
			fs.accessSync(this.filename);
		} catch (err) {
			// if file not exist - create new one
			fs.writeFileSync(filename, '[]');
		}
	}
	async getAll() {
		// Open file this.filename - https://nodejs.org/docs/latest/api/fs.html#fs_fspromises_readfile_path_options
		const contents = await fs.promises.readFile(this.filename, { encoding: 'utf8' });
		// Read its contents
		console.log(contents);
		// Parse contents
		// Return parsed data
	}
}

// Tests

// 1. filename is not defined - should throw error:
// new UsersRepository();

// 2. test getAll
const test = async () => {
	const repo = new UsersRepository('users.json');

	await repo.getAll();
};
test();
