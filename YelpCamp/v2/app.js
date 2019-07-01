var express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
app = express()

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})
var Campground = mongoose.model("Campground", campgroundSchema);

var campgrounds = [
    {name: 'Salmon Creek', image: 'https://media.wired.com/photos/599b4cfd4fa6fc733c11e30d/master/w_799,c_limit/iStock-820873602.jpg'},
    {name: 'granite', image: 'https://media.wired.com/photos/599b4cfd4fa6fc733c11e30d/master/w_799,c_limit/iStock-820873602.jpg'},
    {name: 'butts', image: 'https://media.wired.com/photos/599b4cfd4fa6fc733c11e30d/master/w_799,c_limit/iStock-820873602.jpg'}
];

app.get("/", function(request, response) {
    response.render("home");
});
app.get("/campgrounds", function(request, response) {
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            response.render("index", {campgrounds: allCampgrounds});
        }
    })
});
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.desc;
    Campground.create({name: name, image: image, description: description}, function(err, newCampground){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });
})
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})
app.get("/campgrounds/:id", function(req, res) {
    var id = req.params.id;
    Campground.findById(id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {foundCampground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Server has started");
});