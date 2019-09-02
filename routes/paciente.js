const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const datas = require('./url/export');

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                ruta para poder renderizar home citas 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

router.get('/citas',(req, res) => {
  fetch('http://localhost:3000/api/pacientes/')
  .then(resp => resp.json())
  .then(resp =>{
    res.render('Fichas/citas',{         //aqui esta la ruta
      resp
    });    
  })
  .catch(error => {
    console.error('Error:', error)
    res.send("no hay coneccion con el servidor");
  }) 
});

router.get('/home/:id', (req,res) => {
  const { id } = req.params
    fetch('http://localhost:3600/api/user/'+id)
    .then(resp => resp.json())
    .catch(error => console.error('Error',error))
    .then(resp => {
      console.log(resp, " <<<<<<<<<<<<<<<<<<<<<<<<<<<<<" )
        if(datas.name.token[resp.id]){
            var status
            for(var i = 0; i < resp.role.length; i++ ){
                if(resp.role[i].name == "fichaje"){
                    status = "tiene permiso"
                }
            }  
            if(status == "tiene permiso"){
                fetch('http://localhost:3600/api/personal/'+resp.perso_id)
                .then(resp => resp.json())
                .catch(error => console.error('Error',error))
                .then(resp => {
                    //res.send(resp)
                    res.render('Fichas/home',{
                        resp
                    })
                    status = null
                })
            }else{
                res.send("no tienes permiso fuera de aqui")
            }
        }else{
            res.send("fuera de aqui si no tienes cuenta")
        }
        
    })
});

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

var url = require('./url/export');

router.get('/reg_paciente',(req, res) => {
    res.render('reg_paciente')
  });
 
  
router.post('/postPaciente', (req,res) => {
  var aleatorio = Math.floor(Math.random()*(9000-1000))+1000
  var paciente = {
    numeroHistorial : aleatorio,
    nombre: req.body.nombre,
    apellidop: req.body.apellidop,
    apellidom: req.body.apellidom,
    ci: req.body.ci,
    fechanacimiento: req.body.fechanacimiento,
    edad: req.body.edad,
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
    npadre: req.body.npadre,
    apspadre: req.body.apspadre,
    nmadre: req.body.nmadre,
    apsmadre: req.body.apsmadre,
    nomrespon: req.body.nomrespon,
    aperespon: req.body.aperespon,
    telefres: req.body.telefres,
    direcres: req.body.direcres    
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
  res.redirect('/paciente/citaPAciente/'+data.pacienteData.id+"/"+data.pacienteData.numeroHistorial);
})
});

//cita medica o ficha que se le va a dar al paciente
router.post('/cita_medica/:id', (req,res) => {
  var id = req.params;
  var datos = req.body;
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
        res.redirect('/paciente/citas');
      })
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
  res.redirect('/paciente/EnviarCita/'+idH.id + "/" + idH.historial);
})

router.get('/EnviarCita/:id/:historial', (req,res) => {
  var id = req.params; 
  fetch('http://localhost:3000/api/OnlyCita/'+id.id)
  .then(resp => resp.json())
  .then(resp =>{
    res.render('Fichas/citas_fichas',{          //aqui esta la ruta
      historial: id.historial,
      id,
      pacienteCita, // esto contiene las citas de un paciente
      citaUpdate
    });
  });
 });


 //ruta para sacar todas las citas de un paciente
 let pacienteCita, idH;
 router.get('/citaPAciente/:id/:historial',(req,res) => {
  var id = req.params;
  idH = id;
  fetch('http://localhost:3000/api/citasPaciente/'+id.id)
  .then(resp => resp.json())
  .then(resp =>{
    pacienteCita = resp;
    console.log(pacienteCita, "  esto es lo que quiero")                   //aqui

    res.redirect('/paciente/EnviarCita/'+id.id + "/" + id.historial);
  });
 })

 //RUTA PARA PODER MODIFICAR UNA CITA 
 let citaUpdate;
 router.get('/onliCita/:id', (req,res) => {
   const { id } = req.params;
   fetch('http://localhost:3000/api/OneCita/'+id)
  .then(resp => resp.json())
  .then(resp =>{
    citaUpdate = resp;
    res.redirect('/paciente/citaPAciente/'+citaUpdate[0].id_Paciente + "/" + citaUpdate[0].codigo_p);
  });
 })
 
 

router.post('/updateCita/:id',(req,res) => {
  const { id } = req.params;
  if(req.body.especialidad == null){
    console.log("por favor selecione especialidad")
  }else if(req.body.medico == null){
    console.log("por favor selecione medico")
    
  }else{
    var update = req.body;
    console.log(update, " <<<<<<<<<<<<< esto es")
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
//cuenta
router.get('/miCuenta', (req,res) => {
  res.render('consultaExterna/miCuenta')
});

module.exports = router;