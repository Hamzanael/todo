const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const app = express();
var path = require('path')
var _ = require('lodash');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-hamza:nh19991128@cluster0.kj5ro.mongodb.net/Blog', {useNewUrlParser: true, useUnifiedTopology: true});
const BlogSchema=mongoose.Schema({
  title:String,
  content:String,
  subcont:String
});
const Blog=mongoose.model("blog",BlogSchema);
var posts = [];
// TODO: Add Email service for your blog
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.set("view engine", "ejs");



app.get("/", function(req, res) {
  res.redirect("/home")
});


app.post("/", function(req, res) {


});




app.get("/home", function(req, res) {

    Blog.find({},function(err,foundItems){

      if (err) {
        console.log(err);
      } else {
        res.render("home",{posts:foundItems});
      }

    });

});


app.get("/add", function(req, res) {

  res.render('add');

});


app.post("/add", function(req, res) {
var tit= req.body.title;
var cont= req.body.content;
var subc=cont.substr(0,99);
Blog.findOne({title:tit},function(err,foundItem){
if (!foundItem) {
  const newBlog=new Blog({
    title:tit,
    content:cont,
    subcont:subc,
  });
  newBlog.save();
  res.redirect("/home");
} else {
  res.render("post",{
  title:foundItem.title,
  content:foundItem.content
  });
}

});




});

app.get("/post", function(req, res) {
  res.render('add');

});

app.post("/post", function(req, res) {
  res.redirect("/home");

});

app.get("/post/:postname", function(req, res) {
  var para = req.params.postname;
Blog.findOne({title:para},function(err,foundItem){
  if (foundItem) {
    res.render("post", {
      title:foundItem.title,
      content:foundItem.content
    });

  } else {
    res.redirect("/home");
  }
});



});


app.listen(port || 3000, function() {
  console.log("system is work on" + 3000);
})
