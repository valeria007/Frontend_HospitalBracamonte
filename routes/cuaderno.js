const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var url = require('./url/export');

router.get('/cuaderno',(req,res) => {
    res.render('cuadernos/homeCuaderno');
});

router.get('/limpiar', (req,res) => {
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
                espONE
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
       res.redirect('/cuaderno/especialidad')
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

router.get('/Cuadernos', (req,res) => {
    fetch(url.name.cuadernos+'/api/liscuaderno')
        .then(res => res.json())
        .then(resp => { 
            res.render('cuadernos/cuadernos',{
                resp,
                message,
                OnlyC
            })
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
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
let message;
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
            message = data.message;
            console.log(message);
           res.redirect('/cuaderno/Cuadernos')
        }else{
            message = null;
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

router.get('/limpiarMDoc', (req,res) => {
    modifDoct = null;
    res.redirect('/cuaderno/docCuaderno')
})

router.get('/docCuaderno', (req,res) => {
    
    fetch(url.name.pruebas+'/personal/personal')
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
    fetch(url.name.cuadernos+'/api/especialidad')
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
    var data = req.body
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
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
        idFechas = data.data.id
        console.log(idFechas, " esto es el id de la fecha que se manda")
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
        res.redirect('/cuaderno/turnos')
       
    })  
})
router.get('/delturno/:id', (req, res) => {
    var delR = req.url;
    fetch('http://localhost:4600'+delR)
    .then(resp => resp.json())
    .catch(error => console.error('Error:', error))
    .then(resp =>{
        console.log(resp);
        res.redirect('/cuaderno/turnos');
    });
  });


module.exports = router;