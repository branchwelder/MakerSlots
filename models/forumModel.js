var mongoose = require('mongoose');

// Create a wiki page schema
var forumSchema = mongoose.Schema({
    user: String,
    content: String,
    title: String,
    comments: Array //array of objects containing information about comments
});

module.exports  = mongoose.model('forum', forumSchema);
