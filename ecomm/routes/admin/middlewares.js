const { validationResult } = require('express-validator');

module.exports = {
	// receive template function, tells what template to load in case of error
	// receive optional data callback (dataCb)
	handleErrors(templateFunc, dataCb) {
		return async (req, res, next) => {
			const errors = validationResult(req);

			// console.log(errors);
			// in case of error - execute template and pass data about errors to it
			if (!errors.isEmpty()) {
				let data = {};
				if (dataCb) {
					data = await dataCb(req);
				}
				return res.send(templateFunc({ errors, ...data }));
			}
			// in case of no errors - call next function
			next();
		};
	},
	// redirect if user is not logged in (admin area requires authentication)
	requireAuth(req, res, next) {
		if (!req.session.userId) {
			return res.redirect('/signin');
		}
		// if user logged in - call next func
		next();
	}
};
