const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var url = require('./url/export');
const datas = require('./url/export');


//rutas con vue

router.post('/vue_regConsultorio/:id_especialidad',(req,res) => {
    const { id_especialidad } = req.params
    var data = req.body
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch(url.name.cuadernos+'/api/reg_consEsp/' + id_especialidad,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        console.log(data)
        res.status(200).json(data)
    }) 
})

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

router.get('/cuaderno',(req,res) => {
    res.render('cuadernos/homeCuaderno');
});

router.get('/limpiar', (req,res) => {
    mg1= null;
    mg2=null;
    espONE = null;
    res.redirect('/cuaderno/especialidad');
})

//serv para renderizar y listar todas las especialidades
router.get('/especialidad', (req,res) => {
    fetch(url.name.cuadernos+'/api/especialidad')
        .then(res => res.json())
        .then(resp => { 
            res.render('cuadernos/especialidad',{
                resp,
                espONE,
                mg1,
                mg2
            });
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        }) 
    
});
//serv para poder sacar una sola especialidad para que pueda ser actualizado
var espONE;
router.get('/oneEsp/:id', (req,res) => {
    const { id } = req.params;
    fetch(url.name.cuadernos+'/api/EspOne/'+id)
        .then(res => res.json())
        .then(resp => { 
            espONE = resp;
            res.redirect('/cuaderno/especialidad')
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        }) 
})
var mg1,mg2
//serv para poder insertar en cuadernos
router.post('/especialidad', (req,res) => {
    var data = req.body
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch(url.name.cuadernos+'/api/especialidad',esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        if(data.success == false){
            mg1=data.message
            res.redirect('/cuaderno/especialidad')
        }else{
            mg2=data.message
            res.redirect('/cuaderno/especialidad')
        }
    })  
})

//ser para poder actualizar especialidad
router.post('/updateEsp/:id', (req,res)=> {
    const { id } = req.params;
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch(url.name.cuadernos+'/api/updateEsp/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        if(data.success == false){
            res.redirect('/cuaderno/oneEsp/'+id)
        }
        mg2=data.message
        res.redirect('/cuaderno/oneEsp/'+id)
    })  
})


/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                            RUTAS PARA CUADERNOS
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

router.get('/limpiarC', (req,res) => {
    OnlyC = null;
    res.redirect('/cuaderno/Cuadernos')
})
router.get('/limpiar2', (req,res) => {
    mgconf = null;
    res.redirect('/cuaderno/Cuadernos')
})
router.get('/cuadernos1', (req,res) => {
    mgconf = null;
    res.redirect('/cuaderno/Cuadernos')
})
router.get('/Cuadernos', (req,res) => {
    fetch(url.name.cuadernos+'/api/liscuaderno')
        .then(res => res.json())
        .then(resp => { 
            res.render('cuadernos/cuadernos',{
                resp,
                mess,
                OnlyC,
                mgconf
            })
        })
        .catch(error => {
            console.error('Error:', error)
            res.render('404error');
        })     
})
//ruta para poder sacar una solo cuaderno
let OnlyC
router.get('/onlyCuadernos/:id', (req,res) => {
    const { id } = req.params;
    fetch(url.name.cuadernos+'/api/OnlyCuadernos/'+id)
        .then(res => res.json())
        .then(resp => { 
            OnlyC = resp;
            res.redirect('/cuaderno/Cuadernos')
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })   
})

//ruta para insertar en cuadernos
var mess, mgconf;
router.post('/cuadernos',(req,res) => {
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch(url.name.cuadernos+'/api/cuaderno',esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        if (data.success == false){
            console.log('esto esssssssssssssss',data)
            mess = data.message;
           res.redirect('/cuaderno/Cuadernos')
        }else{
            mess=null
            console.log('esto esssssssssssssss',data)
            mgconf= data.message;
            res.redirect('/cuaderno/Cuadernos')
        }
       
    })  
})

router.post('/updateCuaderno/:id', (req,res) => {
    const { id } = req.params;
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch(url.name.cuadernos+'/api/updateCuaderno/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {        
        res.redirect('/cuaderno/onlyCuadernos/'+id)       
    })  
})

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                            RUTA PARA MEDICOS 
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
//-http://localhost:3600/personal/personal

router.get('/volver_a_doctor', (req,res) => {
    res.redirect('/cuaderno/getEsp/'+idCuaderno)
})

router.get('/limpiarMDoc', (req,res) => {
    modifDoct = null;
    res.redirect('/cuaderno/docCuaderno')
})

