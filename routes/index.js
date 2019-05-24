const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/',(req, res) => {
  res.render('index')
});

router.get('/home',(req, res) => {
  res.render('home')
});

router.get('/usuarios',(req, res) => {
  res.render('usuarios')
});

router.get('/cuadernos',(req, res) => {
  res.render('cuadernos')
});
 //vista de doctor
 router.get('/HomeVistDoctor',(req, res) => {
  res.render('HomeVistDoctor')
})
 
// Historiales Clinicos
router.get('/expediente',(req, res) => {
  res.render('expediente')
});

router.get('/reg_paciente',(req, res) => {
  res.render('reg_paciente')
});

router.get('/vistaPrimPaciente',(req, res) => {
  res.render('vistaPrimPaciente')
});

router.get('/citas_fichas',(req, res) => {
  res.render('citas_fichas')
});

router.get('/citas',(req, res) => {
  res.render('citas')
});

router.get('/ListaPacienteDoc',(req, res) => {
  res.render('ListaPacienteDoc')
});

router.get('/consultaMedica',(req, res) => {
  res.render('consultaMedica')
});

//hospitalizacion 
router.get('/hospitalizacion',(req, res) => {
  res.render('hospitalizacion')
});

// Internacion
router.get('/salas',(req, res) => {
  res.render('salas')
});

router.get('/camas',(req, res) => {
  res.render('camas')
});

router.get('/paciente_Inter',(req, res) => {
  res.render('paciente_Inter')
});

// Farmacia
router.get('/almacen',(req, res) => {
  res.render('almacen')
});

router.get('/medicamentos',(req, res) => {
  res.render('medicamentos')
});

router.get('/grupoAsig',(req, res) => {
  res.render('grupoAsig')
});

router.get('/proveedores',(req, res) => {
  res.render('proveedores')
});

router.get('/distribucion',(req, res) => {
  res.render('distribucion')
});

router.get('/stock',(req, res) => {
  res.render('stock')
});

router.get('/pedidos',(req, res) => {
  res.render('pedidos')
});

router.get('/inventariosFar',(req, res) => {
  res.render('inventariosFar')
});

router.get('/solicitudes',(req, res) => {
  res.render('solicitudes')
});

module.exports = router;