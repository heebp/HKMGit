const mysql = require('mysql');
const express = require('express')
const app = express()
const session = require('express-session');
const moment = require('moment')
const ChatModel = require('../../models/Chat')
const MessageModel = require('../../models/Message')
const MySQLStore = require("express-mysql-session")(session);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const chat = (req,res)=>{
  //console.log("req",req.params.board_no)
  var io = req.app.get('socketio');
  //var board_room = req.params.board_no
  var chat_no = req.params.chat_no
  var chat = io.of('/chat').on('connection', function(socket) {
    /*  오류))) 클릭 이벤트 호출시 새로운 접속을 생성
    *   => 서버에서 multiple message 생성  
    *   해결))) 시작 부분에 모든 리스너 삭제
    */
    socket.removeAllListeners()
      socket.on('chat message', function(data) {
          data.room = chat_no
          var name = socket.name = data.name;
          var room = socket.room = data.room;
          //console.log('message from client: ', data);
          new MessageModel().createChatMessage(data,(error,results)=>{
            if(error){
              console.log("create message error : ", error)
            }else{
              console.log("create messgea results : ",results)
            }
          })
          // room에 join한다
          socket.join(room);
          // room에 join되어 있는 클라이언트에게 메시지를 전송한다
          chat.to(room).emit('chat message', data);
      });
  
  });
  new ChatModel().getChattingInfo(chat_no, (error,results) => {
    if(error){
      console.log("crete chat error : ",error)
    }else{
      //console.log("crete chat results : ",results[1])
      res.render("chatting",{
        chat_no : chat_no,
        data : results[0],
        old_message : results[1]
      })
    }
  })
}

module.exports = {
  chat
}