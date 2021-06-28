const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");
const { v4 } = require("uuid");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch(console.error);
}
function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) =>
      console.table(JSON.parse(data).find(({ id }) => id === contactId))
    )
    .catch(console.error);
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data).filter((data) => data.id !== contactId))
    .then((data) => {
      fs.writeFile(contactsPath, JSON.stringify(data));
      console.log("deleted");
      listContacts();
    })
    .catch(console.error);
}

function addContact(name, email, phone) {
  const newContact = {
    id: v4(),
    name: name,
    email: email,
    phone: phone,
  };
  fs.readFile(contactsPath)
    .then((data) => {
      let allContacts = JSON.parse(data);
      allContacts.push(newContact);
      fs.writeFile(contactsPath, JSON.stringify(allContacts), "utf8");
      console.log("contact added");
    })
    .catch(console.error);
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// function removeContact(contactId) {
// try {
//   const allContacts = await listContacts();
// const index = products.findIndex((item) => item.id === id);
// if (index === -1) {
//   throw new Error("Id incorrect");
// }
//   const filteredProducts = products.filter((item) => item.id !== id);
//   const strContacts = JSON.stringify(allContacts);
//   await fs.writeFile(contactsPath, str);
// } catch (error) {
//   throw error;
// }
// }

// (async () => {
//   try {
//     const data = await fs.readFile(contactsPath, "utf8");
//     console.log("data", data);

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// })();
