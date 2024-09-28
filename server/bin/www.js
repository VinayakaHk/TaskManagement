require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');

const { db } = require('../src/config');
const app = require('../app');

mongoose.Promise = require('bluebird');

mongoose.connect(db.connectionString, {
    maxPoolSize: 10,
});

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) return val;
    if (port >= 0) return port;

    return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const server = http.createServer(app);

function onError(error) {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.info(`Listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

async function closeServer() {
    let s = await server;

    s.close();
    await mongoose.connection.close();
}
module.exports = { server, app, closeServer };
