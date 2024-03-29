const mysql = require('mysql');
const express = require('express')
const FavoriteModel = require('../../models/Favorite')
var app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
exports.createFavorite = function (req, res) {
    console.log("req", req.body);
    favoriteContent = {
        "board_board_no": req.params.board_no,
        "member_id": req.body.member_id,
    }
    /* url :id 매핑 오류
    *  실제 값에 대입안됨
    */
    new FavoriteModel().createFavoriteModel(favoriteContent, (error, results) => {
        if (error) {
            console.log("error ocurred", error);
            res.redirect("/boards/"+member_id)
        } else {
            console.log('The solution is: ', results);
            res.redirect("/favorite/"+member_id)
        }
    });

}