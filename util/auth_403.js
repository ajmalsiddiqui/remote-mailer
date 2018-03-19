/**
 * This middleware function renders the 403 page when the user is not authenticated
 */

const jwt = require('jsonwebtoken');

const config = require('../config');

module.exports = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	if(token) {
		// TODO: check for promise wrapper for jwt
		jwt.verify(token, config.jwt.secret, (err, decoded) => {
			if(err) {
				res.render('403', {});
			}
			else {
				req.token = token;
				next();
			}
		});
	}
	else {
		// TODO: send error response
		res.render('403', {});
	}
}