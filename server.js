const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const connect = require('./db');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

require('./routes/index.js')(app);

connect().then(() => {
  console.log('DB is connected');
  app.listen(3001, () => {
    console.log('Server is up with express on port: ', 3001);
  });
});
