const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const datas = require('./url/export');

router.post('/loginAlmacen',(req,res) => {
    var data = req.body
    res.status(200).json(data)
})

router.get('/pedidos',(req, res) => {
    fetch('http://localhost:3500/api/pedido')   
        .then(resp => resp.json())
        .then(resp =>{
            console.log(resp)
            res.render('Almacen/pedidos',{
               
                resp
            })
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
        if(datas.name.token[resp.id]){
            var status
            for(var i = 0; i < resp.role.length; i++ ){
                if(resp.role[i].name == "Almacen"){
                    status = "tiene permiso"
                }
            }  
            if(status == "tiene permiso"){
                fetch('http://localhost:3600/api/personal/'+resp.perso_id)
                .then(resp => resp.json())
                .catch(error => console.error('Error',error))
                .then(resp => {
                    //res.send(resp)
                    res.render('Almacen/home',{
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
    pass = null
    res.redirect('/almacen/grupoAsig'); 
})
var msg, pass, err;
///estos serv son para añadir a la tabla o al modelo grupo Asignacion
router.get('/grupoAsig',(req, res) => {
    fetch('http://localhost:3500/api/asignacion')   
        .then(resp => resp.json())
        .then(resp =>{
            res.render('Almacen/grupoAsig',{
                resp,
                oneGrupoAsig,
                msg,
                pass,
                err
            });
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
            msg = data.message;
            err = req.body;
            console.log(err.codigo, " esto es el err <<<<<<<<<<<<<<<<<")
            res.redirect('/almacen/grupoAsig');
            pass = null
        }else{
            pass = data.message;
            res.redirect('/almacen/grupoAsig'); 
            msg = null;
            err = null;
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
      if (data.success == false){
          msg = data.message
          res.redirect('/almacen/GrupoAsigONLY/'+id.id);
      }else{
        pass = data.message
        res.redirect('/almacen/GrupoAsigONLY/'+id.id);       
        msg = null
      }  
      
    })

});

module.exports = router;