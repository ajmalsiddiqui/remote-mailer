const mongoose = require('mongoose');
const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Employee = require('../models/index').Employee;

const config = require('../config');

const mailer = require('../util/index').mailer;

// POST request
exports.newEmployee = (req, res) => {
	return new Promise((resolve, reject) => {
		if(!req.body.password) {
			// TODO: throw error
			const error = {
				status: 400,
				message: 'No password supplied',
				info: 'No password supplied'
			};
			reject(error);
		}
		bcrypt.hash(req.body.password, config.bcrypt.saltRounds)
			.then(hash => {
				const newEmployee = new Employee({
					name: req.body.name,
					email: req.body.email,
					mobile: req.body.mobile,
					empId: req.body.empId,
					password: hash
				});

				newEmployee.save()
					.then(() => {
						// TODO: return success response and resolve
						const employee = new Object(newEmployee);
						employee.password = undefined;
						const success = {
							status: 200,
							message: 'Successfully added employee',
							info: employee
						};
						resolve(success);
					})
					.catch(err => {
						// Handle error and reject
						const error = {
							status: 500,
							message: 'Error in saving data to DB',
							info: err
						};
						reject(error);
					});
			})
			.catch(err => {
				// TODO: handle error
				const error = {
					status: 500,
					message: 'Error in hashing password',
					info: err
				};
				reject(error);
			});
	});
};

// POST request
exports.login = (req, res) => {
	return new Promise((resolve, reject) => {
		if(!req.body.empId || !req.body.password) {
			// TODO: return error message
			const error = {
				status: 400,
				message: 'employee ID or password not supplied',
				info: 'employee ID or password not supplied'
			};
			reject(error);
		}
		const query = Employee.findOne({empId: req.body.empId});
		query.exec((err, employee) => {
			if(err) {
				// TODO: handle error
				const error = {
					status: 500,
					message: 'Error in querying database',
					info: err
				};
				reject(error);
			}
			else if(!employee) {
				// TODO: handle error
				const error = {
					status: 400,
					message: 'Employee does not exist',
					info: 'Employee does not exist'
				};
				reject(error);
			}
			bcrypt.compare(req.body.password, employee.password)
				.then(isAuthenticated => {
					if(!isAuthenticated) {
						// TODO: send not autheticated response
						const error = {
							status: 403,
							message: 'Not authenticated',
							info: 'Not authenticated'
						};
						reject(error);
					}
					// -- TODO: set headers/token
					const payload = {
						'email': employee.email,
						'empId': employee.empId
					};
					const token = jwt.sign(payload, config.jwt.secret, {
						expiresIn: config.jwt.expiresIn
					});
					const success = {
						status: 200,
						message: 'Successfully added employee',
						info: token,
						token: token
					};
					// TODO set auth header
					resolve(success);
				})
				.catch(err => {
					// -- TODO: handle error
					// console.log(err);
					const error = {
						status: 403,
						message: 'Error in password hashing',
						info: err
					};
					reject(error);
				});
		});
	});
};

// GET request
exports.sendMails = (req, res) => {
	return new Promise((resolve, reject) => {
		if(!req.query.emails) {
			// TODO: handle error, reject
			const error = {
				status: 400,
				message: 'No emails supplied',
				info: 'No emails supplied'
			};
			reject(error);
		}
		
		const mailers = req.query.emails.toString().replace(' ', '').split(',').map(email => mailer(email, req.query.subject, req.query.text));
		// console.log(mailers);

		Promise.all(mailers)
			.then(mails => {
				console.log(mails)
				const success = {
					status: 200,
					message: 'Successfully mailed employees',
					info: mails
				};
				resolve(success);
			})
			.catch(errors => {
				console.log(errors);
				const error = {
					status: 400,
					message: 'Some emails failed to send, others may have been sent',
					info: errors
				};
				reject(error);
			});
	});
};