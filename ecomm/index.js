const express = require('express');

const app = express();

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

app.post('/', (req, res) => {
	// get access to email, password, password confirmation in buffer-form
	// buffer example: <Buffer 65 6d 61 69 6c 3d 73 64 66 26 70 61 73 73 77 6f 72 64 3d 73 64 66 26 70 61 73 73 77 6f 72 64 43>
	//
	req.on('data', (data) => {
		// convert buffer to text and split to array elements
		// string example: email=sdf&password=sdf&passwordConfirmation=sdf
		const parsed = data.toString('utf8').split('&');
		const formData = {};
		for (let pair of parsed) {
			const [
				key,
				value
			] = pair.split('=');
			formData[key] = value;
		}
		console.log(formData);
	});
	res.send('Account created!');
});

app.listen(3000, () => {
	console.log('Listening');
});
