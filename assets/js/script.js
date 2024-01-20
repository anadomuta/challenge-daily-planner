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

  currentDay.text(dayjs().format("dddd, MMMM Do"));

  // Save Event upon Button Click
  function saveEvent() {
    var eventFromLS = storeEvent();

    var time = $(this).closest(".row").find(".currentTime").text();
    var eventText = $(this).closest(".row").find(".description").val();

    eventFromLS.push({ time: time, eventText: eventText });

    localStorage.setItem("events", JSON.stringify(eventFromLS));
  }
  saveButton.on("click", saveEvent);

  // Retrieve Events from Local Storage
  function storeEvent() {
    var eventFromLS = localStorage.getItem("events");
    if (eventFromLS === null || eventFromLS === undefined) {
      eventFromLS = [];
    } else {
      eventFromLS = JSON.parse(eventFromLS);
    }
    return eventFromLS;
  }
});
