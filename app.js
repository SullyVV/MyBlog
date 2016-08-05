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
//RESTful routes

//set up server listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("MyBlog server started...");
});