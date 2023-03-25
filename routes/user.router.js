const router = require("express").Router();
const userController = require("../controllers/user.controller");
const validateToken = require("../middleware/validate-token-handler");

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/current", validateToken, userController.currentUser);

module.exports = router;
