const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var dataSala
router.get('/salas',(req, res) => {
  fetch('http://localhost:4600/api/especialidad')   
  .then(resp => resp.json())
  .then(resp =>{
     dataSala = resp;
      res.redirect('/salas/renderSalas', );
  })
.catch(error => {
  console.error('Error:', error)
  res.render('404error',{
    msg:"No hay conección con el sevidor de Salas"
  });
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
    console.log(dataSala, "esto es lo que quiero ver")
    res.render('salas',{
      dataSala,
      resp,
      OnlySala,
      m1,
      m2
    });
  })
.catch(error => {
  console.error('Error:', error)
  res.render('404error',{
    msg:"No hay conección con el sevidor de Salas"
  });
  })
  }  
});
var m1,m2
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
    if(data.success == false){
      console.log(data)
      m2=null
      m1= data.message
      res.redirect('/salas/salas'); 
      
    }else{
      m1=null
      m2= data.message
      res.redirect('/salas/salas'); 
      
    }
    
      
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
    if(data.success == false){
      m2=null
      m1= "Error al actualizar"
      res.redirect('/salas/salas');
    }else{
      m1=null
      m2= data.message
      res.redirect('/salas/salas'); 
    }
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
      onlyCamas, /// datos recividos del serv renderCamas
      m1,
      m2
     });
  })
  .catch(error => {
    console.error('Error:', error)
    res.send("no hay coneccion con el servidor");
    })
  }
});

var salas, ms1, ms2;
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
    if(data.success == false){
      console.log(m1)
      m2=null
      m1= data.message
      res.redirect('/salas/dataCam/'+id);  
    }else{
      console.log(m2)
      m1=null
      m2= data.message
      res.redirect('/salas/dataCam/'+id);  
    }
       
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
/**////////////////////////////eliminar cams ////////////////*/

router.get('/delcama/:id', (req, res) => {
  const { id }= req.params;
  fetch('http://localhost:3000/api/DElcama/'+id)
  .then(resp => resp.json())
  .catch(error => console.error('Error:', error))
  .then(resp =>{
      console.log(resp)
      res.redirect('/salas/dataCam/'+datacama);
  });
  
});
////////////////limpiar actualizaciones//////////////////////////////////
router.get('/limpiar', (req,res) => {
  res.redirect('/salas/renderSalas');
})
router.get('/volverSalas', (req,res) => {
  res.redirect('/salas/renderSalas')
})

module.exports = router;