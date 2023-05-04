const Joi = require('joi');

const userSigninSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
    password: Joi.string().required()
})

module.exports = userSigninSchema;