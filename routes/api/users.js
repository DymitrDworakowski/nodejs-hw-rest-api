const express = require("express");
const routerUsers = express.Router();
const authMid = require("../../middleware/auth");
const upload = require("../../middleware/upload");
const resizeImage = require("../../middleware/jimp");

const AuthController = require("../../controllers/authController");

routerUsers.post("/register", AuthController.register);
routerUsers.post("/login", AuthController.login);
routerUsers.get("/current", authMid, AuthController.current);
routerUsers.post("/logout", authMid, AuthController.logout);
routerUsers.patch(
  "/avatars",
  authMid,
  upload.single("avatars"),
  resizeImage,
  AuthController.uploadAvatars
);
routerUsers.get("/verify/:verificationToken", AuthController.verify);
routerUsers.post("/verify",AuthController.verifyEmail);

module.exports = routerUsers;
