const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var url = require('./url/export');


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

router.get ('/limpiar',(req,res) => {
    onlyDist = null
    res.redirect('/distribucion/distribucion');
});
// este serv sirve para mandar una sola distribucion
let onlyDist;
router.get('/onlyDist/:id', (req,res) => {
    const { id } = req.params;
    fetch(url.name.urlFarmacia+'/api/onlyDist/'+id)
        .then(res => res.json())
        .then(resp => {
            onlyDist = resp;
            res.redirect('/distribucion/distribucion');
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        }) 
})

//ruta para renderizar distribucion
router.get('/distribucion',(req,res) => {

    
    if(listDist == null){
        res.redirect('/distribucion/listDistribucion');
    }else{
        fetch(url.name.urlFarmacia+'/api/medicamento')
        .then(res => res.json())
        .then(resp => { 
            res.render('Almacen/distribucion', {
                resp,
                products : generateArray(),
                listDist,
                onlyDist,
                message // este valor es para ver si se selecciono un producto para la distribucion
            });
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        }) 
    }  
});

//serv para listar las distribuciones
var listDist;
router.get('/listDistribucion', (req,res) => {
    fetch(url.name.urlFarmacia+'/api/distribucion')
    .then(res => res.json())
    .then(resp => { 
        listDist = resp;
        res.redirect('/distribucion/distribucion');
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })  
})

//rutaa para sacar un producto y mandarlo a lista de distribucion

router.get('/carrito/:id', (req,res)=>{
    var id = req.params;
    fetch(url.name.urlFarmacia+'/api/OnlyMedicamento/'+id.id)   
        .then(resp => resp.json())
        .then(resp =>{
            var car = {
                id: resp[0].id,
                codificacion: resp[0].codificacion,
                nombre: resp[0].nombre,
                presentacion: resp[0].presentacion,
                cantidad: resp[0].cantidad,
                unidades: resp[0].unidades,
                price: resp[0].precio
            }
            cart(car,id.id)
            
            res.redirect('/distribucion/distribucion');
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })    
});

//ruta para reducir uno del carrito
router.get('/reduce/:id', (req,res) => {
    var id = req.params;
    reduceOne(id.id);
    res.redirect('/distribucion/listDistribucion')
});

//ruta para poder quitar todo ese producto del carrito
router.get('/removeAll/:id', (req,res) => {
    var id = req.params;
    removeAll(id.id);
    res.redirect('/distribucion/listDistribucion');
});

var items = items || {};
var totalQty = totalQty || 0;
var totalPrice = totalPrice || 0;

function cart(item, id){
    var farmaco = items[id];
    if (!farmaco){
        farmaco = items[id] = {
            item : item,
            qty : 0,
            price : 0
        }
    }
    farmaco.qty++;
    farmaco.price = farmaco.item.price * farmaco.qty;
    totalQty++;
    totalPrice += 1*farmaco.item.price ;
}

function reduceOne (id){
    items[id].qty--;
    items[id].price -= items[id].item.price;
    totalQty--;
    totalPrice -= items[id].item.price;
    if(items[id].qty <= 0){
        delete items[id];
    }
}

function removeAll(id){
    totalQty -= items[id].qty;
    totalPrice -= items[id].price;
    delete items[id];
};

function generateArray() {
    let arr = [];
    for (const id in items) {
        arr.push(items[id]);
    }
    return arr;
}

router.get('/delete_All', (req,res) => {
    var productos = generateArray()
    for (var i = 0; i < productos.length; i++){
        removeAll(productos[i].item.id);        
    }
    res.redirect('/distribucion/listDistribucion');
    
})


//ruta para reducir el medicamento
router.get('/Medicamento_Reduce', (req,res) => {
    var productos = generateArray();
    for(var i = 0; i< productos.length; i++){
        var unidades = { unidades: productos[i].qty}
        var esto = {
            method: 'POST',
            body: JSON.stringify(unidades),
            headers:{
              'Content-type' : "application/json"
            }
        };
        fetch(url.name.urlFarmacia+'/api/reduce/'+productos[i].item.id,esto)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => { 
          res.redirect('/distribucion/delete_All');        
        }) 
    }     
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


module.exports = router;