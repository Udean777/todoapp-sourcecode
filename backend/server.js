require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todolist");
const cors = require("cors");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/todolist", todoRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to mongodb & listening on port`, process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
