const express = require('express')
const app = express()
var session = require('express-session')
var methodOverride = require('method-override');
const indexRouter = require('./router/index');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const MySQLStore = require("express-mysql-session")(session); // 세션을 파일에 저장
const cookieParser = require('cookie-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs')
app.use(express.static('public'))
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.set('socketio',io)

server.listen(12345, function() {
    console.log('Socket IO server listening on port 12345');
});


var options = {
    host: "localhost",
    user: "root",
    password: '1234',
    database: 'hkm_db'
}
var sessionStore = new MySQLStore(options)
app.use(session({
    secret: 'blackzat', // 데이터를 암호화 하기 위해 필요한 옵션
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
    store: sessionStore // 세션이 데이터를 저장하는 곳
}));
app.use(indexRouter)


module.exports = app;
