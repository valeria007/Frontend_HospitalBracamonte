
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
   else if(telefono.length < 7){
        alert("Por favor numero valido telefono");
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
  $("#password2").keyup(function() {
    var contraseña = $('#password').val();
    var contraseña2 = $('#password2').val();

    if (contraseña == contraseña2) {
      $('#error2').text("Las contraseñas coinciden!").css("color","green");
      return false;
    }
    else{
      $('#error2').text("Las contraseñas no Coinciden!").css("color","red");
      return false;
    }

  });
  $("#password").keyup(function() {
    var contraseña = $('#password').val();
    var contraseña2 = $('#password2').val();

    if (contraseña == contraseña2) {
      $('#error2').text("Las contraseñas coinciden!").css("color","green");
      return false;
    }
    else{
      $('#error2').text("Las contraseñas no Coinciden!").css("color","red");
      return false;
    }
  

  });
 
  $("#email").keyup(function() {
    
        var email = $('#email').val();
        if(email == ""){
          $('#error3').text("La dirección de correo electrónico es obligatoria.").css("color","red");
          return false;
        }else{
          fetch('http://localhost:3600/api/list')
            .then(res => res.json())
            .then(data =>{                
              const resultado = data.find( traer => traer.email === email );            
              if(resultado != null){
              
                $('#su').text("Ese email ya esta en uso. Prueba con otro").css("color","red")
                return false;
              }else{
                $('#su').text("puede continuar").css("color","green");
                return false;
              }
          })
        }
    
    });
    $("#username").keyup(function() {
      var errors = document.getElementById('username');  
      var username = $('#username').val();
      if(username == ""){
        $('#error3').text("la cuenta es obligatorio.").css("color","red");
        return false;
      }else{
        fetch('http://localhost:3600/api/list')
          .then(res => res.json())
          .then(data =>{                
            const resultado = data.find( traer => traer.username === username );            
            if(resultado != null){
            
              $('#su1').text("La cuenta ya existe").css("color","red")
              return false;
              
            }else{
              $('#su1').text("puede continuar").css("color","green");
              return false;
            }
        })
      }
  
  });

    
})
