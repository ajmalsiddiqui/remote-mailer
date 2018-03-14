const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('login', {});
});

router.get('/mail', (req, res) => {
	res.render('sendMail', {});
});

module.exports = router;
