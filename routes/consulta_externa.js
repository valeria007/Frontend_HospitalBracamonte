const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const datas = require('./url/export');

var cie10 = require('cie10');
var fileAsArray = cie10('array');
var fileAsObject = cie10('obj');


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

// esta funcion manda los mensajes del post segun el usuario
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
var msg_Consulta_Externa = {}
function msg_data(data,id){
  let msg_data = msg_Consulta_Externa[id];
    if (!msg_data) {
        msg_data = msg_Consulta_Externa[id] = {
        data: data,
        qty: 0
      };
    }
    msg_data.qty++;
}

function array () {
  let arr = [];
  for (const id in msg_Consulta_Externa) {
      arr.push(msg_Consulta_Externa[id]);
  }
  return arr;
}
function remove(id) {
    delete msg_Consulta_Externa[id];
}

//ruta de prueba

router.get('/esto',(req,res) => {
  res.send({data_user})
})

//esta ruta es para poder renderizar home consulta del doctor
var data_doc;
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
                if(resp.role[i].name == "medico"){
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
                    res.render('consulta_externa/home_consulta',{
                        data_token
                    })
                  status = null
                  }else{
                    remove_user( data_token.token_id)
                    user(data_token, data_token.token_id)
                    res.render('consulta_externa/home_consulta',{
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

//ruta para poder renderizar lista de pacientes del doctor
router.get('/lista_pacientes/:token_id/:token_partial', (req,res) => {
  const { token_id,token_partial } = req.params
    if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_partial){

      fetch('http://localhost:3000/api/lista_pacaiente/'+data_user[token_id].data.medico.id)
      .then(resp => resp.json())
      .catch(error => console.error('Error',error))
      .then(list_true => {
        //res.send(list_true)
        list_false(data_user[token_id].data.medico.id, list_true)
        function list_false(id_med, data){
          fetch('http://localhost:3000/api/lista_pacienteDoctor_false/' + id_med)
            .then(resp => resp.json())
            .catch(error => console.error('Error',error))
            .then(list_false => {
              res.render('consulta_externa/lista_pacientes',{
                list_false,
                data,
                data_doc : data_user[token_id]
              })
            })
        } 
          
      })
    }else{
        res.redirect('/')        
    }
})

/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 */

router.get('/reg_consulta/:idCIta/:historial/:token_id/:token_p', (req,res) => {
  const { idCIta,historial,token_id,token_p } = req.params
  var esp; // esto es la especialidad 
  if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_p){
    fetch('http://localhost:3000/api/OneCita/'+idCIta)
    .then(resp => resp.json())
    .then(resp =>{
      update_cita(resp[0].id) // esta funcion trae una consulta para poder ser actualizado
      var updateCita
      function update_cita(idCIta){
        fetch('http://localhost:3000/api/updateConsulta/'+idCIta)
          .then(resp => resp.json())
          .then(resp =>{
              updateCita = resp;                    
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("Ocurrio algo con el servidor");
        }) 
      }

      data_paciente(historial,resp) // esta fucion mustra los datos de un paciente
      esp = resp[0].especialidad
      function data_paciente(hst,cita){
        fetch('http://localhost:3000/api/onlyPaciente/'+hst)
        .then(resp => resp.json())
        .then(dataPaciente =>{
          
          paciente_consulta(hst,esp) // esta funcion es para poder traer la lista de consultas del paciente
          
          function paciente_consulta(hst, especialidad){
            fetch('http://localhost:3000/api/pacienteConsulta/' + hst + '/' + especialidad)        
              .then(resp => resp.json())
              .then(resp =>{   
                res.render('consulta_externa/reg_consulta',{
                  data_doc:data_user[token_id],
                  dataPaciente,
                  cita,
                  updateCita,                  
                  resp,  // esto es una lista de los pacientes 
                  msg:msg_Consulta_Externa[token_id],
                  fileAsArray 

                }) 
                remove_msg()
                function remove_msg(){
                  if(msg_Consulta_Externa[token_id] != null){
                    if(msg_Consulta_Externa[token_id].data.success == true){
                      remove(token_id),{expiresIn: 10* 30}
                     }
                  }
                 
                }
              })
              .catch(error => {
                  console.error('Error:', error)
                  res.send("no hay coneccion con el servidor");
              })
          }

          
        });
      }

    })
    .catch(error => {
        console.error('Error:', error)
        res.send("Ocurrio algo con el servidor");
    }) 
  }else{
    res.redirect('/')        
  }
})



router.get('/estado/:citaID/:historial/:token_id/:token_p', (req,res) =>{
  const { citaID, historial, token_id, token_p} = req.params
  fetch('http://localhost:3000/api/estado/'+citaID)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
      res.redirect('/consulta_externa/reg_consulta/'+ citaID + '/'+ historial + '/'+ token_id +'/'+ token_p);
    //res.status(200).send(data)
  })
});


