const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.generateAccessToken = ({ _id, details, expiresIn }) => {
    const token = jwt.sign({ iss: 'TaskManager', sub: _id, details }, config.token.secret, {
        expiresIn: expiresIn || config.token.expiry,
    });

    return token;
};

module.exports.verifyAccessToken = (token) => {
    const decoded = jwt.verify(token, config.token.secret, { iss: 'TaskManager' });
    return decoded;
};

module.exports.decodeAccessToken = (token) => {
    const decoded = jwt.decode(token, { complete: true });
    return decoded;
}
