const router = require("express").Router();
const ContactsController = require("../controllers/contact.controller");

router
  .route("/")
  .get(ContactsController.getAllContacts)
  .post(ContactsController.createContact);

router
  .route("/:id")
  .get(ContactsController.getContact)
  .put(ContactsController.updateContact)
  .delete(ContactsController.deleteContact);

module.exports = router;
