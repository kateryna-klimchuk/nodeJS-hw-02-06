const express = require("express");

const controller = require("../../controllers/contacts");

const { controllerWrapper } = require("../../helpers");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, controllerWrapper(controller.getAllContacts));

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  controllerWrapper(controller.getContactById)
);

router.post("/", authenticate, controllerWrapper(controller.addContact));

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  controllerWrapper(controller.removeContactById)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  controllerWrapper(controller.updateContactById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  controllerWrapper(controller.updateFavorite)
);

module.exports = router;
