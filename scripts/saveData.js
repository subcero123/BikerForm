// Importación de funciones Firebase
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


// Inicializacion de la base de datos Firebase, y obtener referencias
var storage = getStorage();
var database = getDatabase(app);

//Obtener la población actual de la base de datos
async function getPop(){
  var population = get(child(ref(database), `users/Pop`)).then((snapshot) => {
    return snapshot.val(); 
  })
  console.log(population);
  return population;
};
var population = await getPop();

//Obtener la población actual si es cambiada en tiempo real
onValue(ref(database, 'users/Pop'), (snapshot) => {
  population = snapshot.val();
  console.log(population);
});

//Guardar el mensaje en Firebase
function saveMessage(name, age, country, gender, bikerGroupName,  opinion, opinion2, email, population, file){
  population = population +1;
  update(ref(database, 'users/'), {
    Pop: population
  });
  update(ref(database, 'users/' + population), {
    Nombre: name,
    Edad: age,
    Estado: country,
    Genero: gender,
    Significado_Memorial: opinion,
    Prevencion: opinion2,
    GrupoMotociclista: bikerGroupName,
  });
  if(file != null){
    var storageRef = refStorage(storage, 'Imagenes/'+population);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Imágen subida');
  }); 
  }
}




//Agrega la capacidad de saber cuando fue presionado el botón para terminar la encuesta
document.getElementById('contactForm').addEventListener('submit', submitForm);

//Funcion para obtener, y posteriormente enviar los datos capturados
function submitForm(e){
    e.preventDefault();

    //Obtención de valores
    
    var name = getInputVal('name');
    var age = getInputVal('age');
    var country = getInputVal('country');
    var opinion = getInputVal('opinion');
    var opinion2 = getInputVal('opinion2');
    var email = getInputVal('email');

    if(document.getElementById('fileInput').files.lenght != 0){
      var file =document.getElementById('fileInput').files[0];
    }
    else{
      var file = null; 
    }
    

    if(document.getElementById('gender-male').checked == true){
        var gender = "Hombre";
    }
    else if (document.getElementById('gender-female').checked == true){
        var gender = "Mujer";
    }
    else{
      alert("Select a gender");
    }
    
    if(document.getElementById('biker-yes').checked == true){
      var bikerGroupName = getInputVal("bikerInput");
    }
    else if (document.getElementById('biker-no').checked == true){
      var bikerGroupName = "No";
    }
    else{
      alert("Biker group not selected");
    }
    //Guardar el mensaje, y enviarlo
    saveMessage(name,age, country, gender, bikerGroupName, opinion, opinion2, email, population, file);

    //Limpiar el formulario 
    document.getElementById('contactForm').reset();
}
//Funcion para obtener los valores dado un ID
function getInputVal(id){
    return document.getElementById(id).value;
}
