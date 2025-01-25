let contacts = [];

class Contact {
  firstName;
  lastName;
}

function addContact(firstName, lastName) {
  let myContact = new Contact();
  myContact["firstName"] = firstName;
  myContact["lastName"] = lastName;
  contacts.push(myContact);
  debugger;
}

addcContact("Enes", "Hadzic");
