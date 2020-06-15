const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();
// use parser for POST-requests
app.use(bodyParser.urlencoded({ extended: true }));
// cookie session adds 1 additional property to HTTP-requests (req.session)
app.use(
	cookieSession({
		keys: [
			'sld34jk7f6ls8kd9j73452flsk3344jd7f'
		]
	})
);

// routes
// root route
app.get('/signup', (req, res) => {
	res.send(`
  <div>
    Your id is: ${req.session.userId}
    <form method="POST">
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" />
      <input name="passwordConfirmation" placeholder="password confirmation" />
      <button>Sign Up</button>
    </form>
  </div>
  `);
});

// account creation route
app.post('/signup', async (req, res) => {
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

app.get('/signout', (req, res) => {
	// reset user cookie
	req.session = null;
	res.send('You are logged out');
});

app.get('/signin', (req, res) => {
	res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <button>Sign In</button>
      </form>
  </div>
  `);
});

app.post('/signin', async (req, res) => {});

app.listen(3000, () => {
	console.log('Listening');
});
