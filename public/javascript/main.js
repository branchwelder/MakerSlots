//populates calendar, autofills form for edits
var onSuccess = function(data, status) {
  // window.location = "/editForm";
  console.log("data printed below");
  console.log(data);
  console.log("data printed above");
  $(document).ready(function(){
    console.log("document readied");
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
  
  // $("#result").append("<div id='result'>"+data.name+": "+data.price+"$</div>");
};

var onSuccess3 = function(data, status) {
  console.log("success3 ran");
  
  // $("#result").append("<div id='result'>"+data.name+": "+data.price+"$</div>");
};


var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
  console.log("shits broke yo");
};
//i need to add an update to calendar entries in the calendar app to include an id, which will be its mongo id, which can be grabbed by clicking
//on it and used to populate the form, allowing for editing.
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
// this part on needs to be in success function
    
  $.get("prints", {
  })
    .done(onSuccess2)
    .error(onError);
});

$("#printFormEdit").submit(function(event) {
  if(clicked != undefined) {
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




// $('#calendar').fullCalendar({
//     eventClick: function(calEvent, jsEvent, view) {

//         alert('Event: ' + calEvent.title);
//         alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
//         alert('View: ' + view.name);

//         // change the border color just for fun
//         $(this).css('border-color', 'red');

//     }
// });