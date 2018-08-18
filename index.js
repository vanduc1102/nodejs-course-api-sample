if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
require('./src/config/mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');


app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Public
app.post('/api/v1/users/', require('./src/controller/user.controller').create);

// Security Guard
require('./src/controller/authentication.controller')(app);

// Private
require('./src/route/contact.route')(app);
require('./src/route/user.route')(app);

// Start Server
app.listen(3000, () => console.log('Example app listening on port 3000!'))

//http://asdfasdf:asdfasdf@localhost:3000/api/v1/contacts
