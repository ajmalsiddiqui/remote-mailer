const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');

// Load local environment variables
dotenv.config();

const employeeRoutes = require('./routes/index').employeeRoutes;

const config = require('./config');

const util = require('./util/index');

const app = express();

if(config.enableCors) {
	app.use(util.cors);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/employee', employeeRoutes);

util.db(() => {
	
});

app.listen(config.port, () => {
	console.log('Server running at port', config.port);
});