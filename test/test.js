//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

// Parent block
describe('Mailer', () => {
	// Invoke this before every test
	beforeEach((done) => {
		console.log('Initializing Automated Testing');
        done();     
	});
	
	// Test the /login route
	describe('POST /login', () => {
		it('should login and get an authentication token', done => {
			chai.request("http://127.0.0.1:8000")
				.post('./login')
				.send({
					empId: 12345,
					password: 'brownie'
				})
				.end((err, res) => {
					if(err) console.log(err);
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('token');
					done();
				});
		});
	});
	// Test the /mail route
});