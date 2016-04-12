/* Schema for each user
 * name: Name of person
 * email: email of person
 * purpose: Class/Scope, Research, Team, etc...
 * classes: What class is it for?
 * printMass: mass of print, in grams
 * dateAndTime: what it says
 * durration: time it takes to print
 * ninjaApproval: if over six hours, has it been approved?
 * printer: which printer is being used
 * problems: any issues that cropped up durring printing
 */

var mongoose = require('mongoose');

// Create a wiki page schema
var printSchema = mongoose.Schema({
    name: String,
    email: String,
    part: String,
    purpose: String,
    classes: String,
    printMass: Number,
    dateAndTime: String,
    // endTime: String, //we need to add functionality to this
    duration: Number, //In minutes //and probably remove this
    ninjaApproval: Boolean,
    printer: String,
    problems: String

});

module.exports  = mongoose.model('print', printSchema);