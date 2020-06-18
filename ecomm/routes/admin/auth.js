const express = require('express');

const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {
	requireEmail,
	requirePassword,
	requirePasswordConfirmation,
	requireEmailExists,
	requireValidPasswordForUser
} = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
	res.send(signupTemplate({ req }));
});

// account creation route
// validating and sanitizing input
// https://github.com/validatorjs/validator.js
router.post(
	'/signup',
	[
		requireEmail,
		requirePassword,
		requirePasswordConfirmation
	],
	handleErrors(signupTemplate),
	async (req, res) => {
		const { email, password } = req.body;
		// Create a user in our user repo to represent this person
		const user = await usersRepo.create({ email, password });

		// Store the id of that user inside the users cookie
		req.session.userId = user.id; // 'session' object (inside req) is created by cookie session

		res.redirect('/admin/products');
	}
);

router.get('/signout', (req, res) => {
	// reset user cookie
	req.session = null;
	res.send('You are logged out');
});

router.get('/signin', (req, res) => {
	res.send(signinTemplate({})); // passing empty object (fake 'errors' object) cause template expecting 'errors' object
});

router.post(
	'/signin',
	[
		requireEmailExists,
		requireValidPasswordForUser
	],
	handleErrors(signinTemplate),
	async (req, res) => {
		// get email from form inputs
		const { email } = req.body;
		// check if user with email exists
		const user = await usersRepo.getOneBy({ email });

		// user is authenticated
		req.session.userId = user.id;
		res.redirect('admin/products');
	}
);

module.exports = router;
