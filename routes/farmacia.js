const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const datas = require('./url/export');

var data_user = {}
function user(data,id){
  let storedItem = data_user[id];
    if (!storedItem) {
      storedItem = data_user[id] = {
        data: data,
        qty: 0
      };
    }
    storedItem.qty++;
}

function array () {
  let arr = [];
  for (const id in data_user) {
      arr.push(data_user[id]);
  }
  return arr;
}

function remove_user(id) {
  delete data_user[id];
}

//function mensage post segun usuario
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

function array321 () {
  let arr = [];
  for (const id in msg_Consulta_emergencia) {
      arr.push(msg_Consulta_emergencia[id]);
  }
  return arr;
}
function remove(id) {
    delete msg_Consulta_emergencia[id];
}

router.get('/home/:id/:token_part', (req,res) => {
    const { id,token_part } = req.params
    var data_token = {
      token_id: '',
      token_p: '',
      medico:''
    }
    fetch('http://localhost:3600/api/user/'+id)  // esto es para sacar el token del usuario
    .then(resp => resp.json())
    .catch(error => console.error('Error',error))
    .then(resp => {
      data_token.token_id = resp.id     // esto manda el el id para el token
      
        if(datas.name.token[resp.id] && datas.name.token[resp.id].data.token.split(" ")[1].split(".")[2] == token_part ){
            var status
            for(var i = 0; i < resp.role.length; i++ ){
                if(resp.role[i].name == "farmacia"){
                    status = "tiene permiso"
                }
            }  
            if(status == "tiene permiso"){
              data_token.token_p = token_part
                fetch('http://localhost:3600/api/personal/'+resp.perso_id)
                .then(resp => resp.json())
                .catch(error => console.error('Error',error))
                .then(resp => {
                  data_token.medico = resp 
                  if(data_user[data_token.token_id] == null){
                    user(data_token, data_token.token_id)
                    res.render('Farmacia/home',{
                        data_token
                    })
                  status = null
                  }else{
                    remove_user( data_token.token_id)
                    user(data_token, data_token.token_id)
                    res.render('Farmacia/home',{
                        data_token
                    })
                  status = null
                  }
                  
                })
            }else{
              res.redirect('/')
            }
        }else{
          res.redirect('/')
        }
        
    })
})

/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                                          rutas para medicamentos
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

router.get('/almacenamiento/:token_id/:token_partial',(req, res) => {
    const { token_id,token_partial } = req.params
    if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_partial){

      fetch('http://localhost:3200/api/mostrar_medicamentos')
        .then(resp => resp.json())
        .catch(error => console.error('Error',error))
        .then(list_medicamentos => {
          
          fetch('http://localhost:3200/api/mostrar_grupos')
          .then(resp => resp.json())
          .catch(error => console.error('Error',error))
          .then(list_grupoAsig_Far => {

            res.render('Farmacia/almacenamiento',{
              data_doc : data_user[token_id], //esto contine los datos del usuario
              list_medicamentos,
              list_grupoAsig_Far,
              one_medicamento:one_medicamento[token_id],
              msg:msg_Consulta_emergencia[token_id],
            })
          })
         
      })
        
    }else{
        res.redirect('/')
    }
    
});

var one_medicamento = {}
function medicamento(data,id){
  let storedItem = one_medicamento[id];
    if (!storedItem) {
      storedItem = one_medicamento[id] = {
        data: data,
        qty: 0
      };
    }
    storedItem.qty++;
}

function array123 () {
  let arr = [];
  for (const id in one_medicamento) {
      arr.push(one_medicamento[id]);
  }
  return arr;
}

function remove_medicamento_data(id) {
  delete one_medicamento[id];
}


//ruta para poder sacar un medicamento

router.get('/one_medicamento/:id_medicamento/:token_id/:token_partial', (req,res) => {
    const { id_medicamento, token_id,token_partial } = req.params
    if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_partial){
        fetch('http://localhost:3200/api/one_medicamento/'+id_medicamento)
        .then(resp => resp.json())
        .catch(error => console.error('Error',error))
        .then(resp => {
            if(one_medicamento[token_id] == null){
                medicamento(resp, token_id)
                res.redirect('/farmacia/almacenamiento/' + token_id + '/' + token_partial)      
              }else{
                remove_medicamento_data(token_id)
                medicamento(resp, token_id)
                res.redirect('/farmacia/almacenamiento/' + token_id + '/' + token_partial)
              }
            
        })
    }else{
        res.redirect('/')
    }

})

