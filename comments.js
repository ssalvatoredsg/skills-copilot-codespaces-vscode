// Create web server
const express = require("express");
const app = express();
const port = 3000;

// Connect to MongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/comments", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create schema
const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String,
});

// Create model
const Comment = mongoose.model("Comment", commentSchema);

// Set view engine
app.set("view engine", "ejs");

// Set static files
app.use(express.static("public"));

// Get data from database
app.get("/", (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { comments: comments });
    }
  });
});

// Post data to database
app.post("/comment", (req, res) => {
  const { name, email, comment } = req.query;

  const newComment = new Comment({
    name: name,
    email: email,
    comment: comment,
  });

  newComment.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

// Listen to port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});