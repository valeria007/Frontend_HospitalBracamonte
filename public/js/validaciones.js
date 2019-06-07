var correo = document.getElementById("");

email.addEventListener("keyup", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("¡Yo esperaba una dirección de correo, cariño!");
  } else {
    email.setCustomValidity("");
  }
});
function validar() {
    var telefono;
    telefono = document.getElementById("telefono").value;
  
    if (telefono === ""){
      alert("Introduzca un numero  ");
      return false;
    }else if(telefono.length <7){
        alert("Por favor introduzca un numero de telefono válido");
        return false;
  
    }
    else if(isNaN(telefono)){
        alert("introduzca un numero de telefono válido");
        return false;
    }
  
  }