console.log("loading home.js");
var onSuccess = function(data, status) {
  console.log('added event');
  window.location = "/schedule";


};
  
  // $("#result").append("<div id='result'>"+data.name+": "+data.price+"$</div>");


var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
  $("#error").replaceWith('<div id="error">*Either a required field has been left empty or you have attempted to submit a 6+ hour print without ninja approval*</div>')
};

//i want this to, on click, ask the user if they are trying to edit or delete a print
// $form1.submit(function(event) {
$("#printForm").submit(function(event) {
  event.preventDefault();
  // var purposes = $("input[name|=purpose]")
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

  //var name = $form.find("[name='name']").val();

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

