const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', function() {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', function(text) {
  return text.toUpperCase();
});

app.use(function(req, res, next){
  var now = new Date().toString();
  var log = `${now}; ${req.method}; ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', function(err) {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});


app.get('/', function(req, res) {
  //res.send("<h1>hello expres!</h1> ")
  res.render("home.hbs", {
    titleTab: 'testing page',
    pageTitle: 'Home Page',
    welcomeMessage: "welcome to my website"
  })
});;

app.use(function(req,res,next){
  res.render('maintenance.hbs');
})

app.use(express.static(__dirname + "/public"));

app.get('/about', function(req,res) {
  res.render("about.hbs", {
    pageTitle: 'About Page',
  })
});

// /bad - send back json with errorMessage property

app.get('/bad', function(req,res) {
  res.send({
    testError: 'unable to handle request'
  });
})


app.listen(3000, function() {
  console.log("server is up")
});
