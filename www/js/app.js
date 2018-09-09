// This replaces de server.js of nodejs
var express = require('express');
var request = require('request');

var app = express();

app.get('/', function(req, res){
  console.log("default");
  res.send({
    msg: 'default';
  })
})

app.get('profile', function(req, res){
  console.log("profile");
  res.send({
    msg: 'profile';
  })
})

app.get('diary', function(req, res){
  console.log("diary");
  res.send({
    msg: 'diary';
  })
})

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
