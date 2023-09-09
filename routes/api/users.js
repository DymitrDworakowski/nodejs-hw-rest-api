const express = require("express");
const routerUsers = express.Router();
const authMid = require("../../middleware/auth");

const AuthController = require("../../controllers/authController");

routerUsers.post("/register", AuthController.register);
routerUsers.post("/login", AuthController.login);
routerUsers.post("/logout", authMid, AuthController.logout);
routerUsers.get("/current", authMid, AuthController.current);
module.exports = routerUsers;
