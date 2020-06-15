module.exports = {
	getError(errors, prop) {
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
	}
};
