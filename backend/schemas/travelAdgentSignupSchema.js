const Joi = require('joi');

const travelAdgentSignupSchema = Joi.object({
    firstName: Joi.string()
        .required(),

    lastName: Joi.string()
        .required(),    
    
    phoneNumber: Joi.string()
        .min(10)
        .max(10),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
})

module.exports = travelAdgentSignupSchema;