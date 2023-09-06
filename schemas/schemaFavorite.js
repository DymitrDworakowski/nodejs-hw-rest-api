const Joi = require("joi");

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "boolean.base": `favorite should be a type of boolean`,
    "boolean.empty": `missing required favorite field`,
    "any.required": `missing required favorite field`,
  }),
});

module.exports = favoriteSchema;
