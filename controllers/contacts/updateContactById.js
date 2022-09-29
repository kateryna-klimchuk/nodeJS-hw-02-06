const { RequestError } = require("../../helpers");
const Contact = require("../../models/contact");
const { contactsSchema } = require("../../schema/schema");

const updateContactById = async (req, res) => {
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.json(result);
};

module.exports = updateContactById;