router.post('/registrar_medicamento/:token_id/:token_partial', (req,res) => {
  const { token_id, token_partial } = req.params
  var msg_p
  var datos = req.body
  var esto = {
      method: 'POST',
      body: JSON.stringify(datos),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3200/api/reg_med',esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => {
      if(data.success == true){
          if(msg_Consulta_emergencia[token_id] == null){
              msg_p = {
                success:true,
                data_med:data.msg
              }
              msg_data(msg_p,token_id)
          }else{
              msg_p = {
                success:true,
                data_med:data.msg
              }
              remove(token_id)
              msg_data(msg_p,token_id)
          } 
          res.redirect('/farmacia/almacenamiento/' + token_id + '/' + token_partial) 
      }else{
          if(msg_Consulta_emergencia[token_id] == null){
              msg_p = {
                success:false,
                data_med:data.msg
              }
              msg_data(msg_p,token_id)
          }else{
              msg_p = {
                success:false,
                data_med:data.msg
              }
              remove(token_id)
              msg_data(msg_p,token_id)
          }
          res.redirect('/farmacia/almacenamiento/' + token_id + '/' + token_partial) 
      }   
  })
})



/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                                          rutas para grupoAsig_Far
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 */

router.get('/volver/:token_id/:token_partial', (req,res) => {
    const { token_id,token_partial } = req.params
    remove_grupo_data(token_id)
    remove(token_id)
    res.redirect('/farmacia/grupoAsig_Far/'+token_id+'/'+token_partial)

})

router.get('/grupoAsig_Far/:token_id/:token_partial',(req, res) => {
    const { token_id,token_partial } = req.params
    if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_partial){

        fetch('http://localhost:3200/api/mostrar_grupos')
        .then(resp => resp.json())
        .catch(error => console.error('Error',error))
        .then(list_grupoAsig_Far => {
            res.render('Farmacia/grupoAsig_Far',{
                data_doc : data_user[token_id], //esto contine los datos del usuario
                list_grupoAsig_Far,
                msg:msg_Consulta_emergencia[token_id],
                one_grupo:one_grupo_designacion[token_id]
            })
        })
       
    }else{
        res.redirect('/')
    }
    
});

var one_grupo_designacion = {}
function grupo_designacion(data,id){
  let storedItem = one_grupo_designacion[id];
    if (!storedItem) {
      storedItem = one_grupo_designacion[id] = {
        data: data,
        qty: 0
      };
    }
    storedItem.qty++;
}

function array () {
  let arr = [];
  for (const id in one_grupo_designacion) {
      arr.push(one_grupo_designacion[id]);
  }
  return arr;
}

function remove_grupo_data(id) {
  delete one_grupo_designacion[id];
}


//ruta para poder sacar un grupo designacion

router.get('/one_grupo/:id_grupo/:token_id/:token_partial', (req,res) => {
    const { id_grupo, token_id,token_partial } = req.params
    if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_partial){
        fetch('http://localhost:3200/api/one_grupo/'+id_grupo)
        .then(resp => resp.json())
        .catch(error => console.error('Error',error))
        .then(resp => {
            if(one_grupo_designacion[token_id] == null){
                grupo_designacion(resp, token_id)
                res.redirect('/farmacia/grupoAsig_Far/' + token_id + '/' + token_partial)      
              }else{
                remove_grupo_data(token_id)
                grupo_designacion(resp, token_id)
                res.redirect('/farmacia/grupoAsig_Far/' + token_id + '/' + token_partial)
              }
            
        })
    }else{
        res.redirect('/')
    }

})

