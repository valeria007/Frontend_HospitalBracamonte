const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const datas = require('./url/export');

router.get('/data_user', (req,res) => {
    res.send({data_user,msg_Consulta_emergencia})
})

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

//ruta para poder renderizar home de emergencia

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
                if(resp.role[i].name == "emergencia"){
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
                    res.render('emergencia2.0/home',{
                        data_token
                    })
                  status = null
                  }else{
                    remove_user( data_token.token_id)
                    user(data_token, data_token.token_id)
                    res.render('emergencia2.0/home',{
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

//ruta para renderizar lista pacientes
router.get('/lista_pacientes/:token_id/:token_partial', (req,res) => {
    const { token_id,token_partial } = req.params
    if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_partial){
        fetch('http://localhost:3000/api/lista_emergencia/'+data_user[token_id].data.medico.id)
        .then(resp => resp.json())
        .catch(error => console.error('Error',error))
        .then(list_true => {
          //res.send(list_true)
          list_false(data_user[token_id].data.medico.id, list_true)
          function list_false(id_med, resp){
            fetch('http://localhost:3000/api/lista_emergencia_false/' + id_med)
              .then(resp => resp.json())
              .catch(error => console.error('Error',error))
              .then(list_false => {
                res.render('emergencia2.0/lista_pacientes',{
                  list_false,
                  resp,
                  data_doc : data_user[token_id]
                })
              })
          } 
            
        })
    }else{
        res.redirect('/')
    }
})

router.get('/registrar_emergencia/:id_cita/:historial/:token_id/:token_partial',(req,res) => {
    const { id_cita, historial, token_id, token_partial} = req.params
    if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_partial){
        fetch('http://localhost:3000/api/citaEmergencia/' + id_cita)
        .then(resp => resp.json())
        .then(updateConsultaEmg =>{

            listaEmergencias()
            function listaEmergencias(){
                fetch('http://localhost:3000/api/OnlyEmergencia/'+historial)
                .then(resp => resp.json())
                .then(consultasEmergencia =>{ 
                    //console.log(consultasEmergencia, " <<<<<<<<<<<< 87878787 <<<<<<<<<<<<<<<<<<<<<<<<<<<<")
                    data_paciente()
                    function data_paciente(){
                        fetch('http://localhost:3000/api/onlyPaciente/'+historial)
                        .then(resp => resp.json())
                        .then(dataPaciente =>{ 

                            one_cita()
                            function one_cita(){
                                fetch('http://localhost:3000/api/OneCita/'+id_cita)
                                .then(resp => resp.json())
                                .then(cita =>{
                                    res.render('emergencia2.0/consulta_emergencia',{
                                        consultasEmergencia,
                                        updateConsultaEmg,
                                        dataPaciente,
                                        data_doc : data_user[token_id],
                                        id_cita,
                                        msg:msg_Consulta_emergencia[token_id],
                                        cita
                                    })
                                })    
                            }
                         })
                    }
                    
                 })
            }
        })
    }else{
        res.redirect('/')
    }
})

// esta ruta es para cambiar ele estado  de citas medicas
router.get('/estado/:id_cita/:historial/:token_id/:token_partial', (req,res) => {
    const { id_cita, historial, token_id, token_partial } = req.params;
    fetch('http://localhost:3000/api/estado/'+id_cita)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
      res.redirect('/emergencia2.0/registrar_emergencia/'+id_cita+'/'+historial+'/'+token_id+'/'+token_partial);
      //res.status(200).send(data)
    })
});

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

