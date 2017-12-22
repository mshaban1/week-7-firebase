// Initialize Firebase
var config = {
    apiKey: "AIzaSyDz7Ko87xLCkIBROZOzCMECmhUP12Kv0kg",
    authDomain: "week7hw-dcc23.firebaseapp.com",
    databaseURL: "https://week7hw-dcc23.firebaseio.com",
    projectId: "week7hw-dcc23",
    storageBucket: "week7hw-dcc23.appspot.com",
    messagingSenderId: "491849239693"
};
firebase.initializeApp(config);


var database = firebase.database();


//button for adding trains
$('#submitButton').on('click', function () {
    //gets user input
    var trainName = $('#trainNameInput').val().trim();
    var destination = $('#destinationInput').val().trim();
    var firstTime = moment($('#timeInput').val().trim(), "HH:mm").format("");
    var frequency = $('#frequencyInput').val().trim();

    //creates local holder for train times
    var newTrains = {
        name: trainName,
        tdestination: destination,
        tFirst: firstTime,
        tfreq: frequency,
    }

    database.ref().push(newTrains);


    alert("Train successfully added!");

    $('#trainNameInput').val("");
    $('#destinationInput').val("");
    $('#timeInput').val("");
    $('#frequencyInput').val("");

    return false;
});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {


    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().tdestination;
    var firstTime = childSnapshot.val().tFirst;
    var frequency = childSnapshot.val().tfreq;

  

    //convert first time (push back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    //current time
    var currentTime = moment();

    //difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    //time apart (remainder)
    var tRemainder = diffTime % frequency;

    //minute until train
    var tMinutesTillTrain = frequency - tRemainder;

    //next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainConverted = moment(nextTrain).format("hh:mm a");

    //add each trains data into the table
    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});
