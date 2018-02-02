  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCP-2wHk-dYWD91k2CIOSMmaswaC8vddXI",
    authDomain: "trainactivity-640b9.firebaseapp.com",
    databaseURL: "https://trainactivity-640b9.firebaseio.com",
    projectId: "trainactivity-640b9",
    storageBucket: "trainactivity-640b9.appspot.com",
    messagingSenderId: "1071406306696"
  };
  firebase.initializeApp(config);

   // Create a variable to reference the database
    var database = firebase.database();

    // Initial Variables (SET the first set IN FIREBASE FIRST)
    // Note remember to create these same variables in Firebase!
    var train = "";
    var destination = "";
    var firstTrainTime = "";
    var frequency = 0;

    // Click Button changes what is stored in firebase
    $("#click-button").on("click", function(event) {

      event.preventDefault();

      // Get inputs
      train = $("#train-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTrainTime = moment($("#time-input").val().trim(), "hh:mm").format("hh:mm")
      frequency = $("#frequency-input").val().trim();
        // Uploads train data to the database
      database.ref().push({
        train: train,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

      // console.log(firstTrainTime);

      alert("Train successfully added");

      // Clears all of the text-boxes
      $("#train-input").val("");
      $("#destination-input").val("");
      $("#time-input").val("");
      $("#frequency-input").val("");

      // return false;
    });


    // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

        var train = childSnapshot.val().train;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
      var firstTrainTime = childSnapshot.val().firstTrainTime


      var timeArr = firstTrainTime.split(":");
      var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
      var maxMoment = moment.max(moment(), trainTime);
      var minutesAway;
      var nextArrival;

      if (maxMoment === trainTime) {
        nextArrival = trainTime.format("hh:mm A");
        minutesAway = trainTime.diff(moment(), "minutes");
      } else {

      var differenceTimes = moment().diff(trainTime, "minutes");
        var tRemainder = differenceTimes % frequency;
        minutesAway = frequency - tRemainder;
        // To calculate the arrival time, add the tMinutes to the currrent time
        nextArrival = moment().add(minutesAway, "m").format("hh:mm A");
      };


      // Log the value of the various properties
      // console.log(childSnapshot.val().train);
      // console.log(childSnapshot.val().destination);
      // console.log("Frequency: " + childSnapshot.val().frequency);

      //calculating next train time
      // var startTime = moment.unix(firstTrainTime).format("HH:mm");
      // // console.log("First Train is at " + startTime);
      // var firstTimeConverted = moment(startTime, "hh:mm")
      // // var minutes = moment.duration(startTime, 'minutes');
      // var currentTime = moment();
      // // console.log("Current time : " + moment(currentTime).format("hh:mm"))

      // var diffTime = moment().diff(moment(firstTimeConverted, "minutes"));

      // // console.log(diffTime);
      // var remainder = diffTime % frequency;
      // var minutesAway = frequency - remainder;
      // // console.log(frequency);
      // // console.log(remainder);
      // // console.log(minutesAway);

      // var nextArrivalTrain = moment().add(minutesAway, "minutes");
      // var nextArrival = moment(nextArrivalTrain).format("HH:mm")


      // Change the HTML
      $("#trainschedule > tbody").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" +
          frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");


      // If any errors are experienced, log them to console.

    });