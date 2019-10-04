const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

//servicio para traer datos de citas medicas o fichas pero que solo muestre los de emergencia
router.get('/ListaHospitalizacionDoc/:id',(req, res) => {
    var id = req.params;
    fetch('http://localhost:3000/api/citas/'+id.id)        
    .then(resp => resp.json())
    .then(resp =>{
        if(resp == ""){                
            res.render('hospitalizaciones/listasHospitalizacion',{resp});
        }else{
            res.render('hospitalizaciones/listasHospitalizacion',{resp});
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
        res.redirect('/hospitalizacion/renderConsulta');       
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
            res.redirect('/hospitalizacion/consultaData');           
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
        res.render('hospitalizaciones/consultaHospitalizacion',{
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
                res.render('hospitalizaciones/consultaHospitalizacion',{
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

//serv pricipal que muestra los datos de emergencia
/*router.get('/render', (req,res) => {
    console.log(data)
    res.render('ListaConsultaMedicaDoc', {
        data
    })
});*/
//vistas
router.get('/alergiasvis', (req,res) => {
    res.render('hospitalizaciones/alergia')
  });

router.get('/datos_responsablevis', (req,res) => {
    res.render('hospitalizaciones/datos_responsable')
  });
  router.get('/antecedentesvis', (req,res) => {
    res.render('hospitalizaciones/antecedentes')
  });
  router.get('/epicrisisvis', (req,res) => {
    res.render('hospitalizaciones/epicrisis')
  });
  router.get('/VerHistorialvis',(req,res) =>{
    res.render('hospitalizaciones/VerHistorial')
  });
  
  router.get('/OrdenInterCirugiavis', (req,res) => {
    res.render('hospitalizaciones/OrdenInterCirugia')
  });
//defuncion
router.get('/defuncionGeneral', (req,res) => {
    res.render('hospitalizaciones/defuncionGeneral')
  });
  
  router.get('/reporteP', (req,res) => {
    res.render('hospitalizaciones/reporteP')
  });
  


module.exports = router;