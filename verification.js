User = require('./models/userModel')
var passport = require('passport')
var LocalStrategy = require('passport-local')
var bcrypt = require('bcrypt')

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use('local-signin', new LocalStrategy(
  {username:'name', passReqToCallback:true},
  function(req, username, password, done) {
  	console.log("Signing someone in.")
    User.findOne({ name: username }, function (err, user) {
      if (err) { return done(err); }
      else if (!user) {
        req.session.error("User does not exist")
      	done(null, false)
      }
      else if (!user.validPassowrd(password)) { 
        req.session.error("Incorrect password")
      	return done(null, false); 
      }
      else {
      	return done(null, user);
      }
    });
  }
));

passport.use('local-signup', new LocalStrategy(
  {username:'name', passReqToCallback:true},
  function(req, username, password, done) {
  	console.log("Checking login stuff.")
    User.find({ name: username }, function (err, user) {
      if (err) { return done(err); console.log(err)}
      else if(user){
        //If someone already has the username
        req.session.error = "That username is already in use"
        return done(null, false)
        console.log("User already exists")
      }
      else{
        userinfo = req.body.user
        user = new User({name:userinfo.name,
                         email:userinfo.email,
                         password: user.generateHash(password),
                         isNinja: False})
        return done(null, false)
        console.log("User created.")
      }
    })
  }
));


// test authentication
var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(req, res); }
  res.status(401);
}
