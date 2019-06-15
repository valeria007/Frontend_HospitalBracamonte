
function validar() {
    var telefono,nombre,apellidop, apellidom, ci, cargo, dirección, letras ;
    telefono = document.getElementById("telefono").value;
    nombre = document.getElementById("nombre").value;
    apellidop = document.getElementById("apellidop").value;
    apellidom = document.getElementById("apellidom").value;
    ci = document.getElementById("ci").value;
    cargo = document.getElementById("cargo").value;
    dirección = document. getElementById("direccion").value;
    //letras = /[a-z]/;

    if (telefono === "" || nombre === "" || apellidop ==="" || apellidom === "" || ci === "" || cargo === "" || dirección === ""){
      alert("Todos los campos son obligados");
      return false;
    }
    else if(telefono.length < 10){
        alert("Por favor numero valido");
        return false;
    }
    else if(isNaN(telefono)){
        alert("introduzca un numero de telefono válido");
        return false;
    }
    else if(nombre.length > 20 ){
      alert("El nombre es muy largo ");
      return false;
    }
    else if(apellidop.length > 20){
      alert("el apellido es muy largo")
      return false;
    }
    else if(ci.length >20){
      alert("ci invalido")
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
          fetch('http://localhost:3600/usuarios/usersAll')
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
