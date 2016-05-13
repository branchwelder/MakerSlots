var path = require('path'); //path allows the creation of paths (with /) from individual names

var routes = {};
//Allows logging in and out of user
routes.login = function(req, res){
	res.sendfile('/views/login.html', { root: path.join(__dirname, '../') });
}

routes.logout = function(req, res){
  var name = req.user.username;
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
}

module.exports = routes
