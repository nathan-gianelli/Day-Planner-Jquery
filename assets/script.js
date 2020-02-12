

var currentDateAndTime = Date(Date.now()); // exp: Fri Oct 25 2019 17:40:56 GMT-0400 (Eastern Daylight Time)
var currentHour = new Date().getHours(); //Current hour in military time
var hours = ["12:00AM","1:00AM", "2:00AM", "3:00AM", "4:00AM", "5:00AM", "6:00AM", "7:00AM", "8:00AM","9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM", "6:00PM", "7:00PM", "8:00PM","9:00PM", "10:00PM", "11:00PM"];

function BuildCalendar() {
    var html = '';
    $.each(hours, function( index, value ) {
        var SavedEvent = localStorage.getItem(`hour-${index}`);
            SavedEvent = JSON.parse(SavedEvent);
        // 
        if (SavedEvent == null || SavedEvent == undefined || !SavedEvent) {
            SavedEvent = {};
            SavedEvent.name = " ";
        }
        
        // console.log( index + "::::" + value );
        html += `<div data-time="${value}" id="hour-${index}" class="row">
        <div class="col-sm-2 text-right">${value}</div>
        <div class="col-sm-8"><textarea id="textarea-hour-${index}" cols="100" class="current-event-time form-control">${SavedEvent.name}</textarea> </div>
        <div class="col-sm-2 text-left"> <button data-time="9" class="save-btn btn saveBtn">Save</button></div>
    </div>`;
       
    });
    $('.container').html(html);
    $('.calendar-container').fadeIn("slow");



    setInterval(function(){
        var time = moment().format('MMMM Do YYYY, h:mm:ss a');
        $('#currentDay').text(time);
        document.title = "Work Day Scheduler -"+time;
    }, 1000);
    // End Update time. 

}

// Build our App and Inject to DOM. 
BuildCalendar();

// Click Function
$(".save-btn").on("click", function(e) {
    e.preventDefault();
    var currentValue = $(this).parent().parent(".row").find(".current-event-time").val();
    var keyToPass = $(this).parent().parent(".row").attr('id');

    // Varible for event time and name we want to save. 
    var event = {
        name: currentValue,
        time: moment().format('MMMM Do YYYY, h:mm:ss a')
    };

    // event = JSON.stringify(event);
    
    // Send to Local Storage
    saveEvent(keyToPass, event);
});

// Update the time for the clock


// Save Event Name to Local Storage
function saveEvent(key, event) {
    var currentEvents = JSON.parse(localStorage.getItem("events"));
    console.log("currentEvents:::");
    console.log(currentEvents);
    currentEvents = $.extend(currentEvents, event);
    localStorage.setItem(key, JSON.stringify(currentEvents));
}

// moment().format('MMMM Do YYYY, h:mm:ss a');
// moment().format('LT'); Current Hour