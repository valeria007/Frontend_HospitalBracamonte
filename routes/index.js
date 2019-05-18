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

router.get('/expediente',(req, res) => {
  res.render('expediente')
});

// Internacion
router.get('/salas',(req, res) => {
  res.render('salas')
});

router.get('/camas',(req, res) => {
  res.render('camas')
});

router.get('/Pac_Inter',(req, res) => {
  res.render('Pac_Inter')
});




module.exports = router;