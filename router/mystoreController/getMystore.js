const mysql = require('mysql');
const express = require('express')
const moment = require('moment')
const MystoreModel = require('../../models/Mystore');
var app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
exports.getMystore = function (req, res) {

    /* req.params.member_id : 오류
    *   navbar를 통해 채팅페이지에서 내상점 페이지로 이동하면
    *   param 값이 ... 으로 변경됨 => getMystore가 세 번 호출되기 때문
    *   일단 session을 사용해서 member_id 값을 받음 
    *   
    */  
    //member_id = req.params.member_id 
    member_id = req.params.member_id,
    console.log("mystore",member_id)
        new MystoreModel().getMystoreById(member_id, (error, results) => {
            var mnt = new Array()
            var image_split = new Array()
            var board_image_split = new Array()
            console.log("리젙르",results)
            console.log("error",error)
            for (var i = 0; i < results.length; i++) {
                mnt[i] = moment(results[i].date, 'YYYY-MM-DD HH:mm:ss').fromNow()    
            }
            if (error) {
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                if (results.length) {
                    for (var i = 0; i < results.length; i++) {
                        image_split = results[i].image.split("|");
                        board_image_split += image_split[1] + "|"
                    }
                    board_image_split = board_image_split.split("|")
                }
                //console.log(board_image_split)
                //console.log("마이스토어")
                //console.log("ASdasds",results[0])
                if(results[0] ){
                res.render('mystore', { // 정보전달
                    mystore_data: results,
                    boards_data: results,
                    moment: mnt,
                    image: board_image_split,
                    is_logined: req.session.member_id,
                    session_member_id: req.session.member_id,
                    nickname: req.session.nickname,
                    member_id:req.params.member_id
                    //views
                });
            }
            }
        }
        )
    
}


