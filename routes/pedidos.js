const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/pedidos',(req, res) => {
    fetch('http://localhost:3500/api/medicamento')   
        .then(resp => resp.json())
        .then(resp =>{
            console.log(carrito," eeeeeeeeeeeeeeeeeeee");
            res.render('pedidos',{resp,carrito});
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })    
});

var carrito = [];
router.get('/carrito/:id', (req,res)=>{
    var id = req.params;
    fetch('http://localhost:3500/api/OnlyMedicamento/'+id.id)   
        .then(resp => resp.json())
        .then(resp =>{
            var car = {
                codificacion: resp[0].codificacion,
                nombre: resp[0].nombre,
                cantidad: resp[0].cantidad,
                precio: resp[0].precio
            }
            carrito.push(car);
            //res.send(carrito);
            res.redirect('/pedidos/pedidos');
            console.log(car, "esto es el car")
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })    
});

module.exports = router;