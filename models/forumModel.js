var mongoose = require('mongoose');

// Create a wiki page schema <-- make sure you update comments to match new context if you're reusing code :)
var forumSchema = mongoose.Schema({
    user: String,
    content: String,
    title: String,
    comments: Array //array of objects containing information about comments
});

module.exports  = mongoose.model('forum', forumSchema);
