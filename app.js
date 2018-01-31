var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app = express();
    request = require('request');

var config = require('./config');
var application = require('./routes/application');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

var corsOptions = {
  origin: config.corsOrigin,
  optionsSucccessCode: 200
};
app.use(cors(corsOptions));

app.use('/application', application);

module.exports = app;
