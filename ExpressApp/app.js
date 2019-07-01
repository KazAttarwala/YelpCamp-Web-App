const express = require('express');
const app = express();


app.get("/", function(request, response) {
    response.send("Hi there, welcome to my assignment");
});

app.get("/speak/:animal/", function(request, response) {
    var animal = request.params.animal;
    var sound = "";
    if (animal == 'pig') {
        sound = "Oink";
    }
    else if (animal == 'cow') {
        sound = "Moo";
    }
    else if (animal == 'dog') {
        sound = "Woof Woof";
    }
    response.send("The " + animal + " says " + sound);
});


app.get("/repeat/:word/:number/", function(request, response) {
    var word = request.params.word;
    var number = request.params.number;
    var returnString = '';
    for (var i = 0; i < number; i++) {
        returnString += word + " "
    }
    response.send(returnString);
});

app.get("*", function(req, res) {
   res.send("Sorry, page not found...What are you doing with your life?!") 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});