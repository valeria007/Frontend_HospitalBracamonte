const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/oneVista', (req, res) => {
    res.render('emergencias/viewDocEnf');
});


//esta vista muesta la vista principal de emergencia segun doctor o enfermera 
router.get('/homeEmergencia/:id', (req, res) => {
    var DogOenf = req.params.id
    res.render('emergencias/homeEmergencia',{
        DogOenf //esta variable solo es para saver si es doct@r o enfermer@
    });
});

// este serv va servir para traer citas tipo solo emergencia
router.get('/listEmergencia/:id', (req, res) => {
    var DogOenf = req.params.id;
    fetch('http://localhost:3000/api/citas/emergencia')
        
        .then(resp => resp.json())
        .then(resp =>{ 
            if(resp == ""){                
                res.render('emergencias/listasEmergencias',{
                    DogOenf,  //esta variable solo es para saver si es doct@r o enfermer@
                    resp
                });
            }else{
                res.render('emergencias/listasEmergencias',{
                    DogOenf,  //esta variable solo es para saver si es doct@r o enfermer@
                    resp
                });
            }
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
   
});
module.exports = router;