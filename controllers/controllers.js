const Contacts = require("..//models/contacts");

const contactSchema = require("../schemas/schemas");

async function getAll(req, res, next) {
  try {
    const contacts = await Contacts.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
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
}

async function add({ req, res, next }) {
  const { error, value } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const newContact = await Contacts.addContact(value);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
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
}

async function update(req, res, next) {
  try {
    const contactId = req.params.id;

      const { error, value } = await contactSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedContact = await Contacts.updateContact(contactId, value);

    if (updatedContact) {
      return res.status(200).json(updatedContact);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
