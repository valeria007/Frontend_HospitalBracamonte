const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/medico',(req,res) => {
    res.render('HomeVistDoctor');
});

// 1
router.get('/ConsultaMedica/:id',(req, res) => {
    var id = req.params
    fetch('http://localhost:3000/api/citas/'+id.id)
        
        .then(resp => resp.json())
        .then(resp =>{ 
            if(resp == ""){                
                res.render('ListaConsultaMedicaDoc',{resp});
            }else{
                res.render('ListaConsultaMedicaDoc',{resp});
            }
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});

//serv para sacar el historial y el id de la cita medica o la ficha 2
var dataPaciente, idCIta;
router.get('/consulta/:historial/:idCitaMedica', (req,res) => {
    var id = req.params;
    idCIta = req.params.idCitaMedica;
   fetch('http://localhost:3000/api/onlyPaciente/'+id.historial)
      .then(resp => resp.json())
      .then(resp =>{
        dataPaciente = resp;
        res.redirect('/medico/renderConsulta');       
    });
});

//servicio para renderisar la vista consulta medica sacando los datos de la cita 
//medica y mandando datos del paciente y el id de la cita medica
var cita; // esto solo va a llevar tipo de consulta
router.get('/renderConsulta', (req,res)=> {
    if (idCIta == null){
        res.send('NO se esta mandando el id de la cita medica') 
    } else{
        fetch('http://localhost:3000/api/OneCita/'+idCIta)
          .then(resp => resp.json())
          .then(resp =>{
            cita = resp;
            res.redirect('/medico/consultaData');           
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("Ocurrio algo con el servidor");
        }) 
    }
    
});

//serv para traer datos da la tabla consultas
router.get('/consultaData', (req,res) => {
    if (idCIta == null){
        // en esta parte deveria mostrar que no hay data paciente u idcita
        res.render('consultaMedica',{
            dataPaciente,
            idCIta
        });  
    } else {
        fetch('http://localhost:3000/api/pacienteConsulta/'+cita[0].codigo_p+'/'+cita[0].especialidad)
        
        .then(resp => resp.json())
        .then(resp =>{
            if (dataPaciente == null){
                res.send("no hay datos en Datapaciente en routes/medico serv renderConsulta")
            }else{
                res.render('consultaMedica',{
                    dataPaciente,
                    idCIta, // este es el id de la cita medica que viene desde /consulta/:historial/:idCitaMedica'
                    resp,
                    cita
                });   
            }    
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })
    }
});

//serv para insertar datos en la tabla consultas
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.post('/regConsulta/:id', (req, res) => {
    var citaID = req.params;
    console.log(citaID," es esto<<<<<<<<<<<<<<<<<<<")
    var datos = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(datos),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/reg_consulta/'+citaID.id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
      res.redirect('/medico/renderConsulta');
    })
});


//<>>>>>>>>>><<<<<<<<<<<<<<
//servicio para recetas
///
///>>>>>>>>>>>>>>>>>>>>>>>>
router.get('/recetas/:id', (req,res) => {
    var id = req.params
    if(dataPaciente == null){
        res.send("no hay datos en dataPaciente")
    } else {
        fetch('http://localhost:3000/api/OnlyReceta/'+id.id)        
        .then(resp => resp.json())
        .then(resp =>{
            res.render('recetas',{
                dataPaciente,
                id,
                ConsultaOnly
            });
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })
    }
});

//serv para sacar consulta segun id
var ConsultaOnly;
router.get('/TraerConsulta/:id', (req,res) => {
    var id = req.params;
    fetch('http://localhost:3000/api/OnlyConsulta/'+id.id)        
        .then(resp => resp.json())
        .then(resp =>{
            ConsultaOnly = resp;         
            res.redirect('/medico/recetas/'+id.id);
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })
});

//
router.post('/receta/:id', (req,res) => {
    var id = req.params
    var datos = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(datos),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/reg_Receta/'+id.id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {      
      res.redirect('/medico/renderConsulta');
    })
});

