require("dotenv").config();

const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("db error", err);
});
db.on("open", () => {
  console.log("db connected");
});

//express
app.use(express.json());

const postRouter = require("./routers/post");
app.use("/post", postRouter);
//listen
app.listen(port, () => {
  console.log("server run on port", port);
});
