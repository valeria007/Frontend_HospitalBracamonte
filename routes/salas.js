const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const datas = require('./url/export');

// funcion para mandar los mensajes por usuarios
var msg_Consulta_emergencia = {}
function msg_data(data,id){
  let msg_data = msg_Consulta_emergencia[id];
    if (!msg_data) {
        msg_data = msg_Consulta_emergencia[id] = {
        data: data,
        qty: 0
      };
    }
    msg_data.qty++;
}

function array () {
  let arr = [];
  for (const id in msg_Consulta_emergencia) {
      arr.push(msg_Consulta_emergencia[id]);
  }
  return arr;
}
function remove(id) {
    delete msg_Consulta_emergencia[id];
}

////////////////limpiar actualizaciones//////////////////////////////////
router.get('/limpiar/:token_id', (req,res) => {
  const { token_id } = req.params
  remove_sala(token_id)
  res.redirect('/salas/salas/'+token_id);
})

router.get('/salas/:token_id',(req, res) => {
  const { token_id } = req.params
  if( datas.name.token[token_id] ){
    fetch('http://localhost:4600/api/especialidad')   
    .then(resp => resp.json())
    .then(dataSala =>{
    
      fetch('http://localhost:3000/api/sala')   
      .then(resp => resp.json())
      .then(resp =>{
        console.log(dataSala, "esto es lo que quiero ver")
        res.render('salas',{
          data_doc:datas.name.data_user[token_id],
          dataSala,
          resp,
          OnlySala:update_sala[token_id],
          msg:msg_Consulta_emergencia[token_id]          
        });
      })
      .catch(error => {
        console.error('Error:', error)
        res.render('404error',{
          msg:"No hay conección con el sevidor 3000"
        });
      })
    
    })
    .catch(error => {
      console.error('Error:', error)
      res.render('404error',{
        msg:"No hay conección con el sevidor 4600"
      });
    })
  }else{
    res.redirect('/')
  }
  
});
// funcion para mandar only sala por usuario
var update_sala = {}
function one_sala(data,id){
  let storedItem = update_sala[id];
    if (!storedItem) {
      storedItem = update_sala[id] = {
        data: data,
        qty: 0
      };
    }
    storedItem.qty++;
}

function array12 () {
  let arr = [];
  for (const id in update_sala) {
      arr.push(update_sala[id]);
  }
  return arr;
}

function remove_sala(id) {
  delete update_sala[id];
}

/// Actualizar Salas  pero en la misma vista 
router.get('/updateSalas/:id/:token_id', (req,res) => {
  const { id, token_id } = req.params;
  if( datas.name.token[token_id] ){
    fetch('http://localhost:3000/api/salaOne/'+id)   
    .then(resp => resp.json())
    .then(resp =>{
      if(update_sala[token_id] == null){
        one_sala(resp, token_id)
        res.redirect('/salas/salas/'+token_id);
      }else{
        remove_sala(token_id)
        one_sala(resp, token_id)
        res.redirect('/salas/salas/'+token_id);
      }
      setTimeout(()=>{
        remove_sala(token_id)
      },25000);  
    })
    .catch(error => {
      console.error('Error:', error)
      res.send("no hay coneccion con el servidor");
    })
  }else{
    res.redirect('/');
  }
});


var m1,m2
router.post('/salas/:token_id', (req,res) => {
  const { token_id } = req.params
  if( datas.name.token[token_id] ){
    var data = req.body;
    var msg_p;
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
        if(msg_Consulta_emergencia[token_id] == null){
          msg_p = {
            success:false,
            data_p:data.msg
          }
          msg_data(msg_p,token_id)
        }else{
          msg_p = {
            success:false,
            data_p:data.msg
          }
          remove(token_id)
          msg_data(msg_p,token_id)
        }
        res.redirect('/salas/salas/'+token_id); 

      }else{
        if(msg_Consulta_emergencia[token_id] == null){
          msg_p = {
            success:true,
            data_p:data.msg
          }
          msg_data(msg_p,token_id)
        }else{
          msg_p = {
            success:true,
            data_p:data.msg
          }
          remove(token_id)
          msg_data(msg_p,token_id)
        }
        res.redirect('/salas/salas/'+token_id); 
      }
      setTimeout(()=>{
        remove(token_id)
      },1000);
    })
  }else{
    res.redirect('/')
  }
});



