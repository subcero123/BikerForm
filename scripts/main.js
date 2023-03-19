document.getElementById("biker-yes").addEventListener("click", function(){
    document.getElementById("bikerInput").hidden = false;    
});
document.getElementById("biker-no").addEventListener("click", function(){
    document.getElementById("bikerInput").hidden = true;    
});


function mostrarModal() {
    document.getElementById("miModal").style.display = "block";
}  
function cerrarModal() {
    document.getElementById("miModal").style.display = "none";
}

function validarFormulario() {
    const age = document.getElementById("age");
    const country = document.getElementById("country");
    const male = document.getElementById("gender-male");
    const female = document.getElementById("gender-female");
    const yes = document.getElementById("biker-yes");
    const no = document.getElementById("biker-no");
    const opinion = document.getElementById("opinion");
    const opinion2 = document.getElementById("opinion2");
    

    if (age.checkValidity() && country.checkValidity() && opinion.checkValidity() && opinion2.checkValidity() && (male.checked || female.checked) && (yes.checked || no.checked)) {
        mostrarModal();
    } 
    else {
        alert("Por favor, rellene correctamente todos los campos obligatorios.");
    }
}