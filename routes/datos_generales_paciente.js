const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var Static = require('../public/static/datas');

const datas = require('./url/export');



/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                    rutas para antecedentes
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

*/
// esta ruta es para poder mostrar todos los antecedentes del paciente
router.get('/lista_antecedentes/:id_cita/:id_paciente/:token_id/:token_p', (req,res) => {
    const { id_paciente,token_id,token_p,id_cita } = req.params;
    var update_paciente = [
        { id : 0}
    ]
    if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_p){
    fetch('http://localhost:3000/api/paciente_id/'+id_paciente)
        .then(resp => resp.json())
        .then(dataPaciente =>{
            res.render('antecedentes',{        
                dataPaciente,
                data_doc:datas.name.data_user[token_id],
                id_cita,
                update_paciente
            })  
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
    })  
    }else{
        res.redirect('/')
    }  
})

router.get('/vue_list_antecedentes/:id_paciente', (req,res) => {
    const { id_paciente } = req.params
    fetch('http://localhost:3000/api/one_ant/'+id_paciente)
    .then(resp => resp.json())
    .then(listAntecedentes =>{
        res.status(200).json(listAntecedentes)
    })
})

//ruta para poder mostrar un atecedente para poder  actulaizar antecedente
var update_paciente
router.get('/one_antecedente/:id', (req,res) => {
    const { id } = req.params;
    fetch('http://localhost:3000/api/update_antecedente/'+id)
        .then(resp => resp.json())
        .then(resp =>{
            update_paciente = resp;      
            res.redirect('/datos_generales_paciente/lista_antecedentes/'+idPaciente) ;            
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
    })
})

//ruta para poder insertar antecedentes
router.post('/vue_antecedentes/:id_paciente', (req,res) => {
    const { id_paciente } = req.params;
    var data  = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/antecedentes/'+id_paciente,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        res.status(200).json(data)
    })
})

//ruta para poder actulizar un antecedente
router.post('/update_antecedentes/:id', (req,res) => {
    const { id } = req.params;
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/update_antecedente/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
      res.redirect('/datos_generales_paciente/one_antecedente/'+id);
    })
})

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                    Rutas para alergias
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

router.get('/regresar', (req,res) => {
    update_Alergia = null
    res.redirect('/datos_generales_paciente/pacienteData')
})

var update_Alergia;

//ruta para poder mostrar la lista de alergias del paciente
router.get('/lista_alergias/:id_paciente/:token_id/:token_p/:id_cita', (req,res) => {
    const { id_paciente,token_id,token_p,id_cita } = req.params;
    if(datas.name.token[token_id] && datas.name.token[token_id].data.token.split(" ")[1].split(".")[2] == token_p){
        fetch('http://localhost:3000/api/paciente_id/'+id_paciente)
        .then(resp => resp.json())
        .then(resp =>{
            res.render('alergias',{
                dataPaciente : resp,
                
                data_doc:datas.name.data_user[token_id],
                update_Alergia,
                id_cita
            });            
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
        })
    }else{
        res.redirect('/')
    }
})
/* 
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        lista alergias
*/
router.get('/vue_list_alergias/:id_paciente', (req,res) => {
    const { id_paciente } = req.params
    fetch('http://localhost:3000/api/alergias_list/'+id_paciente)
    .then(resp => resp.json())
    .then(alergias_list =>{
        res.status(200).json(alergias_list)
    })
})


//ruta para poder mostrar una alergia para que pueda ser actualizado
router.get('/vue_one_alergia/:id', (req,res) => {
    const { id } = req.params;
    fetch('http://localhost:3000/api/One_alergias/'+id)
        .then(resp => resp.json())
        .then(resp =>{
            res.status(200).json(resp)     
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
    })
})


//ruta para poder insertar alergias
router.post('/vue_reg_alergias/:id_paciente', (req,res) => {
    const { id_paciente } = req.params
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/alergias/'+id_paciente,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
      res.status(200).json(data)
    })
})

router.post('/Vue_updateAlergia/:id', (req,res) => {
    const { id } = req.params;
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/update_alergia/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
      res.status(200).json(data)
    })
})

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            rutas para los examenes fisicos del paciente
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

