const { verifyAccessToken } = require('../helpers/jwt');

const tokenValidator = async (req, res, next) => {
    if (process.env.DISABLE_AUTHENTICATION === 'true') return next();

    if (!req.originalUrl.includes('auth')) return next();

    const bearerToken = req.headers.authorization;
    if (!bearerToken) return res.send({ error: true, logout: true, message: 'No token provided' });
    if (!bearerToken.startsWith('Bearer')) return res.send({ error: true, logout: true, message: 'Invalid token' });

    const token = bearerToken.split(' ')[1];
    try {
        const decoded = verifyAccessToken(token);

        req.decoded = decoded;
        req.accessToken = token;

        return next();
    } catch (error) {
        console.error(`[token_validator] | error: ${error}
        ${JSON.stringify(error)}`);

        if (error.name === 'TokenExpiredError') {
            const return_statement = res.status(401).send({
                error: true,
                logout: true,
                message: 'CODE: TOKEN_EXPIRED',
            });
            return return_statement;
        }

        return res.send({ error: true, logout: true, message: 'Unauthorized access' });
    }
};

module.exports = tokenValidator;