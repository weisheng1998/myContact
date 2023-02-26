var express = require("express");
var router = express.Router();
//contactController
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
//check for valid contactID in req.params using express-validator
const {
  validateContactID,
} = require("../middleware/validator/validateContact");
//authetication
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.get("/:id", validateContactID, getContact);
router.put("/:id", validateContactID, updateContact);
router.delete("/:id", validateContactID, deleteContact);

// router.route("/:id").get(getContact).put(updateContact).delete(deleteContact); //couldnt be used as no idea how to pass in middleware

module.exports = router;
