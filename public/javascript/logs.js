var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

var onSuccess = function(data, status) {
	window.location = "/";
}

var onSuccess2 = function(data, status) { // yep, your onSuccess functions will conflict -- this is a workaround, but could you pick a more semantic name?
	window.location = "/";
}

//handles existing user login
$("#login-form").submit(function(event){
	event.preventDefault();
	var email = $("input[name=userNameLogin]").val();
	var password = $("input[name=passwordLogin]").val();
	$.post("/userLogin", {
		username: email,
		password: password
	})
	  .done(onSuccess2)
	  .error(onError);
});

//handles new user account creation and login
$("#new-user-form").submit(function(event){
	event.preventDefault();
	console.log('i tried to make a new user')
	var email = $("input[name=userNameCreate]").val();
	var password = $("input[name=passwordCreate]").val();
	console.log(email);
	console.log(password);
	$.post("/userCreate", {
		username: email,
		password: password
	})
	  .done(onSuccess)
	  .error(onError);
});
