const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var url = 'http://localhost:3500/api';

router.get('/volver',(req,res) => {
  one_proveedor = null;
  res.redirect('/proveedores/proveedores');  
})

router.get('/proveedores',(req, res) => {
  fetch(url+'/proveedor')   
      .then(resp => resp.json())
      .then(resp =>{
          res.render('Almacen/proveedores',{
            resp,
            one_proveedor
          })
    })
    .catch(error => {
      console.error('Error:', error)
      res.send("no hay coneccion con el servidor");
    })
  });

router.post('/proveedores', (req,res) =>{
  var data = req.body;
  var esto = {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-type' : "application/json"
    }
  };
  fetch(url+'/proveedor',esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
      console.log(data)
      res.redirect('/proveedores/proveedores');     
        
    })
});

var one_proveedor;
router.get('/OnlyProveedor/:id', (req,res) => {
  var id = req.params
  fetch(url+'/OnlyProveedor/'+id.id)   
      .then(resp => resp.json())
      .then(resp =>{
        one_proveedor = resp
        res.redirect('/proveedores/proveedores');
    })
    .catch(error => {
      console.error('Error:', error)
      res.send("no hay coneccion con el servidor");
    })
});

router.post('/UpdateProveedor/:id', (req, res) => {
  var id = req.params
  var data = req.body
  var esto = {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-type' : "application/json"
    }
  };
  fetch(url+'/updateProveedor/'+id.id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
      res.redirect('/proveedores/OnlyProveedor/'+id.id); 
    
    })
});

module.exports = router;