const express = require("express");
const errorHandler = require("./middleware/error-handler");
const dotenv = require("dotenv").config();
const contactRouter = require("./routes/contact.router");

const app = express();

app.use(express.json());
app.use(errorHandler);

app.use("/api/contacts", contactRouter);

const PORT = 3000 || process.env.PORT;
app.listen(PORT);
