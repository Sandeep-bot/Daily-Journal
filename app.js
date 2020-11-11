//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
//const head = require(__dirname + "/home.ejs");

let posts = [];
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true });

// const postSchema = {
//   title: String,
//   content: String
// };
// const Post = mongoose.model("Post", postSchema);

// const post = new Post({
//   title: req.body.postTitle,
//   content:req.body.postBody
// });

app.get("/", (req, res) => {
   var today= new Date();
  var options = { weekday: "long", month: "long", day: "numeric" };
  var day = today.toLocaleDateString("en-US", options);
  res.render("home", {
    startPage: homeStartingContent,
    todaydate:day,
    posts:posts
  }); 
  //res.write("home", { todaydate: day });
  //<h3><%=todaydate%><h3>
  
});
app.get("/about", (req, res) => {
  res.render("about", { aboutpage: aboutContent }); 
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactpage:contactContent}); 
});

app.get("/compose", (req, res) => {
    var today= new Date();
  var options = { weekday: "long", month: "long", day: "numeric" };
  var day = today.toLocaleDateString("en-US", options);
   res.render("compose",{ todaydate:day}); 
});


app.post("/compose", (req, res) => {
  var today= new Date();
  var options = { weekday: "long", month: "long", day: "numeric" };
  var day = today.toLocaleDateString("en-US", options);
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
    dates:day
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postTitle", (req, res) => {
  var today= new Date();
  var options = { weekday: "long", month: "long", day: "numeric" };
  var day = today.toLocaleDateString("en-US", options);
  const reqTitle = _.lowerCase(req.params.postTitle);
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === reqTitle) {
    //   console.log("match found");
    // } else {
    //   console.log("Not Found");
      res.render("post", {
        title:post.title,
        content: post.content,
        todaydate:day
      });
    
    }
  });
});
 
//post.save();
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
