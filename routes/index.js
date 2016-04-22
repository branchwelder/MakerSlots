Print = require("../models/printModel")
Forum = require("../models/forumModel")
Announce = require("../models/announcementModel")
Printer = require("../models/printerModel")
var path = require('path'); //path allows the creation of paths (with /) from individual names

routes = {}


routes.index = function(req, res){
  res.sendfile('/views/home.html', { root: path.join(__dirname, '../') }); 

};
// PRINTER ROUTES
routes.getPrinters = function(req,res) {
    Printer.find(function(err, printers) {
        if (err) {
            res.send(err);
        }
        res.json(printers);
    });
};


routes.newPrinter = function(req, res){
  Printer.create({
    name: req.body.name,
    status: req.body.status
    //user: session.user.name //FIX THIS. how do we access session variables?
  }, function(err, printers) {
        if (err) {
          res.send(err)
        };

        Printer.find(function(err, printer) {
          if (err) {
            res.send(err)
          };
        res.json(printer);
        });
      }
  );
};

routes.editPrinter = function(req,res){

  Printer.update({
      _id : req.body.id},{$set:{
        name: req.body.name,
        status: req.body.status
      }}, function(err, edited) {
        if (err)
            res.send(err);
        Announce.find(function(err, Printers) {
                if (err)
                    res.send(err)

                res.json(Printers);
                
                
            });

    });
}




routes.deletePrinter = function(req,res){
  //removes a print by id, then grabs all the remaining prints and returns them so they can be posted onto the calendar and it can be rerendered.
  Printer.remove({
     _id : req.body.id
  }, function(err, removed) {
      if (err)
         res.send(err);
       Printer.find(function(err, Printers) {
                if (err)
                    res.send(err)

                res.json(Printers);
                
                
            });


    });
}



// ANNOUNCEMENT ROUTES

routes.getAnnouncements = function(req,res) {
    Announce.find(function(err, posts) {
        if (err) {
            res.send(err);
        }
        res.json(posts);
    });
};

routes.announcements = function(req, res){
  res.sendfile('/views/printform.html', { root: path.join(__dirname, '../') }); //REPLACE THIS WITH A REAL ANNOUNCEMENTS PAGE

};


routes.newAnnouncement = function(req, res){
  Announce.create({
    time: req.body.time,
    user: req.body.user,
    text: req.body.text
    //user: session.user.name //FIX THIS. how do we access session variables?
  }, function(err, announcement) {
        if (err) {
          res.send(err)
        };

        Announce.find(function(err, announcements) {
          if (err) {
            res.send(err)
          };
        res.json(announcements);
        });
      }
  );
};

routes.editAnnouncement = function(req,res){

  Announce.update({
      _id : req.body.id},{$set:{
        time: req.body.time,
        user: req.body.user,
        text: req.body.text
      }}, function(err, edited) {
        if (err)
            res.send(err);
        Announce.find(function(err, Announcements) {
                if (err)
                    res.send(err)

                res.json(Announcements);
                
                
            });

    });
}




routes.deleteAnnouncement = function(req,res){
  //removes a print by id, then grabs all the remaining prints and returns them so they can be posted onto the calendar and it can be rerendered.
  Announce.remove({
     _id : req.body.id
  }, function(err, removed) {
      if (err)
         res.send(err);
       Announce.find(function(err, Announcements) {
                if (err)
                    res.send(err)

                res.json(Announcements);
                
                
            });


    });
}





// FORUM ROUTES

function getPosts(res) {
    Forum.find(function (err, posts) {
        if (err) {
            res.send(err);
        }
        res.json(posts);
    });
};


routes.dex = function(req, res) {
  res.sendfile('/views/forum.html', { root: path.join(__dirname, '../') });
}

//create a new forum post
routes.newforumpost = function(req, res){
  Forum.create({
    content: req.body.content,
    title: req.body.title
    //user: session.user.name //FIX THIS. how do we access session variables?
  }, function(err, forum) {
        if (err) {
          res.send(err)
        };

        Forum.find(function(err, posts) {
          if (err) {
            res.send(err)
          };
        getPosts(res);
        });
      }
  );
};

