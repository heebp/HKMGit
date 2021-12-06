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
var sessionStore = new MySQLStore(options)

var options ={
    host:"localhost",
    user:"root",
    password:'0000',
    database:'hkm_db4'
}
app.use(session({
    secret: 'blackzat', // 데이터를 암호화 하기 위해 필요한 옵션
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
    store :  sessionStore// 세션이 데이터를 저장하는 곳
}));
var mnt = new Array()
var count=0
exports.getMystore = function (req, res) {
    member_id = req.params.member_id,
    new MystoreModel().getMystoreById( member_id,(error, results) => {
        var image_split = new Array()
        var board_image_split = new Array()

        count++
        if (count==1){
           for(var i =0;i<results[1].length;i++){
                mnt[i] = moment(results[1][i].date, 'YYYY-MM-DD HH:mm:ss').fromNow()
                //console.log(mnt)
                //console.log(results[1].length)
            }
        }
            if (error) {
                //console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                if (results[1].length) {
                    //console.log(results[1].image)
                    for (var i = 0; i < results[1].length; i++) {
                        image_split = results[1][i].image.split("|");
                        board_image_split += image_split[1] + "|"
                    }
                    /*
                    console.log(image_split) 
                    console.log(image_split[1])
                    console.log(board_image_split)
                    */
                    board_image_split = board_image_split.split("|")
                }
                console.log(board_image_split)
                //console.log(results)
                res.render('mystore', { // 정보전달
                    mystore_data : results[0],
                    boards_data : results[1],
                    moment : mnt,
                    image: board_image_split,
                    is_logined: req.session.member_id,
                    session_member_id: req.session.member_id,
                    nickname: req.session.nickname,
                    //views
                });
            }
        }
    )
}

    /*
    new BoardsModel().getBoardById( mystoreContent,(error, results) => {
        //console.log(results[0].title) !!주석처리 안할시 판매글 없으면 오류발생!!
        if (req.session.is_logined == true) {
            if (error) {
                console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                    res.render('mystore', { // 정보전달
                    data : results,
                    is_logined: req.session.is_logined,
                    member_id: req.session.member_id,
                    nickname: req.session.nickname,
                    //views
                });
            }
        } else {
                res.render('mystore',{
                data : results,
                is_logined : false
            });
        }
    })
    */
    
   
    