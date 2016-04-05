
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes/index.js'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/MakerSlot');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('port', (process.env.PORT || 3000));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


// Routes
app.get('/', routes.index);
app.get('/printform', routes.form)

app.listen(3000, function() {
  console.log('Node app is running on port', 3000);
});
