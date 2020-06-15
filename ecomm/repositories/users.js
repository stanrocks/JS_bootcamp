const fs = require('fs');
const crypto = require('crypto');
const util = require('util');

// scrypt: https://nodejs.org/docs/latest/api/crypto.html#crypto_crypto_scrypt_password_salt_keylen_options_callback
// make crypto.scrypt able to work in async mode, now scrypt returns promise
const scrypt = util.promisify(crypto.scrypt);

class UsersRepository {
	// create repo with empty array
	constructor(filename) {
		if (!filename) {
			throw new Error('Creating a repository requires a filename');
		}
		// storing passed filename in instance variable
		this.filename = filename;

		// Test if json file exists
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
			fs.writeFileSync(this.filename, '[]');
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

		// randomBytes: https://nodejs.org/docs/latest/api/crypto.html#crypto_crypto_randombytes_size_callback
		const salt = crypto.randomBytes(8).toString('hex');

		// let's wait for hash to be generated, save to buffer
		const buf = await scrypt(attrs.password, salt, 64);

		// read data at first, then add new object
		const records = await this.getAll();

		// record consists of all attrs + hashed password + . + salt
		const record = {
			...attrs,
			password: `${buf.toString('hex')}.${salt}`
		};
		records.push(record);

		await this.writeAll(records);

		return record;
	}

	async comparePasswords(saved, supplied) {
		// Saved -> password saved in our DB. 'hashed.salt'
		// Supplied -> password given to us by a user trying to sign in
		// const result = saved.split('.'); // result is an array with 2 strings - hash and salt
		// const hashed = result[0];
		// const salt = result[1];
		// same thing in single line:
		const [
			hashed,
			salt
		] = saved.split('.');
		// create hash (buffer) from supplied password with previously stored salt (salt has been saved when user created account)
		const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

		return hashed === hashedSuppliedBuf.toString('hex');
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

	async update(id, attrs) {
		// get all records
		const records = await this.getAll();
		// find record with provided id
		const record = records.find((record) => record.id === id);
		// if no record found
		if (!record) {
			throw new Error(`Record with id ${id} not found`);
		}
		// get attrs and write them to record
		Object.assign(record, attrs);
		// write updated records
		await this.writeAll(records);
	}

	async getOneBy(filters) {
		// get all records
		const records = await this.getAll();
		// console.log('records: ', records);
		// iterate through array
		for (let record of records) {
			let found = true;
			// iterate through object
			for (let key in filters) {
				if (record[key] !== filters[key]) {
					found = false;
				}
			}
			if (found) {
				return record;
			}
		}
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
// const test = async () => {
// 	const repo = new UsersRepository('users.json');
// 	await repo.delete('0d762978'); // put existing id from users.json
// };
// test();

// 5. test update
// step 1: create new user
// const test = async () => {
// 	const repo = new UsersRepository('users.json');
// 	await repo.create({ email: 'test@test.com' });
// };
// test();

// step 2: update existing user (paste ID of existing user)
// const test = async () => {
// 	const repo = new UsersRepository('users.json');
// 	await repo.update('f6a9af7b', { password: 'password' });
// };
// test();

// 5.1 test update when there is no such user (id123123123123)
// const test = async () => {
// 	const repo = new UsersRepository('users.json');
// 	await repo.update('123123123123', { password: 'password' });
// };
// test();

// 6. test getOneBy
// const test = async () => {
// 	const repo = new UsersRepository('users.json');
// 	const user = await repo.getOneBy({ email: 'test@test.com', password: 'password123' });
// 	console.log(user);
// };
// test();

// Tests end here

// Exporting an instance
module.exports = new UsersRepository('users.json');
