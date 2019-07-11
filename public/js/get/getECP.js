//$(document).ready(function() { 
   
       /* fetch('http://localhost:3000/api/servicios')
        .then(res => res.json())
        .then(data =>{
            var $content = "";
            data.forEach(function(item){

              var row = "<select><option>"+item.nombre+"</option></select>";
              $content = $content + row;

            })
            
        $("#selects").html($content);
         // console.log(data)
          
        })*/

        // esta funcion selecina lo que hay dentro del select para agarrar ese dato
        //y llevarlo a otro fetch que traeria datos de salas
        
       /* $(function(){
          $("#selects").change(function(){
          var  serv = $("#selects option:selected").text();
          console.log(serv);
          fetch('http://localhost:3000/api/ServSalasN/'+serv)
            .then(res => res.json())
            .then(data =>{
              console.log(data)
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
          var  sala = $("#selects option:selected").text(); 
            console.log(sala, "esto es de sala")
          })
        })*/
        

        

     /* $( "select" )
  .change(function() {
    var str = "";
    $( "select option:selected" ).each(function() {
      str += $( this ).text() + " ";
    });
    $( "div" ).text( str );
  })
  .trigger( "change" );*/


//});

/*const app = new Vue({
  el: '#prueva',
  data () {
    return {
      mensaje: null
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/api/papeletaInt')
      .then(response => (this.mensaje = response.data[0].Historial ))
  }
})*/
 new Vue({
  el:'#options',
    
    data () {
      return {
        mensaje:'',
        mostrar:'',
        salaID:'',
        camas:[]
      }
    },
    methods:{
      agregar: function (){
        axios
        .get('http://localhost:7000/internaciones/Vue_list_salas/'+this.mensaje)
        .then(response => {
          this.mostrar = response.data 
          //console.log(response.data)
          
        })
      },
      traer: function (){
        axios
        .get('http://localhost:7000/internaciones/VUe_list_camas/'+this.salaID)
        .then(response => {
          console.log(response.data)
          this.camas = response.data
        })
      } 
    }
})

