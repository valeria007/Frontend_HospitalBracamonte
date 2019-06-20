const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/limpiar', (req,res) => {
    OnlyPedido = null;
    res.redirect('/pedidos/dataPEDIDOS');

})
//para sacar un pedido segun id
var OnlyPedido;
router.get('/onliPedido/:id', (req,res) => {
    const { id } = req.params;
    fetch('http://localhost:3500/api/OnlyPedido/'+id)   
    .then(resp => resp.json())
    .then(resp =>{
        OnlyPedido = resp;
        res.redirect('/pedidos/pedidos');
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })  
})

//renderizar vista pedido
router.get('/pedidos',(req, res) => {
    if(proveedor == null){
        res.redirect('/pedidos/pedidos/proveedor')
    }else{
        fetch('http://localhost:3500/api/medicamento')   
        .then(resp => resp.json())
        .then(resp =>{
            res.render('Almacen/pedidos',{
                proveedor,
                resp,
                products : generateArray(),
                totalQty,
                totalPrice,
                grup,
                dataPEDIDOS,
                message,
                OnlyPedido 
            });
    })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })    
    }
});

var grup;
router.get('/grup', (req,res) => {
    fetch('http://localhost:3500/api/asignacion')   
    .then(resp => resp.json())
    .then(resp =>{
        grup = resp;
        res.redirect('/pedidos/pedidos');
})
.catch(error => {
    console.error('Error:', error)
    res.send("no hay coneccion con el servidor");
})   
});

var dataPEDIDOS
router.get('/dataPEDIDOS', (req,res) => {
    fetch('http://localhost:3500/api/pedido')   
        .then(resp => resp.json())
        .then(resp =>{
            dataPEDIDOS = resp;
            res.redirect('/pedidos/grup');
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
});

var proveedor
router.get('/pedidos/proveedor', (req,res) => {
    fetch('http://localhost:3500/api/proveedor')   
        .then(resp => resp.json())
        .then(resp =>{
            proveedor = resp;
            res.redirect('/pedidos/dataPEDIDOS');
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })   
});


router.get('/carrito/:id', (req,res)=>{
    var id = req.params;
    fetch('http://localhost:3500/api/OnlyMedicamento/'+id.id)   
        .then(resp => resp.json())
        .then(resp =>{
            var car = {
                id: resp[0].id,
                codificacion: resp[0].codificacion,
                nombre: resp[0].nombre,
                cantidad: resp[0].cantidad,
                price: resp[0].precio
            }
            cart(car,id.id)
            //console.log (car);
            res.redirect('/pedidos/pedidos');
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })    
});

router.get('/reduce/:id', (req,res) => {
    var id = req.params;
    reduceOne(id.id);
    res.redirect('/pedidos/pedidos')
});

router.get('/removeAll/:id', (req,res) => {
    var id = req.params;
    removeAll(id.id);
    res.redirect('/pedidos/pedidos');
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
    res.redirect('/pedidos/pedidos/proveedor');
    
})

var message;
router.post('/pedidos', (req,res) => {
    if( generateArray() != ""){
        var data = {
            codigoCompra: req.body.codigoCompra, 
            boletaPago: req.body.boletaPago, 
            tipoMaterial: req.body.tipoMaterial, 
            fechaIngreso: req.body.fechaIngreso, 
            proveedor: req.body.proveedor, 
            cantidad: req.body.cantidad, 
            codigoProduct: req.body.codigoProduct,
            productosDelPedido:  generateArray(),
            Observaciones: req.body.Observaciones,
            subTotal: req.body.subTotal,
            iva: req.body.iva,
            total: req.body.total       
        }
        var esto = {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-type' : "application/json"
            }
        };
        fetch('http://localhost:3500/api/pedido',esto)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {  
            message = "";  
            res.redirect('/pedidos/delete_All')
        })
    } else {
        message = " No hay productos ";
        res.redirect('/pedidos/pedidos/proveedor');        
    }
});

module.exports = router;