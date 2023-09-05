const express = require("express");
const ContactController = require("../../controllers/contactsConrol");
const router = express.Router();
const validate = require("../../middleware/validateContactFields");
const jsonParser = express.json();

router.get("/", ContactController.getAll);
router.post(
  "/",
  jsonParser,
  validate.validateContactFields,
  ContactController.add
);
router.get("/:id", ContactController.getById);
router.put(
  "/:id",
  validate.checkBody,
  validate.validateContactFields,
  ContactController.update
);
router.delete("/:id", ContactController.remove);
router.patch("/:id/favorite", ContactController.updateFavorite);
module.exports = router;
