const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function catchErrorWrapper(asyncFunction) {
  try {
    return await asyncFunction();
  } catch (error) {
    console.error(error.message);
  }
}

async function listContacts() {
  return catchErrorWrapper(async () => {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  });
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  return catchErrorWrapper(async () => {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
  });
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  return catchErrorWrapper(async () => {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index !== -1) {
      const [removedContact] = contacts.splice(index, 1);
      await fs.writeFile(
        contactsPath,
        JSON.stringify(contacts, null, 2),
        "utf-8"
      );
      return removedContact;
    }
  });
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  return catchErrorWrapper(async () => {
    const newContact = { id: Date.now(), name, email, phone };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
    return newContact;
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
