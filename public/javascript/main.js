//populates calendar, autofills form for edits
var onSuccess = function(data, status) {
  $(document).ready(function(){
    $('input[value='+data.purpose+']').prop('checked',true);
    $("#name").replaceWith('<input type="text" class="form-control" id="name" value="'+data.name+'">');
    $("#email").replaceWith('<input type="text" class="form-control" id="email" value="'+data.email+'">');
    $("#part").replaceWith('<input type="text" class="form-control" id="part" value="'+data.part+'">');
    $("#whatclass").replaceWith('<input type="text" class="form-control" id="whatclass" value="'+data.classes+'">');
    $("#mass").replaceWith('<input type="text" class="form-control" id="mass" value='+data.printMass+'>');
    $("#whenprint").replaceWith('<input type="text" class="form-control" id="whenprint" value="'+data.dateAndTime+'">');
    $("#whendone").replaceWith('<input type="text" class="form-control" id="whendone" value="'+data.finish+'">');

    var hours = Math.floor(data.duration/60);
    var minutes = data.duration%60;

    $("input[name=hours]").replaceWith('<input type="number" class="form-control numberentry" name="hours" min="0" max="50" value="'+hours+'">')
    $("input[name=minutes]").replaceWith('<input class="form-control numberentry" type="number" name="minutes" min="0" max="59" value="'+minutes+'">')

    //change the data into something the program can use to find the html elements
    if(data.ninjaApproval == true) {
      var currentBoolean = "yes";
    }
    else {
      var currentBoolean = "no";
    }

    $("input[value="+currentBoolean+"]").prop('checked',true);
    $('input[value='+data.printer+']').prop('checked',true);
  })
};
var onSuccess2 = function(data, status) {
  console.log('tried to populate the calendar');
  console.log(data);
  for(var i = 0; i<data.length; i++){
    $('.fc').fullCalendar( 'renderEvent', data[i], true )  // Add Event to fullCalendar
  };
};

//change window location to schedule page after submitting a print
var onSuccess3 = function(data, status) {
  window.location = "/schedule";
};

//change window location when deleting a print
var onSuccess4 = function(data, status) {
  window.location = "/schedule";
};

var onError = function(data, status) {
  console.log("status", status);
};

//creates calendar object and populates it with known prints
$(document).ready(function() {
  clicked = undefined
    $('#calendar').fullCalendar({
          eventClick: function(calEvent, jsEvent, view) {
           console.log('trying to get clicked');
           clicked = calEvent.id
           console.log(clicked);
           console.log("clicked event");
           $.get("editCall", {
            id: clicked
           })
           .done(onSuccess)
           .error(onError);

          },
          height: 800,
          firstDay: 1,
          defaultView: 'agendaWeek'

    })

    var calendar = $('#calendar').fullCalendar('getCalendar');
    calendar.on('dayClick', function(date, jsEvent, view) {
      alert('clicked on ' + date.format());
    });

  $.get("prints", {
  })
    .done(onSuccess2)
    .error(onError);
});

//Handles the new, edit information for the form and passes it to the database
$("#printFormEdit").submit(function(event) {
  if(clicked != undefined) {
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
    // remove debugging mechanisms!
    var printer = $("input[name=printer]:checked").val();
    var duration = parseInt(hoursDur)*60 + parseInt(minutesDur);
    var problems = $("#problems").val();

    $.get("editPrint", {
      id: clicked,
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
      .done(onSuccess3)
      .error(onError);
}
});

//Deletes a print after prompting
function delPrint() {
  var r = confirm("Are you sure you want to delete this print?");
  if (r == true) {
    if (clicked != undefined) {
      $.get("deletePrint", {id: clicked})
      .done(onSuccess4)
      .error(onError);
    }
  }
}
