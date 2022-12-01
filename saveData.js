// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js'
const firebaseConfig = {
    apiKey: "AIzaSyAM-fgjeUOQy-x4vDaRhfBOAG6HoYV4ST0",
    authDomain: "formproject-f7bd3.firebaseapp.com",
    projectId: "formproject-f7bd3",
    storageBucket: "formproject-f7bd3.appspot.com",
    messagingSenderId: "368539408720",
    appId: "1:368539408720:web:5e952b2e6f8579193c3455",
    databaseURL: "https://formproject-f7bd3-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

async function getPop(){
  var population = get(child(ref(database), `users/Pop`)).then((snapshot) => {
    return snapshot.val(); 
  })
  return population;
};
  
const population = await getPop();

// Save message to firebase
function saveMessage(name, age, country, gender, bikerGroupName){

  set(ref(database, 'users/' + population), {
    name: name,
    age: age,
    country: country,
    gender: gender,
    bGroup: bikerGroupName,
  });
}




// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
    e.preventDefault();

    // Get values
    var name = getInputVal('name');
    var age = getInputVal('age');
    var country = getInputVal('country');

    if(document.getElementById('gender-male').checked == true){
        var gender = "Male";
    }
    else if (document.getElementById('gender-female').checked == true){
        var gender = "Female";
    }
    else{
      alert("Select a gender");
    }
    
    if(document.getElementById('biker-yes').checked == true){
      var bikerGroupName = getInputVal(bikerGroupName);
    }
    else if (document.getElementById('biker-no').checked == true){
      var bikerGroupName = "No";
    }
    else{
      alert("Biker group not selected");
    }
  

    

    // Save message
    saveMessage(name,age, country, gender, bikerGroupName);

    // Clear form
    document.getElementById('contactForm').reset();
}
// Function to get get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

