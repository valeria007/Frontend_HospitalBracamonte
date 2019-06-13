
function validar() {
    var telefono;
    telefono = document.getElementById("telefono").value;
  
    if (telefono === ""){
      alert("Introduzca telefono ");
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


$(document).ready(function() {
  $("#contraseña2").keyup(function() {
    var contraseña = $('#contraseña').val();
    var contraseña2 = $('#contraseña2').val();

    if (contraseña == contraseña2) {
      $('#error2').text("Las contraseñas coinciden!").css("color","green");
    }
    else{
      $('#error2').text("Las contraseñas no Coinciden!").css("color","red");
    }

  });
  $("#contraseña").keyup(function() {
    var contraseña = $('#contraseña').val();
    var contraseña2 = $('#contraseña2').val();

    if (contraseña == contraseña2) {
      $('#error2').text("Las contraseñas coinciden!").css("color","green");
    }
    else{
      $('#error2').text("Las contraseñas no Coinciden!").css("color","red");
    }

  });
  $("#correo").keyup(function() {
        var correo = $('#correo').val();
        if(correo == ""){
          $('#error3').text("La dirección de correo electrónico es obligatoria.").css("color","red");
        }else{
          fetch('http://localhost:3500/usuarios/usersAll')
            .then(res => res.json())
            .then(data =>{                
              const resultado = data.find( traer => traer.correo === correo );              
              if(resultado != null){
                $('#su').text("Ese email ya esta en uso. Prueba con otro").css("color","red")
              }else{
                $('#su').text("puede continuar").css("color","green");
              }
          })
        }
    
    });
  
    
})
