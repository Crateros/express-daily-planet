
//Requires
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts")
var path = require('path');

//App variables
var app = express();
var db = require("./models");

//Set Use statements
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'static')));

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
      res.render('articles/show', {articles: articles});
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

//PUT edit existing article with new information and update database
app.get("/edit/:id", function(req, res){
  db.article.findById(req.params.id).then(function(article){
  res.render("articles/edit", {article: article});
  });
});

app.put("/article/:id", function(req, res){
  var articleToUpdate = req.params.id;
  db.article.update({
     title: req.body.title,
     content: req.body.content
   }, {
     where: { id: articleToUpdate }
  }).then(function(){
  res.send();
  });
});


//DELETE delete existing article
app.delete("/article/:id", function(req, res) {
  var articleToErase = req.params.id;
  db.article.destroy({
    where: { id: articleToErase }
  }).then(function(){
    res.send();
  })
});

//GET one article by id
app.get("/article/:id", function(req, res){
  console.log(req.params.id);
  db.article.findById(req.params.id).then(function(article){
  res.render("articles/onearticle", {article: article});
  });
});

//GET search result
app.get('/search', function(req, res){
  console.log("search querystring:", req.query)
  var q = req.query.search;

  function isMatch(article,q){
    q = q.toLowerCase();
    //use .get function to access instance variables in model/database
    var title = article.get('title').toLowerCase();
    var content = article.get('content').toLowerCase();
    if(title.indexOf(q) >= 0 || content.indexOf(q) >= 0){
      return true;
    }
    return false;
  }

  db.article.findAll().then(function(articles){
    var searchresult = [];

    //filter results
    for(var i = 0; i < articles.length; i++) {
      if(isMatch(articles[i],q)){
        searchresult.push(articles[i]);
      }
    }
    res.render('articles/searchresult', {searchresult: searchresult});
  });
});

app.listen(3000);
