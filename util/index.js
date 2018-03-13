const mailer = require('./mailer');
const cors = require('./cors');
const authenticate = require('./authenticate');
const db = require('./db');

module.exports = {
	'mailer': mailer,
	'cors': cors,
	'authenticate': authenticate,
	'db': db
};