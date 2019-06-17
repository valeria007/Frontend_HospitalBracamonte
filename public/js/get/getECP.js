$(document).ready(function() { 
   
        fetch('http://localhost:3000/api/servicios')
        .then(res => res.json())
        .then(data =>{
            var $content = "";
            data.forEach(function(item){

              var row = "<select><option>"+item.nombre+"</option></select>";
              $content = $content + row;

            })
            
        $("#selects").html($content);
         // console.log(data)
          
        })

        // esta funcion selecina lo que hay dentro del select para agarrar ese dato
        //y llevarlo a otro fetch que traeria datos de salas
        
        $(function(){
          $("#selects").change(function(){
          var  serv = $("#selects option:selected").text();
          fetch('http://localhost:3000/api/ServSalasN/'+serv)
            .then(res => res.json())
            .then(data =>{
                var $content2 = "";
                data.forEach(function(item){
                
                  var row = "<select><option value = "+item.id+">"+item.descripcionSala+"</option></select>";
                  $content2 = $content2 + row;               
                })      
            $("#salas").html($content2);              
            })  
          })  
        })

        $(function(){
          $("#salas").change(function(){
          var  sala = $("#selects option:selected").val(); 
            console.log(sala)
          })
        })
        

        

     /* $( "select" )
  .change(function() {
    var str = "";
    $( "select option:selected" ).each(function() {
      str += $( this ).text() + " ";
    });
    $( "div" ).text( str );
  })
  .trigger( "change" );*/
});