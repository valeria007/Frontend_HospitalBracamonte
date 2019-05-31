const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


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

router.get('/renderConsulta', (req,res)=> {
    if (idCIta == null){
        res.render('consultaMedica',{
            dataPaciente,
            idCIta
        });  
    } else{
        fetch('http://localhost:3000/api/OneCita/'+idCIta)
          .then(resp => resp.json())
          .then(resp =>{
            //console.log(resp   ,"   <<<<<<<<<<<<<<<<<<<<<<<<<<<<")
            if (dataPaciente == null){
                res.send("no hay datos en Datapaciente en routes/medico serv renderConsulta")
            }else{
                res.render('consultaMedica',{
                    dataPaciente,
                    idCIta,
                    resp
                });   
            }            
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("Ocurrio algo con el servidor");
        }) 
    }
    
});

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

router.get('/recetas/:id', (req,res) => {
    var id = req.params
    fetch('http://localhost:3000/api/OnlyReceta/'+id.id)        
        .then(resp => resp.json())
        .then(resp =>{
            res.render('recetas',{
                dataPaciente,
                id
            });
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});
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

module.exports = router;