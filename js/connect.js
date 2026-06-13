// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwRCyFOotDFoKcCivEmDGJ6KlIppjlGm4",
  authDomain: "fir-82e9c.firebaseapp.com",
  databaseURL: "https://fir-82e9c.firebaseio.com",
  projectId: "fir-82e9c",
  storageBucket: "fir-82e9c.appspot.com",
  messagingSenderId: "372098598256",
  appId: "1:372098598256:web:715de839bb877364",
  measurementId: "G-L1V8SFW7YP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function () {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      uid = user.uid;

      var dref = firebase.database().ref().child("users");
      dref.on("child_added", function (e) {
        if (e.val().UID == user.uid) {
          if (e.val().Profile_Image.startsWith("https")) {
            $("#profileImg,#profileImg1").attr("src", e.val().Profile_Image);
          }
        }
      });

      var stref = firebase.database().ref().child("store-owners");
      stref.on("child_added", function (e) {
        if (e.val().owner == uid) {
          $(".dropdown-menu > .dropdown-item").removeClass("disabled")
        }
      })


    }
  });
});
