const express = require('express')
var router = express.Router()
var app = express()
var session = require('express-session')
const MySQLStore = require("express-mysql-session")(session); 
const cookieParser = require('cookie-parser');
app.use(express.urlencoded({ extended: true }) );
app.use(express.json() );
var signup= require('./authController/signup')
var signin= require('./authController/signin')
var signout= require('./authController/signout')
var boards= require('./boardsController/boards')
var pagination= require('./boardsController/pagination')
var changing_mystore= require('./mystoreController/changeMystore')
var getMystore= require('./mystoreController/getMystore')
var getFavorite= require('./favoriteController/getFavorite')
var product= require('./boardsController/product')
var review= require('./reviewController/writeReview')
var favorite= require('./favoriteController/favorite')
var sessionStore = new MySQLStore(options)
var options ={
    host:"localhost",
    user:"root",
    password:'0000',
    database:'hkm_db2'
}
app.use(session({
    secret: 'blackzat', // 데이터를 암호화 하기 위해 필요한 옵션
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
    store :  sessionStore// 세션이 데이터를 저장하는 곳
}));


function commonRes(layout, req, res) {
    console.log('페이지 작동');
    console.log(req.session);
    if(req.session.is_logined == true){
        res.render(layout,{
            is_logined : req.session.is_logined,
            member_id : req.session.member_id,
            nickname : req.session.nickname,
        });
 
    }else{
        res.render(layout,{
            is_logined : false,
            member_id : req.session.member_id
        });
    }
  }
  


/*
app.use(function(req, res, next){
    res.locals.items = "Value";
    next();
});
*/
router.post('/signup', signup.register)
router.post('/signin', signin.login)
router.post('/review',review.review)
router.post('/product',boards.boards)
router.post('/boards/:board_no',favorite.favorite)
router.put('/mystore/:member_id',changing_mystore.changing_mystore)
router.post('/favorite/:member_id',favorite.favorite)
router.get('/',pagination.pagination)
router.get('/boards',pagination.pagination)
router.get('/mystore',getMystore.getMystore)
router.get('/boards/:board_no',product.product)
router.get('/boards',(req,res)=>{
    console.log("서치 라우터 작동")
})
router.get('/favorite/:member_id',getFavorite.getFavorite)
router.get('/favorite',getFavorite.getFavorite)

/*router.get('/',(req,res)=>{
    commonRes('main', req,res)
    pagination.pagination

})
router.get('/main',(req,res)=>{
    commonRes('main', req, res)
    pagination.pagination

})
*/

router.get('/signout',(req,res)=>{
    console.log('로그아웃 성공');
    req.session.destroy(function(err){
        // 세션 파괴후 할 것들
        res.redirect('/');
    });

});
router.get('/review',(req,res)=>{
    
    commonRes('review', req, res)
})
router.get('/article',(req,res)=>{
    
    commonRes('article', req, res)
})

router.get('/product',(req,res)=>{
    commonRes('boards', req, res)
})

router.get('/mystore/:member_id',(req,res)=>{
    commonRes('changing_mystore', req, res)
})
router.get('/chatting',(req,res)=>{
    commonRes('chatting', req, res)
})

/*
router.get('/mystore',(req,res)=>{
    commonRes('mystore', req, res)
})
*/
/*
router.get('/boards/:board_no',(req,res)=>{
    commonRes('product', req, res)
})
*/
router.get('/review',(req,res)=>{
    commonRes('review', req, res)
})
router.get('/sellpage',(req,res)=>{
    commonRes('sellpage', req, res)
})
router.get('/setting',(req,res)=>{
    commonRes('setting', req, res)
})
router.get('/signin',(req,res)=>{
    commonRes('signin', req, res)
})
router.get('/signup',(req,res)=>{

    commonRes('signup', req, res)
})

module.exports = router