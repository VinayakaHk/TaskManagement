const Joi = require('joi');

const authSchema = Joi.object({
    JWT_ACCESS_SECRETE_KEY: Joi.string().required(),
    JWT_ACCESS_EXPIRY: Joi.string(),
})
    .unknown()
    .required();

const { error, value: envVars } = authSchema.validate(process.env);

if (error) {
    throw new Error(`Secret token config validation error, ${error}`);
}

const config = {
    secret: envVars.JWT_ACCESS_SECRETE_KEY,
    expiry: envVars.JWT_ACCESS_EXPIRY || '1d',
};

module.exports = config;
