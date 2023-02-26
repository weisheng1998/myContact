const { check, validationResult } = require("express-validator");

const validateUserCreation = [
  check("username", "Please enter a valid name").not().isEmpty(),
  check("email", "Please enter a valid Email Id!").isEmail(),
  check(
    "password",
    "Please enter a valid password with atleast 5 or more characters!"
  ).isLength({ min: 5 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    console.log("user input all correctly");
    next();
  },
];

const validateUserLogin = [
  check("email", "Please enter a valid Email Id!").isEmail(),
  check(
    "password",
    "Please enter a valid password with atleast 5 or more characters!"
  ).isLength({ min: 5 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    console.log("user input all correctly");
    next();
  },
];

module.exports = { validateUserCreation, validateUserLogin };
