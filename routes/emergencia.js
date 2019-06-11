const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/oneVista', (req, res) => {
    res.render('emergencias/viewDocEnf');
});


//esta vista muesta la vista principal de emergencia segun doctor o enfermera 
router.get('/homeEmergencia/:id', (req, res) => {
    var DogOenf = req.params.id
    res.render('emergencias/homeEmergencia',{
        DogOenf //esta variable solo es para saver si es doct@r o enfermer@
    });
});

// este serv va servir para traer citas tipo solo emergencia
router.get('/listEmergencia/:id', (req, res) => {
    var DogOenf = req.params.id; // esto es para saver si es doctor o enfermera
    if (dataEmergencia == null){
        res.redirect('/emergencia/oneVista');
    }
    fetch('http://localhost:3000/api/PacienteCita/emergencia') //esta ruta solo trae las citas de tipo emergencia y que el estado sea true
        
        .then(resp => resp.json())
        .then(resp =>{ 
            if(resp == ""){                
                res.render('emergencias/listasEmergencias',{
                    DogOenf,  //esta variable solo es para saver si es doct@r o enfermer@
                    resp,
                    dataEmergencia
                });
            }else{
                res.render('emergencias/listasEmergencias',{
                    DogOenf,  //esta variable solo es para saver si es doct@r o enfermer@
                    resp,
                    dataEmergencia //mustra las citas ya antendidas
                });
            }
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
   
});

// ruta para traer citas medicas ya llenadas su formulario
var dataEmergencia; //esta variable tarea datos las citas que ya fueron llenados su diagnostico
router.get('/dataEmergencia/:id', (req,res) => {
    var DogOenf = req.params.id;
    fetch('http://localhost:3000/api/PacienteCitaFalse/emergencia') //esta ruta solo trae las citas de tipo emergencia y que el estado sea true
        .then(resp => resp.json())
        .then(resp =>{ 
            dataEmergencia = resp;
            res.redirect('/emergencia/listEmergencia/'+DogOenf)
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});


/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>><<<<<<<<<<
        Desde esta parte es para Consulta Emergencia
<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<>>>>>>><<<<<<>><<<<>><<<<>>><<<<<
<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
//esta ruta es para renderizar consulta emergencia
router.get('/RenderConsultaEmergencia', (req,res) => {   
    res.render('emergencias/consultaEmergencia',{
        idHistorial, // em esta variable se encuentran 3 datos id de la cita medica o ficha, historial y tambien si es doctor o enfermera
        dataPaciente,
        consultasEmergencia,
        updateConsultaEmg
    });
});

var dataPaciente;
router.get('/dataPaciente/:id', (req,res) => {
    var id = req.params.id;
    fetch('http://localhost:3000/api/onlyPaciente/'+id)
        .then(resp => resp.json())
        .then(resp =>{ 
            dataPaciente = resp;     
            res.redirect('/emergencia/RenderConsultaEmergencia') ;            
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })
    
});

//servicio para sacar las consulta de emergencia del paciente
var consultasEmergencia;
router.get('/dataConsultaEmesgencia/:historial', (req, res) => {
    var historial = req.params.historial 
    fetch('http://localhost:3000/api/OnlyEmergencia/'+historial)
    .then(resp => resp.json())
    .then(resp =>{  
        consultasEmergencia = resp;    
        res.redirect('/emergencia/dataPaciente/'+historial) ;            
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })   
})

var idHistorial; //esta variable es para madar el id de la ficha y el historial del paciente
var updateConsultaEmg;
router.get('/GetEmergencia/:historial/:id/:docOenf', (req,res) => {
    var idHistorial1 = req.params;
    idHistorial = idHistorial1
    
    fetch('http://localhost:3000/api/citaEmergencia/'+idHistorial1.id)
        .then(resp => resp.json())
        .then(resp =>{
            updateConsultaEmg = resp;      
            res.redirect('/emergencia/dataConsultaEmesgencia/'+idHistorial1.historial) ;            
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })
});

// esta ruta es para cambiar ele estado  de citas medicas
router.get('/estado/:id', (req,res) => {
    const { id } = req.params;
    fetch('http://localhost:3000/api/estado/'+id)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
      res.redirect('/emergencia/GetEmergencia/'+idHistorial.historial+'/'+idHistorial.id+'/'+idHistorial.docOenf);
      //res.status(200).send(data)
    })
});

//este serv es para insrtar datos a la tabla emergencia segun la cita que le coresponda
router.post('/consultaEmergencia/:id', (req,res) => {
    var id = req.params.id;
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/emeregencia/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
      res.redirect('/emergencia/estado/'+id);
    })
});

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        Rutas para modificar consulta emergencia de un paciente
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/ 

