const request = require('request');
const express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/results", function(req, res) {
    var search = req.query.search;
    request(`http://www.omdbapi.com/?apikey=thewdb&s=${search}`, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
        else {
            console.error('error:', error); // Print the error if one occurred
        }
});
});
app.get("/", function(req, res){
   res.render("search");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie API has started");
});