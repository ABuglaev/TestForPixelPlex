const express = require('express');
const chalk = require('chalk');
const router = require('./routes/router');
const mongoUtil = require('./dao/mongoUtil');

const app = express();

app.use('/', router);

// connect to mongoDB
mongoUtil.connectToServer();

// start server
app.listen(8080, () => {
  console.log(`Server succefully started on ${chalk.yellow(':8080')}`);
});
