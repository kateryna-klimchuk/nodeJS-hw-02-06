const { RequestError } = require("../../helpers");
const Contact = require("../../models/contact");
const { updateFavoriteSchema } = require("../../schema/schema");

async function updateStatusContact(contactId, body) {
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return result;
}

const updateFavorite = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    error.message = "missing field favorite";
    throw RequestError(400, error.message);
  }
  const { contactId } = req.params;

  const result = await updateStatusContact(contactId, req.body);

  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.json(result);
};

module.exports = updateFavorite;
