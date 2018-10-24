$(function () {
  $('#noidung').froalaEditor({
    // Set the file upload URL.
    imageUploadURL: 'imguploads',
    imageUploadParams: {
      id: 'my_editor'
    }

  })
});

$(function () {

  // Catch the image being removed.
  $('#noidung').on('froalaEditor.image.removed', function (e, editor, $img) {
    $.ajax({
        // Request method.
        method: 'POST',

        // Request URL.
        url: '/admin/imgdelete/',

        // Request params.
        data: {
              src: $img.attr('src')
        }
      })
      .done(function (data) {
        console.log('Image was deleted');
      })
      .fail(function (err) {
        console.log('Image delete problem: ' + JSON.stringify(err));
      })
  });
});

function Xoa(idpost) {
  id = {
    idpost
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
      url: '/admin/delpost',
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
    console.log(id);
    Xoa(id)

  });
})

$(function () {
  $(':input').click(function () {
    $('#thongbaoinside').remove();
  })
  $('form').submit(function (e) {
    e.preventDefault();
    var tieude = $("input[name='tieude']").val();
    var noidung = $("textarea#noidung").val();
    var thumb = $('#inputId').val();



    var formData = new FormData($(this)[0]);
    if (tieude == "" || noidung == "" || thumb == "") {
      $.toast({
        heading: 'CÓ LỖI !!!',
        text: 'Vui Lòng Không Được Bỏ Trống !!!',
        position: 'top-right',
        loaderBg:'#ff6849',
        icon: 'error',
        hideAfter: 4000
        
      });
    } else {

      $.ajax({
        type: 'POST',
        url: '/admin/addpost',
        data: formData,
        contentType: false,
        processData: false

      }).done(function (data) {
        //print response on success
        ThemThanhCong()

      }).fail(function (data) {
        ThemThatBai()
      });
      e.preventDefault();

    }
  });
});