function validar(){
    var nombre, apellidop, apellidom, ci, cargo, direccion, telefono, correo, expresion;
    nombre = document.getElementById("nombre").value;
    apellidop = document.getElementById("apellidop").value; 
    apellidom = document.getElementById("apellidom").value; 
    ci = document.getElementById("ci").value; 
    cargo = document.getElementById("cargo").value; 
    direccion = document.getElementById("direccion").value; 
    telefono = document.getElementById("telefono").value;  
    correo = document.getElementById("correo").value; 
    expresion = /\w*@\w+\.+[a-z]/;


    if(nombre === "" || apellidop === "" || apellidom === "" || ci === "" || cargo === "" || direccion === "" || telefono === ""){
        alert("Todos los campos som obligatorios");
        return false;
    }
    else if(nombre.length > 30){
        alert("El nombre es muy largo");
        return false;
    }
    else if(apellidop.length > 30){
        alert("El apellido paterno es muy largo");
        return false;
    }
    else if(apellidom.length > 30){
        alert("El apellido materno es muy largo");
        return false;
    }
    else if(direccion.length <30){
        alert("La direccion no es valida");
        return false;
    }
    else if(telefono.length <7){
        alert("Por favor introduzca un numero de telefono válido");
        return false;
    }
    else if(isNaN(telefono)){
        alert("Telefono ingresado no es un numero");
        return false;
    }
    else if(correo ===""){
        alert("Todos los campos son Obligatorios");
        return false;
    }
    else if(correo.length >30){
        alert("El correo es muy largo");
        return false;
    }
    else if(correo ===""){
        alert("Todos los campos son Obligatorios");
        return false;
    }
    else if(!expresion.test(correo)){
        alert("El correo no valido");
        return false;
    }
    

}