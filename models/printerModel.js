var mongoose = require('mongoose');

// Create a wiki page schema
var printerSchema = mongoose.Schema({
    name: String,
    status: String
});

module.exports  = mongoose.model('printer', printerSchema);