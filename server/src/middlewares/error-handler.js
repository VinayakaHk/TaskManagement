const config = require('../config');

module.exports = (err, req, res, next) => {
    let message = 'Something went wrong';

    // Log full error details
    if (config.server.isDevelopment) {
        console.error(err.stack);
    } else {
        console.error(err);
    }

    // Handle specific error types
    if (err instanceof Error) {
        message = err.message;
        res.status(500);
    } else if (err.name === 'ValidationError') {
        message = err.message;
        res.status(400);
    } else if (err.name === 'NotFoundError') {
        message = err.message;
        res.status(404);
    } else if (err.code === 'ECONNREFUSED') {
        message = 'Database connection error';
    } else if (err.array) {
        res.status(422);
    } else {
        res.status(500);
    }

    // Rate limit logging
    if (!req.loggedErrors) {
        req.loggedErrors = 1;
    } else if (req.loggedErrors < 10) {
        req.loggedErrors += 1;
    }

    // Send response
    res.send({
        error: true,
        message,
        stack: config.server.isDevelopment ? err.stack : undefined,
    });
};
