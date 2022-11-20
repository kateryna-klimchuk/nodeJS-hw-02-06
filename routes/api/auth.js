const express = require("express");

const ctrl = require("../../controllers/auth");

const { controllerWrapper } = require("../../helpers");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllerWrapper(ctrl.register)
);

// signin
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  controllerWrapper(ctrl.login)
);

router.get("/current", authenticate, controllerWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, controllerWrapper(ctrl.logout));

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(ctrl.updateAvatar)
);

module.exports = router;
