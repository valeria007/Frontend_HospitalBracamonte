const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const datas = require('./url/export');

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


router.get('/role/:token_id',(req, res) => {
  const { token_id } = req.params
  if( datas.name.token[token_id] ){
    var esto = {
      method: 'GET',
      headers:{
        'Content-type' : "application/json"
      }
    }
      fetch('http://localhost:3600/api/roleall/',esto)
      .then(resp => resp.json())
      .then(resp =>{
        console.log(resp, "esto es el mensaje")
        res.render('CreRoles',{
          resp, 
          data_doc:datas.name.data_user[token_id],
          msg:msg_Consulta_emergencia[token_id]
        });
      })
      .catch(error => {       
      console.error('Error:', error)
      res.render('404error',{
        msg:"No hay conección con el sevidor"
      })
    })
  }else{
    res.redirect('/')
  }
});

//esta ruta es para poder insertar los roles
var msg, mg2;
router.post('/role/:token_id', (req,res) => {
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
  }
    fetch('http://localhost:3600/api/role/',esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {
       
        if (data.success == false){
          if(msg_Consulta_emergencia[token_id] == null){
            msg_p = {
              success:false,
              data_p:data.message
            }
            msg_data(msg_p,token_id)
          }else{
              msg_p = {
                success:false,
                data_p:data.message
              }
              remove(token_id)
              msg_data(msg_p,token_id)
          }
            res.redirect('/role/role/'+token_id);
        }else{
          if(msg_Consulta_emergencia[token_id] == null){
            msg_p = {
              success:true,
              data_p:data.message
            }
            msg_data(msg_p,token_id)
          }else{
              msg_p = {
                success:true,
                data_p:data.message
              }
              remove(token_id)
              msg_data(msg_p,token_id)
          }
          res.redirect('/role/role/'+token_id);

        }
        setTimeout(()=>{
          remove(token_id)
      },1000);
    })
  }else{
    res.redirect('/');
  }        
});

/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                  ruta para rol
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

router.post('/register_rol/', (req,res) => {
  var data = req.body;
  console.log(data, "  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
    }
      fetch('http://localhost:3600/api/userrol/crearol',esto)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(data => {
        res.status(200).json(data);
      })
})
/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                  ruta para eliminar rol
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/
router.get('/delrol/:id', (req, res) => {
  const { id }= req.params;
  fetch('http://localhost:3600/api/delrole/'+id)
  .then(resp => resp.json())
  .catch(error => console.error('Error:', error))
  .then(resp =>{
      console.log(resp)
      res.redirect('/role/role');
  });
  
});

module.exports = router;