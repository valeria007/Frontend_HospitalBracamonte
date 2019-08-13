const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const datas = require('./url/export');

router.get('/',(req, res) => {
  res.render('index', { msg1, msg2, msg3 })
});

router.get('/index2', (req,res) => {
  res.render('index2');
});

router.get('/home',(req, res) => {
  res.render('home')
});

var msg1,msg2,msg3 ;
router.post('/login', (req,res)  => {
  console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;  
 
  if(username =="" ){
    msg3 = null
    msg1='Introdusca por favor la cuenta.';
    res.redirect('/')
    
  }else if( password == "" ){
    msg3 = null
    msg2 = 'Introdusca password.'
    res.redirect('/')   

  }else {
    var data = req.body;
    var enviar = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type' : "application/json"
    }
  }
  fetch('http://localhost:3600/api/login',enviar)
  .then(resp => resp.json())
  .catch(error => console.error('Error',error))
  .then(resp => {
    
    if(resp.user == false){
      msg1=null;
      msg2=null;
      msg3 =" Usted no esta registrado "
      res.redirect('/')   
    }else if(resp.success == false){
      msg1=null;
      msg2=null;
      msg3 = " Contraceña Incorrecta "
      res.redirect('/')   
    }else{
      msg1=null;
      msg2=null;
      msg3 = null;
      datas.name.token = resp.token
      console.log( datas.name.token)

      res.redirect('/home')

    }
    
  })
  }
})

router.get('/forrm',(req, res) => {
  res.render('forrm')
});
router.get('/servicios',(req, res) => {
  res.render('servicios')
});
router.get('/usuarios',(req, res) => {
  res.render('usuarios')
});


router.get('/citas2',(req, res) => {
  res.render('citas2')
});
router.get('/citas_fichas2',(req, res) => {
  res.render('citas_fichas2')
});

 //vista de doctor
 
// Historiales Clinicos
router.get('/reportes_pacientes',(req, res) => {
  res.render('reportes_pacientes')
});

router.get('/vistaPrimPaciente',(req, res) => {
  res.render('vistaPrimPaciente')
});



// se movio esta ruta  a emergencia

//para las vistas de hospitaliacion
router.get('/homeHospitalizacion', (req,res) => {
  res.render('homeHospitalizacion')
});


//hospitalizacion 


router.get('/vistaHospitalizacion',(req, res) => {
  res.render('vistaHospitalizacion')
});


router.get('/Papeleta_Inter',(req, res) => {
  res.render('Papeleta_Inter')
});

// Internacion
router.get('/salas',(req, res) => {
  res.render('salas')
});

// Internacion salas 


//Se movio a routas salas

router.get('/paciente_Inter',(req, res) => {
  res.render('paciente_Inter')
});

// Farmacia
router.get('/almacen',(req, res) => {
  res.render('almacen')
});


//medicamento se movio a medicamento.js


// esta ruta se mando a almacen.js

// esta se movio a proveedores

// se movio a pedidos.js


router.get('/inventariosFar',(req, res) => {
  res.render('inventariosFar')
});

router.get('/solicitudes',(req, res) => {
  res.render('solicitudes')
});


//ruta temporal 
router.get('/consultaMed', (req, res) => {
  res.render('ConsultaMed');
});

//emergencia render
router.get('/emergencia', (req,res) => {
  res.render('emergencias/homeEmergencia')
});

//consulta externa

router.get('/datos_responsable', (req,res) => {
  res.render('datos_responsable')
});
router.get('/VerHistorial', (req,res) => {
  res.render('VerHistorial')
});
router.get('/ordenLaboratorio', (req,res) => {
  res.render('ordenLaboratorio')
});

router.get('/table_prueba', (req,res) => {
  res.render('hospitalizaciones/z_prueba_table')
})

module.exports = router;