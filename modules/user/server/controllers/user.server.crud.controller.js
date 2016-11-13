var express = require("express");
var User = require("../models/user");
var router = express.Router();

router.route("/:uid")
  .put(function(req, resp){
    User.findById(req.params.uid, function(err, user){
      var newUser = new User();
      user.local.email = req.body.email;
      user.local.password = newUser.generateHash(req.body.password);
      user.local.firstName = req.body.firstName;
      user.local.lastName = req.body.lastName;
      user.local.company = req.body.company;
      user.local.address = req.body.address;
      user.local.userType = req.body.userType;
      user.local.services = req.body.services;
      user.local.balance = req.body.balance;
      user.local.dueDate = req.body.dueDate;
      user.save();
      resp.send("user updated successfully.");
    });
  });

module.exports = router;