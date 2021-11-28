const mysql = require('mysql'); 
const express = require('express')
const session = require('express-session');
const UserModel = require('../../models/User')
const FileStore = require('session-file-store')(session);
var app = express()
app.use(express.urlencoded({ extended: true }) );
app.use(express.json() );

exports.login = function (req, res) {
    var id = req.body.id;
    var passwd = req.body.passwd;
    new UserModel().getUserById( id,( error, results) =>{
        if (error) {
             console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if(results.length > 0) {
                if(results[0].passwd == passwd) {
                    /* res.send({
                        "code": 200,
                        "success": "login sucessfull"
                    });
                    */
                    req.session.is_logined = true;
                    req.session.nickname = results.nickname;
                    req.session.id = results.id;
                    req.session.pw = results.passwd;
                    req.session.save(function(){ // 세션 스토어에 적용하는 작업
                        res.render('navbar',{ // 정보전달
                            id : results[0].id,
                            is_logined : true
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