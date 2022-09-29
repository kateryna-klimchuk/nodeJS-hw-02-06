const { RequestError } = require("../../helpers");
const Contact = require("../../models/contact");
const { contactsSchema } = require("../../schema/schema");

const addContact = async (req, res) => {
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
