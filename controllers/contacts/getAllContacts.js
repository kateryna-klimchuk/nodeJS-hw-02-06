const Contact = require("../../models/contact");

const getAllContacts = async (_, res) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = getAllContacts;
