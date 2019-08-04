const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var Static = require('../public/static/datas');

// ruta para mostrar tipos de consulta que un paciente puede requerir
router.get('/listaConusltas', (req,res) => {

    fetch('http://localhost:4600/api/list_consEsp')        
        .then(resp => resp.json())
        .then(resp =>{            
            res.render('HomeLIstConsultasMedicas',{
                resp
            });            
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
})

//ruta para renderizar homeVistDoctor
var consultamedica
router.get('/renderVistaDocotr/:consultamedica1', (req,res) => {
    const { consultamedica1 } = req.params;
    consultamedica = consultamedica1;
    Static.static_data.tipo_especialidad = consultamedica1;
    res.render('HomeVistDoctor',{
        consultamedica
    })
})

//serv para mandar la cita medica de tipo false
var falseCita;
router.get('/listfalseConsulta/:consultamedica', (req,res) =>{
    const { consultamedica } = req.params
    Static.static_data.tipo_especialidad = consultamedica
    fetch('http://localhost:3000/api/PacienteCitaFalse/'+consultamedica)
        
        .then(resp => resp.json())
        .then(resp =>{  
            falseCita = resp;          
            res.redirect('/medico/ConsultaMedica/'+consultamedica);            
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});

// 
router.get('/ConsultaMedica/:consultamedica',(req, res) => {
    const { consultamedica } = req.params
    Static.static_data.tipo_especialidad = consultamedica
    fetch('http://localhost:3000/api/PacienteCita/'+consultamedica)
        
        .then(resp => resp.json())
        .then(resp =>{ 
            //console.log(resp  ,"  esto es la respuesta que quiero")
            if(resp == ""){                
                res.render('ListaConsultaMedicaDoc',{resp,falseCita,consultamedica});
            }else{
                res.render('ListaConsultaMedicaDoc',{resp,falseCita,consultamedica});
            }
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});

//ruta para poder volver a la consulta desde otro lugar de la vista
router.get('/volver',(req,res) => {
    res.redirect('/medico/consulta/'+volver.historial+"/"+volver.idCitaMedica);
})

//serv para sacar el historial y el id de la cita medica o la ficha 
var dataPaciente, idCIta, volver;
router.get('/consulta/:historial/:idCitaMedica', (req,res) => {
    var id = req.params;
    idCIta = req.params.idCitaMedica;
    volver = id;
    //console.log(idCIta,"  idCita <<<<<<<<<<<<<<<<<<<<<<<  2 <<<<<<<<<<<<<")
   fetch('http://localhost:3000/api/onlyPaciente/'+id.historial)
      .then(resp => resp.json())
      .then(resp =>{
        dataPaciente = resp;
        res.redirect('/medico/renderConsulta');       
    });
});
/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
ruta para poder ver la consulta desde la lista que se muestra en consulta del paciente
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/
var dataPaciente, idCIta;
router.get('/VerConsulta/:historial/:idCitaMedica', (req,res) => {
    var id = req.params;
    idCIta = req.params.idCitaMedica;
   fetch('http://localhost:3000/api/onlyPaciente/'+id.historial)
      .then(resp => resp.json())
      .then(resp =>{
        dataPaciente = resp;
        res.redirect('/medico/renderConsulta');       
    });
});
///<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


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
            console.log(resp, "  <<<<<<<<<<<<<esto es la cita")
            res.redirect('/medico/updateConsulta');                       
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("Ocurrio algo con el servidor");
        }) 
    }
    
});

//ruta para actualizar consulta del paciente
var updateCita
router.get('/updateConsulta', (req,res) => {
    
    fetch('http://localhost:3000/api/updateConsulta/'+idCIta)
    .then(resp => resp.json())
    .then(resp =>{
        updateCita = resp;
      
      res.redirect('/medico/consultaData');           
  })
  .catch(error => {
      console.error('Error:', error)
      res.send("Ocurrio algo con el servidor");
  }) 

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
                //console.log(cita, 'esto es paciente  <<<<<<<<<<<<<')
                res.render('consultaMedica',{
                    dataPaciente,
                    idCIta, // este es el id de la cita medica que viene desde /consulta/:historial/:idCitaMedica'
                    resp,
                    cita,
                    updateCita,
                    consultamedica//esto es el tipo de consulta medica ejmp neurologia pediatria etc
                });   
            }    
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })
    }
});

router.get('/estado', (req,res) =>{
    fetch('http://localhost:3000/api/estado/'+idCIta)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
       // console.log(data," <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<esto es lo que quiero")
        res.redirect('/medico/renderConsulta');
      //res.status(200).send(data)
    })
});

/*
actuallizar consulta

*/

router.post('/updateConsulta/:id', (req,res) => {
    //console.log(idCIta, "  esto >>>")
    const { id }= req.params;
    var datos = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(datos),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/updateConsulta/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        //console.log(data, "  respuesta del post reg_consulta")
      res.redirect('/medico/renderConsulta');
    })

})

