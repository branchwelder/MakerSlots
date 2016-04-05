Print = require("../models/printModel")
var path = require('path'); //path allows the creation of paths (with /) from individual names

routes = {}
routes.index = function(req, res){
  // res.sendfile("/views/home.html", {root:'/home/sean/Documents/Classes_Olin/2016/MakerSlots/'})
  res.sendfile('/views/home.html', { root: path.join(__dirname, '../') });

};

routes.form = function(req, res){
  // res.sendfile("/views/printform.html", {root:'/home/sean/Documents/Classes_Olin/2016/MakerSlots/'})
  res.sendfile('/views/printform.html', { root: path.join(__dirname, '../') });

};

routes.submit = function(req, res){
  console.log("Submiting Print")
  entry = req.body
  validEntry = true

  //Checking form requirements
  requirements = [entry.name, entry.email, entry.part, entry.purpose, entry.printMass, 
                  entry.dateAndTime, entry.durration, entry.printer]
  for(i=0;i<requirements.length;i++){
    if(!requirements[i]){
      validEntry = false
      res.status(500).send("Required form field was empty")
    }
  }
  if(entry.durration>360 && !entry.ninjaApproval){
    validEntry = false
    res.status(500).send("Cannot have 6 hr print without ninja approval")
  }
  /////////////////////////

  if (validEntry){
    form = new Print(entry)
    form.save(function(err){
    	if(err){
    	  	res.status(500).send("Print Form not saved correctly");}
    	  else{
    	  	res.send()
    	  	console.log("Print submited.")
    	  }
    })
  }
}

module.exports = routes