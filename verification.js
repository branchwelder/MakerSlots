User = require('./models/userModel')
var passport = require('passport')
var LocalStrategy = require('passport-local')

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use('local-signin', new LocalStrategy(
  {username:'name', passReqToCallback:true},
  function(req, username, password, done) {
    var hash = crypto
      .createHash("md5")
      .update(password)
      .digest('hex');
    User.findOne({ name: username }, function (err, user) {
      if (err) { return done(err); }
      else if (!user) {
        req.session.error("User does not exist")
      	done(null, false)
      }
      else if (user.passwordHash !== hash) { 
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
    var hash = crypto
      .createHash("md5")
      .update(password)
      .digest('hex');
    User.findOne({ name: username }, function (err, user) {
      if (err) { return done(err); }
      else if(user){
        //If someone already has the username
        req.session.error = "That username is already in use"
        return done(null, false)
      }
      else{
        userinfo = req.body.user
        user = new User({name:userinfo.name,
                         email:userinfo.email,
                         passwordHash: hash
                         isNinja: False})
        return done(null, false)
      }
    })
  }
));


// test authentication
var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(req, res); }
  res.status(401);
}
