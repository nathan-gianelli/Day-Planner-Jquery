

var currentDateAndTime = Date(Date.now()); // exp: Fri Oct 25 2019 17:40:56 GMT-0400 (Eastern Daylight Time)
var currentHour = new Date().getHours(); //Current hour in military time

// Click Function
$(".save-btn").on("click", function(e) {
    e.preventDefault();
    var currentValue = $(this).prev(".current-event-time").val();
    console.log(currentValue);

    // Varible for event time and name we want to save. 
    var event = {
        name: currentValue,
        time: moment().format('MMMM Do YYYY, h:mm:ss a')
    };

    // event = JSON.stringify(event);
    
    // Send to Local Storage
    saveEvent(event);
});

// Update the time for the clock
setInterval(function(){
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    $('#currentDay').text(time);
}, 1000);
// End Update time. 

// Save Event Name to Local Storage
function saveEvent(event) {
    var currentEvents = JSON.parse(localStorage.getItem("events"));
    console.log("currentEvents:::");
    console.log(currentEvents);
    currentEvents = $.extend(currentEvents, event);
    localStorage.setItem("events", JSON.stringify(currentEvents));
}

// var object1 = {
//     apple: 0,
//     banana: { weight: 52, price: 100 },
//     cherry: 97
//   };
//   var object2 = {
//     banana: { price: 200 },
//     durian: 100
//   };
   
//   // Merge object2 into object1
//   $.extend( object1, object2 );
   
//   // Assuming JSON.stringify - not available in IE<8
//   $( "#hour9" ).append( JSON.stringify( object1 ) );

// moment().format('MMMM Do YYYY, h:mm:ss a');
// moment().format('LT'); Current Hour