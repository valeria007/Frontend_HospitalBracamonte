const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/oneVista', (req, res) => {
    res.render('emergencias/viewDocEnf');
});

router.get('')

module.exports = router;