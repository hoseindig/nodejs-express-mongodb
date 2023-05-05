const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json({ isSucsess: true, data: post });
  } catch (error) {
    res.status(500).json({ message: error.message, isSucsess: false }); //eror  server
  }
  console.log("post get list");
});

router.get("/:id", (req, res) => {
  console.log("post get id");
  res.send("hello get one");
});
//add one
router.post("/", async (req, res) => {
  const post = await Post({
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const newPost = await post.save();
    res.status(201).json({ isSucsess: true, data: newPost }); //create sucsess
  } catch (error) {
    res.status(400).json({ message: error.message, isSucsess: false }); //bad data
  }
  console.log("post post id");
});
//update
router.patch("/:id", (req, res) => {
  console.log("updare post id");
  res.send("hello patch");
});

//delete
router.delete("/:id", (req, res) => {
  console.log("delete post id");
  res.send("hello delete");
});
module.exports = router;
