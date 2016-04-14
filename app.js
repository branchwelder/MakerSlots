
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes/index.js'),
    userroutes = require('./routes/userroutes.js')
    mongoose = require('mongoose'),
    session = require('express-session'),
    passport = require('passport');

mongoose.connect('mongodb://localhost/MakerSlot');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('port', (process.env.PORT || 3000));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(session({secret: 'weremakingawebsiteforseveral3dprinters', saveUninitialized: true, resave: true}));
  app.use(passport.initialize());
  app.use(passport.session());
});

//Run verification code and import its important functions.
var verification = require('./verification.js');


// Routes
app.get('/', routes.index);
app.get('/printform', routes.form)
app.get('/prints', routes.getPrints)
app.get('/add', routes.submit)

app.get('/login', userroutes.login)
app.get('/logout', userroutes.logout)

// Routes
app.post('/userLogin', passport.authenticate('local-signin', {
	successRedirect: '/',
	failureRedirect: '/login'
}))
app.post('/userCreate', passport.authenticate('local-signup',{
	successRedirect: '/',
	failureRedirect: '/login'
}))

app.post('/submit', routes.submit)

app.listen(3000, function() {
  console.log('Node app is running on port', 3000);
});