//este serv es para insrtar datos a la tabla emergencia segun la cita que le coresponda
router.post('/consultaEmergencia/:id_cita/:historial/:token_id/:token_partial', (req,res) => {
    const { id_cita, historial, token_id, token_partial } = req.params
    var datos = req.body;
    //res.send(datos)
    var esto = {
        method: 'POST',
        body: JSON.stringify(datos),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/emeregencia/'+id_cita,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        if(data.success == true){
            var msg 
            if(msg_Consulta_emergencia[token_id] == null){
                msg = {
                    success : true,
                    data:data.msg
                }
                msg_data(msg,token_id)
            }else{
                msg = {
                    success : true,
                    data:data.msg
                }
                remove(token_id)
                msg_data(msg,token_id)
            }
            atendido(datos.hora.split("/")[1])
            function atendido(id){
              var estado = {
                  estado: "atendido"
              }
              var esto = {
                  method: 'POST',
                  body: JSON.stringify(estado),
                  headers:{
                    'Content-type' : "application/json"
                  }
              };
              fetch('http://localhost:4600/api/Update_Hora/'+id,esto)
              .then(res => res.json())
              .catch(error => console.error('Error:', error))
              .then(resp => {
                res.redirect('/emergencia2.0/estado/'+id_cita+'/'+historial+'/'+token_id+'/'+token_partial);
                 
              })
            }
        }else{
            //res.send("no se pudo guardar los datos")
            var msg 
            if(msg_Consulta_emergencia[token_id] == null){
                msg = {
                    success:false,
                    data:"No se pudo guardar los datos"
                }
                msg_data(msg,token_id)
            }else{
                msg = {
                    success:false,
                    data:"No se pudo guardar los datos"
                }
                remove(token_id)
                msg_data(msg,token_id)
            }
            
            res.redirect('/emergencia2.0/registrar_emergencia/'+id_cita+'/'+historial+'/'+token_id+'/'+token_partial)
        }
        
    })
});


//ruta para poder actualizar consulta emergencia
router.post('/update_consulta/:id/:id_cita/:historial/:token_id/:token_partial', (req,res) => {
  const { id, id_cita, historial, token_id, token_partial } = req.params
  var data = req.body  
  var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/updateEmergencia/'+id,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
    if(data.success == true){
      var msg 
        if(msg_Consulta_emergencia[token_id] == null){
          msg = {
            success:true,
            data:data.msg
          }
          msg_data(msg,token_id)
        }else{
          msg = {
            success:true,
            data:data.msg
          }
          remove(token_id)
          msg_data(msg,token_id)
        }
      res.redirect('/emergencia2.0/registrar_emergencia/'+id_cita+'/'+historial+'/'+token_id+'/'+token_partial) 
    }else{
      if(msg_Consulta_emergencia[token_id] == null){
        msg = {
          success:false,
          data:"No se pudo actualizar los datos"
        }
        msg_data(msg,token_id)
      }else{
        msg = {
          success:false,
          data:"No se pudo actualizar los datos"
        }
        remove(token_id)
        msg_data(msg,token_id)
      }
      res.redirect('/emergencia2.0/registrar_emergencia/'+id_cita+'/'+historial+'/'+token_id+'/'+token_partial) 
    }
    
  })  
})

/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                  ruta para recetas
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 */

 router.get('/receta/:id_cita/:historial/:token_id/:token_partial', (req,res) => {
  const { id_cita, historial, token_id, token_partial } = req.params
  if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_partial){
      
      fetch('http://localhost:3000/api/recitasOfEMG/'+historial) // esto es la lista de recetas del paciente
      .then(res => res.json())
      .then(receta => {
        console.log(receta, " <<<<<<<<<<<<<<<<<<<<<<<<<< sdfjsldkfj  <<<<<<<<<<<<<<<<<<<")
        fetch('http://localhost:3000/api/onlyPaciente/'+historial)
        .then(resp => resp.json())
        .then(dataPaciente =>{ 
          res.render('emergencia2.0/recetas',{
            dataPaciente,
            receta,
            data_doc : data_user[token_id],
            id_cita
          })
        })

       })
   
    
  }else{
    res.redirect('/')
  }
   
 })

 //post vue receta
 router.post('/Vue_receta/:id', (req,res) => {
  const { id } = req.params
  var data = req.body  
  var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/reg_RecetaEmrg/'+id,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
      res.status(200).json(data)
             
  })  
})

router.get('/vue_receta_emergencia/:id_consulta',(req,res) =>{
  const { id_consulta } = req.params
  fetch('http://localhost:3000/api/RecetaEmergencia/'+id_consulta)
    .then(res => res.json())
    .then(resp => { 
      res.status(200).json(resp)
    })
})

