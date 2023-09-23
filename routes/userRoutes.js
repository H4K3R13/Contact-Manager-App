const express = require("express");
const {
  userRegister,
  userLogin,
  userCurrent,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", userRegister);

router.post("/login", userLogin);

router.get("/current",validateToken, userCurrent);

module.exports = router;
