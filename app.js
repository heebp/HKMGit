const express = require('express')
const app = new express()
var router = express.Router()
const indexRouter = require('./router/index');

const ejs = require('ejs')
app.set('view engine','ejs')
app.use(express.static('public'))
app.use('/', indexRouter);

let port = 12345

app.listen(port, function(){
    console.log("Server started listening at localhost: "+ port);
});
app.use(express.json())
app.use(express.urlencoded({extended: true}))
module.exports = app;