/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            ruta para papeleta de internacion 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 */

 router.get('/papeleta_internacion/:id_consulta/:historial/:token_id/:token_partial', (req,res) => {
  const { id_consulta, historial, token_id, token_partial } = req.params

  if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_partial){

    fetch('http://localhost:3000/api/ListPinternaciones/'+historial) // esto saca la lista de internaciones del paciente
    .then(resp => resp.json())
    .then(listPinter =>{ 

      fetch('http://localhost:3000/api/InternacionEMG/'+id_consulta)
      .then(resp => resp.json())
      .then(updateInternacion =>{ 

        fetch('http://localhost:4600/api/especialidad')
        .then(resp => resp.json())
        .then(especialidad =>{

          fetch('http://localhost:3000/api/EmergenciaP/'+id_consulta) // esto es la consulta de la emergencia
          .then(resp => resp.json())
          .then(resp =>{ 
            console.log(resp, " qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
            res.render('emergencia2.0/papeleta_internacion',{
              resp,
              especialidad,
              updateInternacion,
              listPinter,
              data_doc : data_user[token_id],
              msg:msg_Consulta_emergencia[token_id]
            })
           })
        })
      })
    })
  
  }else{
    res.redirect('/')
  }
 })

//ruta para para poder insertar papeletas de internacion
router.post('/Pinternacion/:id_consulta/:historial/:token_id/:token_partial', (req,res) => {
  const { id_consulta, historial, token_id, token_partial } = req.params;
  var msg_p;
  var data = req.body 
  var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/papeletaIntEmergencia/'+id_consulta,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => {  
    if (data.success == true){
       
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
      res.redirect('/emergencia2.0/papeleta_internacion/'+id_consulta+'/'+historial+'/'+token_id+'/'+token_partial); 
    }else{
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
      res.redirect('/emergencia2.0/papeleta_internacion/'+id_consulta+'/'+historial+'/'+token_id+'/'+token_partial); 
    }      
                    
  }) 
})

router.post('/updatePinter/:id/:id_consulta/:historial/:token_id/:token_partial', (req,res) => {
  const { id, id_consulta, historial, token_id, token_partial } = req.params;
  var msg_p;
  var data = req.body;
  var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/updatePinternacion/'+id,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => {  
    console.log(data)
    if(data.success == true){
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
      res.redirect('/emergencia2.0/papeleta_internacion/'+id_consulta+'/'+historial+'/'+token_id+'/'+token_partial); 
    }else{
      if(msg_Consulta_emergencia[token_id] == null){
        msg_p = {
          success:false,
          data_p:"No se pudo actualizar los datos"
        }
        msg_data(msg_p,token_id)
      }else{
        msg_p = {
          success:false,
          data_p:"No se pudo actualizar los datos"
        }
        remove(token_id)
        msg_data(msg_p,token_id)
      }
      res.redirect('/emergencia2.0/papeleta_internacion/'+id_consulta+'/'+historial+'/'+token_id+'/'+token_partial); 
    }  
                
  })  

});


/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
              ruta para datos responsable
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 */
router.get('/remove_data_update/:id_paciente/:token_id/:token_partial', (req,res) => {
  const { id_paciente, token_id, token_partial } = req.params;
  remove_responsable_data(token_id)
  remove(token_id)
  remove_post(token_id)
  res.redirect('/emergencia2.0/datos_responsable/'+id_paciente+'/'+token_id+'/'+token_partial) 
})

router.get('/datos_responsable/:id_paciente/:token_id/:token_partial', (req,res) => {
  const { id_paciente, token_id, token_partial } = req.params;
  
  if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_partial){
    fetch('http://localhost:3000/api/paciente_id/'+id_paciente)
    .then(resp => resp.json())
    .catch(error => console.error('Error:', error))
    .then(dataPaciente =>{
      
      fetch('http://localhost:3000/api/responsable_list/'+id_paciente)
      .then(resp => resp.json())
      .then(list_responsables =>{
  
        res.render('emergencia2.0/datos_responsable',{
          list_responsables,
          dataPaciente,
          data_doc : data_user[token_id],
          update_responsable:update_responsable[token_id],
          msg:msg_Consulta_emergencia[token_id],
          data: data_post[token_id]
        })
       
      })
    })
  }else{
    res.redirect('/')
  }
})



