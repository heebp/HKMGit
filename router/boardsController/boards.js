const mysql = require('mysql'); 
const express = require('express')
const session = require('express-session');
const BoardsModel = require('../../models/Board')
var app = express()
app.use(express.urlencoded({ extended: true }) );
app.use(express.json() );

exports.boards = function (req, res) {
    var today = new Date();

    var boardsContent = {
    "member_id" : req.body.member_id,
    "sub_category_scategory_no" : req.body.sub_category_scategory_no,
    "nickname" : req.body.nickname,
    "title" : req.body.title,
    "content" : req.body.content,
    "image" : req.body.image,
    "date" : today,
    "price" : req.body.price
    //var views
    //var chats 
    }

    new BoardsModel().createBoard( boardsContent,( error, results) =>{
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code" : 400,
                "failed": "error ocurred"
            })
        } else {
            console.log('The solution is: ', results);
            /*res.send({
                "code": 200,
                "success": "user registered sucessfully"
            });
            */
            res.redirect("/")
        }
    });    
    
}