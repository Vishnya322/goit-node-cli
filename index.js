const { program } = require("commander");
const contacts = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const contactsList = await contacts.listContacts();
        console.log("Contacts:");
        console.table(contactsList);
        break;

      case "get":
        const contact = await contacts.getContactById(id);
        console.log("Contact:");
        console.log(contact);
        break;

      case "add":
        const newContact = await contacts.addContact(name, email, phone);
        console.log("New contact added:");
        console.log(newContact);
        break;

      case "remove":
        const removedContact = await contacts.removeContact(id);
        console.log("Removed contact:");
        console.log(removedContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

invokeAction(options);
