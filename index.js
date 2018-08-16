if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const auth = require('basic-auth');
const authService = require('./src/service/authentication.service');

require('./src/config/mongoose');



app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  let user = auth(req);
  if(!user || !authService.checkAuth(user)) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied');
    return;
  }
  req.user = user;
  next();
})

require('./src/route/contact.route')(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'))

//http://asdfasdf:asdfasdf@localhost:3000/api/v1/contacts
