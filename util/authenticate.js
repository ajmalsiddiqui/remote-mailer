const jwt = require('jsonwebtoken');

const config = require('../config');

module.exports = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if(token) {
		// TODO: check for promise wrapper for jwt
		jwt.verify(token, config.jwt.secret, (err, decoded) => {
			if(err) {
				const error = {
					status: 403,
					message: 'Not authenticated',
					info: err
				};
				res.status(403).json(error);
			}
			else {
				req.token = token;
				next();
			}
		});
	}
	else {
		// TODO: send error response
		const error = {
			status: 403,
			message: 'Not authenticated - no token',
			info: 'Not authenticated - no token'
		};
		res.status(403).json(error);
	}
};