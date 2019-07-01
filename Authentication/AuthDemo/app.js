const express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    expressSession = require("express-session")

var app = express();
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost/auth_demo");
app.use(bodyParser.urlencoded({extended: true}));
//Need to use the below statements whenever utilizing passport.js
app.use(expressSession ({
    secret: "I am cool",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
    res.render("home");
})
app.get("/secret", isLoggedIn, function(req, res) {
    var username = req.body.username;
    res.render("secret", {username: username});
})

//REGISTER ROUTES
app.get("/register", function(req, res) {
    res.render("register")
})
app.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if(err) {
            console.log("This was " + err)
            return res.render("register");
        }
        else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secret");
            })
        }
    })
})

//LOGIN ROUTES
app.get("/login", function(req, res) {
    res.render("login")
})
app.post("/login", passport.authenticate("local", 
{
    successRedirect: "/secret", 
    failureRedirect: "/login"
}), function (req, res) {
  
})
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
})

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send("You must log in to see the secret.")
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("AuthDemo Server has started");
});