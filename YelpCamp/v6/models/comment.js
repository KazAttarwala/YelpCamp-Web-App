var mongoose = require("mongoose");

// SCHEMA SETUP
var commentSchema = new mongoose.Schema({
    text: String,
    author: String,
    createdTS: {type: Date, default: Date.now}
})
module.exports = mongoose.model("Comment", commentSchema);

