const jwt = require("jsonwebtoken");
const { requestError } = require("../helpers");
const { authModel } = require("../models");

const authenticate = async (req, res, next) => {
  const { SECRET_KEY } = process.env;
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw requestError(401);
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await authModel.User.findById(id);
      if (!user || !user.token || user.token !== token) {
        throw Error("Unauthorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw requestError(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
