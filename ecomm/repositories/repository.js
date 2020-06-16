const fs = require('fs');
const crypto = require('crypto');

module.exports = class Repository {
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

	async create(attrs) {
		attrs.id = this.randomId();

		const records = await this.getAll();
		records.push(attrs);
		await this.writeAll(records);

		return attrs;
	}

	async getAll() {
		// Open 'filename'-file using fsPromises.readFile - https://nodejs.org/docs/latest/api/fs.html#fs_fspromises_readfile_path_options
		// Parse contents
		// Return parsed data
		return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
	}

	async writeAll(records) {
		// write updated 'records' array back to this.filename
		await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2)); // 'null' is custom formatter (we don't need that, that is why it is = null). '2' means # of indentation levels (how many spaces in tab)
	}

	randomId() {
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
};
