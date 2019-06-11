var correo = document.getElementById("UserEmail");

/*correo.addEventListener("keyup", function (event) {
  if (correo.validity.typeMismatch) {
      correo.setCustomValidity("¡Yo esperaba una dirección de correo, cariño!");
  } else {
      correo.setCustomValidity("");
  }
});*/
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
/*$(document).ready(function(){
    $('.tooltips-general').tooltip('hide');
    $('.mobile-menu-button').on('click', function(){
        var mobileMenu=$('.navbar-lateral');	
        if(mobileMenu.css('display')=='none'){
            mobileMenu.fadeIn(300);
        }else{
            mobileMenu.fadeOut(300);
        }
    });
    $('.dropdown-menu-button').on('click', function(){
        var dropMenu=$(this).next('ul');
        dropMenu.slideToggle('slow');
    });
    $('.exit-system-button').on('click', function(e){
        e.preventDefault();
        var LinkExitSystem=$(this).attr("data-href");
        swal({
            title: "¿Estás seguro?",
            text: "Quieres salir del sistema y cerrar la sesión actual",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5cb85c",
            confirmButtonText: "Si, salir",
            cancelButtonText: "No, cancelar",
            animation: "slide-from-top",
            closeOnConfirm: false 
        },function(){
            window.location=LinkExitSystem; 
        });  
    });
    $('.search-book-button').click(function(e){
        e.preventDefault();
        var LinkSearchBook=$(this).attr("data-href");
        swal({
           title: "¿Qué libro estás buscando?",
           text: "Por favor escribe el nombre del libro",
           type: "input",   
           showCancelButton: true,
           closeOnConfirm: false,
           animation: "slide-from-top",
           cancelButtonText: "Cancelar",
           confirmButtonText: "Buscar",
           confirmButtonColor: "#3598D9",
           inputPlaceholder: "Escribe aquí el nombre de libro" }, 
      function(inputValue){
           if (inputValue === false) return false;  

           if (inputValue === "") {
               swal.showInputError("Debes escribir el nombre del libro");     
               return false;   
           } 
            window.location=LinkSearchBook+"?bookName="+inputValue;
       });
    });
    $('.btn-help').on('click', function(){
        $('#ModalHelp').modal({
            show: true,
            backdrop: "static"
        });
    });
});
(function($){
    $(window).load(function(){
        $(".custom-scroll-containers").mCustomScrollbar({
            theme:"dark-thin",
            scrollbarPosition: "inside",
            autoHideScrollbar: true,
            scrollButtons:{ enable: true }
        });
    });
})(jQuery);*/

$(document).ready(function() {
    $("#correo").keyup(function() {
        var email = $('#correo').val();
        if(email == ""){
          $('#error3').text("La dirección de correo electrónico es obligatoria.").css("color","red");
        }else{
          fetch('http://localhost:3500/')
            .then(res => res.json())
            .then(data =>{
              const resultado = data.find( traer => traer.email === email );
              console.log(resultado);
              if(resultado != null){
                $('#error3').text("Ese email ya esta en uso. Prueba con otro").css("color","red");
              }else{
                $('#error3').text("puede continuar").css("color","green");
              }
          })
        }
    
    });
})