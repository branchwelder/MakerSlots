// make sure you use `var`; be consistent w/ your semicolons (a linter could help)
var Print = require("../models/printModel");
var Forum = require("../models/forumModel");
var Announce = require("../models/announcementModel");
var Printer = require("../models/printerModel");
var Users = require("../models/userModel");
var path = require('path'); //path allows the creation of paths (with /) from individual names

routes = {}


routes.index = function(req, res){
  res.sendfile('/views/home.html', { root: path.join(__dirname, '../') });

};
// PRINTER ROUTES
//finds all printers in printer database
routes.getPrinters = function(req,res) {
    Printer.find(function(err, printers) {
        if (err) {
            res.send(err);
        }
        res.json(printers);
    });
};

//creates new printer and returns all printers
routes.newPrinter = function(req, res){
  Users.findOne({name: req.user}, function (err, person) {
    if (err) {
      res.send(err)
    };
    // be consistent w/ indentation & spacing -- fixed here, an issue throughout
    if (person.isNinja == true) {
      Printer.create({
        name: req.body.name,
        status: req.body.status
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
      });
    }
  });
};

//edit printer
routes.editPrinter = function(req,res){
  Printer.update({
      _id : req.body.id},{$set:{
        // name: req.body.name,
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



//deletes printer if user has ninja status == true
routes.deletePrinter = function(req,res){
  Users.findOne({name: req.user}, function (err, person) {
    if(err){
      res.send(err)
    };
    if(person.isNinja == true){

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
})
}



// ANNOUNCEMENT ROUTES
//gets all announcements in database
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

//creates a new announcement
routes.newAnnouncement = function(req, res){
  Users.findOne({name: req.user}, function (err, person) {
    if(err){
      res.send(err)
    };
    if(person.isNinja == true){
  Announce.create({
    time: req.body.time,
    user: req.body.user,
    text: req.body.text
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
  }
  })
};

//edits existing announcement
routes.editAnnouncement = function(req,res){
  Users.findOne({name: req.user}, function (err, person) {
    if(err){
      res.send(err)
    };
    if(person.isNinja == true){
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
  })
}

//deletes an announcement
routes.deleteAnnouncement = function(req,res){
  //removes a print by id, then grabs all the remaining prints and returns them so they can be posted onto the calendar and it can be rerendered.

  Users.findOne({name: req.user}, function (err, person) {
    if(err){
      res.send(err)
    };
    if(person.isNinja == true){
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
  })
}





// FORUM ROUTES
//gets all posts on the forum from the database
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
    title: req.body.title,
    user: req.user
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

//gets all forum posts from database
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


//PRINT CALENDAR ROUTES
routes.editForm = function(req, res){
  // res.sendfile("/views/printform.html", {root:'/home/sean/Documents/Classes_Olin/2016/MakerSlots/'})
  res.sendfile('/views/printform.html', { root: path.join(__dirname, '../') });

};


routes.schedule = function(req,res){
  res.sendfile('/views/schedule.html', { root: path.join(__dirname, '../') });
}

//intermediate in allowing prints to be manipulated when clicked
routes.editCall = function(req, res){
  console.log(req.query.id);
  Print.findById(req.query.id, function (err, print) {
    if(err)
      res.send(err)
    console.log(print);
    res.json(print)
});
}

//edits print
routes.editPrint = function(req,res){
  //Updates a print through id, though that could be altered to whatever, probably even on-click, which we should see about doing.
  //returns all the prints in the database including the edited one as well as the edited text alone.
  Print.update({
      // Is there a reason why you can't just $set:req.query? do you have to unpack in place like this?
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



//deletes a selected print
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

//gathers all prints from database
routes.getPrints = function(req,res){
  //grabs all prints from database and returns them
  Print.find({}, function(err,prints) {
    if(err)
      res.send(err)
    var events = [];
    for (var i = 0;i<prints.length; i++) {
      // get rid of dead code!
      var event = {title: prints[i].name + ' printing on ' + prints[i].printer, start: prints[i].dateAndTime, end: prints[i].finish, id: prints[i]._id};
      events.push(event)
    }

    res.json(events)
  });
}

//submits a print
routes.submit = function(req, res){
  console.log("Submiting Print")
  entry = req.query
  validEntry = true

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
