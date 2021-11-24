const express = require('express')
var router = express.Router()
const db = require('mysql');

/////router.post('/signup',(req,res)=>{
// const param=[req.body.id,req.body.email,req.body.passwd,req.body.name,req.body.student_id,]
//db.query('INSERT INTO member('student_id','id','name','email','passwd') VALUES (?,?,?,?,?,)',param,(err,row)=>{
//if(err) console.log(err)
///// })
//res.end()
//})

const process = {
    signin: (req, res) => [
        console.log(req.body.id, )
    ]
}
module.exports = {
    router,
    process
}