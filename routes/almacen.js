const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


router.get('/home', (req,res) => {
    res.render('Almacen/home');
});
router.get('/kardexValorizado', (req,res) => {
    res.render('Almacen/kardexValorizado');
});
router.get('/med_ven', (req,res) => {
    res.render('Almacen/med_ven');
});
router.get('/reportes_pedidos', (req,res) => {
    res.render('Almacen/reportes_pedidos');
});
router.get('/reportes_salidas', (req,res) => {
    res.render('Almacen/reportes_salidas');
});


router.get('/volver', (req,res) => {
    oneGrupoAsig = null
    res.redirect('/almacen/grupoAsig'); 
})

///estos serv son para añadir a la tabla o al modelo grupo Asignacion
router.get('/grupoAsig',(req, res) => {
    fetch('http://localhost:3500/api/asignacion')   
        .then(resp => resp.json())
        .then(resp =>{
            res.render('Almacen/grupoAsig',{resp,oneGrupoAsig});
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});

router.post('/grupoAsig', (req, res) => {
    var data = req.body
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3500/api/asignacion',esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        if(data.success == false){
            res.send(data.message)
        }else{
            console.log(data)
            res.redirect('/almacen/grupoAsig'); 
        }
    })
});

var oneGrupoAsig;
router.get('/GrupoAsigONLY/:id', (req,res) => {
    var id = req.params
    fetch('http://localhost:3500/api/GrupoAsigONLY/'+id.id)   
        .then(resp => resp.json())
        .then(resp =>{
            oneGrupoAsig = resp;
            res.redirect('/almacen/grupoAsig'); 
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});

router.post('/updateGPA/:id', (req,res) =>{
    var data = req.body
    var id = req.params
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3500/api/GrupoAsigUPDATE/'+id.id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {      
      res.redirect('/almacen/GrupoAsigONLY/'+id.id);
    })

});

module.exports = router;