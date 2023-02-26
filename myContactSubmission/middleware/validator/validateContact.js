const { check, validationResult } = require("express-validator");

const validateContactID = [
  check(
    "id",
    "Please enter a valid contact id with exactly 24 characters!"
  ).isLength({ min: 24, max: 24 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    console.log("user input contact id correctly");
    next();
  },
];

module.exports = { validateContactID };
