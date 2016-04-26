
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes/index.js'),
    userroutes = require('./routes/userroutes.js')
    mongoose = require('mongoose'),
    session = require('express-session'),
    passport = require('passport');
    cookieParser = require('cookie-parser');

mongoose.connect('mongodb://localhost/MakerSlot');

var app = module.exports = express.createServer();

// Configuration

// app.configure(function(){
app.set('port', (process.env.PORT || 3000));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'weremakingawebsiteforseveral3dprinters', cookie:{}, saveUninitialized: false, resave: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
// });



// Routes
// app.get('/', routes.index);
app.get('/', function(req, res){verification.ensureAuthenticated(req, res, routes.index)})
app.get('/printform', function(req, res){verification.ensureAuthenticated(req, res, routes.form)})
app.get('/prints', routes.getPrints)
app.get('/add', routes.submit)
app.get('/editForm', routes.editForm)
app.get('/editCall', routes.editCall)
app.get('/schedule', routes.schedule)
app.get('/editPrint', routes.editPrint)
app.get('/deletePrint', routes.deletePrint)

//Forum routes
app.get('/forum', routes.dex)
app.get('/getPosts', routes.getforumposts)

app.post('/newPost', routes.newforumpost)

//Login/logout routes
app.get('/login', userroutes.login)
app.get('/logout', userroutes.logout)
app.get('/check', function(req,res){
	console.log("checking");
	console.log(req.session);
	res.send(req.user)
})
// Routes
app.post('/userLogin', passport.authenticate('local-signin'),
	function(req, res){
		res.send();
	})
app.post('/userCreate', passport.authenticate('local-signup',{
	//successRedirect:'/',
	failureRedirect: '/login'
	}),
	function(req, res){
		res.send()
	}
)

app.post('/submit', function(req,res){console.log("stahp")})

//Run verification code and import its important functions.
var verification = require('./verification.js');


app.listen(3000, function() {
  console.log('Node app is running on port', 3000);
});
