const express = require('express');
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/users');

const app = express();
// use parser for POST-requests
app.use(bodyParser.urlencoded({ extended: true }));

// routes
// root route
app.get('/', (req, res) => {
	res.send(`
  <div>
    <form method="POST">
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" />
      <input name="passwordConfirmation" placeholder="password confirmation" />
      <button>Sign Up</button>
    </form>
  </div>`);
});

// account creation route
app.post('/', async (req, res) => {
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
	res.send('Account created!');
});

app.listen(3000, () => {
	console.log('Listening');
});
