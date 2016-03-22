
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
