const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

// async function testContactFunctions() {
//   // list Contacts
//   console.log("List of Contacts:");
//   const allContacts = await listContacts();
//   console.log(allContacts);

//   // Search contact by id
//   console.log("Get Contact by ID:");
//   const contactId = "qdggE76Jtbfd9eWJHrssH";
//   const contactById = await getContactById(contactId);
//   console.log(contactById);

//   // Remove contact by id
//   console.log("Remove Contact by ID:");
//   const contactToRemoveId = "vza2RIzNGIwutCVCs4mCL";
//   const removedContact = await removeContact(contactToRemoveId);
//   console.log("Removed Contact:", removedContact);

//   // Add contact
//   console.log("Add New Contact:");
//   const newContact = await addContact("Mango", "mango@gmail.com", "322-22-22");
//   console.log("New Contact:", newContact);

//   // Refresh list Contacts
//   console.log("Updated List of Contacts:");
//   const updatedContacts = await listContacts();
//   console.log(updatedContacts);
// }

// testContactFunctions();

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log("List of contacts:", contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (contactById) {
        console.log("Contact found:", contactById);
      } else {
        console.log("Contact not found");
      }
      break;

    case "add":
      const addedContact = await addContact(name, email, phone);
      console.log("Contact added:", addedContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      if (removedContact) {
        console.log("Contact removed:", removedContact);
      } else {
        console.log("Contact not found");
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
