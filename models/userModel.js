var mongoose = require('mongoose');

// Create a wiki page schema
var userSchema = mongoose.Schema({
    name: String,
    password: String,
    printHist: String,
    forumHist: String,
    isNinja: Boolean,
    email: String
});

module.exports  = mongoose.model('user', userSchema);