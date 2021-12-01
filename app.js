const express = require('express')
const app = express()
var session = require('express-session')
var methodOverride = require('method-override');
const indexRouter = require('./router/index');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const MySQLStore = require("express-mysql-session")(session); // 세션을 파일에 저장
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: true }) );
app.use(bodyParser.json() );
app.use(methodOverride('_method'));
app.set('view engine','ejs')
app.use(express.static('public'))

var options ={
    host:"localhost",
    user:"root",
    password:'0000',
    database:'hkm_db2'
}
var sessionStore = new MySQLStore(options)
app.use(session({
    secret: 'blackzat', // 데이터를 암호화 하기 위해 필요한 옵션
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
    store : sessionStore // 세션이 데이터를 저장하는 곳
}));
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