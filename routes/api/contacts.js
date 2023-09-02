const express = require("express");

const router = express.Router();

const Contacts = require("../../models/contacts");

const contactSchema = require("../../schemas/schemas");
const validateContactFields = require("../../middleware/validateContactFields");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contacts.getContactById(contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", validateContactFields, async (req, res, next) => {
  const { value } = contactSchema.validate(req.body);
  try {
    const newContact = await Contacts.addContact(value);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await Contacts.removeContact(contactId);
    if (contacts) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error, value } = contactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }

    const updatedContact = await Contacts.updateContact(contactId, value);
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
