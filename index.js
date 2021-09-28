var express = require("express");
var app = new express();
 
app.get("/", function(req, res) {
    res.send("Hello Express!!");
});

let port = 12345; 
app.listen(port, function(){
    console.log("Server started listening at localhost: "+ port);
});
