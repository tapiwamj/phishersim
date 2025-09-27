class Utilities {
  ajaxRuner(formData, url, success, fail) {
    $.ajax({
      xhr: function () {
        var xhr = new window.XMLHttpRequest();
        $("#progressStatus").css("width", "0%");
        xhr.upload.addEventListener(
          "progress",
          function (evt) {
            if (evt.lengthComputable) {
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);
              $("#progressStatus").css("width", percentComplete + "%");
            }
          },
          false
        );
        return xhr;
      },
      url: url,
      type: "post",
      enctype: "multipart/form-data",
      data: formData,
      dataType: "text json",
      success: function (data) {
        console.log(data);
        success(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        var responseText = jqXHR.responseText;
        // console.log(jqXHR.status + " and text: " + responseText);
        fail(responseText, jqXHR.status);
      },
      cache: false,
      contentType: false,
      processData: false,
    });
  }
  popupController(openUp = false, title = "", page = "") {
    if (openUp == true) {
        $('#popupTitle').html(title);
        $('.popupPage').removeClass('visible');
        $('#'+page).addClass('visible');
        $("#popupHolder").addClass("visible");
    } else {
      $("#popupHolder").removeClass("visible");
    }
  }
}
export default new Utilities();
