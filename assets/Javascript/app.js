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
    var frequency = "";

    // Click Button changes what is stored in firebase
    $("#click-button").on("click", function(event) {
      // Prevent the page from refreshing
      // debugger;
      event.preventDefault();

      // Get inputs
      train = $("#train-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTrainTime = moment($("#time-input").val().trim(), "HH:mm").format("X")
      frequency = $("#frequency-input").val().trim();

      // Creates local "temporary" object for holding train data
      var newTrain = {
      	train: train,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

     
      // debugger;

        // Uploads train data to the database
      database.ref().push(newTrain);

      // console.log(firstTrainTime);

      alert("Train successfully added");

      // Clears all of the text-boxes
      $("#train-input").val("");
      $("#destination-input").val("");
      $("#time-input").val("");
      $("#frequency-input").val("");
    });


    // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    	var train = childSnapshot.val().train;
    	var destination = childSnapshot.val().destination;
    	var firstTrainTime = childSnapshot.val().firstTrainTime
    	var frequency = parseInt(childSnapshot.val().frequency);
      
      

      // Log the value of the various properties
      console.log(childSnapshot.val().train);
      console.log(childSnapshot.val().destination);
      console.log("Frequency: " + childSnapshot.val().frequency);

      //calculating next train time
      var startTime = moment.unix(firstTrainTime).format("HH:mm");
      console.log("First Train is at " + startTime);
      var firstTimeConverted = moment(startTime, "hh:mm")
      // var minutes = moment.duration(startTime, 'minutes');
      var diffTime = moment().diff(moment(firstTimeConverted));
      console.log(diffTime);
      var Remainder = diffTime % frequency;
      var minutesAway = frequency - Remainder;
      console.log(frequency);
      console.log(Remainder);
      console.log(minutesAway);

      var nextArrivalTrain = moment().add(minutesAway, "minutes");
      var nextArrival = moment(nextArrivalTrain).format("HH:mm A")


      // Change the HTML
      $("#trainschedule > tbody").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" +
		  frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
	
  	},
      // If any errors are experienced, log them to console.
     function(errorObject) {
      console.log("The read failed: " + errorObject.code);
 	 

    });