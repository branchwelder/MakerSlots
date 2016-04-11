var onSuccess = function(data, status) {
  console.log('tried to edit/delete');

var onSuccess2 = function(data, status) {
  console.log('tried to populate the calendar');
  console.log(data);
  for(var i = 0; i<data.length; i++){
    $('.fc').fullCalendar( 'renderEvent', data[i], true )  // Add Event to fullCalendar
  };
  
  // $("#result").append("<div id='result'>"+data.name+": "+data.price+"$</div>");
};
//i want for this to, on click, ask the user if they are trying to edit or delete a print
$form1.submit(function(event) {
  event.preventDefault();
  var name = $form1.find("[name='custom']").val();
  var price = $form1.find("[name='customPrice']").val();
  //var price = 10
  console.log(name);
  console.log(price);
  //var name = $form.find("[name='name']").val();
  $.get("add", {
    name: name,
    price: price
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