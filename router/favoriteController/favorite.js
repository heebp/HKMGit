const mysql = require('mysql'); 
const express = require('express')
const FavoriteModel = require('../../models/Favorite')
var app = express()
app.use(express.urlencoded({ extended: true }) );
app.use(express.json() );
exports.favorite = function (req, res) {
    console.log("req", req.body);
    favoriteContent={
        "board_board_no" : req.params.board_no,
        "member_id" : req.body.member_id,
    //"board_no" : req.body.board_no

    }
    
    new FavoriteModel().createFavorite(favoriteContent,(error,results)=>{
        if (error) {
            console.log("error ocurred", error);
            /*res.send({
                "code" : 400,
                "failed": "error ocurred"
            })
            */
           res.redirect("/boards/:id")
        } else {
            console.log('The solution is: ', results);
            /*res.send({
                "code": 200,
                "success": "user registered sucessfully"
            });
            */
            res.redirect("/favorite")
        }
    });    
    
}