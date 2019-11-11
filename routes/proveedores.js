const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const datas = require('./url/export');


var url = 'http://localhost:3500/api';



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

router.get('/quitar/:token_id/:token_part', (req,res) => {
  const { token_id, token_part } = req.params;
  remove_data_post(token_id);
  res.redirect('/proveedores/proveedores/'+token_id+'/'+token_part)
})

router.get('/volver/:token_id/:token_part',(req,res) => {
  const { token_id, token_part } = req.params;
  remove_proveedor(token_id)
  res.redirect('/proveedores/proveedores/'+token_id+'/'+token_part)  
})
//esta ruta es para renderizar la vista de proveedores
router.get('/proveedores/:token_id/:token_part',(req, res) => {
  const { token_id, token_part } = req.params;
  fetch('http://localhost:3600/api/user/'+token_id)
  .then(resp => resp.json())
  .catch(error => console.error('Error',error))
  .then(resp => {
    if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_part){
      var status
      for(var i = 0; i < resp.role.length; i++ ){
        if(resp.role[i].name == "Almacen"){
            status = "tiene permiso"
        }
      } 
      if(status == "tiene permiso"){ 
        fetch(url+'/proveedor')   
          .then(resp => resp.json())
          .then(resp =>{
            console.log(data_post[token_id], " ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
            res.render('Almacen/proveedores',{
              resp,
              one_proveedor:one_proveedor1[token_id],
              data_doc:datas.name.data_user[token_id], 
              msg:msg_Consulta_emergencia[token_id],
              err:data_post[token_id]
            })
        })
        .catch(error => {
          console.error('Error:', error)
          res.send("no hay coneccion con el servidor");
        })
      }else{
        res.redirect('/');
      }
    }else{
      res.redirect('/');
    }
  })
});

var data_post = {}
function post_data(data,id){
  let msg_data = data_post[id];
    if (!msg_data) {
        msg_data = data_post[id] = {
        data: data,
        qty: 0
      };
    }
    msg_data.qty++;
}

function array1 () {
  let arr = [];
  for (const id in data_post) {
      arr.push(data_post[id]);
  }
  return arr;
}
function remove_data_post(id) {
    delete data_post[id];
}

router.post('/proveedores/:token_id/:token_part', (req,res) =>{
  const { token_id, token_part } = req.params;
  if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_part){

    var datos = req.body;
    var msg_p;
    var esto = {
      method: 'POST',
      body: JSON.stringify(datos),
      headers:{
        'Content-type' : "application/json"
      }
    };
    fetch(url+'/proveedor',esto)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(data => { 
        if (data.success == false){
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
          if (data_post[token_id] == null){
            post_data(datos, token_id)
          }else{
            remove_data_post(token_id)
            post_data(datos,token_id)
          }
          setTimeout(()=>{
            remove_data_post(token_id)
          },60000);
          res.redirect('/proveedores/proveedores/'+token_id+'/'+token_part);     

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
          remove_data_post(token_id)
          res.redirect('/proveedores/proveedores/'+token_id+'/'+token_part);
        }
        setTimeout(()=>{
          remove(token_id)
        },1000);
    })

  }else{
    res.redirect('/')
  }
});

var one_proveedor1 = {}
function proveedor_data(data,id){
  let msg_data = one_proveedor1[id];
    if (!msg_data) {
        msg_data = one_proveedor1[id] = {
        data: data,
        qty: 0
      };
    }
    msg_data.qty++;
}

function array4 () {
  let arr = [];
  for (const id in one_proveedor1) {
      arr.push(one_proveedor1[id]);
  }
  return arr;
}
function remove_proveedor(id) {
    delete one_proveedor1[id];
}

router.get('/OnlyProveedor/:id/:token_id/:token_part', (req,res) => {
  const { id, token_id, token_part } = req.params
  if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_part){
    fetch(url+'/OnlyProveedor/'+id)   
    .then(resp => resp.json())
    .then(resp =>{
      if (one_proveedor1[token_id] == null){
        proveedor_data(resp, token_id);
        res.redirect('/proveedores/proveedores/'+token_id+'/'+token_part);
      }else{
        remove_proveedor(token_id);
        proveedor_data(resp, token_id);
        res.redirect('/proveedores/proveedores/'+token_id+'/'+token_part);
      }     
      setTimeout(()=>{
        remove_proveedor(token_id)
      },60000);
    })
    .catch(error => {
      console.error('Error:', error)
      res.send("no hay coneccion con el servidor");
    })
  }else{
    res.redirect('/')
  }
});

router.post('/UpdateProveedor/:id/:token_id/:token_part', (req, res) => {
  const { id, token_id, token_part } = req.params;
  if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_part){
    var data = req.body;
    var msg_p;
    var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
    };
    fetch(url+'/updateProveedor/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {
      if ( data.success == false ){
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
        res.redirect('/proveedores/OnlyProveedor/'+id+'/'+token_id+'/'+token_part); 
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
        res.redirect('/proveedores/OnlyProveedor/'+id+'/'+token_id+'/'+token_part); 
      }
      setTimeout(()=>{
        remove(token_id)
      },1000);
    })
  }else {
    res.redirect('/')
  }
});

module.exports = router;