router.post('/registrar_grupo/:token_id/:token_partial', (req,res) => {
    const { token_id, token_partial } = req.params
    var msg_p
    var datos = req.body
    var esto = {
        method: 'POST',
        body: JSON.stringify(datos),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3200/api/reg_grupoDesignacion',esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {
        if(data.success == true){
            if(msg_Consulta_emergencia[token_id] == null){
                msg_p = {
                  success:true,
                  data:data.msg
                }
                msg_data(msg_p,token_id)
            }else{
                msg_p = {
                  success:true,
                  data:data.msg
                }
                remove(token_id)
                msg_data(msg_p,token_id)
            } 
            res.redirect('/farmacia/grupoAsig_Far/'+token_id+'/'+token_partial) 
        }else{
            if(msg_Consulta_emergencia[token_id] == null){
                msg_p = {
                  success:false,
                  data:data.msg
                }
                msg_data(msg_p,token_id)
            }else{
                msg_p = {
                  success:false,
                  data:data.msg
                }
                remove(token_id)
                msg_data(msg_p,token_id)
            }
            res.redirect('/farmacia/grupoAsig_Far/'+token_id+'/'+token_partial) 
        }   
    })
})


//ruta para poder actualizar grupo designacion
router.post('/update_grupo/:id_grupo/:token_id/:token_partial', (req,res) => {
    const { id_grupo, token_id, token_partial } = req.params
    var msg_p
    var datos = req.body
    var esto = {
        method: 'put',
        body: JSON.stringify(datos),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3200/api/update_grupo/'+id_grupo,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {
        if(data.success == true){
            if(msg_Consulta_emergencia[token_id] == null){
                msg_p = {
                  success:true,
                  data:data.msg
                }
                msg_data(msg_p,token_id)
            }else{
                msg_p = {
                  success:true,
                  data:data.msg
                }
                remove(token_id)
                msg_data(msg_p,token_id)
            } 
            res.redirect('/farmacia/one_grupo/'+id_grupo+'/'+token_id+'/'+token_partial) 
        }else{
            if(msg_Consulta_emergencia[token_id] == null){
                msg_p = {
                  success:false,
                  data:data.msg
                }
                msg_data(msg_p,token_id)
            }else{
                msg_p = {
                  success:false,
                  data:data.msg
                }
                remove(token_id)
                msg_data(msg_p,token_id)
            }
            res.redirect('/farmacia/one_grupo/'+id_grupo+'/'+token_id+'/'+token_partial) 
        }   
    })
})

router.get('/volver', (req,res) => {
    oneGrupoAsig = null
    res.redirect('/farmacia/almacenamiento'); 
})
  
router.get('/solicitudes',(req, res) => {
    res.render('Farmacia/solicitudes')
});

router.get('/reg_solicitud',(req, res) => {
    res.render('Farmacia/reg_solicitud')
});

router.get('/volver3', (req,res) => {
    oneGrupoAsig = null
    res.redirect('/Farmacia/solicitudes'); 
})
  
router.get('/recetas_farm',(req, res) => {
    res.render('Farmacia/recetas_farm')
});
router.get('/reg_receta',(req, res) => {
    res.render('Farmacia/reg_receta')
  });
  router.get('/volver2', (req,res) => {
    oneGrupoAsig = null
    res.redirect('/farmacia/recetas_farm'); 
})
router.get('/ventas',(req, res) => {
    res.render('Farmacia/ventas')
});
  
  router.get('/reg_venta',(req, res) => {
    res.render('Farmacia/reg_venta')
  });
  router.get('/volver1', (req,res) => {
    oneGrupoAsig = null
    res.redirect('/farmacia/ventas'); 
})
  
  router.get('/reportes_facturacion',(req, res) => {
    res.render('Farmacia/reportes_facturacion')
  });
router.get('/kardexValorizado', (req,res) => {
    res.render('Farmacia/kardexValorizado');
});
router.get('/reportes_cajas', (req,res) => {
    res.render('Farmacia/reportes_cajas');
});

router.get('/reportes_recetas', (req,res) => {
    res.render('Farmacia/reportes_recetas');
});
router.get('/med_ven', (req,res) => {
    res.render('Farmacia/med_ven');
});
router.get('/reportes_solicitudes', (req,res) => {
    res.render('Farmacia/reportes_solicitudes');
});
router.get('/reportes_ventas', (req,res) => {
    res.render('Farmacia/reportes_ventas');
});
router.get('/Stock_far', (req,res) => {
    res.render('Farmacia/Stock_far');
});





module.exports = router;