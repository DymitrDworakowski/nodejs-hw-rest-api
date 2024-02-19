const express = require("express");
const routerUsers = express.Router();
const authMid = require("../../middleware/auth");
const upload = require("../../middleware/upload");
const resizeImage = require("../../middleware/jimp");

const AuthController = require("../../controllers/authController");

routerUsers.post("/register", AuthController.register);
routerUsers.post("/login", AuthController.login);
routerUsers.post("/logout", authMid, AuthController.logout);
routerUsers.get("/current", authMid, AuthController.current);
routerUsers.patch(
  "/avatars",
  authMid,
  upload.single("avatars"),
  resizeImage,
  AuthController.uploadAvatars
);
module.exports = routerUsers;
