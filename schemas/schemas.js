const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `name should be a type of string`,
    "string.empty": `missing required name field`,
    "any.required": `missing required name field`,
  }),
  email: Joi.string().required().messages({
    "string.base": `email should be a type of string`,
    "string.empty": `missing required email field`,
    "any.required": `missing required email field`,
  }),
  phone: Joi.number().required().messages({
    "number.base": `phone should be a type of number`,
    "number.empty": `missing required phone field`,
    "any.required": `missing required phone field`,
  }),
});

module.exports = contactSchema;
