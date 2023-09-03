const fs = require("fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" }); 
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  return data.find((contact) => contact.id === contactId);
  
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return undefined;
  }
  const newContact = [...data.slice(0, index), ...data.slice(index + 1)];
  await write(newContact);

  return data[index];

}

async function addContact({ name, email, phone }) {
  const newContact = { id: crypto.randomUUID(), name, email, phone };

  const contacts = await listContacts();
  contacts.push(newContact);
  await write(contacts);

  return newContact;
}

async function updateContact(contactId, updatedData) {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null; 
  }
  contacts[index] = {
    id: contactId,
    ...updatedData,
  };
  await write(contacts); 

  return contacts[index]; 
}
module.exports = {
  updateContact,
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
