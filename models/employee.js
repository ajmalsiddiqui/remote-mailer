const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
	name: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true,
		unique: true
	},

	mobile: {
		type: String,
		required: true,
		unique: true
	},

	empId: {
		type: String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true
	}
});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;