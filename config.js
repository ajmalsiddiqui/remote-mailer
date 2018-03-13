let config = {
	'port': process.env.PORT || 8000,
	'enableCors': true,
	'bcrypt': {
		'saltRounds': 10
	},
	'jwt': {
		// use env variable in production
		'secret': process.env.JWT_SECRET || 'alphasecret',
		'expiresIn': "10m"
	},
	'mailer': {
		'email': process.env.MAIL_ID,
		'pass': process.env.MAIL_PASS,
		'service': 'Gmail',
		'from': 'XYZ Company',
		'subject': 'Hello customer',
		'text': 'Hello there!\n\nWelcome to XYZ Company!\n\nCheers\nTeam XYZ'
	},
	'mongo': {
		// Use environment variable in production
		'uri': process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/xyz'
	}
};

module.exports = config;