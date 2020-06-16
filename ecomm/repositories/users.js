const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

// scrypt: https://nodejs.org/docs/latest/api/crypto.html#crypto_crypto_scrypt_password_salt_keylen_options_callback
// make crypto.scrypt able to work in async mode, now scrypt returns promise
const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
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

	async create(attrs) {
		// result: {email: '23ewrwe@dkfj.co, passwords: 'kjlfajf' - plaintext oops, will fix later}
		// add ID to newly created object
		attrs.id = this.randomId();

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
