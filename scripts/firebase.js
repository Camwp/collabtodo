// Your Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC2MRiwpPdGfAZtZna8MbexEjmTwhvNqSM",
    authDomain: "todo-46398.firebaseapp.com",
    databaseURL: "https://todo-46398-default-rtdb.firebaseio.com",
    projectId: "todo-46398",
    storageBucket: "todo-46398.appspot.com",
    messagingSenderId: "38761706547",
    appId: "1:38761706547:web:03aeaba7986e027bb79f46",
    measurementId: "G-F0LMQVMQ4V"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the Firebase Realtime Database
var database = firebase.database();

// Function to add an item to the corresponding list
function addItem(person) {
  var item;
  switch (person) {
    case "cameron":
      item = document.getElementById("cameronItem").value;
      break;
    case "macey":
      item = document.getElementById("maceyItem").value;
      break;
    case "jesse":
      item = document.getElementById("jesseItem").value;
      break;
    default:
      return;
  }

  if (item.trim() !== "") {
    var listRef = database.ref(person + "/tasks");
    listRef.push(item);
  }
}

// Function to remove an item from the corresponding list
function removeItem(person, taskId) {
  var taskRef = database.ref(person + "/tasks/" + taskId);
  taskRef.remove();
}

// Function to handle real-time updates when a new item is added
function handleNewTaskSnapshot(person, snapshot) {
  var list = document.getElementById(person + "List");
  list.innerHTML = "";

  snapshot.forEach(function (childSnapshot) {
    var taskId = childSnapshot.key;
    var task = childSnapshot.val();

    var taskElement = document.createElement("li");
    taskElement.textContent = task;

    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
      removeItem(person, taskId);
    };

    taskElement.appendChild(removeButton);
    list.appendChild(taskElement);
  });
}

// Real-time listeners for each person's list
database.ref("cameron/tasks").on("value", function (snapshot) {
  handleNewTaskSnapshot("cameron", snapshot);
});

database.ref("macey/tasks").on("value", function (snapshot) {
  handleNewTaskSnapshot("macey", snapshot);
});

database.ref("jesse/tasks").on("value", function (snapshot) {
  handleNewTaskSnapshot("jesse", snapshot);
});