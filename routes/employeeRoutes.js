const express = require('express');
const bodyParser = require('body-parser');

const employeeController = require('../controllers/employeeController');

const authenticate = require('../util/index').authenticate;

const router = express.Router();

// POST req to make new employee
router.post('/employee', (req, res) => {
	employeeController.newEmployee(req, res)
		.then(info => {
			res.status(info.status).json(info);
		})
		.catch(err => {
			res.status(err.status).json(err);
		});
});

// POST req for employee login
router.post('/login', (req, res) => {
	employeeController.login(req, res)
		.then(info => {
			res.status(info.status).json(info);
		})
		.catch(err => {
			res.status(err.status).json(err);
		});
});

// GET req for mailing
// TODO: use authenticate middleware
// router.get('/mail', authenticate, (req, res) => {
router.get('/mail', (req, res) => {
	employeeController.sendMails(req, res)
		.then(info => {
			res.status(info.status).json(info);
		})
		.catch(err => {
			res.status(err.status).json(err);
		});
});

module.exports = router;