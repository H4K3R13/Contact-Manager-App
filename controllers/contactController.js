const asyncHandler = require("express-async-handler")

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all contact" });
});

//@desc Create new contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async(req, res) => {
  console.log('The request body', req.body);  
  const {name, email, phone} = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All Fields Are Required!😄")
  }
  res.status(201).json({ message: "Create contact" });
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get contact for ${req.params.id} ` });
});

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id} ` });
});

//@desc Delete a contact
//@route Delete /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Contact ${req.params.id}` });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
