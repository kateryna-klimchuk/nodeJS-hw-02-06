const { RequestError } = require("../../helpers");
const Contact = require("../../models/contact");

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({ message: "Contact removed" });
};

module.exports = removeContactById;
