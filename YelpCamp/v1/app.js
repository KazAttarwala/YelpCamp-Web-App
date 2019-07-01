var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
    {name: 'Salmon Creek', image: 'https://media.wired.com/photos/599b4cfd4fa6fc733c11e30d/master/w_799,c_limit/iStock-820873602.jpg'},
    {name: 'granite', image: 'https://media.wired.com/photos/599b4cfd4fa6fc733c11e30d/master/w_799,c_limit/iStock-820873602.jpg'},
    {name: 'butts', image: 'https://media.wired.com/photos/599b4cfd4fa6fc733c11e30d/master/w_799,c_limit/iStock-820873602.jpg'}
];

app.get("/", function(request, response) {
    response.render("home");
});
app.get("/campgrounds", function(request, response) {
    response.render("campgrounds", {campgrounds: campgrounds});
});
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    campgrounds.push({name: name, image: image});
    res.redirect("/campgrounds")
})
app.get("/campgrounds/new", function(req, res) {
    res.render("form");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Server has started");
});