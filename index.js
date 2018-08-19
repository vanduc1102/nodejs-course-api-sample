if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
require('./src/config/mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');


app.set('views', __dirname + '/src/view');
app.set('view engine', 'pug');
app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Public
app.get('/',(req, res)=>{
  res.render('index.pug', { title: "Start Bootstrap"});
});

app.post('/api/v1/users/', require('./src/controller/user.controller').create);

// Security Guard
require('./src/controller/authentication.controller')(app);

// Private
require('./src/route/contact.route')(app);
require('./src/route/user.route')(app);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Example app listening on port '+PORT+'!'))

//http://asdfasdf:asdfasdf@localhost:3000/api/v1/contacts
