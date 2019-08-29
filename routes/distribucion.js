const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var url = require('./url/export');

router.get('/volver', (req,res) => {
    res.redirect('/distribucion/listDistribucion'); 
})
/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                    Vue rutas
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

//ruta para traer el medicamento
router.get('/vueMedicamento', (req,res) => {
    fetch(url.name.urlFarmacia+'/api/medicamento')
        .then(res => res.json())
        .then(resp => { 
           res.status(200).json(resp);
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        }) 
})

router.post('/vueMedicamento',(req,res) => {
    var data = req.body
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch(url.name.urlFarmacia+'/api/distribucion',esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
      res.status(200).json(data);
         
    })   
})

//ruta para mostrar todas las distribucion
router.get('/vueDistribucion', (req,res) => {
    fetch(url.name.urlFarmacia+'/api/distribucion')
    .then(res => res.json())
    .then(resp => { 
       res.status(200).json(resp);
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })  
})

//esta ruta es para reducir los datos son mandados des vue distribucion
router.post('/vueReduceStock', (req,res) => {
    var productos = req.body
    //console.log(productos.producto, "  <<<<<<<<<<<<<<<<<<<<<<")
    for(var i = 0; i< productos.producto.length; i++){
        var unidades = { unidades: productos.producto[i].qty}
        var esto = {
            method: 'POST',
            body: JSON.stringify(unidades),
            headers:{
              'Content-type' : "application/json"
            }
        };
        fetch(url.name.urlFarmacia+'/api/reduce/'+productos.producto[i].item.id,esto)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => { 
            res.status(200).json({
                msg: " Exito",
                data
            })        
        }) 
    }     
})


/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

/* router.get ('/limpiar',(req,res) => {
    onlyDist = null
    res.redirect('/distribucion/distribucion');
}); */
// este serv sirve para mandar una sola distribucion
router.get('/onlyDist/:id', (req,res) => {
    const { id } = req.params;
    fetch(url.name.urlFarmacia+'/api/onlyDist/'+id)
    .then(res => res.json())
    .then(resp => {
        res.status(200).json(resp)
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
}) 

//serv para listar las distribuciones
router.get('/listDistribucion', (req,res) => {
    fetch(url.name.urlFarmacia+'/api/distribucion')
    .then(res => res.json())
    .then(resp => { 
        res.render('Almacen/distribucion',{resp})
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })  
})

//serv para enviar distribucion
var message;
router.post('/distribucion', (req,res) => {
    if (generateArray() != "" ){
        var data = {
            codigo : req.body.codigo,
            responsable: req.body.responsable,
            recibe: req.body.recibe,
            fechaLlegada: req.body.fechaLlegada,
            productos:  generateArray()
        }
        var esto = {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-type' : "application/json"
            }
        };
        fetch(url.name.urlFarmacia+'/api/distribucion',esto)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => { 
          res.redirect('/distribucion/Medicamento_Reduce'); 
          message = null;       
        })   
    }else {
        message = " No se seleciono nada para la distribucion ";
        res.redirect('/distribucion/listDistribucion');      
    }
})


//rutas de nueva  distribucion

router.get('/nueva_distribucion', (req,res) => {
    res.render('Almacen/reg_distribucion')
})


module.exports = router;