var mongoose = require('mongoose');

// Create a wiki page schema
var announcementSchema = mongoose.Schema({
    time: String,
    text: String
});

module.exports  = mongoose.model('announcement', announcementSchema);