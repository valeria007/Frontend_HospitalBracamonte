const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var url = require('./url/export');

//para renderizar una vista de botones donde esta doctor y enfermera temporalmente
router.get('/viewTemporal', (req,res) => {
    fetch(url.name.cuadernos+'/api/especialidad') // esta ruta solo trae los datos de tipo true
    .then(resp => resp.json())
    .then(resp =>{
        res.render('hospitalizaciones/viewFirst',{
            resp
        })
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })    
});

//serv para mostrar home hospitalizacion o internacion
router.get('/hospitalizacion/:especialidad',(req, res) => {
    const { especialidad } = req.params
    res.render('hospitalizaciones/homeHospitalizacion',{
        especialidad //esto manda la especialdad
    })       
});


//ser para renderizar lista hospitalizacion mostrando 
//la lista de ordenes de internacion que se mandan desde consulta o emergencia
router.get('/ListInternacion/:especialidad', (req,res) => {
    const { especialidad } = req.params;
    fetch(url.name.url+'/api/PinterTrue/'+especialidad) // esta ruta solo trae los datos de tipo true
    .then(resp => resp.json())
    .then(resp =>{
        console.log(especialidad, " esto es la especialidad  <>>>>>>>>>>>>>")
        /*var data = resp.map(function(item){
            return { nombre2:item.nombre}
        })
        console.log(data)
        resp.forEach(function(item){
            console.log(item.estado, " >>>>>>>>>>>>>>>>>>>")
        })*/
       // console.log(listFalse)
       
        res.render('hospitalizaciones/listasHospitalizacion',{
            resp,
            listFalse,// lleva la lista de tipo false
            especialidad
        })
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
});

// esta ruta es para traer la lista de internacion de tipo false
var listFalse , especialidad1;
router.get('/ListaInternacionF/:especialidad', (req,res) => {
    const { especialidad } = req.params;
    especialidad1 = especialidad;
    fetch(url.name.url+'/api/PinterFalse/'+especialidad) // esta ruta solo trae los datos de tipo true
    .then(resp => resp.json())
    .then(resp =>{
        listFalse = resp;
        res.redirect('/internaciones/ListInternacion/'+especialidad);
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
});





/*
<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<
            regsitro de internacion
>>>>>>><<<<<<<<<<>>>>>>>>>><<<<>>><>>><<>>><<>>><
<<<<<<<>><<<<><<<>><<<><<<>><<>>><<>>><<>>>><<<>>
*/

//ruta para renderizar el form de internacion
router.get('/renderInternacion', (req,res) => {
    res.render('hospitalizaciones/reg_internacion',{
        Pint,
        especialidad : especialidad1
    });
});

//esta ruta es para poder traer una papeleta de internacion
var Pint;
router.get('/only_pInternacion/:id/:tipoCons', (req,res) => {
    const { id, tipoCons } = req.params;
    fetch(url.name.url+'/api/one_Pinternacion/'+id+"/"+tipoCons) 
    .then(resp => resp.json())
    .then(resp =>{
        console.log(resp, "  <<<<<<<<<<<<<<<<<<<<  esto es la respuesta que quiero")
        Pint = resp;
        res.redirect('/internaciones/renderInternacion');
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 

});

//ROUTA PARA INSERTAR
router.post('/internacion', (req,res) => {
    //const { id } = req-params;
    var data = req.body
    res.send(data);
});


module.exports = router;