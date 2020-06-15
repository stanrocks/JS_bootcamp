const express = require('express');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

const router = express.Router();

router.get('/signup', (req, res) => {
	res.send(signupTemplate({ req }));
});

// account creation route
router.post('/signup', async (req, res) => {
	const { email, password, passwordConfirmation } = req.body;

	// check if email is already in use
	const existingUser = await usersRepo.getOneBy({ email });
	if (existingUser) {
		return res.send('Email in use');
	}

	// check if password is not confirmed
	if (password !== passwordConfirmation) {
		return res.send('Passwords must match');
	}

	// Create a user in our user repo to represent this person
	const user = await usersRepo.create({ email, password });

	// Store the id of that user inside the users cookie
	req.session.userId = user.id; // 'session' object (inside req) is created by cookie session

	res.send('Account created!');
});

router.get('/signout', (req, res) => {
	// reset user cookie
	req.session = null;
	res.send('You are logged out');
});

router.get('/signin', (req, res) => {
	res.send(signinTemplate());
});

router.post('/signin', async (req, res) => {
	// get email and password from form inputs
	const { email, password } = req.body;
	// check if user with email exists
	const user = await usersRepo.getOneBy({ email });
	console.log(user);

	if (!user) {
		return res.send('Email not found');
	}

	// check if password in DB match to password provided by user through sign in form
	const validPassword = await usersRepo.comparePasswords(user.password, password);
	if (!validPassword) {
		return res.send('Invalid password');
	}

	// user is authenticated
	req.session.userId = user.id;
	res.send('You are signed in!');
});

module.exports = router;