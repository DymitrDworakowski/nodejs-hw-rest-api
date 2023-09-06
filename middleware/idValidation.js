const IdValidator = require("../schemas/schemasId");

function validateId(req, res, next) {
  try {
    const validationResult = IdValidator.getContact.validate(req.params);

    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = validateId;
