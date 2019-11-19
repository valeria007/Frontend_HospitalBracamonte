const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const datas = require('./url/export');

var data_token = {
  token_id: '',
  token_p: ''
}

var citas_dia = {}
function add(token,id){
  let storedItem = citas_dia[id];
    if (!storedItem) {
      storedItem = citas_dia[id] = {
        data: token,
        qty: 0
      };
    }
    storedItem.qty++;
}

function array () {
  let arr = [];
  for (const id in citas_dia) {
      arr.push(citas_dia[id]);
  }
  return arr;
}

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                ruta para poder renderizar home citas 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/
var msg_false;
router.get('/home/:id/:token_part', (req,res) => {
  const { id,token_part } = req.params
    fetch('http://localhost:3600/api/user/'+id)
    .then(resp => resp.json())
    .catch(error => console.error('Error',error))
    .then(resp => {
      data_token.token_id = resp.id     // esto manda el el id para el token
      
        if(datas.name.token[resp.id] && datas.name.token[resp.id].data.token.split(" ")[1].split(".")[2] == token_part ){
            var status
            for(var i = 0; i < resp.role.length; i++ ){
                if(resp.role[i].name == "fichaje"){
                    status = "tiene permiso"
                }
            }  
            if(status == "tiene permiso"){
              data_token.token_p = token_part
                fetch('http://localhost:3600/api/personal/'+resp.perso_id)
                .then(resp => resp.json())
                .catch(error => console.error('Error',error))
                .then(resp => {
                    //res.send(resp)
                    res.render('Fichas/homec',{
                        resp,
                        data_token
                    })
                    status = null
                })
            }else{
              res.redirect('/')
            }
        }else{
          res.redirect('/')
        }
        
    })
});

router.get('/citas/:id/:token_part',(req, res) => {
  const { id, token_part } = req.params
  if(datas.name.token[id] && datas.name.token[id].data.token.split(" ")[1].split(".")[2] == token_part){
      fetch('http://localhost:3000/api/pacientes/')
      .then(resp => resp.json())
      .then(resp =>{
        console.log(msg_Consulta_Externa[id], "  <<<<<<<<<<<<   sadasdasdasdasdasdasd"   )
        console.log(data_token , " <<<<<<<<<<<<<<< < < < < <  < < < << ")
        res.render('Fichas/citas',{         //aqui esta la ruta
          resp,
          data_token,
          msg:msg_Consulta_Externa[id],
        });    
        setTimeout(() => {
          remove(id)
        }, 5000)
      })
      .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
      }) 
   
  }else{
    res.redirect('/')
  }
 
});



/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/
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
var url = require('./url/export');

router.get('/reg_paciente',(req, res) => {
    res.render('reg_paciente')
  });
 
  
router.post('/postPaciente/:token_id', (req,res) => {
  const { token_id } = req.params
  var aleatorio = Math.floor(Math.random()*(9000-1000))+1000
  var msg_p;
  var paciente = {
    numeroHistorial : aleatorio,
    nombre: req.body.nombre,
    apellidop: req.body.apellidop,
    apellidom: req.body.apellidom,
    ci: req.body.ci,
    fechanacimiento: req.body.fechanacimiento,
    sexo: req.body.sexo,
    estadocivil: req.body.estadocivil,
    direccion: req.body.direccion,
    zona: req.body.zona,
    telef: req.body.telef,
    ocupacion: req.body.ocupacion,
    idiomas: req.body.idiomas,
    lugranacimiento: req.body.lugranacimiento,
    departameto: req.body.departameto,
    provincia: req.body.provincia,
    municipio: req.body.municipio,
    id_user:data_token.token_id
  };
  //console.log(paciente);
  var esto = {
    method: 'POST',
    body: JSON.stringify(paciente),
    headers:{
      'Content-type' : "application/json"
    }
};
fetch('http://localhost:3000/api/pacientes',esto)
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
    res.redirect('/paciente/citaPAciente/'+data.pacienteData.id+"/"+data.pacienteData.numeroHistorial + '/' + data_token.token_p);
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
    res.redirect('/paciente/citas/'+token_id+'/'+data_token.token_p);
  }
})
});

//cita medica o ficha que se le va a dar al paciente

function sacar(id){
  console.log(id, "<z<zzzzzzzzzzzzzzzzzzzzzzzzzzz")
  fetch('http://localhost:3000/api/OneCita/'+id)
  .then(resp => resp.json())
  .then(resp =>{

    add(resp,resp[0].id)
    console.log(citas_dia, '>>>>>>>>>>>>>>>>>>>>>>>)')
  });
}

