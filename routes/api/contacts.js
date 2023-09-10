const express = require("express");
const ContactController = require("../../controllers/contactsConrol");
const router = express.Router();
const CheckBody = require("../../middleware/validateContactFields");
const validateId = require("../../middleware/idValidation");



router.get("/", ContactController.getAll);
router.post("/", CheckBody, ContactController.add);
router.get("/:id", validateId, ContactController.getById);
router.put("/:id", CheckBody, validateId, ContactController.update);
router.delete("/:id", validateId, ContactController.remove);
router.patch("/:id/favorite", validateId, ContactController.updateFavorite);
 

module.exports = router;
