var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

var onSuccess = function(data, status) {
	console.log("success");	
	window.location = "/";
	// $("#result").append("<div>"  " </div>");
	// console.log("data:" + data)
}

var onSuccess2 = function(data, status) {
	console.log("success");	
	window.location = "/";
}


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