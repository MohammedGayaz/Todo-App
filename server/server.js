const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { dbURI, PORT } = require("./config");
const apiRouter = require("./routes/index");

const app = express();

//connecting to mongo db
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server listening at post ${PORT}\nServer connected to DataBase`
      );
    });
  })
  .catch((error) => console.log("Sever connection Problem", error));

//middlewares
app.use(express.json());
app.use(cors());

//main api route
app.use("/api/v1/", apiRouter);
