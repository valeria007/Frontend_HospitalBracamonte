const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/pedidos',(req, res) => {
    fetch('http://localhost:3500/api/medicamento')   
        .then(resp => resp.json())
        .then(resp =>{
            //console.log(products," eeeeeeeeeeeeeeeeeeee");
            res.render('pedidos',{
                resp,
                products : generateArray(),
                totalQty,
                totalPrice
            });
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
            //res.send(carrito);
            cart(car,id.id)
            console.log (totalPrice);
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

module.exports = router;