const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/grupoAsig',(req, res) => {
    fetch('http://localhost:3500/api/asignacion')   
        .then(resp => resp.json())
        .then(resp =>{
            res.render('grupoAsig',{resp});
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});

router.post('/grupoAsig', (req, res) => {
    var data = req.body
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3500/api/asignacion',esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        res.send(data);     
      res.redirect('/almacen/grupoAsig');
    })
});

router.get('/GrupoAsigONLY/:id', (req,res) => {
    var id = req.params
    fetch('http://localhost:3500/api/GrupoAsigONLY/'+id.id)   
        .then(resp => resp.json())
        .then(resp =>{
            res.render('grupoAsigUPDATE',{resp});
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});

router.post('/updateGPA/:id', (req,res) =>{
    var data = req.body
    var id = req.params
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3500/api/GrupoAsigUPDATE/'+id.id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {      
      res.redirect('/almacen/grupoAsig');
    })

});

module.exports = router;