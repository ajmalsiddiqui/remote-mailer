const mailer = require('./mailer');
const cors = require('./cors');
const authenticate = require('./authenticate');
const db = require('./db');
const auth_403 = require('./auth_403');

module.exports = {
	'mailer': mailer,
	'cors': cors,
	'authenticate': authenticate,
	'db': db,
	'auth_403': auth_403
};