router.get('/docCuaderno', (req,res) => {

    console.log(datas.name.token, " <<< esto deberia funcionar")
  
    
    var token = {

        method: 'GET',
        headers:{
          'Content-type' : "application/json",
          /*'Authorization': datas.name.token*/
        }
}
    fetch(url.name.pruebas+'/api/Only_Medicos',token)
    .then(res => res.json())
    .then(resp => { 
        res.render('cuadernos/turnos',{
            resp, // esto contiene los doctores
            esp,   // esto trae las especialidades
            listDoc,
            modifDoct
        });
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
})



//ruta que trae la lista segun id
let listDoc;
router.get('/ListaDoc', (req,res) => {
    fetch(url.name.cuadernos+'/api/doctores/'+idCuaderno)
    .then(res => res.json())
    .then(resp => { 
       listDoc = resp;
       
       res.redirect('/cuaderno/docCuaderno')
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
})

//ruta para modificar o actualizar
let modifDoct;
router.get('/midificarDoct/:id', (req,res) => {
    const { id } = req.params;
    fetch(url.name.cuadernos+'/api/IdDoct/'+id)
    .then(res => res.json())
    .then(resp => { 
       modifDoct = resp;
       res.redirect('/cuaderno/ListaDoc')
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
})


let idCuaderno, esp; // esto trae el id para insertar datos en la tabla doctor
router.get('/getEsp/:id', (req,res) => {
    const { id } = req.params
    idCuaderno = id;
    fetch(url.name.cuadernos+'/api/list_consEsp')
    .then(res => res.json())
    .then(resp => { 
        esp = resp;
       res.redirect('/cuaderno/ListaDoc')
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 

})

//ruta para insertar en doctor
let id_docCuaderno // esta id es para poder insertar en fechas
router.post('/docCuaderno', (req,res) => {
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch(url.name.cuadernos+'/api/doctor/'+idCuaderno,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {     
        id_docCuaderno =  data.data.id
        
        res.redirect('/cuaderno/FechaDoc/'+id_docCuaderno )   
       
    }) 
})

//ruta para poder actualizar 
router.post('/updateDoctCuaderno/:id', (req,res) => {
    const { id } = req.params
    var datas = req.body
    
    var esto = {
        method: 'POST',
        body: JSON.stringify(datas),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch(url.name.cuadernos+'/api/modifyDocCuadern/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {   
        
        res.redirect('/cuaderno/midificarDoct/'+id )   
       
    })  
    
})


/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                            RUTA PARA Fechas 
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

router.get('/volverFechas', (req,res) => {
    res.redirect('/cuaderno/FechaDoc/'+id_docCuaderno) //    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
})

router.get('/limpiarFecha',(req,res) => {
    onlyFecha = null
    res.redirect('/cuaderno/fechas')
})

router.get('/fechas', (req,res) => {
    res.render('cuadernos/fechas',{
        docFecha, //trae fecha de contrato del doctor
        onlyFecha //para mostar una sola fecha y luego poder actualizar
    })
})

//ruta para mostrar las fechas del doctor
let docFecha;
router.get('/FechaDoc/:id', (req,res) => {
    const { id } = req.params;
    id_docCuaderno = id;
    fetch(url.name.cuadernos+'/api/fechasList/'+id)
    .then(res => res.json())
    .then(resp => { 
        docFecha = resp;
       res.redirect('/cuaderno/fechas')
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
})

//ruta para poder actualizar mostrar una fecha
let onlyFecha;
router.get('/onlyfecha/:id', (req,res) => {
    const { id } = req.params;
    fetch(url.name.cuadernos+'/api/oneFecha/'+id)
    .then(res => res.json())
    .then(resp => { 
        onlyFecha = resp;
       res.redirect('/cuaderno/FechaDoc/'+id_docCuaderno)
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
})
var msge1, msge2;
let idFechas
router.post('/fechas', (req,res) => {
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch(url.name.cuadernos+'/api/fechas/'+id_docCuaderno,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {  
        console.log("aquiiiiiiiiiiiii",data) 
        idFechas = data.data.id  
        
            res.redirect('/cuaderno/turnos')
        
        
        
        
       
    })  
})

//ruta para poder actualizar fecha
router.post('/updateFecha/:id', (req,res ) => {
    const { id } = req.params;
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch(url.name.cuadernos+'/api/updateFecha/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {     
        res.redirect('/cuaderno/onlyfecha/'+id)
       
    })  
})

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                            RUTA PARA TURNOS 
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

router.get('/volver_a_trunos', (req,res) => {
    res.redirect('/cuaderno/turnos')
})

router.get('/turnos', (req,res) => {
    fetch(url.name.cuadernos+'/api/oneTurno/'+idFechas)
    .then(res => res.json())
    .then(resp => { 
        res.render('cuadernos/diasTurnos',{
            resp
        })
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
   
})

//ruta para mostrar todas los turnos segun si fecha
router.get('/fecahTurn/:id', (req,res) => {
    const { id }= req.params;
    idFechas = id
    res.redirect('/cuaderno/turnos')
})


router.post('/turnos', (req,res) => {
    var data = {
        cantiFicha: req.body.cantiFicha,
        diasAten: req.body.diasAten,
        turno: req.body.turno
    }
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch(url.name.cuadernos+'/api/turnos/'+idFechas,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {   
        if(data.success == false){
            console.log("aquiiiiiiiiiiiii",data)
            msge2=null
            msge1= data.message
        res.redirect('/cuaderno/turnos')
    }else{
        msge1=null
        msge2= data.message
        res.redirect('/cuaderno/turnos')
    }
    })  
})
router.get('/delturno/:id', (req, res) => {
    const { id }= req.params;
    fetch('http://localhost:4600/api/delete/'+id)
    .then(resp => resp.json())
    .catch(error => console.error('Error:', error))
    .then(resp =>{
        
        res.redirect('/cuaderno/turnos');
    });
  });


  /* 
<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                    rutas para especialidad consulta
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>><<<>>><<<>>><<>>><<>>><<<>>><<>><<<>>><<<>>><<<<
*/
//ruta para  especialidad consulta
var id_esp, oneEsp_consulta;

router.get('/one_null', (req,res) => {
    oneEsp_consulta = null
    res.redirect('/cuaderno/especialidad_consulta/'+id_esp)
})

router.get('/especialidad_consulta/:id_especialidad', (req,res) => {
    const { id_especialidad } = req.params;
    id_esp = id_especialidad;
    fetch('http://localhost:4600/api/list_EspCons/'+id_especialidad)
    .then(resp => resp.json())
    .catch(error => console.error('Error:', error))
    .then(resp =>{
        res.render('cuadernos/Especialidad_Consulta',{
            resp,
            id_especialidad,
            oneEsp_consulta
        });
    });
    
})

router.get('/one_consultaEsp/:id', (req,res) => {
    const { id } = req.params;
    fetch('http://localhost:4600/api/OneEspCons/'+id)
    .then(resp => resp.json())
    .catch(error => console.error('Error:', error))
    .then(resp =>{
        oneEsp_consulta = resp;
        res.redirect('/cuaderno/especialidad_consulta/'+id_esp)        
    });
})

//ruta para poder insertar en conaulta internacion
router.post('/reg_especialidad_consulta/:id_especialidad', (req,res) => {
    const { id_especialidad } = req.params
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch(url.name.cuadernos+'/api/reg_consEsp/'+id_especialidad,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {   
        res.redirect('/cuaderno/especialidad_consulta/'+id_especialidad)
       
    })  
})

//ruta para poder actualizar especialidad consultorio
router.post('/update_consulta_especialidad/:id', (req,res) => {
    const { id } = req.params
    var data = req.body
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch(url.name.cuadernos+'/api/modifyEspCons/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {   
        res.redirect('/cuaderno/especialidad_consulta/'+id_esp)
       
    })  
})
/*
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                        Ruta horarios de turno
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    
*/

var idTurno, turn;
router.get('/horarios_turnos/:id_turnos/:turno', (req,res) => {
    const { id_turnos, turno} = req.params
    idTurno = id_turnos;
    turn = turno;
    fetch('http://localhost:4600/api/listHoras_turno/'+id_turnos)
        .then(resp => resp.json())
        .catch(error => console.error('Error:', error))
        .then(resp =>{
            res.render('cuadernos/horarios_turnos',{
                resp
            })
    });  
})

    var hora = [];
    
    var numero = 1
    router.post('/insertarHorarios', (req,res) => {        
        var data = req.body
       
        if(turn == "Mañanas"){
            var horas = 8;
            var minutos = 0, num = data.minutos *1
            hora.push({h:horas+":"+minutos})
            for(var i = 0; i < data.cantiFicha - 1; i++){  
                if(horas == 12){
                    hora = []
                    res.send("Esa cantidad de fichas y el tiempo de atencion sobrepasa las 12 del medio dia")
                    
                }else{
                    if(minutos == 60){
                        minutos = 0
                        horas++  
                        hora.push({h:horas+":"+minutos})
                    }else {
                        minutos = minutos + num; 
                        if (minutos == 60){
                            minutos = 0
                            horas++
                        }
                        hora.push({h:horas+":"+minutos})
    
                    } 
                }                         
               

            }
        }else if(turn == "Tardes"){
            var horas = 14;
            var minutos = 0, num = data.minutos *1
            hora.push({h:horas+":"+minutos})
            for(var i = 0; i < data.cantiFicha - 1; i++){
                if(horas == 18) {
                    hora = []
                    res.send("se exedio")
                }else{
                    if(minutos == 60){
                        minutos = 0
                        horas++  
                        hora.push({h:horas+":"+minutos})
                    }else {
                        minutos = minutos + num; 
                        if (minutos == 60){
                            minutos = 0
                            horas++
                        }
                        hora.push({h:horas+":"+minutos})
    
                    } 
                }                          
               

            }
        }else{
            var horas = 18;
            var minutos = 0, num = data.minutos *1
            hora.push({h:horas+":"+minutos})
            for(var i = 0; i < data.cantiFicha - 1; i++){    
                if(horas == 22){
                    hora = []
                    res.send("se exedio en la cantidad de horas")
                } else{
                    if(minutos == 60){
                        minutos = 0
                        horas++  
                        hora.push({h:horas+":"+minutos})
                    }else {
                        minutos = minutos + num; 
                        if (minutos == 60){
                            minutos = 0
                            horas++
                        }
                        hora.push({h:horas+":"+minutos})
    
                    } 
                }                      
                

            }
        } 
        
        insertar(hora)        
        function insertar(hora1){ 
            fetch('http://localhost:4600/api/listHoras_turno/'+idTurno)
            .then(resp => resp.json())
            .catch(error => console.error('Error:', error))
            .then(resp =>{
                if(resp == ""){
                    for(var i = 0; i < hora1.length; i++){
                        
                        var data = {
                            hora : hora1[i].h
                        }
                        var esto = {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers:{
                              'Content-type' : "application/json"
                            }
                        };
                        fetch(url.name.cuadernos+'/api/hora_turno/'+idTurno,esto)
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(resp => { 
                        })
                        numero++  
                        if(hora1.length -1  == numero){   
                                              
                            hora = []
                            numero = 0
                            res.redirect('/cuaderno/horarios_turnos/'+idTurno+"/"+turn)
                        }else{
                            console.log("  esto ")
                        }  
                                             
                    }      
                }else{
                   res.send(" porfavor elimine las horas antes de volver a registrar ")
                } 
            });    
        } 
    }) 

router.get('/de_paso',(req,res) => {
    fetch('http://localhost:4600/api/listHoras_turno/'+idTurno)
        .then(resp => resp.json())
        .catch(error => console.error('Error:', error))
        .then(resp =>{
            res.redirect('/cuaderno/horarios_turnos/'+idTurno+"/"+turn)
    });  
})

router.get('/horaslist', (req,res) => {

    fetch('http://localhost:4600/api/listHoras_turno/'+idTurno)
        .then(resp => resp.json())
        .catch(error => console.error('Error:', error))
        .then(resp =>{
            
            eliminar(resp)
            function eliminar(resp){
                for( var i = 0; i < resp.length; i++){
                    fetch('http://localhost:4600/api/delete_horas_turnos/'+resp[i].id)
                    .then(resp => resp.json())
                    .catch(error => console.error('Error:', error))
                    .then(resp =>{
                    }); 
                }
                
            }
            
    }); 
    res.redirect('/cuaderno/de_paso')   
})


/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            ruta para poder todos los datos de un doctor
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

*/

router.get('/alldataDoctor/:id/:id_cuaderno', (req,res) => {
    const  { id,id_cuaderno } = req.params
    fetch('http://localhost:4600/api/docAllData/'+id)
        .then(resp => resp.json())
        .catch(error => console.error('Error:', error))
        .then(resp =>{
            res.render('cuadernos/dataDocAll',{
                resp,
                id_cuaderno
            })
    });
})

//ruta vue

router.get('/vueCuaderno/:id', (req,res) => {
    const { id } = req.params;
    fetch('http://localhost:4600/api/docAllData/'+id)
    .then(resp => resp.json())
    .catch(error => console.error('Error:', error))
    .then(resp =>{
        res.status(200).json(resp)
    });
})

router.get('/VueDoctores/:id_cuaderno', (req,res) => {
    const { id_cuaderno } = req.params
    fetch(url.name.cuadernos+'/api/doctores/'+id_cuaderno)
    .then(res => res.json())
    .then(resp => { 
       res.status(200).json(resp);
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
})

module.exports = router;