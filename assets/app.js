
const config = {
    apiKey: "AIzaSyDVGvRb3tCBGNViOpbuT5OCj-pjz5JaPZE",
    authDomain: "trainschedule-b36d5.firebaseapp.com",
    databaseURL: "https://trainschedule-b36d5.firebaseio.com",
    projectId: "trainschedule-b36d5",
    storageBucket: "",
    messagingSenderId: "135909648331"
};

firebase.initializeApp(config);

const dbRef = firebase.database().ref('TimeSheet/trains');

$("#add-train-btn").click(function(event) {
  
  event.preventDefault();

  const newTrain = {
    name: $("#train-name-input").val().trim(),
    destination: $("#destination-input").val().trim(),
    start: moment($("#start-input").val().trim(), "HH:mm").subtract(10, "years").format("X"),
    frequency: $("#frequency-input").val().trim()
  };

  dbRef.push(newTrain);

  console.log(newTrain);
  
  alert("train successfully added");
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");

  return false;
  
});

dbRef.on("child_added", function(childSnapshot, prevChildKey) {

    
    var firebaseName = childSnapshot.val().name;

    var firebaseDestination = childSnapshot.val().destination;
    var firebasestart = childSnapshot.val().trainTime;
    var firebaseFrequency = childSnapshot.val().frequency;
    
    var diffTime = moment().diff(moment.unix(firebasestart), "minutes");
    var timeRemainder = moment().diff(moment.unix(firebasestart), "minutes") % firebasefrequency ;
    var minutes = firebaseFrequency - timeRemainder;

    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
    

$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");});


function resetInputs() {
  $("form input:not([submit])").val('');
  $("#train-name-input").focus();
}

