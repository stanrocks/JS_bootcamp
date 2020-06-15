const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');

const app = express();

app.use(express.static('public'));

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

// routers
app.use(authRouter);

// routes

app.listen(3000, () => {
	console.log('Listening');
});
