const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/hospitalizacion',(req, res) => {
    res.render('hospitalizaciones/homeHospitalizacion')
    
});

router.get('/ListInternacion', (req,res) => {
    res.render('hospitalizaciones/listasHospitalizacion')
});

module.exports = router;