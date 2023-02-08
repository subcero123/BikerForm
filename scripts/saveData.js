// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue, update } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js'
import { getStorage, ref as refStorage, uploadBytes } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js';
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
var storage = getStorage();
var database = getDatabase(app);

// Get population value at startup
async function getPop(){
  var population = get(child(ref(database), `users/Pop`)).then((snapshot) => {
    return snapshot.val(); 
  })
  console.log(population);
  return population;
};
var population = await getPop();

// Get population on data change (Another user updated the population count)
onValue(ref(database, 'users/Pop'), (snapshot) => {
  population = snapshot.val();
  console.log(population);
});

// Save message to firebase
function saveMessage(name, age, country, gender, bikerGroupName, population, file){
  population = population +1;
  update(ref(database, 'users/'), {
    Pop: population
  });
  update(ref(database, 'users/' + population), {
    name: name,
    age: age,
    country: country,
    gender: gender,
    bGroup: bikerGroupName,
  });
  var storageRef = refStorage(storage, 'Imagenes/'+population);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Imágen subida');
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
    var file =document.getElementById('fileInput').files[0];

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
      var bikerGroupName = getInputVal(bikerInput);
    }
    else if (document.getElementById('biker-no').checked == true){
      var bikerGroupName = "No";
    }
    else{
      alert("Biker group not selected");
    }
    // Save message
    saveMessage(name,age, country, gender, bikerGroupName, population, file);

    // Clear form
    document.getElementById('contactForm').reset();
}
// Function to get  form values
function getInputVal(id){
    return document.getElementById(id).value;
}

