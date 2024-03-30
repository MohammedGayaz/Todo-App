const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT } = require("./config");
const { DB_URL } = require("./config");

const app = express();
const apiRoute = require("./api/apiRoute");

mongoose
  .connect(DB_URL)
  .then(() => console.log("Database connected successfully "))
  .catch((err) => console.log("Failed to connect Database", err));

// Middlewares
app.use(cors());
app.use(express.json());

// main api route
app.use("/api/v1", apiRoute);

app.listen(PORT, () => {
  console.log("listening at port, ", PORT);
});
