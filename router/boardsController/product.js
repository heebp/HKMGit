const mysql = require('mysql');
const express = require('express')
const session = require('express-session');
const moment = require('moment')
const BoardsModel = require('../../models/Board')
const MystoreModel = require('../../models/Mystore');
const MySQLStore = require("express-mysql-session")(session);
var app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var mnt = new Array()
exports.product = async function (req, res) {
    var image_split = new Array()
    board_no = req.params.board_no
    new BoardsModel().getBoardByNo(board_no, (error, results) => {

        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            mnt = moment(results[0][0].date, 'YYYY-MM-DD HH:mm:ss').fromNow()
            //else 문 안에서 처리하면 잘된다. model에서 요청받은 데이터를 바로 앞에서 처리하면 오류남. req.params.board_no이 uri대신 쿼리문의 값을 가져오는게 문제로 보임. 아마 비동기적인 이유일 것이라 추측
            if (results[0][0].image != null) {
                image_split = results[0][0].image.split("|");
                for (var i = 1; i < image_split.length; i++) {
                    console.log(image_split[i])
                }
            } else {
                image_spilt = null
            }
            res.render('product', { 
                is_logined: req.session.is_logined,
                moment: mnt,
                member_id: req.session.member_id,
                nickname: req.session.nickname,
                product_data: results[0],
                category_data: results[1],
                images: image_split
                //views
            });
        }
    })
}
