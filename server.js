const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const connect = require('./db');
const portNum=3001;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

require('./routes/index')(app);

connect().then(() => {
  console.log('DB is connected');
  app.listen(portNum, () => {
    console.log('Server is up with express on port: ', portNum);
  });
});
//http://localhost:3001
