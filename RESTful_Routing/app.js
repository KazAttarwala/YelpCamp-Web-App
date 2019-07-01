var express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer"),
app = express();

mongoose.connect("mongodb://localhost/restful_blog_app");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer);

app.set("view engine", "ejs");

// SCHEMA SETUP
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    createdTS: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

//Root Route
app.get("/", function(request, response) {
    response.redirect("/blogs");
});
//Index Route
app.get("/blogs", function(request, response) {
    Blog.find({}, function(err, allBlogs){
        if(err){
            console.log(err);
        }
        else{
            response.render("index", {allBlogs: allBlogs});
        }
    });
});
//Create Route
app.post("/blogs", function(req, res) {
    var blog = req.body.blog;
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(blog, function(err, newBlog){
        if(err){
            res.render("new");
        }
        else{
            res.redirect("/blogs");
        }
    });
});
//New Route
app.get("/blogs/new", function(req, res) {
    res.render("new");
});
//Show Route
app.get("/blogs/:id", function(req, res) {
    var id = req.params.id;
    Blog.findById(id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("show", {foundBlog: foundBlog});
        }
    });
});
//Edit Route
app.get("/blogs/:id/edit", function(req, res) {
    var id = req.params.id;
    Blog.findById(id, function(err, foundBlog){
        if(err) {
            res.redirect("/blogs");
        }
        else {
            res.render("edit", {foundBlog: foundBlog});
        }
    });
});
//Update Route
app.put("/blogs/:id", function(req, res) {
    var id = req.params.id;
    var newData = req.body.foundBlog;
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(id, newData, function(err, updatedBlog) {
        if(err) {
            res.redirect("/blogs");
        }
        else {
            res.redirect(`/blogs/${id}`);
        }
    });
});
//Delete Route
app.delete("/blogs/:id", function(req, res) {
    var id = req.params.id;
    Blog.findByIdAndRemove(id, function(err, deletedBlog) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("RESTful Blog App Server has started");
});