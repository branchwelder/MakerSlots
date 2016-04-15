console.log("loading home.js");
var onSuccess = function(data, status) {
  console.log('tried to edit/delete');
};
var onSuccess2 = function(data, status) {
  console.log('tried to populate the calendar');
  console.log(data);
  for(var i = 0; i<data.length; i++){
    $('.fc').fullCalendar( 'renderEvent', data[i], true )  // Add Event to fullCalendar
  };
  
  // $("#result").append("<div id='result'>"+data.name+": "+data.price+"$</div>");
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

//i want this to, on click, ask the user if they are trying to edit or delete a print
// $form1.submit(function(event) {
$("#printForm").submit(function(event) {
  // var purposes = $("input[name|=purpose]")
  var purposes = $('input[name=purpose]:checked').val();
  var name = $("#name").val();
  var email = $("#email").val();
  var part = $("#part").val();
  var whatClass = $("#whatclass").val();
  var mass = $("#mass").val();
  var time = $("#whenprint").val();
  var finish = $("#whendone").val();
  var part = $("#part").val();
  var hoursDur = $("input[name=hours]").val();
  var minutesDur = $("input[name=minutes]").val();
  var approved = $("input[name=approved]").val();
  var printer = $("input[name=printer]").val();
  var duration = hoursDur*60 + minutesDur;
  //var name = $form.find("[name='name']").val();

  $.get("add", {
    purpose: purposes,
    name: name,
    email: email,
    part: part,
    whatClass: whatClass,
    printMass: mass,
    dateAndTime: time,
    finish: finish,
    part: part,
    duration: duration,
    ninjaApproval: approved,
    printer: printer
  })
    .done(onSuccess)
    .error(onError);
});

//this one will populate the calendar
$(document).ready(function() {
    $('#calendar').fullCalendar({
          eventClick: function() {
           alert('an event has been clicked!');
          },
          height: 800,
          firstDay: 1,
          defaultView: 'agendaWeek'
        
    })
    
    var calendar = $('#calendar').fullCalendar('getCalendar');
    calendar.on('dayClick', function(date, jsEvent, view) {
      alert('clicked on ' + date.format());
    });
// this part on needs to be in success function
    
  $.get("prints", {
  })
    .done(onSuccess2)
    .error(onError);
});