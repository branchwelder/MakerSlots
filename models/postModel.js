var mongoose = require('mongoose');

// Create a wiki page schema
var postSchema = mongoose.Schema({
    user: String,
    content: String
});

module.exports  = mongoose.model('post', postSchema);