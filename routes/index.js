const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/',(req, res) => {
  res.render('index')
});

router.get('/home',(req, res) => {
  res.render('home')
});

router.post('/login', (req,res)  => {
  var data = req.body;
  var enviar = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type' : "application/json"
    }
  }
  fetch('http://127.0.0.1:3500/usuarios/login',enviar)
  .then(resp => resp.json())
  .catch(error => console.error('Error',error))
  .then(resp => {
    if(resp.success == false){
      res.send('usted no esta registrado')
    }else{
      res.redirect('/home')
    }
    
  })
})

router.get('/cuadernos',(req, res) => {
  res.render('cuadernos')
});
 //vista de doctor

 router.get('/HomeVistDoctor',(req,res) =>{
   res.render('HomeVistDoctor');
 });

 
// Historiales Clinicos
router.get('/expediente',(req, res) => {
  res.render('expediente')
});

router.get('/vistaPrimPaciente',(req, res) => {
  res.render('vistaPrimPaciente')
});

// se movio esta ruta  a emergencia


//hospitalizacion 
router.get('/hospitalizacion',(req, res) => {
  res.render('hospitalizaciones/homeHospitalizacion')
  res.render('hospitalizaciones/listasHospitalizacion')
});
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

//medicamento se movio a medicamento.js


// esta ruta se mando a almacen.js

// esta se movio a proveedores


router.get('/distribucion',(req, res) => {
  res.render('distribucion')
});

router.get('/stock_almacen',(req, res) => {
  res.render('stock_almacen')
});
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

module.exports = router;