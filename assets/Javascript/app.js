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
    var frequency = "";

    // Click Button changes what is stored in firebase
    $("#click-button").on("click", function(event) {
      // Prevent the page from refreshing
      // debugger;
      event.preventDefault();

      // Get inputs
      train = $("#train-input").val().trim();
      destination = $("#destination-input").val().trim();
      frequency = $("#frequency-input").val().trim();

     
      debugger;

      // Change what is saved in firebase
      database.ref().set({
        train: train,
        destination: destination,
        frequency: frequency
      });
    });


    // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html
    database.ref().on("value", function(snapshot) {

      // Print the initial data to the console.
      console.log(snapshot.val());

      // Log the value of the various properties
      console.log(snapshot.val().train);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().frequency);

      // Change the HTML
      $("#train-input").append(snapshot.val().train);
      $("#destination-input").append(snapshot.val().destination);
      $("#frequency-input").append(snapshot.val().frequency);

      // If any errors are experienced, log them to console.
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });