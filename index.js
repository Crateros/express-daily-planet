
//Requires
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts")

//App variables
var app = express();
var db = require("./models");

//Set/Use statements
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));

//Define routes

//GET Home page
app.get('/', function(req, res) {
  res.render('site/home');
});

//GET About page
app.get('/about', function(req, res) {
  res.render('site/about');
});

//GET About page
app.get('/contact', function(req, res) {
  res.render('site/contact');
});

//GET all articles
app.get('/show', function(req,res){
    db.article.findAll().then(function(articles){
      console.log("returned all articles");
      res.render('articles/show', {articles: articles});
    // res.render('articles/show');
    });
});

//GET new article
app.get('/new', function(req, res) {
  res.render('articles/new');
});

//POST create new article and redirect to articles
app.post("/articles/new", function(req, res){
  console.log(req.body);
  db.article.create(req.body).then(function(article){
    res.redirect("/show");
  });
});

//GET one article by id
app.get("/article/:id", function(req, res){
  console.log(req.params.id);
  db.article.findById(req.params.id).then(function(article){
  res.render("articles/onearticle", {article: article});
  });
});

app.listen(3000);
