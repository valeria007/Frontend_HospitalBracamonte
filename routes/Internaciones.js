const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

//para renderizar una vista de botones donde esta doctor y enfermera temporalmente
router.get('/viewTemporal', (req,res) => {
    res.render('hospitalizaciones/viewFirst');
});

//serv para mostrar home hospitalizacion o internacion
router.get('/hospitalizacion',(req, res) => {
    res.render('hospitalizaciones/homeHospitalizacion')
    
});

//ser para renderizar lista hospitalizacion mostrando 
//la lista de ordenes de internacion que se mandan desde consulta o emergencia
router.get('/ListInternacion', (req,res) => {
    fetch('http://localhost:3000/api/PinterTrue') // esta ruta solo trae los datos de tipo true
    .then(resp => resp.json())
    .then(resp =>{
        res.render('hospitalizaciones/listasHospitalizacion',{
            resp,
            listFalse// lleva la lista de tipo false
        })
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
});
// esta ruta es para traer la lista de internacion de tipo false
var listFalse;
router.get('/ListaInternacionF', (req,res) => {
    fetch('http://localhost:3000/api/PinterFalse') // esta ruta solo trae los datos de tipo true
    .then(resp => resp.json())
    .then(resp =>{
        listFalse = resp;
        res.redirect('/internaciones/ListInternacion');
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
});

module.exports = router;