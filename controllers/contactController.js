const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ user_id: req.user.id })
  res.status(200).json(contact);
});

//@desc Create new contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  console.log('The request body', req.body);  
  const {name, email, phone} = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All Fields Are Required 😄!")
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  });
  res.status(201).json(contact);
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => { 
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact Not Found")
  }
  res.status(200).json(contact);
});

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact Not Found")
  }

  if (contact._id.toString() !== req.user.id){
    res.status(403);
    throw new Error("This user does't have permission")
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}
  )
  res.status(200).json(updatedContact);
});

//@desc Delete a contact
//@route Delete /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact Not Found")
  }

  
  if (contact._id.toString() !== req.user.id){
    res.status(403);
    throw new Error("This user does't have permission")
  }

  await Contact.deleteOne({_id: req.params.id});
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
