$(document).ready(function() {  
   /* $("#links a").on("click", function(){
        fetch('http://localhost:3000/api/papeletaInt')
        .then(res => res.json())
        .then(data =>{
            var $content = "";
            data.forEach(function(item){

              var row = "<tr><td>"+item.Historial+"</td></tr>";
              $content = $content + row;

              
            })
            
            $("#table tbody").html($content);
          //const resultado = data.find( traer => traer.email === email );
          console.log(data)
          for(i = 0; i <= data.length; i++){
              $('#N').text(i+1).css("color","red");
              $('#historial').text(data[i].nombre).css("color","red");
              //console.log(data[i].diagnostico);
          }
          
      })
    })*/

    

    //este escrip es para refrescar o actualizar la pagina
    $("#links a").last().on("click", function(e){
        e.preventDefault();
        console.log("click");
        location.reload()
    });
    
        
});