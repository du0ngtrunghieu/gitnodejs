var express = require('express');
var router = express.Router();
var passport = require('passport');
var google = require('../config/accout.Google')(passport);
var AccMd = require('../models/accModel').accouts;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trang Chủ' ,data:req.session.passport});
});

// test//
router.get('/test', (req, res) => {
        res.render('test');
}); 

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
// the callback after google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    })
    );
router.get('/profile', (req, res) => {
            if(!req.session.passport){
              res.render('profile',
                  {title:'Thành viên',data:{displayName:"Khách"}});
            }else{
              var id = req.session.passport.user;
              if(!id){
                res.render('profile',
                {title:'Thành viên',
                  data:{displayName:"Khách"}});
              }
              AccMd.findById({_id:id}).then((dulieu) =>{
                res.render('profile',
                {title:'Thành viên',
                  data:dulieu});
              })
            }
            
          
}); 
// đăng xuất
router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});
module.exports = router;