var update_responsable = {}
function responsable(data,id){
  let storedItem = update_responsable[id];
    if (!storedItem) {
      storedItem = update_responsable[id] = {
        data: data,
        qty: 0
      };
    }
    storedItem.qty++;
}

function array1 () {
  let arr = [];
  for (const id in update_responsable) {
      arr.push(update_responsable[id]);
  }
  return arr;
}

function remove_responsable_data(id) {
  delete update_responsable[id];
}



router.get('/one_responsable/:id_paciente/:id_responsable/:token_id/:token_partial', (req,res) => {
  const { id_paciente, id_responsable, token_id, token_partial } = req.params;
  
  if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_partial){
    fetch('http://localhost:3000/api/update_responsable/'+id_responsable)
    .then(resp => resp.json())
    .then(resp =>{
      if(update_responsable[token_id] == null){
        responsable(resp, token_id)
        res.redirect('/emergencia2.0/datos_responsable/'+id_paciente+'/'+token_id+'/'+token_partial)      
      }else{
        remove_responsable_data(token_id)
        responsable(resp, token_id)
        res.redirect('/emergencia2.0/datos_responsable/'+id_paciente+'/'+token_id+'/'+token_partial) 
      }
    })
  }else{
    res.redirect('/')
  }
})

//esta funcion es para mandar el data del post de forma dicamica para cada usuario
var data_post = {}
function data_p(data,id){
  let storedItem = data_post[id];
    if (!storedItem) {
      storedItem = data_post[id] = {
        data: data,
        qty: 0
      };
    }
    storedItem.qty++;
}

function array_post () {
  let arr = [];
  for (const id in data_post) {
      arr.push(data_post[id]);
  }
  return arr;
}

function remove_post(id) {
  delete data_post[id];
}

//ruta para insertar en responsable
router.post('/reg_responsable/:id_paciente/:token_id/:token_partial', (req,res) => {
  const { id_paciente, token_id, token_partial } = req.params;
  var msg_p
  var datos = req.body;
 
  var esto = {
      method: 'POST',
      body: JSON.stringify(datos),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/responsable/'+id_paciente,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
    if(data.success == true){
      if(msg_Consulta_emergencia[token_id] == null){
        msg_p = {
          success:true,
          data_responsable:data.msg
        }
        msg_data(msg_p,token_id)
      }else{
        msg_p = {
          success:true,
          data_responsable:data.msg
        }
        remove(token_id)
        msg_data(msg_p,token_id)
      } 
      remove_post(token_id)
      res.redirect('/emergencia2.0/datos_responsable/'+id_paciente+'/'+token_id+'/'+token_partial) 
    }else{
      if(msg_Consulta_emergencia[token_id] == null){
        msg_p = {
          success:false,
          data_responsable:data.msg
        }
        msg_data(msg_p,token_id)
      }else{
        msg_p = {
          success:false,
          data_responsable:data.msg
        }
        remove(token_id)
        msg_data(msg_p,token_id)
      }
      if(data_post[token_id] == null){
        data_p(datos,token_id)
      }else{
        remove_post(token_id)
        data_p(datos,token_id)
      }
     
      res.redirect('/emergencia2.0/datos_responsable/'+id_paciente+'/'+token_id+'/'+token_partial) 
    }    
  })
})


