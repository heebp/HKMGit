const express = require('express')
const app = express()
var session = require('express-session')
const indexRouter = require('./router/index');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }) );
app.use(bodyParser.json() );
app.set('view engine','ejs')
app.use(express.static('public'))

app.use( indexRouter)

let port = 12345

app.listen(port, function(){
    console.log("Server started listening at localhost: "+ port);
});



// Custom Middlewares 
/*app.use(,(req,res)=>{
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});*/


module.exports = app;