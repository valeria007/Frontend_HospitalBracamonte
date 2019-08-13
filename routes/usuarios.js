const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const datas = require('./url/export');

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
          rutas vue
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

router.get('/roles/:id', (req,res) => {
  const { id } = req.params
  fetch('http://127.0.0.1:3600/api/oneMOstrar/'+id)
        .then(resp => resp.json())
        .then(resp =>{
          console.log(resp)
          res.status(200).json(resp)
     });
})

/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/
router.get('/usuarios',(req, res) => {
  var esto = {
    method: 'GET',
    headers:{
      'Content-type' : "application/json",
      /*'Authorization': datas.name.token*/
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
      /*res.redirect('/')*/
  })
});
  var msg
  var msg
  router.post('/usuarios', (req,res) => {
      var telefono = req.body.telefono;
      if(telefono == ""){
        msg = "introdusca telefono";
        res.redirect('/usuario');
      }
      else{
        var data = req.body;
        var esto = {
          method: 'POST',
          body: JSON.stringify(data),
          headers:{
            'Content-type' : "application/json",
            //'Authorization': datas.name.token
          }
      };
      fetch('http://localhost:3600/api/personal',esto)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(data => {
         console.log(data, "  <<<<<<<<<<<<<<< esto es post")
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
router.get('/usuario/:id',(req, res) => {
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
router.get('/UsuraioCuenta/:id', (req,res) => {
  var id = req.params
  fetch('http://127.0.0.1:3600/api/mostrarCuenta/'+id.id)
        .then(resp => resp.json())
        .then(resp =>{
          //console.log(resp)
          if (resp == null){
            res.render('usuarioCuenta',{
              id,
              resp
            });
          }else{
            res.render('usuarioCuenta',{
              id,
              resp
            });
          }
     });
});

router.post('/crearCuenta/:id', (req,res) => {
  var id = req.params
  //console.log(id, "    este es el id >>>>>>>>>>>>>>>>>>>>>>>>><" )
  var data = req.body
  //console.log(data, "  esto quiero");
  var enviar = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type' : "application/json"
    }
  }
  fetch('http://127.0.0.1:3600/api/UsuraioCuenta/'+id.id,enviar)
  .then(resp => resp.json())
  .catch(error => console.error('Error',error))
  .then(resp => {
   // console.log(resp)
    res.redirect('/usuarios/UsuraioCuenta/'+id.id)
  })
});


module.exports = router;