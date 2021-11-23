const mysql = require('mysql'); 
const express = require('express')
var app = express()
app.use(express.urlencoded({ extended: true }) );
app.use(express.json() );
const connection = mysql.createConnection({ 
    host:'localhost', 
    user:'root', 
    password:'0000', 
    port:3306, 
    database:'new_schema' 
});

exports.login = function (req, res) {
    var student_id = req.body.student_id;
    var passwd = req.body.passwd;
    connection.query('SELECT * FROM member WHERE student_id = ?', [student_id],
    function( error, results, fields) {
        if (error) {
            // console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if(results.length > 0) {
                if(results[0].passwd == passwd) {
                    res.send({
                        "code": 200,
                        "success": "login sucessfull"
                    });
                } else {
                    res.send({
                        "code": 204,
                        "success": "id and password does not match"
                    });
                }
            } else {
                res.send({
                    "code":204,
                    "success": "Email does not exists"
                });
            }
        }    
    }) 
}