var onSuccess = function(data, status) {
  console.log('added event');
  window.location = "/schedule";
};
// The clientside global scope includes *ALL* of your javascript files -- and you're
// naming your onSuccess and onError callbacks the same thing in three different files.
// Those functions WILL overlap -- you need to rename so they don't!

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
  $("#error").replaceWith('<div id="error">*Either a required field has been left empty or you have attempted to submit a 6+ hour print without ninja approval*</div>')
};

//Handles grabbing all the form information and proccessing it when needbe
$("#printForm").submit(function(event) {
  event.preventDefault();
  var purposes = $('input[name=purpose]:checked').val();
  var name = $("#name").val();
  var email = $("#email").val();
  var part = $("#part").val();
  var whatClass = $("#whatclass").val();
  var mass = $("#mass").val();
  var time = $("#whenprint").val();
  var finish = $("#whendone").val();
  var hoursDur = $("input[name=hours]").val();
  var minutesDur = $("input[name=minutes]").val();
  var approved = $("input[name=approved]:checked").val();
  console.log(approved);
  var printer = $("input[name=printer]:checked").val();
  var duration = parseInt(hoursDur)*60 + parseInt(minutesDur);
  var problems = $("#problems").val();

  $.get("add", {
    purpose: purposes,
    name: name,
    email: email,
    part: part,
    classes: whatClass,
    printMass: mass,
    dateAndTime: time,
    finish: finish,
    part: part,
    duration: duration,
    ninjaApproval: approved,
    problems: problems,
    printer: printer
  })
    .done(onSuccess)
    .error(onError);
});

