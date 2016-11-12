var express = require("express");
var User = require("user/server/models/user");
var router = express.Router();

router.put("/:uid", function(req, resp){
  var uid = req.params.uid;
})