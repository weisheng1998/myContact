const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

// Starting Server
app.listen(port, (err, res) => {
  if (err) {
    console.error(`Error Occured while starting server! ${err}`);
  } else {
    console.log(`Server Started at Port ${port}...`);
  }
});
