const mysql = require('mysql');
const express = require('express')
var app = express()
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    port: 3306,
    database: 'new_schema'
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
exports.register = function(req, res) {
    // console.log("req", req.body);
    console.log('회원가입 하는중')
    var today = new Date();
    var member = {
        "id": req.body.id,
        "student_id": req.body.student_id,
        "nickname": req.body.nickname,
        "passwd": req.body.passwd,
        "reg_date": today,
        "email": req.body.email
    }
    connection.query('INSERT INTO member SET ?', member, function(error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            console.log('The solution is: ', results);
            res.send({
                "code": 200,
                "success": "user registered sucessfully"
            });
        }
    });
}