require('dotenv').config();

const express = require('express');
const morganReqLogger = require('morgan');
const cors = require('cors');

const errorHandler = require('./src/middlewares/error-handler');

const app = express();
const tokenValidator = require('./src/middlewares/token-validator');
app.use(cors());
app.use(tokenValidator);

app.use(morganReqLogger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' });
});

app.use(`/api/v1`, require('./src/v1/routes/index.js'));
app.use((_req, res) => {
    res.send({ error: 'Not found' });
});
app.use(errorHandler);

// setNonce();

module.exports = app;
