//@description Get All Contacts
//@route GET /api/contacts
//@access public
const getAllContacts = (req, res) => {
  res.status(200).json({ message: "get all contacts" });
};

//@description create new contacts
//@route POST /api/contacts
//@access public
const createContact = (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !phone || !email) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  res.status(201).json({ message: "create a contact" });
};

//@description Get a Contact
//@route GET /api/contacts/:id
//@access public
const getContact = (req, res) => {
  res.status(200).json({ message: "get specific contact" + req.params.id });
};

//@description update a Contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = (req, res) => {
  res.status(200).json({ message: "update a contact" + req.params.id });
};

//@description delete a Contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = (req, res) => {
  res.status(200).json({ message: "delete a contact" + req.params.id });
};

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
