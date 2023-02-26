const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  try {
    // Find contacts of the user
    const contacts = await Contact.find({ user: req.user.id });
    if (contacts.length > 0) {
      return res.json(contacts);
    } else {
      return res.status(400).json({ msg: "No Contacts Found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Internal Server Error!");
  }
});
//@desc Create a contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const isDuplicate = await Contact.find({
    $and: [
      { user: req.user.id },
      { $or: [{ email: email }, { phone: phone }] },
    ],
  });
  if (isDuplicate.length > 0) {
    res.status(400);
    throw new Error(
      `Duplicate entry attempt! A contact with that ${
        email == isDuplicate[0].email ? "Email" : "Phone Number"
      } already exists!`
    );
  }

  // If request is not duplicate, then proceed and store in DB
  try {
    const contact = await Contact.create({
      user: req.user.id,
      name,
      email,
      phone,
    });
    res.json(201, { message: "contact created", contact: contact });
    console.log("contact created");
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Internal Server Error!");
  }
});

//@desc Retrieve a contact by ID
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contactID = req.params.id;
  try {
    // Find contact of the user with the contact id in params
    const contact = await Contact.find({
      $and: [{ user: req.user.id }, { _id: contactID }],
    });
    if (contact.length > 0) {
      return res.json(contact);
    } else {
      return res.status(400).json({ msg: "No Such Contact Found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Internal Server Error!");
  }
});
//@desc Update a contact by ID
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  const contactID = req.params.id;
  try {
    // Find contact of the user with the contact id in params
    let contact = await Contact.find({
      $and: [{ user: req.user.id }, { _id: contactID }],
    });
    if (contact.length > 0) {
      //Check for duplicate email or phone number in any contact of the user
      const isDuplicate = await Contact.find({
        $and: [
          { user: req.user.id },
          { $or: [{ email: email }, { phone: phone }] },
        ],
      });

      if (isDuplicate.length > 0) {
        res.status(400);
        throw new Error(
          `Duplicate entry attempt! A contact with that ${
            email == isDuplicate[0].email ? "Email" : "Phone Number"
          } already exists!`
        );
      }

      // If NOT Duplicate, proceed
      // Save and Update DB
      contact = await Contact.findByIdAndUpdate(
        req.params.id,
        {
          $set: { name: name, email: email, phone: phone },
        },
        { new: true }
      );
      res.json(contact);
    } else {
      return res.status(400).json({ msg: "No Such Contact Found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Internal Server Error!");
  }
});
const deleteContact = asyncHandler(async (req, res) => {
  try {
    // Fetching contact from db
    let contact = await Contact.findById(req.params.id);

    // Check if contact exists or not
    if (!contact) return res.status(404).json({ msg: "Contact Not Found!" });

    // Checking if the Contact's Owner is as same as the incoming request maker by matching user ids
    if (contact.user != req.user.id)
      return res.status(401).json({ msg: "Un-Authorized Attempt!" });

    // If user is authorized, proceed
    const isDeleted = await Contact.findByIdAndDelete(req.params.id);
    res.json(isDeleted);
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Internal Server Error!");
  }
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
