const express = require('express');

const router = express.Router();

const auth_403 = require('../util/index').auth_403;

router.get('/', (req, res) => {
	res.render('login', {
		message: req.query.message
	});
});

router.get('/mail', auth_403, (req, res) => {
	res.render('sendMail', {
		message: req.query.message
	});
});

module.exports = router;
