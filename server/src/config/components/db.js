const Joi = require('joi');

const schema = Joi.object({
    DB_CONNECTION_STRING: Joi.string().when('NODE_ENV', {
        is: 'production',
        then: Joi.required(),
    }),
})
    .unknown()
    .required();

const { error, value: envVars } = schema.validate(process.env);

if (error) {
    throw new Error(`DB server config validation error, ${error}`);
}

const config = {
    connectionString: envVars.DB_CONNECTION_STRING,
};

module.exports = config;
