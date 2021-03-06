const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('express-handlebars');

const dotenv = require('dotenv');

// Load local environment variables
dotenv.config();

const employeeRoutes = require('./routes/index').employeeRoutes;
const clientRoutes = require('./routes/index').clientRoutes;

const config = require('./config');

const util = require('./util/index');

const app = express();

app.set('views', path.normalize(__dirname + '/views'));

app.engine('hbs', hbs({
    defaultLayout: path.normalize(__dirname + '/views/layouts/mainLayout.hbs'),
    layoutsDir: path.normalize(__dirname + '/views/layouts'),
    partialsDir: path.normalize(__dirname + '/views/partials')
}));
app.set('view engine', 'hbs');

app.use('/', express.static(path.normalize(__dirname + '/public')));

if(config.enableCors) {
	app.use(util.cors);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', employeeRoutes);
app.use('/client', clientRoutes);

util.db(() => {
	
});

app.listen(config.port, () => {
	console.log('Server running at port', config.port);
});

// For testings
module.exports = app;