var data_id_paciente, lis_exFisico, update_exFisico;

router.get('/regresar1', (req,res) => {
    update_exFisico = null
    res.redirect('/datos_generales_paciente/examenFisico')
})

router.get('/examenFisico', (req,res) => {
    fetch('http://localhost:3000/api/paciente_id/'+data_id_paciente)
        .then(resp => resp.json())
        .then(resp =>{
            res.render('examenFisico',{
                dataPaciente : resp,
                lis_exFisico,
                especialidad:  Static.static_data.tipo_especialidad,
                update_exFisico
            });            
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
    })
});


//ruta para poder mostrar todos los examenes fisicos del paciente
router.get('/list_exFisico/:id_paciente', (req,res) => {
    const { id_paciente } = req.params;
    data_id_paciente = id_paciente;
    fetch('http://localhost:3000/api/exFisico_list/'+id_paciente)
        .then(resp => resp.json())
        .then(resp =>{
            lis_exFisico = resp;
            res.redirect('/datos_generales_paciente/examenFisico')          
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
    })    
})

//esta ruta es para poder mostrar un examen fisico para que pueda ser actualizado
router.get('/one_ExFisico/:id', (req,res) => {
    const { id } = req.params
    fetch('http://localhost:3000/api/one_exFisico/'+id)
        .then(resp => resp.json())
        .then(resp =>{
            update_exFisico = resp;
            res.redirect('/datos_generales_paciente/list_exFisico/'+data_id_paciente)          
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
    })
}) 

//ruta para poder registrar un examen fisico
router.post('/reg_exFisico/:id_paciente', (req,res) => {
    const { id_paciente } = req.params;
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/examen_fisico/'+id_paciente,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
      res.redirect('/datos_generales_paciente/list_exFisico/'+id_paciente);
    })
})

router.post('/update_exFisico/:id', (req,res) => {
    const { id } = req.params;
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/update_exFisico/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        res.redirect('/datos_generales_paciente/one_ExFisico/'+id);
    })
})

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            rutas para los insertar los responsables
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/
var id_data_paciente, list_responsables, update_responsable

router.get('/voler12', (req,res) => {
    update_responsable = null;
    res.redirect('/datos_generales_paciente/datos_responsable')
})

router.get('/datos_responsable', (req,res) => {
    fetch('http://localhost:3000/api/paciente_id/'+id_data_paciente)
        .then(resp => resp.json())
        .then(resp =>{
            res.render('datos_responsable',{
                dataPaciente : resp,
                especialidad:  Static.static_data.tipo_especialidad,
                list_responsables,
                update_responsable
            });            
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
    })
});
  
//esta ruta muestra la lista de responsables del paciente
router.get('/list_responsables/:id_pacientes', (req,res) => {
    const { id_pacientes } = req.params;
    id_data_paciente = id_pacientes
    fetch('http://localhost:3000/api/responsable_list/'+id_pacientes)
        .then(resp => resp.json())
        .then(resp =>{
            list_responsables = resp;
            res.redirect('/datos_generales_paciente/datos_responsable');            
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
    })
})

//ruta para poder mostrar solo un responsable para que sea actualizado
router.get('/one_responsable/:id', (req,res) => {
    const { id } = req.params;
    fetch('http://localhost:3000/api/update_responsable/'+id)
        .then(resp => resp.json())
        .then(resp =>{
            update_responsable = resp;
            res.redirect('/datos_generales_paciente/list_responsables/'+id_data_paciente)          
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
    })
})

router.post('/reg_responsable/:id_paciente', (req,res) => {
    const { id_paciente } = req.params;
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/responsable/'+id_paciente,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        res.redirect('/datos_generales_paciente/list_responsables/'+id_paciente);
    })
})

//ruta para poder actualizar responsable
router.post('/update_responsable/:id', (req,res) => {
    const { id } = req.params
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/update_responsable/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        res.redirect('/datos_generales_paciente/one_responsable/'+id);
    })
})

module.exports = router;