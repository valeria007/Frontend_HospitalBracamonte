const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

//servicio para traer datos de citas medicas o fichas pero que solo muestre los de emergencia
var dataCita;
router.get('/ListaEmergenciaDoc/:id',(req, res) => {
    var id = req.params;
    fetch('http://localhost:3000/api/citas/'+id.id)        
    .then(resp => resp.json())
    .then(resp =>{
        if(resp == ""){                
            res.render('ListaEmergenciaDoc',{resp});
        }else{

            dataCita = resp;
            res.render('ListaEmergenciaDoc',{resp});
        }
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })    
});

//serv pricipal que muestra los datos de emergencia
/*router.get('/renderEmergencia', (req,res) => {
    res.render('ListaPacienteDoc', {
        dataCita
    })
});*/


module.exports = router;