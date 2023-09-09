const Joi = require("joi");
const ContactSchema = require("./schemas");

const getContact = Joi.object({
  id: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/, "MongoDB ObjectId")
    .error(new Error("Invalid ObjectId format")),
});

const updateContact = Joi.object().keys({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/, "MongoDB ObjectId"),
  }),
  body: ContactSchema,
});

module.exports = {
  getContact,
  updateContact,
};
