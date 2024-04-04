const express = require("express");
const { logout, register, login } = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
