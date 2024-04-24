const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    throw err;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (err) {
    throw err;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    } else {
      const deletedData = contacts.splice(index, 1)[0];
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return deletedData;
    }
  } catch (err) {
    throw err;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: crypto.randomUUID() };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (err) {
    throw err;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
