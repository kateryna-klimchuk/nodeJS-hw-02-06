const { requestError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const body = req.body;
    const { error } = schema.validate(body);
    if (error) {
      next(requestError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