routes.getforumposts = function(req, res) {
  Forum.find(function(err, posts) {
    if (err) {
      res.send(err)
    }
    res.json(posts);
  });
};

// END FORUM ROUTES

routes.form = function(req, res){
  // res.sendfile("/views/printform.html", {root:'/home/sean/Documents/Classes_Olin/2016/MakerSlots/'})
  res.sendfile('/views/printform.html', { root: path.join(__dirname, '../') });

};


//PRINT/CALENDAR ROUTES
routes.editForm = function(req, res){
  // res.sendfile("/views/printform.html", {root:'/home/sean/Documents/Classes_Olin/2016/MakerSlots/'})
  res.sendfile('/views/printform.html', { root: path.join(__dirname, '../') });

};

routes.schedule = function(req,res){
  res.sendfile('/views/schedule.html', { root: path.join(__dirname, '../') });
}

routes.editCall = function(req, res){
  console.log(req.query.id);
  Print.findById(req.query.id, function (err, print) {
    if(err)
      res.send(err)
    console.log(print);
    res.json(print)
});
}

routes.editPrint = function(req,res){
  //Updates a print through id, though that could be altered to whatever, probably even on-click, which we should see about doing.
  //returns all the prints in the database including the edited one as well as the edited text alone.
  Print.update({
      _id : req.query.id},{$set:{name: req.query.name, 
        email: req.query.email, 
        part: req.query.part, 
        purpose: req.query.purpose,
        classes: req.query.classes,
        printMass: req.query.printMass,
        dateAndTime: req.query.dateAndTime,
        finish: req.query.finish,
        duration: req.query.duration,
        ninjaApproval: req.query.ninjaApproval,
        printer: req.query.printer,
        problems: req.query.problems}}, function(err, print) {
        if (err)
            res.send(err);
        res.json();

    });
}




routes.deletePrint = function(req,res){
  //removes a print by id, then grabs all the remaining prints and returns them so they can be posted onto the calendar and it can be rerendered.
  Print.remove({
     _id : req.query.id
  }, function(err, removed) {
      if (err)
         res.send(err);
       res.json();
    });
}


//this needs to be edited so that theres an end time, and maybe take out duration as a result. we can probably calculate duration based on start
//and end time.
routes.getPrints = function(req,res){
  //grabs all prints from database and returns them
  Print.find({}, function(err,prints) {
    if(err)
      res.send(err)
    var events = [];
    for (var i = 0;i<prints.length; i++) {
      // var title = prints[i].name + 'printing on ' + prints[i].printer//this will be printer name + user
      // var start = prints[i].dateAndTime
      // var end = prints[i].endTime
      var event = {title: prints[i].name + ' printing on ' + prints[i].printer, start: prints[i].dateAndTime, end: prints[i].finish, id: prints[i]._id};
      events.push(event)
    }

    res.json(events)
  });
}

routes.submit = function(req, res){
  console.log("Submiting Print")
  // entry = req.body
  entry = req.query
  validEntry = true
  // console.log(entry.finish)

  //Checking form requirements
  requirements = [entry.name, entry.email, entry.part, entry.purpose, entry.printMass,
                  entry.dateAndTime, entry.finish, entry.duration, entry.printer]
  for(i=0;i<requirements.length;i++){
    if(!requirements[i]){
      validEntry = false
      console.log("field problem");
      res.status(500).send("Required form field was empty")
    }
  }
  if(parseInt(entry.duration)>360 && entry.ninjaApproval !== "yes"){
    validEntry = false
    console.log("ninja approval problem");
    res.status(500).send("Cannot have 6 hr print without ninja approval")
  }
  /////////////////////////

  if (validEntry){
    console.log(entry);
    form = new Print(entry)
    form.save(function(err){
    	if(err){
    	  	res.status(500).send("Print Form not saved correctly");}
    	  else{

    	  	console.log("Print submited.")
          res.json(entry)
    	  }
    })
  }
}

module.exports = routes
