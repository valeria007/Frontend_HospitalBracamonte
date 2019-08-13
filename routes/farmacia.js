const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


router.get('/home', (req,res) => {
    res.render('Farmacia/home');
});

router.get('/almacenamiento',(req, res) => {
    res.render('Farmacia/almacenamiento')
});
  
router.get('/grupoAsig_Far',(req, res) => {
    res.render('Farmacia/grupoAsig_Far')
});

router.get('/volver', (req,res) => {
    oneGrupoAsig = null
    res.redirect('/farmacia/almacenamiento'); 
})
  
router.get('/solicitudes',(req, res) => {
    res.render('Farmacia/solicitudes')
});
  
router.get('/ventas',(req, res) => {
    res.render('Farmacia/ventas')
});
  
  router.get('/reg_venta',(req, res) => {
    res.render('Farmacia/reg_venta')
  });
  
  router.get('/reportes_facturacion',(req, res) => {
    res.render('Farmacia/reportes_facturacion')
  });
router.get('/kardexValorizado', (req,res) => {
    res.render('Farmacia/kardexValorizado');
});
router.get('/med_ven', (req,res) => {
    res.render('Farmacia/med_ven');
});
router.get('/reportes_solicitudes', (req,res) => {
    res.render('Farmacia/reportes_solicitudes');
});
router.get('/reportes_ventas', (req,res) => {
    res.render('Farmacia/reportes_ventas');
});
router.get('/Stock_far', (req,res) => {
    res.render('Farmacia/Stock_far');
});





module.exports = router;