const express = require('express');

const router = express.Router();

const auth_403 = require('../util/index').auth_403;

router.get('/', (req, res) => {
	res.render('login', {});
});

router.get('/mail', auth_403, (req, res) => {
	res.render('sendMail', {});
});

module.exports = router;
