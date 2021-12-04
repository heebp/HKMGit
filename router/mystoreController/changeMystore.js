const mysql = require('mysql'); 
const express = require('express')
var app = express()
const MystoreModel = require('../../models/Mystore')
app.use(express.urlencoded({ extended: true }) );
app.use(express.json() );
exports.changing_mystore = function (req, res) {
    console.log("req", req.body);
    console.log('내상점 만드는 중')
    var mystoreContent = {
        "member_id": req.body.member_id,
        "store_name": req.body.store_name,
        "store_description": req.body.store_description,
        "store_image":req.body.store_image,
    }
    new MystoreModel().changeMystore( mystoreContent,( error, results) =>{
        if (error) {
            //console.log("error ocurred", error);
            /*res.send({
                "code" : 400,
                "failed": "error ocurred"
            })
            */
        } else {
            //console.log('The solution is: ', results);
            /*
            res.send({
                "code": 200,
                "success": "changing_mystore sucessfully"
            });
            */
            res.redirect("/mystore")
        }
    });    
}