var express = require('express');
var app = express();
var fs = require('fs');
let port = 12345; 
let WEBPATH = "./main";
app.listen(port, function(){
    console.log("Server started listening at localhost: "+ port);
});
app.get("/", function(req, res) {
    res.send("Hello Express!!");
});
app.use(express.static('assets'));

app.get("/main/main.html", function(req, res) {
    fs.readFile(__dirname + '/main/main.html', function(error, data){
        if(error){
            console.log(error);
        }else{
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});

app.get("/main/header.html", function(req, res) {
    fs.readFile(__dirname + '/main/header.html', function(error, data){
        if(error){
            console.log(error);
        }else{
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});
app.get("/main/product_create.html", function(req, res) {
    fs.readFile(__dirname + '/main/product_create.html', function(error, data){
        if(error){
            console.log(error);
        }else{
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});
app.get("/main/signin.html", function(req, res) {
    fs.readFile(__dirname + '/main/signin.html', function(error, data){
        if(error){
            console.log(error);
        }else{
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});
app.get("/main/signup.html", function(req, res) {
    fs.readFile(__dirname + '/main/signup.html', function(error, data){
        if(error){
            console.log(error);
        }else{
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});