router.post('/updateConEmergencia/:id', (req,res) => {
    const { id } = req.params;
    var data = req.body  
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/updateEmergencia/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
      res.redirect('/emergencia/GetEmergencia/'+idHistorial.historial+'/'+idHistorial.id+'/'+idHistorial.docOenf);        
    })  
})

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                    Receta De Emergencia
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/ 

router.get('/RenderReceta', (req,res) => {
    res.render('emergencias/recetaEmergencia',{
        EmgIdHistorial,
        getPaciente,
        Emgcon,
        receta,
        message :message.message,
        updateReceta       
    })
});

var getPaciente // en esta variable estan los datos del paciente
router.get('/getPaciente/:historial', (req,res) => {
    var historial = req.params.historial
    fetch('http://localhost:3000/api/onlyPaciente/'+historial)
        .then(resp => resp.json())
        .then(resp =>{ 
            getPaciente = resp;     
            res.redirect('/emergencia/RenderReceta') ;            
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })
});

var Emgcon
router.get('/EmergenciaConsulta/:id', (req,res) => {
    const { id } = req.params
    fetch('http://localhost:3000/api/emergenciaData/'+id)
    .then(res => res.json())
    .then(data => { 
        Emgcon = data
        console.log(data);
        res.redirect('/emergencia/getPaciente/'+EmgIdHistorial.historial);
        //res.status(200).send(data)
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
}); 

//serv para mostrar receta segun el historial del paciente
var receta;
router.get('/Receta/:historial' ,(req,res) => {
    var historial = req.params.historial;
    fetch('http://localhost:3000/api/recitasOfEMG/'+historial)
    .then(res => res.json())
    .then(data => { 
        receta = data;
      res.redirect('/emergencia/EmergenciaConsulta/'+EmgIdHistorial.id);
      //res.status(200).send(data)
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});

var EmgIdHistorial, updateReceta; // En esta variable va el id y el historial que esta en la tabla consulta emergencia
router.get('/emergenicaData/:id/:historial/:DogOenf', (req,res) => {
    var idHistorial = req.params;
    EmgIdHistorial = idHistorial;
    fetch('http://localhost:3000/api/RecetaEmergencia/'+idHistorial.id)
    .then(res => res.json())
    .then(data => { 
        updateReceta = data;
        if (clickPost == "1"){
            res.redirect('/emergencia/Receta/'+idHistorial.historial);
            clickPost = "";
           
        }else{
            res.redirect('/emergencia/Receta/'+idHistorial.historial);
            message = "";
        }
      
      //res.status(200).send(data)
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
})

var message
var clickPost;
router.post('/receta/:id', (req,res) => {
    const { id } = req.params
    var data = req.body  
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/reg_RecetaEmrg/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        if (data.success == false){
            message = data;
            res.redirect('/emergencia/emergenicaData/'+id+'/'+EmgIdHistorial.historial+'/'+EmgIdHistorial.DogOenf);
        }else{
            res.redirect('/emergencia/emergenicaData/'+id+'/'+EmgIdHistorial.historial+'/'+EmgIdHistorial.DogOenf);
            message = "";
        }
        clickPost = "1";
               
    })  
})


/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            Actualizar receta 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

//para mostrar receta
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
      res.redirect('/emergencia/emergenicaData/'+EmgIdHistorial.id+'/'+EmgIdHistorial.historial+'/'+EmgIdHistorial.DogOenf);        
    }) 
})

module.exports = router;