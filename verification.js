User = require('./models/userModel')
var passport = require('passport')
var LocalStrategy = require('passport-local')
var bcrypt = require('bcryptjs')

//Both of these functions are required to make passport work.
//We didn't need them to actually do anything, so they don't.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//This function uses a person's username and password to sign them in.
//No other information is required.
passport.use('local-signin', new LocalStrategy(
  {username:'name', password:'password', passReqToCallback:true},
  function(req, username, password, done) {
    User.findOne({ name: username }, function (err, user) {
      //Checks for an existing user
      //"done" function takes (err, user or denial)
      if (err) { return done(err); }
      else if (!user) {
      	//No user exists
        done(null, false)
      }
      else if (!user.validPassword(password)) {
      	//Password doesn't match
        return done(null, false);
      }
      else {
      	//User is valid
        return done(null, user);
      }
    });
  }
));

//This is called when someone tries to create a new user
//It gets most of its information from the request made to it
passport.use('local-signup', new LocalStrategy(
  {username:'name', password:'password', passReqToCallback:true},
  function(req, username, password, done) {
    console.log("Checking login stuff.")
    User.find({ name: username }, function (err, user) {
      if (err) { return done(err); console.log(err)}
      else if(user.length != 0){
        //If someone already has the username
        return done(null, false)
      }
      else{
        userinfo = req.body // redundant... you can just use req.body (see below)
        var user = new User()
        user.name = req.body.username;
        user.email = req.body.email;
        user.isNinja = false;

        user.save(function(err){
          if (err){
            // req.session.error = "Error saving user to database"
          }
        })
        return done(null, user)
        console.log("User created.")
      }
    })
  }
));

// test authentication
//"next" is the actual function for the route you protect with authentication
var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next(req, res); }
  else{
    res.redirect('/login');
  }
  res.status(401);
}

//This entire file is run when it is first called, so this is
//the only export that es actually needed.
functions = {"ensureAuthenticated": ensureAuthenticated}
module.exports = functions

// You could also just:
// modules.exports.ensureAuthenticated = ensureAuthenticated
// Does the same thing as the previous two lines
