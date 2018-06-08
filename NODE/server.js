var express = require('express');

var app = express();

var fs = require("fs");

var user = {
		   "user4" : {
		      "name" : "mgutierrez",
		      "password" : "777555",
		      "profession" : "medico",
		      "id": 4
		   }
		};

var id = 2;

app.get('/users', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {// se podria hacer un get a una api y evitar leer el archivo 
       console.log( data );
       res.end( data );
   });
});

app.post('/users', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse(data);
       data["user4"] = user["user4"];
       console.log(data);
       res.end(JSON.stringify(data));
   });
});

app.get('/users/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse(data);
      var user = users["user" + req.params.id];
      console.log(user);
      res.end(JSON.stringify(user));
   });
});

app.delete('/users/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse(data);
       delete data["user" + req.params.id];
       console.log( data );
       res.end( JSON.stringify(data));
   });
});

var server = app.listen(8081, function () {

  var host = "localhost";
  var port = "8081";

  console.log("Escuchando en http://%s:%s", host, port);

});