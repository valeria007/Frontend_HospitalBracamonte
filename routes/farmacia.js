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
  
router.get('/recetas_farm',(req, res) => {
    res.render('Farmacia/recetas_farm')
});
router.get('/reg_receta',(req, res) => {
    res.render('Farmacia/reg_receta')
  });
  router.get('/volver2', (req,res) => {
    oneGrupoAsig = null
    res.redirect('/farmacia/recetas_farm'); 
})
router.get('/ventas',(req, res) => {
    res.render('Farmacia/ventas')
});
  
  router.get('/reg_venta',(req, res) => {
    res.render('Farmacia/reg_venta')
  });
  router.get('/volver1', (req,res) => {
    oneGrupoAsig = null
    res.redirect('/farmacia/ventas'); 
})
  
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