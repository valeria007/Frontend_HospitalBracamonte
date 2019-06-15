const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

//ruta para renderizar distribucion
router.get('/distribucion',(req,res) => {
    res.render('Almacen/distribucion');
});

module.exports = router;