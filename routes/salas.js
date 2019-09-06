const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var dataSala
router.get('/salas',(req, res) => {
  fetch('http://localhost:4600/api/especialidad')   
  .then(resp => resp.json())
  .then(resp =>{
     dataSala = resp;
      res.redirect('/salas/renderSalas');
  })
.catch(error => {
  console.error('Error:', error)
  res.send("no hay coneccion con el servidor");
  })
  OnlySala = null;
});

router.get('/renderSalas', (req,res) => {
  if(dataSala == null){
    res.redirect('/salas/salas')
  } else {
    fetch('http://localhost:3000/api/sala')   
  .then(resp => resp.json())
  .then(resp =>{
    res.render('salas',{
      dataSala,
      resp,
      OnlySala
    });
  })
.catch(error => {
  console.error('Error:', error)
  res.send("no hay coneccion con el servidor");
  })
  }  
});

router.post('/salas', (req,res) => {
  var data = req.body;
  var esto = {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-type' : "application/json"
    }
};
  fetch('http://localhost:3000/api/sala',esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
      
    console.log(data)
    res.redirect('/salas/salas'); 
      
  })
});

/// Actualizar Salas  pero en la misma vista 
var OnlySala
router.get('/updateSalas/:id', (req,res) => {
  var id = req.params;
  fetch('http://localhost:3000/api/salaOne/'+id.id)   
  .then(resp => resp.json())
  .then(resp =>{
     OnlySala = resp;
      res.redirect('/salas/renderSalas');
  })
.catch(error => {
  console.error('Error:', error)
  res.send("no hay coneccion con el servidor");
  })
});

router.post('/updateSalas/:id',(req,res) => {
  var id = req.params.id;
  var data = req.body;
  var esto = {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-type' : "application/json"
    }
};
  fetch('http://localhost:3000/api/UpdateSalas/'+id,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
          console.log(data)
          res.redirect('/salas/salas'); 
  })
  OnlySala = null;
});

/*camas 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/
var datacama
router.get('/dataCam/:id', (req,res) => {
  var id = req.params.id;
  datacama = id;
  if(salas == null){
    res.redirect('/salas/renderCamas/'+id);
  }else{
  fetch('http://localhost:3000/api/camaSala/'+id)   
  .then(resp => resp.json())
  .then(resp =>{
     res.render('camas',{
      resp,
      salas,
      onlyCamas /// datos recividos del serv renderCamas
     });
  })
  .catch(error => {
    console.error('Error:', error)
    res.send("no hay coneccion con el servidor");
    })
  }
});

var salas;
//Camas de cada sala 
router.get('/renderCamas/:id', (req,res) => {
  var id = req.params.id;
  fetch('http://localhost:3000/api/salaOne/'+id)   
  .then(resp => resp.json())
  .then(resp =>{
    salas = resp;
     res.redirect('/salas/dataCam/'+id);
  })
.catch(error => {
  console.error('Error:', error)
  res.send("no hay coneccion con el servidor");
  })
});

//serv para insertar cama en sala
router.post('/camas/:id', (req,res) => {
  var id = req.params.id;
  var data = req.body
  var esto = {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-type' : "application/json"
    }
};
  fetch('http://localhost:3000/api/camaSala/'+id,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
    res.redirect('/salas/dataCam/'+id);     
  })
});
var onlyCamas;
router.get('/updateCama/:id' , (req,res) => {
  var id = req.params.id;
  fetch('http://localhost:3000/api/OnlyCama/'+id)   
  .then(resp => resp.json())
  .then(resp =>{
    onlyCamas=resp
    res.render('/salas/updateCama/',{
      resp
    });
  })
.catch(error => {
  console.error('Error:', error)
  res.send("no hay coneccion con el servidor");
  })
});

//serv para modificar una cama 
router.post('/updateCama/:id', (req,res) => {
  var id = req.params
  console.log(id, "este es el id")
  var data = req.body;
  var esto = {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-type' : "application/json"
    }
};
  fetch('http://localhost:3000/api/OnlyCama/'+id.id,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
    res.redirect('/salas/dataCam/'+datacama);     
  })
});

module.exports = router;