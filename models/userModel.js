var mongoose = require('mongoose');

// Create a wiki page schema
var userSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String
});

module.exports  = mongoose.model('user', userSchema);