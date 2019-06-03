/*$(document).ready(function() {      
    fetch('http://localhost:7000/medico/consultaData')
      .then(res => res.json())
      .then(data =>{
        //const resultado = data.find( traer => traer.email === email );
        
        for(i = 0; i <= data.length; i++){
            $('#N').text(i+1).css("color","red");
            $('#historial').text(data[i].numeroHistorial).css("color","red");
            console.log(data[i].diagnostico);
        }
        
    })    
});*/