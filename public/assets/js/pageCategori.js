                                    $(function () {
                                        $('form#addform').submit(function (e) {
                                            
                                            e.preventDefault();
                                            var nameTheLoai = $("input[name='theloai']").val()
                                            var mota = $("input[name='mota']").val()



                                            var formData = new FormData($(this)[0]);
                                            var data = {
                                                nameTheLoai: nameTheLoai,
                                                mota: mota,

                                            }
                                            if (nameTheLoai == "" || mota == "") {
                                                $.toast({
                                                    heading: 'CÓ LỖI !!!',
                                                    text: 'VUI LÒNG KHÔNG ĐƯỢC BỎ TRỐNG !!!',
                                                    position: 'top-right',
                                                    loaderBg: '#ff6849',
                                                    icon: 'error',
                                                    hideAfter: 4000

                                                });
                                            } else {
                                                $.ajax({
                                                    type: 'POST',
                                                    url: '/admin/categories',
                                                    data: data,

                                                    success: function (response) {
                                                        ThemTheLoaiThanhCong()


                                                    },
                                                    error: function (rs) {
                                                        ThemThatBai()
                                                    }
                                                });
                                            }
                                        });
                                       
                                            $('form#editform').submit(function (e) {
                                                e.preventDefault();
                                                
                                                var nameTheLoai = $("input[name='theloai']").val();
                                                var mota = $("input[name='mota']").val();
                                                var id = $("input[type=hidden]").val();
                                                if(mota == "" || nameTheLoai == ""){
                                                    $.toast({
                                                        heading: 'CÓ LỖI !!!',
                                                        text: 'VUI LÒNG KHÔNG ĐƯỢC BỎ TRỐNG !!!',
                                                        position: 'top-right',
                                                        loaderBg: '#ff6849',
                                                        icon: 'error',
                                                        hideAfter: 4000
    
                                                    });
                                                }else{
                                                    var data = {
                                                        id : id,
                                                        nameTheLoai:nameTheLoai,
                                                        mota : mota
                                                    }
                                                  
                                                    
                                                    $.ajax({
                                                        type: "POST",
                                                        url: "/admin/editcategorie",
                                                        data: data,
                                                        
                                                        success: function (response) {
                                                                BoSungThanhCong()
                                                        },
                                                        error :function(err){
                                                                    bosungthatbai()
                                                        }
                                                    });
                                                }
                                                
                                            })
                                        
                                    })
                                    function Xoa(idTheLoai) {
                                        id = {
                                          idTheLoai
                                        }
                                        swal({
                                          title: "Bạn có muốn xoá không?",
                                          text: "Bài viết sẽ xoá khỏi database!",
                                          type: "warning",
                                          showCancelButton: true,
                                          confirmButtonColor: "#DD6B55",
                                          confirmButtonText: "Yes, delete it!",
                                          closeOnConfirm: false
                                        }, function () {
                                          $.ajax({
                                            type: 'POST',
                                            url: '/admin/delcategorie',
                                            data: id,
                                      
                                          }).done(function (data) {
                                            if (data) {
                                              xoathanhcong()
                                            }
                                      
                                      
                                          }).fail(function (data) {
                                            xoathatbai();
                                          });
                                      
                                        });
                                      }
                                    $(function () {
                                        //Set up click event on the Remove button
                                        $(document).on('click', '#btndel', function (event) {
                                            var id = $(this).parent().find("input[type='hidden']").val();
                                              Xoa(id)
                                            

                                        });
                                    })

                                    