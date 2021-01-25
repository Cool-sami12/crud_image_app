const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const routes = require("./routes/routes");
//body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


// register routes
app.use('/', routes);




module.exports = app;
