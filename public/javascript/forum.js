var onSuccess = function(data, status) {
  window.location = "/forum";
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$("#forumpost").submit(function(event) {
  event.preventDefault();

  var user = $("#forumpost").find("[name='username']").val();
  var content = $("#forumpost").find("[name='content']").val();
  var title = $("#forumpost").find("[name='title']").val();

  $.post("login", {
    user: user,
    content: content,
    title: title
  })
    .done(onSuccess)
    .error(onError);
});
