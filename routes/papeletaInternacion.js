const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

//ya no me sirve esto

router.get('/Pinternacion', (req,res) => {
    res.render('papeletasInternacion');
});

module.exports = router;