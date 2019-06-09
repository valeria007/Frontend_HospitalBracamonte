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
    var DogOenf = req.params.id;
    fetch('http://localhost:3000/api/PacienteCita/emergencia')
        
        .then(resp => resp.json())
        .then(resp =>{ 
            if(resp == ""){                
                res.render('emergencias/listasEmergencias',{
                    DogOenf,  //esta variable solo es para saver si es doct@r o enfermer@
                    resp
                });
            }else{
                res.render('emergencias/listasEmergencias',{
                    DogOenf,  //esta variable solo es para saver si es doct@r o enfermer@
                    resp
                });
            }
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
        dataPaciente
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

var idHistorial; //esta variable es para madar el id de la ficha y el historial del paciente
router.get('/GetEmergencia/:historial/:id/:docOenf', (req,res) => {
    var idHistorial1 = req.params;
    idHistorial = idHistorial1
    
    fetch('http://localhost:3000/api/citaEmergencia/'+idHistorial1.id)
        .then(resp => resp.json())
        .then(resp =>{      
            res.redirect('/emergencia/dataPaciente/'+idHistorial1.historial) ;            
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
      res.redirect('/emergencia/RenderConsultaEmergencia');
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
})


module.exports = router;