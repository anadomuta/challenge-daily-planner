$(document).ready(function () {
  var currentDay = $("#currentDay");
  var currentTime = $("#currentTime");

  currentDay.text(dayjs().format("dddd, MMMM Do"));
  currentTime.text(dayjs().format("hh:mm A"));
});
