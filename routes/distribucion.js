const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var url = require('./url/export');

//ruta para renderizar distribucion
router.get('/distribucion',(req,res) => {
    fetch(url.name.urlFarmacia+'/api/medicamento')
    .then(res => res.json())
    .then(resp => { 
        res.render('Almacen/distribucion', {
            resp,
            products : generateArray(),
        });
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })   
});

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
                price: resp[0].precio
            }
            cart(car,id.id)
            console.log ( generateArray() )
            res.redirect('/distribucion/distribucion');
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })    
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



module.exports = router;