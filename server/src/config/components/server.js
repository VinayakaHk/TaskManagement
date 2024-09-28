const Joi = require('joi');

const schema = Joi.object({
    NODE_ENV: Joi.string().required(),
    PORT: Joi.string(),
})
    .unknown()
    .required();

const { error, value: envVars } = schema.validate(process.env);

if (error) {
    throw new Error(`Server config validation error ${error}`);
}

const config = {
    env: envVars.NODE_ENV,
    isTest: envVars.NODE_ENV === 'test',
    isDevelopment: envVars.NODE_ENV === 'development',
    isProduction: envVars.NODE_ENV === 'production',
    node_env: envVars.NODE_ENV,
    port: envVars.PORT,
};

module.exports = config;
