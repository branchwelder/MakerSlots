var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// Create a wiki page schema
var userSchema = mongoose.Schema({
    name: String,
    password: String,
    printHist: String,
    forumHist: String,
    isNinja: Boolean,
    email: String
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports  = mongoose.model('user', userSchema);