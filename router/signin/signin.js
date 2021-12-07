const mysql = require('mysql');
const express = require('express')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
var app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    port: 3306,
    database: 'new_schema'
});

exports.login = function(req, res) {
    var id = req.body.id;
    var passwd = req.body.passwd;
    connection.query('SELECT * FROM member WHERE id = ?', [id],
        function(error, results, fields) {
            if (error) {
                // console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                // console.log('The solution is: ', results);
                if (results.length > 0) {
                    if (results[0].passwd == passwd) {
                        /* res.send({
                            "code": 200,
                            "success": "login sucessfull"
                        });
                        */
                        req.session.is_logined = true;
                        req.session.nickname = results.nickname;
                        req.session.id = results.id;
                        req.session.pw = results.passwd;
                        req.session.save(function() { // 세션 스토어에 적용하는 작업
                            res.render('navbar', { // 정보전달
                                id: results[0].id,
                                is_logined: true
                            });
                        });
                        res.redirect("main")
                    } else {
                        /*
                        res.send({
                            "code": 204,
                            "success": "id and password does not match"
                        });
                        */
                        res.redirect("signin")
                    }
                } else {
                    /*
                    res.send({
                        "code":204,
                        "success": "Email does not exists"
                    });
                    */
                    res.redirect("signin")
                }
            }
        })
}