const express = require('express');
const app = express();

// "/" => "Hi there"
app.get("/", function(request, response) {
    response.send("Hi there");
});
// "/bye" => "See ya"
app.get("/bye", function(request, response) {
    response.send("See ya");
});
// "/dog" => "Woof"
app.get("/dog", function(request, response) {
    response.send("Woof");
});

app.get("*", function(req, res) {
   res.send("What?") 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});