//ruta para actualizar responsable
router.post('/update_responsable/:id_responsable/:id_paciente/:token_id/:token_partial', (req,res) => {
  const { id_responsable, id_paciente, token_id, token_partial } = req.params
  var data = req.body;
  var msg_p;
  var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/update_responsable/'+id_responsable,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => {
    if(data.success == true){
      if(msg_Consulta_emergencia[token_id] == null){
        msg_p = {
          success:true,
          data_responsable:data.msg
        }
        msg_data(msg_p,token_id)
      }else{
        msg_p = {
          success:true,
          data_responsable:data.msg
        }
        remove(token_id)
        msg_data(msg_p,token_id)
         
      } 
      res.redirect('/emergencia2.0/one_responsable/'+id_paciente+'/'+id_responsable+'/'+token_id+'/'+token_partial)
    }else{
      if(msg_Consulta_emergencia[token_id] == null){
        msg_p = {
          success:false,
          data_responsable:data.msg
        }
        msg_data(msg_p,token_id)
      }else{
        msg_p = {
          success:false,
          data_responsable:data.msg
        }
        remove(token_id)
        msg_data(msg_p,token_id)
        
      } 
      res.redirect('/emergencia2.0/one_responsable/'+id_paciente+'/'+id_responsable+'/'+token_id+'/'+token_partial) 
    }
   
  })
})

/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
              ruta para datos responsable
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 */

router.get('/mostrar', (req,res) => {
  res.send({update_responsable,data_post,updateAlergia})
})

//esto manda un responsable de manera dinamica para cada usuario
router.get('/remove_update_alergia/:id_paciente/:token_id/:token_partial', (req,res) => {
  const { id_paciente, token_id, token_partial } = req.params
  remove_alergia(token_id)
  remove(token_id)
  res.redirect('/emergencia2.0/alergias/'+id_paciente+'/'+token_id+'/'+token_partial);  
})



//esta ruta es para poder renderizar la vis ta de alergias
router.get('/alergias/:id_paciente/:token_id/:token_partial', (req,res) => {
  const { id_paciente, token_id, token_partial } = req.params
  if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_partial){
    fetch('http://localhost:3000/api/alergias_list/'+id_paciente)
    .then(resp => resp.json())
    .then(alergias_list =>{

      fetch('http://localhost:3000/api/paciente_id/'+id_paciente)
        .then(resp => resp.json())
        .then(dataPaciente =>{
         res.render('emergencia2.0/alergias',{
          dataPaciente,
          alergias_list,
          update_Alergia:updateAlergia[token_id],
          data_doc : data_user[token_id],
          msg:msg_Consulta_emergencia[token_id]
         })
        })
      
    })    
  }else{
    res.redirect('/')
  }
})



var updateAlergia = {}
function receta(data,id){
  let storedItem = updateAlergia[id];
    if (!storedItem) {
      storedItem = updateAlergia[id] = {
        data: data,
        qty: 0
      };
    }
    storedItem.qty++;
}

function array_alergia () {
  let arr = [];
  for (const id in updateAlergia) {
      arr.push(updateAlergia[id]);
  }
  return arr;
}

function remove_alergia(id) {
  delete updateAlergia[id];
}

//ruta para sacar los datos de una alergia para que pueda ser actualizado
router.get('/one_alergia/:id_alergia/:id_paciente/:token_id/:token_partial', (req,res) => {
  const { id_alergia, id_paciente, token_id, token_partial } = req.params
  if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_partial){
    fetch('http://localhost:3000/api/One_alergias/'+id_alergia)
    .then(resp => resp.json())
    .then(resp =>{
      if(updateAlergia[token_id] == null){
        receta(resp, token_id)
        res.redirect('/emergencia2.0/alergias/'+id_paciente+'/'+token_id+'/'+token_partial);  
      }else{
        remove_alergia(token_id)
        receta(resp, token_id)
        res.redirect('/emergencia2.0/alergias/'+id_paciente+'/'+token_id+'/'+token_partial);             
      }
    })
  }else{
    res.redirect('/')
  }
})

