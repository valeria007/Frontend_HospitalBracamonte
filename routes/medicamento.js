const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var dataGRUPOa;
router.get('/dataGrupoA',(req,res) =>{
    fetch('http://localhost:3500/api/asignacion')   
        .then(resp => resp.json())
        .then(resp =>{
            if(resp == ""){
                res.send("no hay datos en grupo designacion, añadir grupo designacion")
            }else{
                dataGRUPOa = resp;
                res.redirect('/medicamento/medicamentos');
            }
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});

//serv para renderisar la vista medicamento con datos de la tabla grupo asignacion
router.get('/medicamentos',(req, res) => {
    fetch('http://localhost:3500/api/medico')   
        .then(resp => resp.json())
        .then(resp =>{
            if(dataGRUPOa == null){
                res.render('medicamentos',{dataGRUPOa})
            }else{
                res.render('medicamentos',{
                    dataGRUPOa,
                    resp
                })   
            }
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
  });

//servcio para añadir a la tabla medicamentos
router.post('/medicamentos', (req,res) =>{
    var data = req.body
    var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3500/api/medicamento',esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => { 
    res.redirect('/medicamento/dataGrupoA');
  })
});

module.exports = router;