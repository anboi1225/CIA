var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var configDB = require("./config/database.js");

// configuration ===============================================================

mongoose.connect(configDB.url);
require("./config/passport")(passport); // pass passport for configuration

app.use(express.static(__dirname + "/modules"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//required for passport 
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser); // get information from html forms

app.set("view engine", "ejs"); // set up ejs for templating

// required for passport
app.use(session({secret:'ilovescotchscotchyscotchscotch'})) // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



require("./config/routes.js")(app, passport);
var port = process.env.PORT || 8080;
app.listen(port);
console.log("CIA server started, listen on port " + port);