//serv para insertar datos en la tabla consultas
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.post('/regConsulta/:citaID/:historial/:token_id/:token_p', (req, res) => {
 const { citaID, historial, token_id, token_p } = req.params
 var msg_p;
 // console.log(citaID," es esto<<<<<<<<<<<<<<<<<<<")
  var datos = req.body;
  //console.log(datos.hora.split("/")[1], "   <<<<<<<<<<<<<<  eso post")
  var esto = {
      method: 'POST',
      body: JSON.stringify(datos),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/reg_consulta/'+citaID,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
    if (data.success == true){
       
      if(msg_Consulta_Externa[token_id] == null){
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
          console.log(resp, " esto es la respuesta que quiero ver ")
          res.redirect('/consulta_externa/estado/'+citaID+'/'+historial+'/'+token_id+'/'+token_p);
        })
      }
       
      }else{
        if(msg_Consulta_Externa[token_id] == null){
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
        res.redirect('/consulta_externa/estado/'+citaID+'/'+historial+'/'+token_id+'/'+token_p);
      }      
  })
});

//ruta para poder actualizar los una consulta
router.post('/updateConsulta/:id/:citaID/:historial/:token_id/:token_p', (req,res) => {
  //console.log(idCIta, "  esto >>>")
  const { id, citaID, historial, token_id, token_p }= req.params;
  var datos = req.body;
  var esto = {
      method: 'POST',
      body: JSON.stringify(datos),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/updateConsulta/'+id,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
    
    res.redirect('/consulta_externa/reg_consulta/'+ citaID + '/'+ historial + '/'+ token_id +'/'+ token_p);
  })

})


/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                ruta para las recetas
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

