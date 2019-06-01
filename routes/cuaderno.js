const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/cuaderno',(req,res) => {
    res.render('cuadernos/homeCuaderno');
});

router.get('/especialidad', (req,res) => {
    fetch('http://localhost:3000/api/servicios/')        
    .then(resp => resp.json())
    .then(resp =>{
        if(resp == ""){                
            res.render('cuadernos/especialidad',{resp});
        }else{
            res.render('cuadernos/especialidad',{resp});
        }
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })   
});

router.post('/especilidad', (req,res) => {
    let data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/servicios/',esto)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {
            console.log(data)    
            res.redirect('/cuaderno/especialidad');
        })
});

router.get('/OnlyEspecialidad/:id', (req,res) =>{
    let id = req.params.id;
    fetch('http://localhost:3000/api/servOne/'+id)        
    .then(resp => resp.json())
    .then(resp =>{
        if(resp == ""){                
            res.render('cuadernos/especialidadUPDATE',{resp});
        }else{
            res.render('cuadernos/especialidadUPDATE',{resp});
        }
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("No hay coneccion con el servidor");
    })  
});

router.post('/UpdateEspecialidad/:id',(req,res) => {
    let id = req.params.id
    let data = req.body
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/UpdateServicios/'+id,esto)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {    
            res.redirect('/cuaderno/especialidad');
    })
});

module.exports = router;