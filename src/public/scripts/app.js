import util from "./utilities.js";

const userVals ={
  name: "",
  index: 0
}
$(document).ready(function () {
  init();
});

function init() {
  listeners();
}


function listeners() {
  $("#emailListBurger").on("click", function (e) {
    $("#mainSideBar").addClass("visible");
  });
  $(".cancelZone").on("click", function () {
    $("#mainSideBar").removeClass("visible");
  });
  $(".emailContact").on("click", function () {
    if ($(this).is("button")) {
      showEmail(true);
    }
  });
  $("#backToEmailList").on("click", function () {
    showEmail(false);
  });
  $('#nameBtnSub').on('click', function () {
    if ($('#yourname').val() == "") return;
    userVals.name = $('#yourname').val();
  })
}
function showEmail(showIt = false) {
  if (showIt == true) {
    $("#emailList").removeClass("visible");
    $("#emailCanvas").addClass("visible");
    $("#mailboxType").addClass("nodisplay");
    $(".emailListNavigation").removeClass("visible");
    $(".emailCanvasNavigation").addClass("visible");
  } else {
    $("#emailList").addClass("visible");
    $("#emailCanvas").removeClass("visible");
    $("#mailboxType").removeClass("nodisplay");
    $(".emailListNavigation").addClass("visible");
    $(".emailCanvasNavigation").removeClass("visible");
  }
}
