//YOUR FIREBASE LINKS
const firebaseConfig = {
  apiKey: "AIzaSyDEC9KkWESv6cNega9E449sqN3u-K5lM5U",
  authDomain: "kwitter-ae06d.firebaseapp.com",
  databaseURL: "https://kwitter-ae06d-default-rtdb.firebaseio.com",
  projectId: "kwitter-ae06d",
  storageBucket: "kwitter-ae06d.appspot.com",
  messagingSenderId: "917578735107",
  appId: "1:917578735107:web:25b9d8250d59d153513836",
  measurementId: "G-DF9FY72R44"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");


function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code

                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data["name"];
                        like = message_data["likes"];
                        message = message_data["message"];
                        name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png' > </h4>";
                        message_with_tag = "<h4 class='message_h4' >" + message + "</h4>"
                        like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:" + like + "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;



                        //End code
                  }
            });
      });
}
getData();

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            likes: 0
      });
      document.getElementById("msg").value = "";

}
function updateLike(message_id) {
      console.log("you liked the message -", message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updateLikes = Number(likes) + 1;
      console.log(updateLikes);

      firebase.database().ref(room_name).child(message_id).update({
            likes: updateLikes
      });


}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

