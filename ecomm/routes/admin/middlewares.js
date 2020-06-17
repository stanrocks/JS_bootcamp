const { validationResult } = require('express-validator');

module.exports = {
	// receive template function, tells what template to load in case of error
	handleErrors(templateFunc) {
		return (req, res, next) => {
			const errors = validationResult(req);

			// in case of error - execute template and pass dara about errors to it
			if (!errors.isEmpty()) {
				return res.send(templateFunc({ errors }));
			}

			// in case of no errors - call next function
			next();
		};
	}
};