//ruta para poder registrar las alergias del paciente
router.post('/reg_alergias/:id_paciente/:token_id/:token_partial',(req,res) => {
  const { id_paciente, token_id, token_partial } = req.params
  var data = req.body;
  var msg_p;
  var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/alergias/'+id_paciente,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
    if(data.success == true){
      if(msg_Consulta_emergencia[token_id] == null){
        msg_p = {
          success:true,
          data_alergia:data.msg
        }
        msg_data(msg_p,token_id)
      }else{
        msg_p = {
          success:true,
          data_alergia:data.msg
        }
        remove(token_id)
        msg_data(msg_p,token_id)
      } 
      res.redirect('/emergencia2.0/alergias/'+id_paciente+'/'+token_id+'/'+token_partial);     
    }else{
      if(msg_Consulta_emergencia[token_id] == null){
        msg_p = {
          success:false,
          data_alergia:data.msg
        }
        msg_data(msg_p,token_id)
      }else{
        msg_p = {
          success:false,
          data_alergia:data.msg
        }
        remove(token_id)
        msg_data(msg_p,token_id)
      } 
    }
    res.redirect('/emergencia2.0/alergias/'+id_paciente+'/'+token_id+'/'+token_partial); 
           
  })
})

//ruta para poder actualziar alergia
router.post('/updateAlergia/:id_alergia/:id_paciente/:token_id/:token_partial', (req,res) => {
  const { id_alergia, id_paciente, token_id, token_partial } = req.params;
  var msg_p;
  var data = req.body;
  var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/update_alergia/'+id_alergia,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
    if(data.success == true){
      if(msg_Consulta_emergencia[token_id] == null){
        msg_p = {
          success:true,
          data_alergia:data.msg
        }
        msg_data(msg_p,token_id)
      }else{
        msg_p = {
          success:true,
          data_alergia:data.msg
        }
        remove(token_id)
        msg_data(msg_p,token_id)
      }
      res.redirect('/emergencia2.0/one_alergia/'+id_alergia+'/'+id_paciente+'/'+token_id+'/'+token_partial); 
    }else{
      if(msg_Consulta_emergencia[token_id] == null){
        msg_p = {
          success:false,
          data_alergia:data.msg
        }
        msg_data(msg_p,token_id)
      }else{
        msg_p = {
          success:false,
          data_alergia:data.msg
        }
        remove(token_id)
        msg_data(msg_p,token_id)
      }
      res.redirect('/emergencia2.0/one_alergia/'+id_alergia+'/'+id_paciente+'/'+token_id+'/'+token_partial); 
    }
    
  })
})


/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
              ruta para examen fisico
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 */

router.get('/volver/:id_paciente/:token_id/:token_partial', (req,res) => {
  const { id_paciente, token_id, token_partial } = req.params
  remove_examen_fisico(token_id)
  remove(token_id)
  res.redirect('/emergencia2.0/examen_fisico/'+id_paciente+'/'+token_id+'/'+token_partial);  
})

router.get('/examen_fisico/:id_paciente/:token_id/:token_partial', (req,res) => {
  const { id_paciente, token_id, token_partial } = req.params
  if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_partial){
    fetch('http://localhost:3000/api/exFisico_list/'+id_paciente)
    .then(resp => resp.json())
    .then(lis_exFisico =>{

      fetch('http://localhost:3000/api/paciente_id/'+id_paciente)
      .then(resp => resp.json())
      .then(dataPaciente =>{

        res.render('emergencia2.0/examen_fisico',{
          lis_exFisico,
          dataPaciente,
          update_exFisico:examen_fisico[token_id],
          data_doc : data_user[token_id],
          msg:msg_Consulta_emergencia[token_id]
        })
      })

    })
  }else{
    res.redirect('/');
  }
})

var examen_fisico = {}
function examenFisico(data,id){
  let storedItem = examen_fisico[id];
    if (!storedItem) {
      storedItem = examen_fisico[id] = {
        data: data,
        qty: 0
      };
    }
    storedItem.qty++;
}

function array_examenFisico () {
  let arr = [];
  for (const id in examen_fisico) {
      arr.push(examen_fisico[id]);
  }
  return arr;
}

function remove_examen_fisico(id) {
  delete examen_fisico[id];
}

