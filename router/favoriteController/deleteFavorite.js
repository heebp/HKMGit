const mysql = require('mysql'); 
const express = require('express')
const FavoriteModel = require('../../models/Favorite')
var app = express()
app.use(express.urlencoded({ extended: true }) );
app.use(express.json() );
exports.deleteFavorite = function (req, res) {
    console.log("req", req.body);
    favoriteContent={
        "board_no" : req.params.board_no,
        "member_id" : req.params.member_id,
    }
    new FavoriteModel().deleteFavoriteModel(favoriteContent,(error,results)=>{
        if (error) {
            console.log("error ocurred", error);
            res.redirect("/favorite/"+member_id)

        } else {
            console.log('The solution is: ', results);
            res.redirect("/favorite/"+member_id)
        }
    });    
    
}