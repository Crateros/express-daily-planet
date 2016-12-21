
//Requires
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts")

//App variables
var app = express();
// var db = require("./models");

//Set/Use statements
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));


//Define routes
//GET Home page
app.get('/', function(req, res) {
  res.send('HELLO TACO!!!');
});

app.listen(3000);
