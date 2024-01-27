$(document).ready(function () {
  var currentDay = $("#currentDay");
  var saveButton = $(".saveBtn");
  var confirmationEventNote = $(".message");
  var confirmEventLS = $("<p>");

  // Retrieving current day from DayJs using an advanced format
  currentDay.text(dayjs().format("dddd, MMMM Do"));

  // Update timeblocks color based on current time
  function updateColor() {
    var textareaElements = $(".description").toArray(); // convert textareas into arrays
    var currentTime = parseInt(dayjs().format("H")); // convert current time into numeric value

    // Iterating through the textareas
    textareaElements.forEach((textareaElement) => {
      var blockTime = $(textareaElement).attr("data-time");
      blockTime = parseInt(blockTime);

      var hourElement = $(textareaElement)
        .parent()
        .siblings(".col-sm-1")
        .children(".currentTime");

      // Retrieve hour value from Local Storage
      function timeBlockByHour(hourElement) {
        var hourValue = $(hourElement).text();
        return JSON.parse(localStorage.getItem(hourValue));
      }

      $(textareaElement).text(timeBlockByHour(hourElement));

      // Conditional Styling of Text Areas by comparing the associated times with the current time
      if (currentTime === blockTime) {
        $(textareaElement).addClass("present");
      }

      if (currentTime < blockTime) {
        $(textareaElement).addClass("future");
      }

      if (currentTime > blockTime) {
        $(textareaElement).addClass("past");
      }
    });
  }

  updateColor();

  // Save Event upon Button Click
  function saveEvent() {
    //Initialize local storage for the specific time

    initLS(time);

    // Retrieves time and event text from the clicked button's parent row
    var time = $(this).closest(".row").find(".currentTime").text();
    var eventText = $(this).closest(".row").find(".description").val().trim();

    //Stores the event text in local storage under the specified time
    localStorage.setItem(time, JSON.stringify(eventText));

    // Display confirmation message when event added
    confirmEventLS
      .text("Appointment added to Local Storage ✅")
      .show()
      .delay(1500)
      .fadeOut();
    confirmationEventNote.append(confirmEventLS);
  }

  // Initialize Local Storage and retrieve any existing events from Local Storage
  function initLS(time) {
    var eventFromLS = localStorage.getItem(time);
    if (eventFromLS === null || eventFromLS === undefined) {
      eventFromLS = []; // create empty array if no previous events
    } else {
      eventFromLS = JSON.parse(eventFromLS);
    }
    return eventFromLS; // return an array of events associated with the specified time
  }
  // Attach the saveEvent function to the click event of saveButton
  saveButton.on("click", saveEvent);
});
