const bodyParser = require("body-parser");
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/error-handler");
const dotenv = require("dotenv").config();
const contactRouter = require("./routes/contact.router");
const userRouter = require("./routes/user.router");

connectDb();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);

app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
