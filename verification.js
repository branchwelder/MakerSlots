User = require('./models/userModel')
var passport = require('passport')
var LocalStrategy = require('passport-local')
var bcrypt = require('bcryptjs')

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use('local-signin', new LocalStrategy(
  {username:'name', password:'password', passReqToCallback:true},
  function(req, username, password, done) {
    console.log("Signing someone in.")
    console.log(done)
    User.findOne({ name: username }, function (err, user) {
      if (err) { return done(err); }
      else if (!user) {
        // req.session.error("User does not exist")
        done(null, false)
      }
      else if (!user.validPassword(password)) { 
        // req.session.error = "Incorrect password"
        // return done(null, false); 
      }
      else {
        return done(null, user);
      }
    });
  }
));

passport.use('local-signup', new LocalStrategy(
  {username:'name', password:'password', passReqToCallback:true},
  function(req, username, password, done) {
    console.log("Checking login stuff.")
    User.find({ name: username }, function (err, user) {
      if (err) { return done(err); console.log(err)}
      else if(user.length != 0){
        console.log(user.length)
        //If someone already has the username
        console.log(user)
        // req.session.error = "That username is already in use"
        console.log("User already exists")
        return done(null, false)
      }
      else{
        console.log(user);
        userinfo = req.body
        user = new User()
        user.name = userinfo.username;
        user.email = userinfo.email;
        user.password = user.generateHash(userinfo.password);

        console.log("trying to save");
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
var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { 
    return next(req, res); }
  else{
    // res.send("please log in");
    res.redirect('/login');
  }
  res.status(401);
}
functions = {"ensureAuthenticated": ensureAuthenticated}
module.exports = functions