var express = require('express');
var router = express.Router();
var accModel = require('../models/accModel').accouts
var postModel = require('../models/postModel').post
var helper = require("../helpers/covert").bodauTiengViet
var FroalaEditor = require("../helpers/lib/froalaEditor.js")
var upload = require("../helpers/uploadsmulter")
var checkpath = require("../helpers/checkpath").checkpath
var q = require("q")
var cateModel = require('../models/categorieModel').theloai;
/* GET users listing. */
router.get('/', function (req, res, next) {
  // if(req.session.passport){
  //     var id = req.session.passport.user
  //   if(id){
  //      accModel.findById({_id : id})
  //                 .then(rs =>{
  //                     if(rs.role == 'admin')
  //                     {
  //                         res.render('admin/indexAdmin',{title:"Trang adMIN"});
  //                     }else
  //                          res.redirect('/');


  //                 })

  //   }
  // }else{
  //     res.redirect('/');
  //   }

  res.render('admin/indexAdmin', {
    title: "Trang Admin | Quản lý",
    page: "Thống Kê",
    pagename: "dashboard"
  });
});

router.get('/addpost', (req, res) => {
    res.render('admin/addpost', {
      title: "Trang Admin | Thêm bài viết",
      page: "Thêm Bài Viết",
      pagename: "addpost"
    });
  })
  .post('/addpost/', upload.any(), (req, res) => {
    var t = req.body;
    var info = {
      tieude: t.tieude,
      noidung: t.noidung,
      theloai: t.theloai,
      menu: t.menu,
      thumb: "/" + req.files[0].path,
      path: helper(t.tieude)
    }
    console.log(info);

    var dulieu = postModel(info)
    dulieu.save()
      .then((rs) => {
        res.json("Thêm vào thành công");
      }).catch((err) => {
        console.log(err);

      });

  })
router.get('/delpost', (req, res) => {

  })
  .post('/delpost', (req, res) => {
    var query = {
      _id: req.body.idpost
    }
    postModel.findOneAndDelete(query, (e, data) => {
      if (e) {
        res.status(400).send(e);
      } else {
        res.json('xoá thành công');
      }
    })

  })
router.get('/posts/', (req, res) => {
  res.redirect('/admin/posts/1');

});

router.get('/posts/:page', (req, res) => {
  var page = req.params.page || 1;
  postModel.paginate({}, {
      page: page,
      limit: 4
    },
    function (err, result) {
      if (result.pages < page) {
        var t = "/admin/posts/" + result.pages
        res.redirect(t);
      }
      res.render('admin/viewpost', {
        title: "Trang Admin | Xem Bài Viết",
        page: "Xem Bài Viết",
        pagename: "post",
        data: result
      });

    });
});

// edit post 

router.get('/edit/:id/:path', (req, res, next) => {
    var id = req.params.id
    var path = req.params.path
    
    if (id) {
      postModel.findById({
        _id: id
      }).then(rs => {

        if(rs.path == path){
          res.render('admin/editPost', {

            title: "Trang Admin | Sửa bài viết",
            page: "Sửa Bài Viết",
            pagename: "post",
            data: rs
          });
        }else{
           res.redirect('/admin/edit/'+id+"/"+rs.path);
        }
      }).catch(err => {
        res.status(400).json(err).send();
      })
    }
  })
  .post('/edit', upload.any(), (req, res) => {
    var t = req.body
    var url;
    var id = t.id
    var tieude = req.body.tieude
    var noidung = req.body.noidung
    var theloai = req.body.theloai
    var path = helper(req.body.tieude)
    var menu = req.body.menu
    if (!req.files[0]) {
      postModel.findById({
        _id: id
      }).then(rs => {
        url = rs.thumb
        info = {
          tieude: tieude,
          noidung: noidung,
          theloai: theloai,
          path: path,
          thumb: url,
          menu: menu,
          ngaysua: Date.now()
        }
        console.log(info);

        postModel.findByIdAndUpdate({
          _id: id
        }, info).then(rs => {
          res.sendStatus(200)
        }).catch(err => {
          res.sendStatus(400);
        })



      }).catch(err => {
        res.sendStatus(400);
      })

    } else {
      info = {
        tieude: tieude,
        noidung: noidung,
        theloai: theloai,
        path: path,
        menu: menu,
        thumb: "/" + req.files[0].path,
        ngaysua: Date.now()
      }
      postModel.findByIdAndUpdate({
          _id: id
        }, info).then(rs => {
          res.sendStatus(200)

        })
        .catch(err => {
          res.sendStatus(400)
        })
    }

  })

