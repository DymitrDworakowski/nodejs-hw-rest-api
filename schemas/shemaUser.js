const Joi = require("joi");

const userJoi = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `name should be a type of string`,
    // "string.empty": `missing required name field`,
    "any.required": `missing required name field`,
  }),
  email: Joi.string().required().messages({
    "string.base": `email should be a type of string`,
    "string.empty": `missing required email field`,
    "any.required": `missing required email field`,
  }),
  password: Joi.string().required().messages({
    "string.base": `password should be a type of string`,
    "string.empty": `missing required password field`,
    "any.required": `missing required password field`,
  }),
});

module.exports = userJoi;
