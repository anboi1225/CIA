var express = require("express");
var User = require("../models/user");
var router = express.Router();

router.route("/:uid")
  .get(function(req, resp){
    User.findById(req.params.uid, function(err, user){
      resp.json(user);
    });
  })
  .put(function(req, resp){
    var helperUser = new User();
    User.findOne({ 'local.email' :  req.body.email }, function(err, user){
      if(user && user._id != req.body.id){
        resp.json({type: "error", message: "Email has already been taken, please try a different one."});
      }else{
        User.findById(req.params.uid, function(err, user){
          user.local.email = req.body.email;
          user.local.password = helperUser.generateHash(req.body.password);
          user.local.firstName = req.body.firstName;
          user.local.lastName = req.body.lastName;
          user.local.company = req.body.company;
          user.local.address = req.body.address;
          user.local.userType = req.body.userType;
          user.local.services = req.body.services;
          user.local.balance = req.body.balance;
          user.local.dueDate = req.body.dueDate;
          user.local.dpURL = req.body.dpURL;
          user.save();
          resp.send({type: "success", message: "The profile has been updated successfully."});
        });
      }
    });
  });

module.exports = router;