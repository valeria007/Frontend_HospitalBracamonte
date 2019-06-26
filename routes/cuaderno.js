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

module.exports = router;