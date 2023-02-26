var express = require("express");
var router = express.Router();
//userController
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
//check for valid username, email and password in req body using express-validator
const {
  validateUserCreation,
  validateUserLogin,
} = require("../middleware/validator/validateUser"); 
//authetication
const validateToken = require("../middleware/validateTokenHandler"); 

router.post("/register", validateUserCreation, registerUser);
router.post("/login", validateUserLogin, loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;
