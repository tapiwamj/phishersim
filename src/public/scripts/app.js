import util from "./utilities.js";

const userVals = {
  name: "",
  index: 0,
};
let delayFetch = false;
const emails = new Map();
$(document).ready(function () {
  init();
});

function init() {
  listeners();
  fetchEmail(userVals.index);
}

function fetchEmail(index) {
  console.log(index);
  
  $.ajax({
    url: `/fetchEmail/${index}`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      emailsHandler(data);
    },
    error: function (xhr, status, error) {
      console.error("Failed to fetch email:", error);
    },
  });
}

function emailsHandler(email) {
  console.log(email);
  const index = userVals.index;
  emails.set(userVals.index, email);
  userVals.index += 1;  
  const tempElement = $(email.body).text();
  $("#emailList").prepend(/*HTML*/ `
    <button data-index="${index}" class="emailContact">
      <div class="emailIcon">
          <h2>TT</h2>
      </div>
      <div class="emailContactBody">
        <h3>${email.name}</h3>
        <h3>${email.subject}</h3>
        <p>${tempElement}</p>
      </div>
    </button>
  `);
}

function listeners() {
  $("#emailListBurger").on("click", function (e) {
    $("#mainSideBar").addClass("visible");
  });
  $(".cancelZone").on("click", function () {
    $("#mainSideBar").removeClass("visible");
  });
  $(document).on("click", ".emailContact", function () {
    const index = $(this).attr("data-index");
    if ($(this).is("button")) {
      showEmail(true, index);
    }
  });
  $(document).on("click", ".actionBtn", function () {
    const index = userVals.index;
    fetchEmail(index);
  });
  $("#backToEmailList").on("click", function () {
    showEmail(false);
  });
  $("#nameBtnSub").on("click", function () {
    if ($("#yourname").val() == "") return;
    userVals.name = $("#yourname").val();
  });
}
function showEmail(showIt = false, index = -1) {
  if (showIt == true) {
    $("#emailList").removeClass("visible");
    $("#emailCanvas").addClass("visible");
    $("#mailboxType").addClass("nodisplay");
    $(".emailListNavigation").removeClass("visible");
    $(".emailCanvasNavigation").addClass("visible");
    const emailData = emails.get(parseInt(index));
    actionUI(emailData.actions);
    if (emailData.actions == false) {
      fetchEmail(userVals.index);
    }
    $("#subjectText").html(emailData.subject);
    $("#senderName").html(emailData.name);
    $("#emailBody").html(emailData.body);
    $("#senderEmail").html(emailData.email);
  } else {
    $("#emailList").addClass("visible");
    $("#emailCanvas").removeClass("visible");
    $("#mailboxType").removeClass("nodisplay");
    $(".emailListNavigation").addClass("visible");
    $(".emailCanvasNavigation").removeClass("visible");
  }
}

function actionUI(actions) {
  $("#options").html("");
  if (actions == false) {
    return;
  }
  $("#options").html(/*HTML*/ `
    <button class="ignore actionBtn">Ignore</button>
    <button class="action actionBtn">Take action</button>
  `);
}
