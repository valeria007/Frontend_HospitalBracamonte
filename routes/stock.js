const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

//ruta para renderizar stock
router.get('/stock', (req,res) => {
    res.render('Almacen/stock_almacen')
});

module.exports = router;