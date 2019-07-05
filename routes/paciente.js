const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var url = require('./url/export');

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
  res.redirect('/paciente/citaPAciente/'+data.pacienteData.id+"/"+data.pacienteData.numeroHistorial);
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
    res.redirect('/paciente/citas');
})
});




/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            ruta para dar citas
<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><
<<<>><<<>><<<><>>><<<><<<>><<>><<>>>>><<<<
*/

router.get('/clean', (req,res) => {
  citaUpdate = null;
  res.redirect('/paciente/EnviarCita/'+idH.id + "/" + idH.historial);
})

router.get('/EnviarCita/:id/:historial', (req,res) => {
  var id = req.params; 
  fetch('http://localhost:3000/api/OnlyCita/'+id.id)
  .then(resp => resp.json())
  .then(resp =>{
    res.render('citas_fichas',{
      historial: id.historial,
      id,
      pacienteCita, // esto contiene las citas de un paciente
      citaUpdate
    });
  });
 });


 //ruta para sacar todas las citas de un paciente
 let pacienteCita, idH;
 router.get('/citaPAciente/:id/:historial',(req,res) => {
  var id = req.params;
  idH = id;
  fetch('http://localhost:3000/api/citasPaciente/'+id.id)
  .then(resp => resp.json())
  .then(resp =>{
    pacienteCita = resp;
    console.log(pacienteCita, "  esto es lo que quiero")
    res.redirect('/paciente/EnviarCita/'+id.id + "/" + id.historial);
  });
 })

 //RUTA PARA PODER MODIFICAR UNA CITA 
 let citaUpdate;
 router.get('/onliCita/:id', (req,res) => {
   const { id } = req.params;
   fetch('http://localhost:3000/api/OneCita/'+id)
  .then(resp => resp.json())
  .then(resp =>{
    citaUpdate = resp;
    res.redirect('/paciente/citaPAciente/'+citaUpdate[0].id_Paciente + "/" + citaUpdate[0].codigo_p);
  });
 })
 
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

router.post('/updateCita/:id',(req,res) => {
  const { id } = req.params;
  var data = req.body;
  var esto = {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-type' : "application/json"
    }
  };
    fetch('http://localhost:3000/api/updateCita/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {
      res.redirect('/paciente/onliCita/'+id);
  })

})


/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                      Vue rutas para cita medica
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/


router.get('/vueListTurnos/:dia/:turno', (req,res) => {
  var data = req.params
  fetch(url.name.cuadernos+'/api/ListAll/'+data.dia+"/"+data.turno)
  .then(resp => resp.json())
  .then(resp =>{
   res.status(200).json({
     msg: "Lista de turnos segun dia que incluye doctores",
     resp
   });
  });
})

//ruta para poder sacar de los doctores sus turnos
router.get('/doctorTurno/:id', (req,res) => {
  const { id } = req.params;
  fetch(url.name.cuadernos+'/api/doctTurnos/'+id)
  .then(resp => resp.json())
  .then(resp =>{
   res.status(200).json(resp);
  });
})

//ruta para mostrar especialidades
router.get('/vueEspecialidades', (req,res) => {
  fetch(url.name.cuadernos+'/api/especialidad')
  .then(resp => resp.json())
  .then(resp =>{
   res.status(200).json(resp);
  });
})

//ruta para mostrar docotres
router.get('/vueDoctores/:esp/:dia/:turno', (req,res) => {
  var data = req.params
  fetch(url.name.cuadernos+'/api/espTurno/'+data.esp+"/"+data.dia+"/"+data.turno)
  .then(resp => resp.json())
  .then(resp =>{
   res.status(200).json(resp);
  });
})


module.exports = router;