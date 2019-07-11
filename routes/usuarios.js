const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const datas = require('./url/export');

router.get('/usuarios',(req, res) => {
  var esto = {
    method: 'GET',
    headers:{
      'Content-type' : "application/json",
      'Authorization': datas.name.token
    }
  }
    fetch('http://localhost:3600/api/personal/',esto)
        .then(resp => resp.json())
        .then(resp =>{
          ///console.log(resp, "esto es el mensaje")
        res.render('usuarios',{resp, msg });
     })
     .catch(error => {       
      console.error('Error:', error)
      res.redirect('/')
  })
});
  var msg
router.post('/usuarios', (req,res) => {
    var telefono = req.body.telefono;
    if(telefono == ""){
      msg = "introdusca telefono";
      res.redirect('/usuarios/usuarios');
    }
    else{
      var data = req.body;
      var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json",
          'Authorization': datas.name.token
        }
    };
    fetch('http://localhost:3600/api/personal/',esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {
       
        if (data.success == false){
            res.send(data)
        }else{
             msg = ""
            res.redirect('/usuarios/usuarios');

        }
        
    })
    }
      
  });
router.get('/usuarios/:id',(req, res) => {
  var id = req.params;
  fetch('http://127.0.0.1:3600/personal/OnlyPersonal/'+id.id)
      .then(resp => resp.json())
      .then(resp =>{
      res.render('usuarioUpdate',{
        resp
      });
   });
});

//servicio para actualizar personal
router.post('/updatePersonal/:id',(req,res) => {
  var id = req.params;
  var data = req.body;
  var enviar = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type' : "application/json"
    }
  }
  fetch('http://localhost:3600/api/updatePersonal/'+id.id,enviar)
  .then(resp => resp.json())
  .catch(error => console.error('Error',error))
  .then(resp => {
    res.redirect('/usuarios/usuarios')
  })
});


router.get('/UsuraioCuenta', (req,res) => {
  
  fetch('http://localhost:3600/api/list')
        .then(resp => resp.json())
        .then(resp =>{
          //console.log(resp)
          if (resp == null){
            res.render('usuarioCuenta',{
              
              resp
            });
          }else{
            res.render('usuarioCuenta',{
            
              resp
            });
          }
     });
});

router.post('/crearCuenta', (req,res) => {
  
  var data = req.body;
  var esto = {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-type' : "application/json"
          
    }
    };
    fetch('http://localhost:3600/api/signup/',esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {
       
        if (data.success == false){
            res.send(data)
        }else{
            res.redirect('/usuarios/UsuraioCuenta');

        }
        
    })

      
});




module.exports = router;