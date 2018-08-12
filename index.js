if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');



app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require('./src/config/mongoose');
require('./src/route/contact.route')(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
