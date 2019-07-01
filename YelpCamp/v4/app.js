var express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
Campground = require("./models/campground"),
Comment = require("./models/comment"),
SeedDB = require("./seed"),
app = express()

SeedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
    {name: 'Salmon Creek', image: 'https://media.wired.com/photos/599b4cfd4fa6fc733c11e30d/master/w_799,c_limit/iStock-820873602.jpg'},
    {name: 'granite', image: 'https://media.wired.com/photos/599b4cfd4fa6fc733c11e30d/master/w_799,c_limit/iStock-820873602.jpg'},
    {name: 'butts', image: 'https://media.wired.com/photos/599b4cfd4fa6fc733c11e30d/master/w_799,c_limit/iStock-820873602.jpg'}
];

//Root Route
app.get("/", function(request, response) {
    response.render("campgrounds/home");
});

//Index Route
app.get("/campgrounds", function(request, response) {
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            response.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    })
});

//Create Route
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

//New Route
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
})

//Show Route
app.get("/campgrounds/:id", function(req, res) {
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show", {foundCampground: foundCampground});
        }
    });
});

//==============================
//Comments Routes
//==============================

//New Route
app.get("/campgrounds/:id/comments/new", function(req, res) {
    var id = req.params.id;
    Campground.findById(id, function(err, foundCampground) {
        if(err) {
            res.redirect("/campgrounds/")
        }
        else {
            res.render("comments/new", {foundCampground: foundCampground})
        }
    })
})

//Create Route
app.post("/campgrounds/:id/comments", function(req, res) {
    var id = req.params.id;
    Campground.findById(id, function(err, foundCampground) {
        if(err) {
            
        }
        else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    
                }
                else {
                    foundCampground.comments.push(comment);
                    foundCampground.save(function(err) {
                        if(err) {
                            console.log(err);
                        }
                        return;
                    });    
                    res.redirect(`/campgrounds/${foundCampground._id}`);
                    }
                })
            }
        })
})



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Server has started");
});