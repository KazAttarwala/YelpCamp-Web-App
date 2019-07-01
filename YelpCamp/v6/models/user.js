var mongoose = require("mongoose");

// SCHEMA SETUP
var userSchema = new mongoose.Schema({
    username: String,
    password: String
})

module.exports = mongoose.model("User", userSchema);

