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
router.get('/quitar', (req,res) => {
  sms2 = null;
  onlyUSer = null;
  res.redirect('/usuarios/usuarios');
})
router.get('/quitar2', (req,res) => {
  sms2 = null;
  res.redirect('/usuarios/usuarios');
})
router.get('/quitar3', (req,res) => {
  sms2 = null;
  res.redirect('/usuarios/usuarios');
})
router.get('/quitar4/:id', (req,res) => {
  const { id } = req.params
  mg1 = null;
  mg2 = null;
  res.redirect('/usuarios/UsuraioCuenta/'+id);
})


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
        res.render('usuarios',{resp, msg, msm1,sms2,onlyUSer});
     })
     .catch(error => {       
      console.error('Error:', error)
      res.render('404error',{
        msg:"No hay conección con el sevidor de Registros"
      })
      
  })
});
  var msg
  var msm1,sms2
  router.post('/usuarios', (req,res) => {
      var telefono = req.body.telefono;
      if(telefono == ""){
        msg = "introdusca telefono";
        res.redirect('/');
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
              msm1=  data.message
              res.redirect('/usuarios/usuarios') 
          }else{
              sms2=data.message
               
              res.redirect('/usuarios/usuarios');
  
          }
          
      })
      }
        
    });
  var onlyUSer;
  router.get('/usuarios/:id',(req, res) => {
    var id = req.params;
    fetch('http://127.0.0.1:3600/api/personal/'+id.id)
        .then(resp => resp.json())
        .then(resp =>{
          onlyUSer = resp
          console.log(resp, " esto es only user ")
        res.redirect('/usuarios/usuarios')
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
  fetch('http://localhost:3600/api/UpdaPersonal/'+id.id,enviar)
  .then(resp => resp.json())
  .catch(error => console.error('Error',error))
  .then(resp => {
    if(resp.success==false){
      
      res.redirect('/usuarios/usuarios/'+id.id)
    }else{
      sms2= resp.message
      res.redirect('/usuarios/usuarios/'+id.id)
    }
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
        resp,
        mg1,
        mg2,
        data,
        
      });
    }
    msg_del(),{ expiresIn: 10 * 800 } 
  });
  
});
var mg1,mg2,data
router.post('/crearCuenta/:id', (req,res) => {
  var id = req.params
  //console.log(id, "    este es el id >>>>>>>>>>>>>>>>>>>>>>>>><" )
  data = req.body
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
    console.log(resp, "    <<<<<<<<<<<<<<<<<<<<  esto es la respuesta")
    if (resp.success == false){
        mg1= resp.msg
        res.redirect('/usuarios/UsuraioCuenta/'+id.id)
        mg2 = null
        
    }else{
        mg2= resp.message
        mg1 = null
        data=null 
        console.log(resp)
      
        res.redirect('/usuarios/UsuraioCuenta/'+id.id)
    }
   
  
  })
});

function msg_del(){
  mg1 = null
  mg2 = null
}

/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                             Reportes personal
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
router.get('/volver', (req,res) => {
  all = null;
  res.redirect('/usuarios/roles');
})

router.get('/roles',(req, res) => {
  fetch('http://localhost:3600/api/personal')        
  .then(resp => resp.json())
  .then(data =>{  
    
    fetch('http://localhost:3600/api/allUser')        
    .then(resp => resp.json())
    .then(allusers =>{ 
      res.render('roles', {
        data,
        allusers
      })
    })
   
  })
  .catch(error => {
    console.error('Error:', error)
    res.render('404error',{
      msg:"No hay conección con el sevidor"
    });
    })
});
router.get('/cuentas/:id', (req,res) => {
  var id = req.params
    fetch('http://127.0.0.1:3600/api/allrol/'+id.id)
    .then(resp => resp.json())
    .then(data =>{ 

      fetch('http://127.0.0.1:3600/api/personal/'+id.id)
      .then(resp => resp.json())
      .then(one_person =>{ 

        res.render('reporAdmin/detallimpre',{
          data,
          one_person
        })
      })
     
    })
  
  
})


router.get('/onlymedico',(req, res) =>{
  fetch('http://localhost:3600/api/Only_Medicos')        
  .then(resp => resp.json())
  .then(data =>{  
    res.render('reporAdmin/impriA', {
      data
    })
  })
})
router.get('/onlyfarma',(req, res) =>{
  fetch('http://localhost:3600/api/OnlyFarma')        
  .then(resp => resp.json())
  .then(data =>{  
    res.render('reporAdmin/impriA', {
      data
    })
  })
})
router.get('/onlyperso',(req, res) =>{
  fetch('http://localhost:3600/api/OnlyPersonal')        
  .then(resp => resp.json())
  .then(data =>{  
    res.render('reporAdmin/impriA', {
      data
    })
  })
})

router.get('/onlyenferme',(req, res) =>{
  fetch('http://localhost:3600/api/OnlyEnfermera')        
  .then(resp => resp.json())
  .then(data =>{  
    res.render('reporAdmin/impriA', {
      data
    })
  })
})
router.get('/allcuentas',(req, res) =>{
  fetch('http://localhost:3600/api/allUser')        
  .then(resp => resp.json())
  .then(data =>{  
    res.render('reporAdmin/impriusers', {
      data
    })
  })
})
router.get('/allroles',(req, res) =>{
  fetch('http://localhost:3600/api/roleall')        
  .then(resp => resp.json())
  .then(data =>{  
    res.render('reporAdmin/impriRol', {
      data
    })
  })
})

module.exports = router;