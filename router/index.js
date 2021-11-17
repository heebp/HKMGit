const express = require('express')
var router = express.Router()

var signup= require('./signup/signup')
var signin= require('./signin/signin')
var main= require('./main/main')
var signout= require('./signout/signout')
router.post("/signin",signin.process.signin)
router.get('/',main)
router.get('/main',main)

router.get('/article',(req,res)=>{
    res.render('article')
})
router.get('/board',(req,res)=>{
    res.render('board')
})
router.get('/changing_mystore',(req,res)=>{
    res.render('changing_mystore')
})
router.get('/chatting',(req,res)=>{
    res.render('chatting')
})
router.get('/favorite',(req,res)=>{
    res.render('favorite')
})
router.get('/mystore',(req,res)=>{
    res.render('mystore')
})
router.get('/product',(req,res)=>{
    res.render('product')
})
router.get('/review',(req,res)=>{
    res.render('review')
})
router.get('/sellpage',(req,res)=>{
    res.render('sellpage')
})
router.get('/setting',(req,res)=>{
    res.render('setting')
})
router.get('/signin',(req,res)=>{
    res.render('signin')
})
router.get('/signup',(req,res)=>{
    res.render('signup')
})

module.exports = router