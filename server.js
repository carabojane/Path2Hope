var fs = require('fs');
var express = require('express');
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var icon_dir = __dirname + '/public/Icons';
var icon_arr = [];//to store all icons
var files = fs.readdirSync(icon_dir);//read all the files in icon directory before proceeding
files.forEach(function(file) {
  if(file !== 'Logo.png') {
    icon_arr.push(file);//add all icon
  }
});
http.listen(port, function(){
  console.log('listening on *:3000');
});
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/resourceIcons',function(req,res) {
  res.status(201).json(icon_arr);
});
