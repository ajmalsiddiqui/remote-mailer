const mongoose = require('mongoose');
const Promise = require('bluebird');

const config = require('../config');

mongoose.connection.on('connected', () => {
	console.log(config.mongo.uri);
	console.log('Mongoose default connection open to ', config.mongo.uri);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
	console.log('Mongoose default connection error: ', err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
	console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.log('Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});

module.exports = (next) => {
	mongoose.connect(config.mongo.uri, {
		promiseLibrary: Promise,
	}, () => {
		next();
	});
};