//thể loại
  router.get('/categories', (req, res) => {
     res.render('admin/addCategorie', {

      title: "Trang Admin | Thêm thể loại",
      page: "Thêm Thể loại",
      pagename: "addtheloai",
      
    });
  })
  router.post('/categories', (req, res) => {
    
        var t = req.body
        info = {
            nameTheLoai : t.nameTheLoai,
            path : helper(t.nameTheLoai),
            mota:t.mota
          
        }
        var data = cateModel(info)
        
      data.save().then( rs => {
        console.log(rs);
        
             res.sendStatus(200);
      }).catch(err => {
          res.sendStatus(400).json(err)
      })
        
  }); 
  router.get('/allcategories', (req, res) => {
         res.redirect('/admin/allcategories/1');
  });
  router.get('/allcategories/:page', (req, res) => {
    var page = req.params.page || 1;
    cateModel.paginate({}, {
        page: page,
        limit: 4
      },
      function (err, result) {
        if (result.pages < page) {
          var t = "/admin/allcategories/" + result.pages
          res.redirect(t);
        }
        res.render('admin/viewCategorie', {
          title: "Trang Admin | Xem Thể Loại",
          page: "Xem Thể Loại",
          pagename: "theloai",
          data: result
        });
  
      });
  });

// XOá THể Loại
router.get('/delcategorie', (req, res) => {

})
.post('/delcategorie', (req, res) => {
    var query = {
      _id : req.body.idTheLoai
    }
    cateModel.findOneAndDelete(query, (e, data) => {
        if (e) {
          res.status(400).send(e);
        } else {
          res.json('xoá thành công');
        }
      })
  

})
// chỉnh Xsuawr thể loại

router.get('/editcategorie/:id/:path', (req, res) => {
      var idTheLoai = req.params.id
      var pathTheLoai = req.params.path
  
      
      cateModel.findById({_id : idTheLoai}).then(rs =>{
        
                  if(rs){
                      if(rs.path != pathTheLoai){
                             res.redirect('/admin/editcategorie/'+rs.id+"/"+rs.path);
                      }else{
                          res.render('admin/editCategorie',{
                            title: "Trang Admin | Sửa Thể Loại",
                            page: "Sửa Thể Loại",
                            pagename: "theloai  ",
                            data: rs
                          });
                      }
                  }
      })        .catch(err =>{

      })
}); 
    router.post('/editcategorie', (req, res) => {
            var t = req.body
            var id = t.id
            var info ={
              nameTheLoai : t.nameTheLoai,
              path : helper(t.nameTheLoai),
              ngaysua : Date.now(),
              mota:t.mota
            }
                cateModel.findByIdAndUpdate({_id : id },info)
                        .then(rs =>{
                          if(rs){
                            res.sendStatus(200)
                          }
                        }).catch(err =>{
                          res.sendStatus(400).json(err)
                        })
      
             
              
    }); 
// Phần Hình ảnh Bài viết
router.post('/imguploads', function (req, res) {


  FroalaEditor.Image.upload(req, '../uploads/', function (err, data) {
    // Return data.
    if (err) {
      return res.send(JSON.stringify(err));
    }


    res.send(data);
  });
});
router.post('*/imguploads', function (req, res) {


  FroalaEditor.Image.upload(req, '../uploads/', function (err, data) {
    // Return data.
    if (err) {
      return res.send(JSON.stringify(err));
    }


    res.send(data);
  });
});
router.post('/imgdelete', function (req, res) {

  // Do delete.
  FroalaEditor.Image.delete(req.body.src, function (err) {

    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }

    return res.end();
  });
});
module.exports = router;