const Joi = require("joi");

// Схема для реєстрації
const registerJoi = Joi.object({
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
  password: Joi.string().required().messages({
    "string.base": `password should be a type of string`,
    "string.empty": `missing required password field`,
    "any.required": `missing required password field`,
  }),
});

// Схема для логіну
const loginJoi = Joi.object({
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

module.exports = { registerJoi, loginJoi };