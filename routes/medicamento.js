const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var url = "http://localhost:3500/api";

router.get('/volver', (req,res) => {
    oneGrupoAsig = null
    res.redirect('/medicamento/dataGrupoA'); 
})

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
router.get('/volver', (req,res) => {
    OnlyMedicamento = null;
    res.redirect('/medicamento/medicamentos');
})

router.get('/medicamentos',(req, res) => {
    fetch('http://localhost:3500/api/medicamento')   
        .then(resp => resp.json())
        .then(resp =>{
            console.log(resp);
            if(dataGRUPOa == null){
                res.render('Almacen/medicamentos',{dataGRUPOa,resp})
            }else{
                res.render('Almacen/medicamentos',{
                    dataGRUPOa,
                    resp,
                    OnlyMedicamento
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

//serv para mostrar un solo medicamento
let OnlyMedicamento
router.get('/OnlyMedicamento/:id',(req, res) =>{
    var id = req.params;
    fetch('http://localhost:3500/api/OnlyMedicamento/'+id.id)   
        .then(resp => resp.json())
        .then(resp =>{
            OnlyMedicamento = resp
            res.redirect('/medicamento/dataGrupoA')
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
});

router.post('/updateMedicamento/:id', (req,res) =>{
    var id = req.params;
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch(url+'/updateMedicamento/'+id.id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
      res.redirect('/medicamento/OnlyMedicamento/'+id.id);
    })

});

/*
<<<<<<<<<<<<<<<<>>>>>>>>>>>><<<<<>><<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<>>>>>>>><<<<<<<<<<<<<<<<<<<<<<
                Stock
<<<<<<<<<<<>>>>>>>>>>>>>>><<<<>><<<>>><<<><<<>><<<
<<<<<<<<<>>><<>>>>>>>>>>>>>>>>>>>>>>>><>>>>>>>>>><
*/

router.get('/stock', (req,res) => {
    fetch('http://localhost:3500/api/medicamento')   
        .then(resp => resp.json())
        .then(resp =>{         
            res.render('Almacen/stock_almacen',{
                resp
            })              
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
})


//rutas para cantida y fecha de medicamentos

router.get('/medFecha_cantidad/:id_medicamento', (req,res) => {
    const { id_medicamento } = req.params
    fetch('http://localhost:3500/api/listMedicamentos/'+id_medicamento)   
        .then(resp => resp.json())
        .then(resp =>{         
            res.render('Almacen/med_fecha_cantidad',{
                resp
            })           
    })
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })
   
})

module.exports = router;