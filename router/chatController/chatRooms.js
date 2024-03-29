const mysql = require('mysql');
const moment = require('moment')
const ChatModel = require('../../models/Chat');


const get = (req,res)=>{
  var board_no = req.params.board_no
  new ChatModel().selectChatting(board_no, (error,results)=>{
    if(error){
      console.log("error",error)
    } else{
      console.log("results",results)
      res.render('mychatting',{
        chat_no 
      })
    }
  })
    
  //res.redirect("/mychatting")
}
const getChatrooms = (req,res)=>{
  var member_id = req.session.member_id
  new ChatModel().getRooms(member_id,(error, results)=>{
    if(error){
      console.log("error",error)
    }else{
      console.log("results",results)
      res.render('mychatting',{
        data: results
      })
    }
  })
}

const createChatrooms = (req, res)=>{
  var date = moment().format('YYYY-MM-DD HH:mm:ss')
  var member_id = req.session.member_id
  var board_no = req.params.board_no
  console.log("hello")
  var chatContent ={
    "date" : date,
    "member_id" : member_id,
    "board_no" : board_no 
  }
  new ChatModel().createChatting(chatContent, (error,results)=>{
    if(error){
      console.log("crete chat error : ",error)
    }else{
      console.log("crete chat results : ",results)
      return res.render("mychatting")
    }
  })
}

const countRooms = (req,res)=>{
  var member_id = req.session.member_id
  var board_no = req.params.board_no
  var countContent ={
    "member_id" : member_id,
    "board_no" : board_no 
  }
  new ChatModel().countRooms(countContent,(error, results)=>{
    if(error){
      console.log("count room error : ",error)
    }else{
      console.log("count room results : ",results)
      console.log("count", Object.values(results[0]))
      
      if((Object.values(results[0]))==0){
        this.createChatrooms(req,res)
      }
      res.redirect("/chatting")
    }
  })
}
module.exports = {
  get,
  getChatrooms,
  createChatrooms,
  countRooms
}