router.post('/updateSalas/:id/:token_id',(req,res) => {
  const { id, token_id } = req.params;
  if( datas.name.token[token_id] ){
    var data = req.body;
    var msg_p;
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
        if(msg_Consulta_emergencia[token_id] == null){
          msg_p = {
            success:false,
            data_p:data.msg
          }
          msg_data(msg_p,token_id)
        }else{
          msg_p = {
            success:false,
            data_p:data.msg
          }
          remove(token_id)
          msg_data(msg_p,token_id)
        }
        res.redirect('/salas/updateSalas/'+id+'/'+token_id);
      }else{
        if(msg_Consulta_emergencia[token_id] == null){
          msg_p = {
            success:true,
            data_p:data.msg
          }
          msg_data(msg_p,token_id)
        }else{
          msg_p = {
            success:true,
            data_p:data.msg
          }
          remove(token_id)
          msg_data(msg_p,token_id)
        }
        res.redirect('/salas/updateSalas/'+id+'/'+token_id); 
      }
      setTimeout(()=>{
        remove(token_id)
      },1000);
    })
  }else{
    res.redirect('/')
  }
});

/*camas 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/
var datacama
router.get('/renderCamas/:id/:token_id', (req,res) => {
  const { id, token_id } = req.params;
  datacama = id;
  if( datas.name.token[token_id] ){
    fetch('http://localhost:3000/api/camaSala/'+id)   
    .then(resp => resp.json())
    .then(resp =>{

      fetch('http://localhost:3000/api/salaOne/'+id)   
      .then(resp => resp.json())
      .then(salas =>{
        res.render('camas',{
          data_doc:datas.name.data_user[token_id],
          msg:msg_Consulta_emergencia[token_id],
          resp,
          salas,
          onlyCamas, /// datos recividos del serv renderCamas
        });
      
      })

    })
    .catch(error => {
      console.error('Error:', error)
      res.send("no hay coneccion con el servidor");
    })
  }else{
    res.redirect('/')
  }
});


//serv para insertar cama en sala
router.post('/camas/:id/:token_id', (req,res) => {
  const { token_id } = req.params
  if( datas.name.token[token_id] ){
    var id = req.params.id;
    var data = req.body
    var msg_p;
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
        if(msg_Consulta_emergencia[token_id] == null){
          msg_p = {
            success:false,
            data_p:data.msg
          }
          msg_data(msg_p,token_id)
        }else{
          msg_p = {
            success:false,
            data_p:data.msg
          }
          remove(token_id)
          msg_data(msg_p,token_id)
        }
        res.redirect('/salas/renderCamas/'+id+'/'+token_id);  
      }else{
        if(msg_Consulta_emergencia[token_id] == null){
          msg_p = {
            success:true,
            data_p:data.msg
          }
          msg_data(msg_p,token_id)
        }else{
          msg_p = {
            success:true,
            data_p:data.msg
          }
          remove(token_id)
          msg_data(msg_p,token_id)
        }
        res.redirect('/salas/renderCamas/'+id+'/'+token_id);  
      }
      setTimeout(()=>{
        remove(token_id)
      },1000);
    })
  }else{
    res.redirect('/')
  }
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

router.get('/delcama/:id/:token_id/:sala_id', (req, res) => {
  const { id, token_id, sala_id }= req.params;
  if( datas.name.token[token_id] ){
    fetch('http://localhost:3000/api/DElcama/'+id)
    .then(resp => resp.json())
    .catch(error => console.error('Error:', error))
    .then(resp =>{
        console.log(resp)
        res.redirect('/salas/renderCamas/'+sala_id+'/'+token_id); 
    });
  }else{
    res.redirect('/')
  }
  
});

router.get('/volverSalas/:token_id', (req,res) => {
  const { token_id } = req.params
  res.redirect('/salas/salas/'+token_id)
})

module.exports = router;