//this one will populate the calendar
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
  console.log("shits broke yo");
};
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