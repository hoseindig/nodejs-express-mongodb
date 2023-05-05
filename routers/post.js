const express = require("express");
const router = express.Router();
const Post = require("../models/post");
console.log("run post route");
///////////////////////
//middlware function
const getPost = async (req, res, next) => {
  let post;
  try {
    post = await Post.findById(req.params.id);

    if (post == null)
      res.status(404).json({ isSucsess: true, message: "not found" });
    // else res.post = post;
  } catch (error) {
    return res.status(500).json({ message: error.message, isSucsess: false }); //bad data
  }
  res.post = post;
  next();
};
///////////////////////

router.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json({ isSucsess: true, data: post });
  } catch (error) {
    res.status(500).json({ message: error.message, isSucsess: false }); //eror  server
  }
  console.log("post get list");
});

router.get("/:id", getPost, (req, res) => {
  console.log("post get id");
  res.send(res.post);
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
router.patch("/:id", getPost, (req, res) => {
  try {
  } catch (error) {}

  console.log("updare post id");
  res.send("hello patch");
});

//delete
router.delete("/:id", async (req, res) => {
  let post;
  try {
    const findPost = await Post.deleteOne({ _id: req.params.id });
    if (findPost) {
      res.json({ isSucsess: true, data: findPost });
    } else {
      res.status(404).json({ isSucsess: true, message: "not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, isSucsess: false }); //bad data
  }

  console.log("delete post id");
});
module.exports = router;
