const express = require('express')
var router = express.Router()


router.get('/signin',(req,res)=>{
    res.render('signin')
})

const process ={
    signin: (req,res)=>[
        console.log(req.body)
    ]
}
module.exports = {
    router,
    process
}