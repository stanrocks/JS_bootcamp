const layout = require('../layout');

const getError = (errors, prop) => {
	// check if prop === 'email' || 'password' || 'passwordConfirmation'
	// errors is an array
	// errors: [
	// {
	//   value: 'sdf',
	//   msg: 'Must be between 4 and 20 characters',
	//   param: 'password',
	//   location: 'body'
	// }

	try {
		return errors.mapped()[prop].msg; // try to see if property exists inside errors array (get error successfully), in that case return error message
	} catch (err) {
		return ''; // if prop doesn't exist (error to get an error) - there will be an error of 'email is undefined' - in that case we don't care - just return empty string
	}
};

module.exports = ({ req, errors }) => {
	return layout({
		content: `
      <div>
        Your id is: ${req.session.userId}
        <form method="POST">
          <input name="email" placeholder="email" />
          ${getError(errors, 'email')}
          <input name="password" placeholder="password" />
          ${getError(errors, 'password')}
          <input name="passwordConfirmation" placeholder="password confirmation" />
          ${getError(errors, 'passwordConfirmation')}
          <button>Sign Up</button>
        </form>
      </div>
    `
	});
};
