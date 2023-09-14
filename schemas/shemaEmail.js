const Joi = require("joi");

const emailJoi = Joi.object({
  email: Joi.string().required().messages({
    "string.base": `email should be a type of string`,
    "string.empty": `missing required email field`,
    "any.required": `missing required email field`,
  }),
});

module.exports = emailJoi;