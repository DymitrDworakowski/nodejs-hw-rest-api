const express = require("express");

const router = express.Router();

const validateContactFields = require("../../middleware/validateContactFields");
const ContactmController = require("../../controllers/controllers");

router.get("/", ContactmController.getAll);

router.get("/:contactId", ContactmController.getById);

router.post("/", validateContactFields, ContactmController.add);

router.delete("/:contactId", ContactmController.remove);

router.put("/:id", validateContactFields, ContactmController.update);

module.exports = router;
