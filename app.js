//set up the Blog App
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
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
Blog.create({
    title: "My dog",
    img: "https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/Common-dog-behaviors-explained.jpg?itok=FSzwbBoi",
    contents: "hello world"
});
//RESTful routes

app.get("/", function(req, res) {
    res.redirect("/blogs");
})
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
//set up server listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("MyBlog server started...");
});