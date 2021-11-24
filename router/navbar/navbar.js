///라우팅 참고용

const express = require('express')
const app = express()
var router = express.Router()
var session = require('express-session')
const MySQLStore = require("express-mysql-session")(session); // 세션을 파일에 저장
const cookieParser = require('cookie-parser');
var sessionStore = new MySQLStore(options)
var options ={
    host:"localhost",
    user:"root",
    password:'0000',
    database:'new_schema'
}
app.use(session({
    secret: 'blackzat', // 데이터를 암호화 하기 위해 필요한 옵션
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
    store :  sessionStore// 세션이 데이터를 저장하는 곳
}));

exports.navbar = function (req, res) {
    console.log('메인페이지 작동');
    console.log(req.session);
    if(req.session.is_logined == true){
        res.render('/',{
            is_logined : req.session.is_logined,
            name : req.session.name
        });
 
    }else{
        res.render('/',{
            is_logined : false
        });
    }
}