// ruta para sacar un examen fisico para poder ser actualizado
router.get('/one_examen_fisico/:id_examen_fisico/:id_paciente/:token_id/:token_partial', (req,res) => {
  const { id_examen_fisico, id_paciente, token_id, token_partial } = req.params
  if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_partial){
    fetch('http://localhost:3000/api/one_exFisico/'+id_examen_fisico)
    .then(resp => resp.json())
    .then(resp =>{
      if(examen_fisico[token_id] == null){
        examenFisico(resp, token_id)
        res.redirect('/emergencia2.0/examen_fisico/'+id_paciente+'/'+token_id+'/'+token_partial);  
      }else{
        remove_examen_fisico(token_id)
        examenFisico(resp, token_id)
        res.redirect('/emergencia2.0/examen_fisico/'+id_paciente+'/'+token_id+'/'+token_partial);             
      }
    })
  }  
})

router.post('/reg_exFisico/:id_paciente/:token_id/:token_partial', (req,res) => {
  const { id_paciente, token_id, token_partial } = req.params;
  var data = req.body;
  var msg_p;
  var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/examen_fisico/'+id_paciente,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => {
    if(data.success == true){
      if(msg_Consulta_emergencia[token_id] == null){
        msg_p = {
          success:true,
          data_examen:data.msg
        }
        msg_data(msg_p,token_id)
      }else{
        msg_p = {
          success:true,
          data_examen:data.msg
        }
        remove(token_id)
        msg_data(msg_p,token_id)
      }
      res.redirect('/emergencia2.0/examen_fisico/'+id_paciente+'/'+token_id+'/'+token_partial);
    }else{
      if(msg_Consulta_emergencia[token_id] == null){
        msg_p = {
          success:false,
          data_examen:data.msg
        }
        msg_data(msg_p,token_id)
      }else{
        msg_p = {
          success:false,
          data_examen:data.msg
        }
        remove(token_id)
        msg_data(msg_p,token_id)
      }
      res.redirect('/emergencia2.0/examen_fisico/'+id_paciente+'/'+token_id+'/'+token_partial);
    }
    
  })
})

router.post('/update_exFisico/:id_examen/:id_paciente/:token_id/:token_partial', (req,res) => {
  const { id_examen, id_paciente, token_id, token_partial } = req.params;
  var data = req.body;
  var msg_p
  var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/update_exFisico/'+id_examen,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
    if(data.success == true){
      if(msg_Consulta_emergencia[token_id] == null){
        msg_p = {
          success:true,
          data_examen:data.msg
        }
        msg_data(msg_p,token_id)
      }else{
        msg_p = {
          success:true,
          data_examen:data.msg
        }
        remove(token_id)
        msg_data(msg_p,token_id)
      }
      res.redirect('/emergencia2.0/one_examen_fisico/'+id_examen+'/'+id_paciente+'/'+token_id+'/'+token_partial);
    }else{
      if(msg_Consulta_emergencia[token_id] == null){
        msg_p = {
          success:false,
          data_examen:data.msg
        }
        msg_data(msg_p,token_id)
      }else{
        msg_p = {
          success:false,
          data_examen:data.msg
        }
        remove(token_id)
        msg_data(msg_p,token_id)
      }
      res.redirect('/emergencia2.0/one_examen_fisico/'+id_examen+'/'+id_paciente+'/'+token_id+'/'+token_partial);
    }
   
  })
})

//laboratorio
router.get('/examenComplement',(req,res) =>{
  res.render('emergencia2.0/examenComplement')
});
//historial del dia
router.get('/ultimaConsulta',(req,res) =>{
  res.render('emergencia2.0/ultimaConsulta')
});
//historial del 
router.get('/historialGeneral',(req,res) =>{
  res.render('emergencia2.0/historialGeneral')
});
//reportes
router.get('/H_Consulta',(req,res) =>{
  res.render('emergencia2.0/H_Consulta')
});
router.get('/H_Emergencia',(req,res) =>{
  res.render('emergencia2.0/H_Emergencia')
});
router.get('/H_hospitalizacion',(req,res) =>{
  res.render('emergencia2.0/H_hospitalizacion')
});
module.exports = router;