var datos;
router.post('/cita_medica/:id', (req,res) => {
  var id = req.params;
  datos = {
    id_user:req.body.id_user,
    codigo_p:req.body.codigo_p,
    saldo_total:req.body.saldo_total,
    especialidad:req.body.especialidad,
    turno:req.body.turno,
    medico:req.body.medico.split("/")[0],
    hora:req.body.hora,
    id_medico:req.body.medico.split("/")[1]
  };
  
  var esto = {
    method: 'POST',
    body: JSON.stringify(datos),
    headers:{
      'Content-type' : "application/json"
    }
  };
  fetch('http://localhost:3000/api/reg_cita/'+id.id,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(resp => {
    if(resp.success == true){

      sacar(resp.cita_pData.id) //esto saca el id para poder mandar a la funcion id

      cambiarEstadoHOra(datos.hora.split("/")[1]);

      function cambiarEstadoHOra(id){
        var estado = {
          estado: "reservado"
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
          console.log(resp, "  <<<<")
          res.redirect('/paciente/citas/'+data_token.token_id + '/' + data_token.token_p);
          msg_false = null
        })
      }
    }else{
      msg_false = resp.msg
      res.redirect('/paciente/EnviarCita/'+idH.id + "/" + idH.historial + '/'+ data_token.token_p);      
    }    
  }) 
});
/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            ruta para dar citas
<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><
<<<>><<<>><<<><>>><<<><<<>><<>><<>>>>><<<<
*/


router.get('/clean', (req,res) => {
  citaUpdate = null;
  res.redirect('/paciente/EnviarCita/'+idH.id + "/" + idH.historial + '/'+ data_token.token_p);
})

router.get('/EnviarCita/:id/:historial/:token_part', (req,res) => {
  var id = req.params; 
  if(datas.name.token[data_token.token_id] && datas.name.token[data_token.token_id].data.token.split(" ")[1].split(".")[2] == id.token_part){
    fetch('http://localhost:3000/api/OnlyCita/'+id.id)
    .then(resp => resp.json())
    .then(resp =>{
      res.render('Fichas/citas_fichas',{          //aqui esta la ruta
        historial: id.historial,
        id,
        pacienteCita, // esto contiene las citas de un paciente
        citaUpdate,
        data_token,
        msg_false,
        citas_dia
      });
    });
  }else{
    res.redirect('/');
  }
});


 //ruta para sacar todas las citas de un paciente
 let pacienteCita, idH;
 router.get('/citaPAciente/:id/:historial/:token_part',(req,res) => {
  var id = req.params;
  idH = id;
  fetch('http://localhost:3000/api/citasPaciente/'+id.id)
  .then(resp => resp.json())
  .then(resp =>{
    pacienteCita = resp;//aqui
    res.redirect('/paciente/EnviarCita/'+id.id + "/" + id.historial + '/' + id.token_part);
  });
 })

 //RUTA PARA PODER MODIFICAR UNA CITA 
 let citaUpdate;
 router.get('/onliCita/:id', (req,res) => {
   const { id } = req.params;
   if(datas.name.token[data_token.token_id] && datas.name.token[data_token.token_id].data.token.split(" ")[1].split(".")[2] == data_token.token_p){
    fetch('http://localhost:3000/api/OneCita/'+id)
    .then(resp => resp.json())
    .then(resp =>{
      citaUpdate = resp;
      res.redirect('/paciente/citaPAciente/'+citaUpdate[0].id_Paciente + "/" + citaUpdate[0].codigo_p + '/'+ data_token.token_p);
    });
   }else{
    res.redirect('/');
   }
  
 })
 
 

router.post('/updateCita/:id',(req,res) => {
  const { id } = req.params;
  if(req.body.especialidad == null){
    console.log("por favor selecione especialidad")
  }else if(req.body.medico == null){
    console.log("por favor selecione medico")
    
  }else{
    
    var update = {
      id_user:req.body.id_user,
      codigo_p:req.body.codigo_p,
      saldo_total:req.body.saldo_total,
      especialidad:req.body.especialidad,
      turno:req.body.turno,
      medico:req.body.medico.split("/")[0],
      hora:req.body.hora,
      id_medico:req.body.medico.split("/")[1]
    };
    var esto = {
      method: 'POST',
      body: JSON.stringify(update),
      headers:{
        'Content-type' : "application/json"
      }
    };
      fetch('http://localhost:3000/api/updateCita/'+id,esto)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(data => {
        liberar(citaUpdate[0].hora.split("/")[1])
        reservar(update.hora.split("/")[1])
        res.redirect('/paciente/onliCita/'+id);
    })
  }
})

