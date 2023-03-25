const router = require("express").Router();
const ContactsController = require("../controllers/contact.controller");
const validateToken = require("../middleware/validate-token-handler");

router.use(validateToken);

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