//serv para insertar datos en la tabla consultas
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.post('/regConsulta/:id', (req, res) => {
    var citaID = req.params;
   // console.log(citaID," es esto<<<<<<<<<<<<<<<<<<<")
    var datos = req.body;
    //console.log(datos.hora.split("/")[1], "   <<<<<<<<<<<<<<  eso post")
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
        atendido(datos.hora.split("/")[1])
        function atendido(id){
            var estado = {
                estado: "atendido"
            }
            var esto = {
                method: 'POST',
                body: JSON.stringify(estado),
                headers:{
                  'Content-type' : "application/json"
                }
            };
            fetch('http://localhost:4600/api/Update_Hora/'+id,esto)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(resp => {
                console.log(resp)
                res.redirect('/medico/estado');
            })
        }
      
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
        fetch('http://localhost:3000/receta/'+id.id)        
        .then(resp => resp.json())
        .then(resp =>{
            
            res.render('recetas',{
                dataPaciente,
                id,
                ConsultaOnly,
                resp,
                ListRecetaOfConsulta
            });
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })
    }
});

var ListRecetaOfConsulta;
router.get('/recetasOFconsulta', (req,res) => {

    fetch('http://localhost:3000/api/recetaOfConsulta/'+hist.historial+"/"+ConsultaOnly[0].tipoConsulta)        
        .then(resp => resp.json())
        .then(resp =>{
            ListRecetaOfConsulta = resp;         
            res.redirect('/medico/recetas/'+hist.id);
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })

});

//serv para sacar consulta segun id para madar a la plantilla de receta
var ConsultaOnly, hist;
router.get('/TraerConsulta/:id/:historial', (req,res) => {
    var id = req.params;
    hist = id;
    fetch('http://localhost:3000/api/OnlyConsulta/'+id.id)        
        .then(resp => resp.json())
        .then(resp =>{
            ConsultaOnly = resp;         
            res.redirect('/medico/recetasOFconsulta');
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
      res.redirect('/medico/TraerConsulta/'+hist.id+"/"+hist.historial);
    })
});

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>
                 actualizar Receta
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>
*/
router.post('/updateReceta/:id', (req,res) => {
    const { id } = req.params;
    var data = req.body  
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/updateReceta/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
      res.redirect('/medico/TraerConsulta/'+hist.id+"/"+hist.historial);        
    }) 
})

/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
serv para mostrar papeleta de internacion 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

//esto falta pensar y muuucho para que fucione bien
router.get('/Pinternacion/:id', (req,res) => {
    var id = req.params
    //console.log(PapeletaINTER,   " esto es la lsista PapeletaINTER")
    if(dataPaciente == null){
        res.send("no hay datos de pacientes que mostrar")
    }else {
    fetch('http://localhost:3000/api/onlyPInternacion/'+id.id)        
        .then(resp => resp.json())
        .then(resp =>{
            res.render('papeletasInternacion',{
                dataPaciente,
                id,
                ConsultaOnlyPinternacion,
                PapeletaINTER, // trae datos de papeleta internacion segun hstorial y tipo consulta
                resp,
                especialidad
            });
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })
    }
    
});

//ruta para poder sacar los servicos de otro servidor con puerto 4600
var especialidad;
router.get('/especialidad/:id', (req,res) => {
    const { id } = req.params;
    fetch('http://localhost:4600/api/especialidad')
    .then(resp => resp.json())
    .then(resp =>{  
        especialidad = resp;
        res.redirect('/medico/Pinternacion/'+id);
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
})

//serv para sacar consulta segun id
var ConsultaOnlyPinternacion;
router.get('/TraerConsultaPinternacion/:id', (req,res) => {
    var id = req.params;
    fetch('http://localhost:3000/api/OnlyConsulta/'+id.id)        
        .then(resp => resp.json())
        .then(resp =>{
            ConsultaOnlyPinternacion = resp;
            res.redirect('/medico/especialidad/'+id.id);
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })
});

router.post('/Pinternacion/:id',(req,res) => {
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
            res.redirect('/medico/TraerConsultaPinternacion/'+id.id);
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })
    
});

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<  actualizar papeleta de internacion 
<<<<<<<<>>>>>>>>>>>>>>><<<>>><<>>>><<>>><<
<<<<<<<<<<><<<>><<>>><<>>><<><<<<>>><<>><<<
 */

router.post('/updateInternacion/:id', (req,res) => {
    const { id } = req.params;
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/updatePinternacion/'+id,esto)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {      
          res.redirect('/medico/PapeletaINT/'+datosConsultaData.id+"/"+datosConsultaData.historial+"/"+datosConsultaData.tipoConsulta);
        })
})

/** 
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
*/



module.exports = router;