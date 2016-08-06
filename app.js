//set up the Blog App
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/MyBlog");
//Set up simple blog schema
var BlogSchema = new mongoose.Schema({
   title: String,
   img: String,
   contents: String,
   createdTime: {type: Date, default: Date.now()}
});
var Blog = mongoose.model("Blog", BlogSchema);
// Blog.create({
//     title: "My dog",
//     img: "https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/Common-dog-behaviors-explained.jpg?itok=FSzwbBoi",
//     contents: "hello world"
// });
//RESTful routes

app.get("/", function(req, res) {
    res.redirect("/blogs");
});
//INDEX route
app.get("/blogs", function(req, res) {
    //get all blogs from db and rende on index
    Blog.find({}, function(err, allblogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {blogs: allblogs}); 
        }
    })
})
//NEW route
app.get("/blogs/new", function(req, res){
   //render to a form page
   res.render("new");
});
//CREATE route
app.post("/blogs", function(req, res){
   //obtain data from the form
   var ntitle = req.body.blog.title;
   var nimg = req.body.blog.img;
   var ncontents = req.body.blog.contents;
   //create new blog into database
  Blog.create({
      title: ntitle,
      img: nimg,
      contents: ncontents
  },function(err, newBlog){
      if (err) {
          console.log(err);
      } else {
          //redirect
          res.redirect("/blogs");
      }
  });
});
//SHOW route
app.get("/blogs/:id", function(req, res){
    //find blog according to id and render new page according to the blog
    Blog.findById(req.params.id, function(err, foundBlog){
       if (err) {
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: foundBlog});
       }
    });
});
//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if (err) {
           console.log(err);
       } else {
           res.render("edit", {blog: foundBlog}); 
       }
    });
});
//UPDATE route
app.put("/blogs/:id", function(req, res){
    //get updated data and override database
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
});
//DESTROY route
app.delete("/blogs/:id", function(req, res){
    //delete the blog according the id
    Blog.findByIdAndRemove(req.params.id, function(err, ret) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    })
    //redirect 
});
//set up server listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("MyBlog server started...");
});