const fs = require('fs');
const crypto = require('crypto');

class UsersRepository {
	// create repo with empty array
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
		// Open 'filename'-file using fsPromises.readFile - https://nodejs.org/docs/latest/api/fs.html#fs_fspromises_readfile_path_options
		// Parse contents
		// Return parsed data
		return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
	}

	async create(attrs) {
		// result: {email: '23ewrwe@dkfj.co, passwords: 'kjlfajf' - plaintext oops, will fix later}
		// add ID to newly created object
		attrs.id = this.randomID();

		// read data at first, then add new object
		const records = await this.getAll();
		records.push(attrs);

		await this.writeAll(records);
	}

	async writeAll(records) {
		// write updated 'records' array back to this.filename
		await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2)); // 'null' is custom formatter (we don't need that, that is why it is = null). '2' means # of indentation levels (how many spaces in tab)
	}

	randomID() {
		// https://nodejs.org/docs/latest/api/crypto.html#crypto_crypto_randombytes_size_callback
		return crypto.randomBytes(4).toString('hex');
	}

	async getOne(id) {
		const records = await this.getAll();
		return records.find((record) => record.id === id);
	}

	async delete(id) {
		const records = await this.getAll();
		// filter creates a new array with all elements that pass the test
		const filteredRecords = records.filter((record) => record.id !== id); // return true if id is not match
		await this.writeAll(filteredRecords);
	}
}

// Tests

// 1. filename is not defined - should throw error:
// new UsersRepository();

// 2. test getAll
// const test = async () => {
// 	const repo = new UsersRepository('users.json');
// 	await repo.create({ email: 'test@test.com', passwords: 'passwords' });
// 	const users = await repo.getAll();
// 	console.log(users);
// };
// test();

// 3. test getOne
// const test = async () => {
// 	const repo = new UsersRepository('users.json');
// 	const user = await repo.getOne('04be1c15');
// 	console.log(user);
// };
// test();

// 3.1 test getOne if that ID doesn't exist - return 'undefined'
// const test = async () => {
// 	const repo = new UsersRepository('users.json');
// 	const user = await repo.getOne('04');
// 	console.log(user);
// };
// test();

// 4. test delete
const test = async () => {
	const repo = new UsersRepository('users.json');
	await repo.delete('0d762978'); // put existing id from users.json
};
test();
