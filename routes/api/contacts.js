const express = require("express");

const router = express.Router();

const validate = require("../../middleware/validateContactFields");
const ContactmController = require("../../controllers/controllers");

router.get("/", ContactmController.getAll);

router.get("/:contactId", ContactmController.getById);

router.post("/", validate.validateContactFields, ContactmController.add);

router.delete("/:contactId", ContactmController.remove);

router.put("/:id", validate.checkBody,validate.validateContactFields, ContactmController.update);

module.exports = router;