/* serv para mostrar papeleta de internacion 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

//esto falta pensar y muuucho para que fucione bien
router.get('/Pinternacion/:id', (req,res) => {
    var id = req.params
    if(dataPaciente == null){
        res.send("no hay datos de pacientes que mostrar")
    }else {
       
    console.log(id, " <<<<<<<<<<<<<<<<<<<<<<<<<<<< este es id consulta")
    fetch('http://localhost:3000/api/onlyPInternacion/'+id.id)        
        .then(resp => resp.json())
        .then(resp =>{
            //console.log(dataPaciente)
            res.render('papeletasInternacion',{
                dataPaciente,
                id,
                ConsultaOnlyPinternacion,
                PapeletaINTER // trae datos de papeleta internacion segun hstorial y tipo consulta
            });
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })
    }
    
});

//serv para sacar consulta segun id
var ConsultaOnlyPinternacion;
router.get('/TraerConsultaPinternacion/:id', (req,res) => {
    var id = req.params;
    fetch('http://localhost:3000/api/OnlyConsulta/'+id.id)        
        .then(resp => resp.json())
        .then(resp =>{
            ConsultaOnlyPinternacion = resp;
            res.redirect('/medico/Pinternacion/'+id.id);
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })
});

router.post('/Pinternacion/:id',(req,res) => {
    var tipoCOnsulta = req.body.tipoConsulta
    console.log(tipoCOnsulta   , " >>>>>>>>>>>>>>dato<<<<<<<<<<<<<<<<<<<<<<<");
    if(tipoCOnsulta == "consultaMedica"){
        var idConsultaM = req.params
        var datos = req.body
        var esto = {
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{
              'Content-type' : "application/json"
            }
        };
        fetch('http://localhost:3000/api/papeletaIntConsulta/'+idConsultaM.id,esto)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {      
              res.redirect('/medico/PapeletaINT/'+datosConsultaData.id+"/"+datosConsultaData.historial+"/"+datosConsultaData.tipoConsulta);
            })
    }else  if(tipoCOnsulta == "emergencia") {
        var idEmergencia = req.params
        var datos = req.body
        var esto = {
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{
              'Content-type' : "application/json"
            }
        };
        fetch('http://localhost:3000/api/papeletaIntEmergencia/'+idEmergencia.id,esto)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {      
              res.redirect('/medico/PapeletaINT/'+datosConsultaData.id+"/"+datosConsultaData.historial+"/"+datosConsultaData.tipoConsulta);
            })
    }
});

var PapeletaINTER; // esto trae todas las papelteas de internacion segun historial y tipo consulta
var datosConsultaData; // esta variable es para llevar el id historial y tipo consulta de la vista consulta 
router.get('/PapeletaINT/:id/:historial/:tipoConsulta', (req,res) => {
    var id = req.params;
    datosConsultaData = req.params;
    //console.log(id);
    fetch('http://localhost:3000/api/getPinternacionPaciente/'+id.historial+"/"+id.tipoConsulta)        
        .then(resp => resp.json())
        .then(resp =>{
            PapeletaINTER = resp;
            console.log(resp, "    es esto<<<<<<<<<<<<<<<<<")
            res.redirect('/medico/TraerConsultaPinternacion/'+id.id);
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })
    
});


//reconsulta
// este serv va servir para traer citas tipo solo consultas
router.get('/listRegConsulta/:id', (req, res) => {
    var DogOenf = req.params.id; // esto es para saver si es doctor o enfermera
    if (dataEmergencia == null){
        res.redirect('/emergencia/oneVista');
    }
    fetch('http://localhost:3000/api/PacienteCita/consulta') //esta ruta solo trae las citas de tipo emergencia y que el estado sea true
        
    .then(resp => resp.json())
    .then(resp =>{ 
        if(resp == ""){                
            res.render('ListaConsultaMedicaDoc',{resp});
        }else{
            res.render('ListaConsultaMedicaDoc',{resp});
        }

    
          
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
   
});


//para recervar reconsulta
// ruta para traer citas medicas ya llenadas su formulario
var dataEmergencia; //esta variable tarea datos las citas que ya fueron llenados su diagnostico
router.get('/dataConsulta/:id', (req,res) => {
    var DogOenf = req.params.id;
    fetch('http://localhost:3000/api/OnlyConsulta') //esta ruta solo trae las citas de tipo emergencia y que el estado sea true
        .then(resp => resp.json())
        .then(resp =>{ 
            dataEmergencia = resp;
            res.redirect('/medico/listRegConsulta/'+DogOenf)
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});

module.exports = router;