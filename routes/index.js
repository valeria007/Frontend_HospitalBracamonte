const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/',(req, res) => {
  res.render('index', { msg1, msg2, msg3 })
});

router.get('/index2', (req,res) => {
  res.render('index2');
});

router.get('/home',(req, res) => {
  res.render('home')
});

var msg1,msg2,msg3;
router.post('/login', (req,res)  => {
  
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
  fetch('http://localhost:3600/api/signin',enviar)
  .then(resp => resp.json())
  .catch(error => console.error('Error',error))
  .then(resp => {
    console.log(resp)
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
      res.redirect('/home')

    }
    
  })
  }
})
router.get('/servicios',(req, res) => {
  res.render('servicios')
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

router.get('/almacenamiento',(req, res) => {
  res.render('almacenamiento')
});

router.get('/grupoAsig_Far',(req, res) => {
  res.render('grupoAsig_Far')
});

router.get('/medicamentos_Far',(req, res) => {
  res.render('medicamentos_Far')
});

router.get('/solicitudes',(req, res) => {
  res.render('solicitudes')
});

router.get('/ventas',(req, res) => {
  res.render('ventas')
});

router.get('/recetas_farm',(req, res) => {
  res.render('recetas_farm')
});

router.get('/reportes_far',(req, res) => {
  res.render('reportes_far')
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
router.get('/alergias', (req,res) => {
  res.render('alergias')
});

router.get('/datos_responsable', (req,res) => {
  res.render('datos_responsable')
});
router.get('/antecedentes', (req,res) => {
  res.render('antecedentes')
});
router.get('/examenFisico', (req,res) => {
  res.render('examenFisico')
});

module.exports = router;