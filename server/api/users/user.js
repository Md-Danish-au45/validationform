const express = require("express");
const controller = require('./user.controller');
const verifyToken = require("../../middleware/auth");
const router = express.Router();
router.post("/register",controller.postSignup);
router.get("/user",verifyToken,controller.all_user);
router.post("/login",controller.login);
router.delete("/user/:userId",controller.deleteUser);

module.exports =router;