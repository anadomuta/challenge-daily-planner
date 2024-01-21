$(document).ready(function () {
  var currentDay = $("#currentDay");
  var time = $("#hour");
  var currentTime = $(".currentTime");
  var colorRow = $(".col-sm-10");
  var pastEvent = $(".past");
  var presentEvent = $(".present");
  var futureEvent = $(".future");
  var eventText = $(".description");
  var saveButton = $(".saveBtn");
  var header = $("header");
  var confirmEventLS = $("<p>");

  currentDay.text(dayjs().format("dddd, MMMM Do"));

  function updateColor() {
    var textAreas = $(".description").toArray(); // convert all textareas into arrays
    console.log(textAreas);
    var currentTime = parseInt(dayjs().format("H")); // convert into numeric value

    textAreas.forEach((timeBlockText) => {
      var blockTime = $(timeBlockText).attr("data-time");
      blockTime = parseInt(blockTime);

      console.log(blockTime);
    });
  }

  updateColor();

  // Save Event upon Button Click
  function saveEvent() {
    initLS(time);

    var time = $(this).closest(".row").find(".currentTime").text();
    var eventText = $(this).closest(".row").find(".description").val().trim();

    localStorage.setItem(time, JSON.stringify(eventText));

    confirmEventLS
      .text("Appointment added to Local Storage ✅")
      .show()
      .delay(1500)
      .fadeOut();
    header.append(confirmEventLS);
  }
  saveButton.on("click", saveEvent);

  // Retrieve Events from Local Storage
  function initLS(time) {
    var eventFromLS = localStorage.getItem(time);
    if (eventFromLS === null || eventFromLS === undefined) {
      eventFromLS = [];
    } else {
      eventFromLS = JSON.parse(eventFromLS);
    }
    return eventFromLS;
  }
});
