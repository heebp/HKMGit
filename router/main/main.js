const express = require('express')
var router = express.Router()

router.get('/',(req,res)=>{
    res.render('main')
})
router.get('/main',(req,res)=>{
    res.render('main')
})
module.exports = router