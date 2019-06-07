const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');



router.get('/reg_paciente',(req, res) => {
    res.render('reg_paciente')
  });
  
router.post('/postPaciente', (req,res) => {
  var aleatorio = Math.floor(Math.random()*(9000-1000))+1000
  var paciente = {
    numeroHistorial : aleatorio,
    nombre: req.body.nombre,
    apellidop: req.body.apellidop,
    apellidom: req.body.apellidom,
    ci: req.body.ci,
    fechanacimiento: req.body.fechanacimiento,
    edad: req.body.edad,
    sexo: req.body.sexo,
    estadocivil: req.body.estadocivil,
    direccion: req.body.direccion,
    zona: req.body.zona,
    telef: req.body.telef,
    ocupacion: req.body.ocupacion,
    idiomas: req.body.idiomas,
    lugranacimiento: req.body.lugranacimiento,
    departameto: req.body.departameto,
    provincia: req.body.provincia,
    municipio: req.body.municipio,
    npadre: req.body.npadre,
    apspadre: req.body.apspadre,
    nmadre: req.body.nmadre,
    apsmadre: req.body.apsmadre,
    nomrespon: req.body.nomrespon,
    aperespon: req.body.aperespon,
    telefres: req.body.telefres,
    direcres: req.body.direcres    
  };
  //console.log(paciente);
  var esto = {
    method: 'POST',
    body: JSON.stringify(paciente),
    headers:{
      'Content-type' : "application/json"
    }
};
fetch('http://localhost:3000/api/pacientes',esto)
.then(res => res.json())
.catch(error => console.error('Error:', error))
.then(data => {
  
  res.redirect('/paciente/reg_paciente');
})
});

//cita medica o ficha que se le va a dar al paciente
router.post('/cita_medica/:id', (req,res) => {
  var id = req.params;
  var historial = req.body.codigo_p;
  var datos = req.body;
  var esto = {
    method: 'POST',
    body: JSON.stringify(datos),
    headers:{
      'Content-type' : "application/json"
    }
};
  fetch('http://localhost:3000/api/reg_cita/'+id.id,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => {
    res.redirect('/paciente/EnviarCita/'+id.id+"/"+historial);
})
});

router.get('/EnviarCita/:id/:historial', (req,res) => {
  var id = req.params; 
  console.log(id)
  fetch('http://localhost:3000/api/OnlyCita/'+id.id)
  .then(resp => resp.json())
  .then(resp =>{
    res.render('citas_fichas',{
      historial: id.historial,
      id
    });
  });
 });

 
 router.get('/citas',(req, res) => {
  fetch('http://localhost:3000/api/pacientes/')
  .then(resp => resp.json())
  .then(resp =>{
    res.render('citas',{
      resp
    });    
  })
  .catch(error => {
    console.error('Error:', error)
    res.send("no hay coneccion con el servidor");
}) 
});


 
module.exports = router;