router.get('/receta/:id_consulta/:token_id/:token_p', (req,res) => {
  const { id_consulta, token_id, token_p } = req.params
  
  if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_p){
     
    fetch('http://localhost:3000/api/OnlyConsulta/'+id_consulta)        
    .then(resp => resp.json())
    .then(ConsultaOnly =>{
      data_paciente(ConsultaOnly[0].numeroHistorial)
      function data_paciente(hst){
        fetch('http://localhost:3000/api/onlyPaciente/'+hst)
        .then(resp => resp.json())
        .then(paciente_Data =>{
          res.render('consulta_externa/receta',{          
            paciente_Data,
            ConsultaOnly,
            data_doc: data_user[token_id]
          })
        })
      }
    
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })  
  }else{
    res.redirect('/')
  }
})
/*
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
          ruta con vue 
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

router.post('/receta/:id_consulta', (req,res) => {
  const { id_consulta } = req.params
  var datos = req.body;
  var esto = {
      method: 'POST',
      body: JSON.stringify(datos),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/reg_Receta/' + id_consulta, esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => {  
    
    res.status(200).json(data)
  })
});

router.get('/vueReceta/:id_consulta', (req,res) => {
  const { id_consulta } = req.params
  fetch('http://localhost:3000/receta/'+id_consulta)        
      .then(resp => resp.json())
      .then(data =>{
        res.status(200).json(data)
      })
})

router.post('/VueupdateReceta/:id', (req,res) => {
  const { id } = req.params;
  var data = req.body  
  var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/updateReceta/'+id,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
    res.status(200).json(data)     
  }) 
})

/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/


/* 
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
          ruta para papeleta de internacion 
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

router.get('/papeleta_internacion/:id_consulta/:token_id/:token_p', (req,res) => {
  const {id_consulta, token_id, token_p } = req.params
  if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_p){
     
    fetch('http://localhost:3000/api/OnlyConsulta/'+id_consulta)        
    .then(resp => resp.json())
    .then(one_consulta =>{
      data_paciente(one_consulta[0].numeroHistorial)
      function data_paciente(hst){
        fetch('http://localhost:3000/api/onlyPaciente/'+hst)
        .then(resp => resp.json())
        .then(dataPaciente =>{

          one_papeleta()
          function one_papeleta(){
            fetch('http://localhost:3000/api/onlyPInternacion/'+id_consulta)        
            .then(resp => resp.json())
            .then(resp =>{

              esp()
              function esp(){
                fetch('http://localhost:4600/api/especialidad')
                .then(resp => resp.json())
                .then(especialidad =>{
                  console.log(especialidad, "  <<<<<<<<<<<<<<<< esto es la especialidad xzxzx<<<<<<<<<<<")
                  res.render('consulta_externa/papeleta_internacion',{          
                    dataPaciente,
                    one_consulta,
                    data_doc: data_user[token_id],
                    resp,
                    especialidad,
                    msg:msg_Consulta_Externa[token_id],
                  })
                  remove_msg()
                  function remove_msg(){
                    if(msg_Consulta_Externa[token_id] != null){
                      if(msg_Consulta_Externa[token_id].data.success == true){
                        remove(token_id),{expiresIn: 10* 30}
                       }
                    }
                  
                  }
                })
              }
              
            })
          }          
          
        })
      }
    
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })  
  }else{
    res.redirect('/')
  }
  
})


router.post('/Pinternacion/:id_consulta/:token_id/:token_p',(req,res) => {
  const {id_consulta, token_id, token_p } = req.params;
  var datos = req.body;
  var msg_p;
  var esto = {
      method: 'POST',
      body: JSON.stringify(datos),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/papeletaIntConsulta/'+ id_consulta, esto)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(data => {  
        if (data.success == true){
       
          if(msg_Consulta_Externa[token_id] == null){
            msg_p = {
              success:true,
              msg:data.msg
            }
            msg_data(msg_p,token_id)
          }else{
            msg_p = {
              success:true,
              msg:data.msg
            }
            remove(token_id)
            msg_data(msg_p,token_id)
          }
          res.redirect('/consulta_externa/papeleta_internacion/'+id_consulta+"/"+token_id+"/"+token_p);
          }else{
            if(msg_Consulta_Externa[token_id] == null){
              msg_p = {
                success:false,
                msg:data.msg
              }
              msg_data(msg_p,token_id)
            }else{
              msg_p = {
                success:false,
                msg:data.msg
              }
              remove(token_id)
              msg_data(msg_p,token_id)
            }
            res.redirect('/consulta_externa/papeleta_internacion/'+id_consulta+"/"+token_id+"/"+token_p);
          }          
        
      })
});


router.post('/updateInternacion/:id/:id_consulta/:token_id/:token_p', (req,res) => {
  const { id, id_consulta, token_id, token_p } = req.params;
  var data = req.body;
  var msg_p
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
        if (data.success == true){
       
          if(msg_Consulta_Externa[token_id] == null){
            msg_p = {
              success:true,
              msg:data.msg
            }
            msg_data(msg_p,token_id)
          }else{
            msg_p = {
              success:true,
              msg:data.msg
            }
            remove(token_id)
            msg_data(msg_p,token_id)
          }
          res.redirect('/consulta_externa/papeleta_internacion/'+id_consulta+"/"+token_id+"/"+token_p);
          }else{
            if(msg_Consulta_Externa[token_id] == null){
              msg_p = {
                success:false,
                msg:data.msg
              }
              msg_data(msg_p,token_id)
            }else{
              msg_p = {
                success:false,
                msg:data.msg
              }
              remove(token_id)
              msg_data(msg_p,token_id)
            }
            res.redirect('/consulta_externa/papeleta_internacion/'+id_consulta+"/"+token_id+"/"+token_p);
          }          
        
      })
})

/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

/* 
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        Rutas para  datos de los responsables
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

router.get('/esto1', (req,res) => {
  res.send(update_responsable)
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

router.get('/delete/:id_paciente/:token_id/:token_p', (req,res) => {
  const { id_paciente, token_id, token_p } = req.params
  remove_responsable_data(id_paciente)
  res.redirect('/consulta_externa/Data_responsable/'+id_paciente+'/'+token_id+'/'+token_p) 
})
// nota para que funcione  esto se tiene que mandar el id del paciente

router.get('/Data_responsable/:id_paciente/:token_id/:token_p', (req,res) => {
  const { id_paciente, token_id, token_p } = req.params
  if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_p){
    fetch('http://localhost:3000/api/paciente_id/'+id_paciente)
    .then(resp => resp.json())
    .then(dataPaciente =>{
      lista_resposables()
      function lista_resposables(){
        fetch('http://localhost:3000/api/responsable_list/'+id_paciente)
        .then(resp => resp.json())
        .then(list_responsables =>{
          res.render('consulta_externa/data_responsable',{
            dataPaciente,
            data_doc: data_user[token_id],
            list_responsables,
            update_r:update_responsable[token_id]
          })  
        })
      }
             
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
  }else{
    res.redirect('/')
  }

  
})


router.get('/one_responsable/:id/:id_paciente/:token_id/:token_p', (req,res) => {
  const { id,id_paciente,token_id,token_p } = req.params;
  fetch('http://localhost:3000/api/update_responsable/'+id)
      .then(resp => resp.json())
      .then(resp =>{
        if(update_responsable[token_id] == null){
          responsable(resp, token_id)
          res.redirect('/consulta_externa/Data_responsable/'+id_paciente+'/'+token_id+'/'+token_p)      
        }else{
          remove_responsable_data(token_id)
          responsable(resp, token_id)
          res.redirect('/consulta_externa/Data_responsable/'+id_paciente+'/'+token_id+'/'+token_p) 
        }
            
      })
      .catch(error => {
          console.error('Error:', error)
          res.send("no hay coneccion con el servidor");
  })
})

//ruta para poder registrar data de responsable
router.post('/reg_responsable/:id_paciente/:token_id/:token_p', (req,res) => {
  const { id_paciente, token_id, token_p } = req.params;
  var data = req.body;
  var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/responsable/'+id_paciente,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
      res.redirect('/consulta_externa/Data_responsable/'+id_paciente+'/'+token_id+'/'+token_p);
  })
})

//ruta para poder actualizar responsable
router.post('/update_responsable/:id/:id_paciente/:token_id/:token_p', (req,res) => {
  const { id, id_paciente, token_id, token_p } = req.params
  var data = req.body;
  var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/update_responsable/'+id,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
    res.redirect('/consulta_externa/one_responsable/'+id+'/'+id_paciente+'/'+token_id+'/'+token_p)     
  })
})

/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                          ruta para mostrar medicamentos de farmacia
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

router.get('/medicamentos', (req,res) => {
  fetch('http://localhost:3200/api/mostrar_medicamentos')
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
    res.status(200).json(data)
  })
})

router.get('/vue_one_medicamentos/:nombre_medicamento', (req,res) => {
  const { nombre_medicamento } = req.params
  fetch('http://localhost:3200/api/nonbre_medicamento/'+nombre_medicamento)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
    res.status(200).json(data)
  })
})

module.exports = router;