const express = require("express");

const bodyParser = require("body-parser");

const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

const mongoose = require("mongoose");

const startContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad";

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);



app.get("/",function(req,res){
  res.render("home",{pageTitle:"home"});
});




app.get("/compose", function(req, res) {
  res.render("compose", {
    pageTitle: "compose"
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    pageTitle: "contact"
  });
});

app.post("/contact", function(req, res) {
  res.render("contact",{pageTitle:"contact"});
});

app.post("/compose", function(req, res) {
  const title = req.body.title;
  const postContent = req.body.post;
  const post = new Post({
    title: title,
    content: postContent
  });

  post.save();

});
app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});


app.listen(3000, function() {
  console.log("the server is being set to local host 3000.");
});