function liberar (id){
  var estado = {
    estado: "libre"
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
    console.log(resp, "  liverado")
  })
}

function reservar(id){
  var estado = {
    estado: "reservado"
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
    console.log(resp, " reservado")
  })
}

router.post('/Vue_estado_libre_horas/:id', (req,res) => {
  const { id } = req.params;
  var estado = {
    estado: "libre"
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
    console.log(resp, " <<<<<<<<<<<<<")
    res.status(200).json({
      msg: true,
      resp      
    })
  })
})

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                      Vue rutas para cita medica
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/


router.get('/vueListTurnos/:dia/:turno', (req,res) => {
  var data = req.params
  fetch(url.name.cuadernos+'/api/ListAll/'+data.dia+"/"+data.turno)
  .then(resp => resp.json())
  .then(resp =>{
   res.status(200).json({
     msg: "Lista de turnos segun dia que incluye doctores",
     resp
   });
  });
})

//ruta para poder sacar de los doctores sus turnos
router.get('/doctorTurno/:id', (req,res) => {
  const { id } = req.params;
  fetch(url.name.cuadernos+'/api/doctTurnos/'+id)
  .then(resp => resp.json())
  .then(resp =>{
   res.status(200).json(resp);
  });
})

//ruta para mostrar especialidades
router.get('/vueEspecialidades_consulta', (req,res) => {
  fetch(url.name.cuadernos+'/api/list_consEsp')
  .then(resp => resp.json())
  .then(resp =>{
   res.status(200).json(resp);
  });
})

//ruta para mostrar docotres
router.get('/vueDoctores/:esp/:dia/:turno', (req,res) => {
  var data = req.params
  fetch(url.name.cuadernos+'/api/Esp_Turnos/'+data.esp+"/"+data.dia+"/"+data.turno)
  .then(resp => resp.json())
  .then(resp =>{
   res.status(200).json(resp);
  });
})


//imprimir receta
router.get('/imprimirRecetas', (req,res) => {
  res.render('consulta_externa/imprimirRecetas')
});

//rutas de vacunas
router.get('/vacunas', (req,res) => {
  res.render('consulta_externa/vacunas')
});

//ruta de examenes complementario
router.get('/O_Laboratorio', (req,res) => {
  res.render('consulta_externa/O_Laboratorio')
});

 
//para fichaje citas


router.get('/listasdeCitas', (req,res) => {
  res.render('Fichas/listasdeCitas')
});
//IMPRIMIR CITAS
router.get('/imprimirNuevaConsulta', (req,res) => {
  res.render('Fichas/imprimirNuevaConsulta')
});
router.get('/imprimirNuevaConsulta', (req,res) => {
  res.render('Fichas/imprimirNuevaConsulta')
});


//RECONSULTA
router.get('/citas_reconsulta', (req,res) => {
  res.render('Fichas/citas_reconsulta')
});

//Radiografia
router.get('/radiografia', (req,res) => {
  res.render('Radiografia/homeRa')
});
router.get('/listaPR', (req,res) => {
  res.render('Radiografia/listaPR')
});
router.get('/IntroducePR', (req,res) => {
  res.render('Radiografia/IntroducirPR')
});

//ECOGRAFIA
router.get('/ecografia', (req,res) => {
res.render('Ecografia/homeec')
});
router.get('/listaEC', (req,res) => {
  res.render('Ecografia/listaEC')
});
router.get('/IntroduceEC', (req,res) => {
  res.render('Ecografia/IntroducirEC')
});

//laboratorio
router.get('/laboratorio', (req,res) => {
  res.render('laboratorio/homeLab')
});
router.get('/buscaPaciente', (req,res) => {
  res.render('laboratorio/buscaPaciente')
});
router.get('/IntroducirLab', (req,res) => {
  res.render('laboratorio/IntroducirLab')
});

//HISTORIAL CLINICO REPORTES

router.get('/HistorialGeneral', (req,res) => {
  res.render('consulta_externa/HistorialGeneral')
});
router.get('/H_hospitalizacion', (req,res) => {
  res.render('consulta_externa/H_hospitalizacion')
});
router.get('/H_Emergencia', (req,res) => {
  res.render('consulta_externa/H_Emergencia')
});
router.get('/H_Consulta', (req,res) => {
  res.render('consulta_externa/H_Consulta')
});

router.get('/ultimaCOnsultaH',(req,res) =>{
  res.render('consulta_externa/ultimaCOnsultaH')
});
module.exports = router;