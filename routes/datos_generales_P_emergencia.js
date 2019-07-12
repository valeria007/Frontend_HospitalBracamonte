const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var Static = require('../public/static/datas');


/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            rutas para los insertar los responsables
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

var id_data_paciente, list_responsables, update_responsable

router.get('/volver', (req,res) => {
    update_responsable = null;
    res.redirect('/datos_genPaciente_emergencia/datos_responsable')
})

router.get('/datos_responsable', (req,res) => {
    fetch('http://localhost:3000/api/paciente_id/'+id_data_paciente)
        .then(resp => resp.json())
        .then(resp =>{
            res.render('emergencias/datos_responsable',{
                dataPaciente : resp,
                DogEnf:  Static.static_data.dogEnf,
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
            res.redirect('/datos_genPaciente_emergencia/datos_responsable');            
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
            res.redirect('/datos_genPaciente_emergencia/list_responsables/'+id_data_paciente)          
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
        res.redirect('/datos_genPaciente_emergencia/list_responsables/'+id_paciente);
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
        res.redirect('/datos_genPaciente_emergencia/one_responsable/'+id);
    })
})

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                    rutas para antecedentes
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/
var list_antecedentes, dataPaciente

router.get('/volver1', (req,res) => {
    update_paciente = null;
    res.redirect('/datos_genPaciente_emergencia/antecedentes')
})

router.get('/antecedentes', (req,res) => {
    res.render('emergencias/antecedentes',{
        list_antecedentes,
        dataPaciente,
        update_paciente,
        DogEnf:  Static.static_data.dogEnf,
    })      
});

//ruta para sacar el nombre del paciente

router.get('/data_paciente', (req,res) => {
    fetch('http://localhost:3000/api/paciente_id/'+idPaciente)
        .then(resp => resp.json())
        .then(resp =>{
            dataPaciente = resp;      
            res.redirect('/datos_genPaciente_emergencia/antecedentes/') ;            
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
    })
})


// esta ruta es para poder mostrar todos los antecedentes del paciente
var idPaciente;
router.get('/lista_antecedentes/:id_paciente', (req,res) => {
    const { id_paciente } = req.params;
    idPaciente = id_paciente;
    fetch('http://localhost:3000/api/one_ant/'+id_paciente)
        .then(resp => resp.json())
        .then(resp =>{
            list_antecedentes = resp;      
            res.redirect('/datos_genPaciente_emergencia/data_paciente') ;            
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
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
            res.redirect('/datos_genPaciente_emergencia/lista_antecedentes/'+idPaciente) ;            
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
    })
})

//ruta para poder insertar antecedentes
router.post('/antecedentes/:id_paciente', (req,res) => {
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
      res.redirect('/datos_genPaciente_emergencia/lista_antecedentes/'+id_paciente);
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
      res.redirect('/datos_genPaciente_emergencia/one_antecedente/'+id);
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
    res.redirect('/datos_genPaciente_emergencia/pacienteData')
})

var idP, alergias_list, update_Alergia;

router.get('/pacienteData', (req,res) => {
    fetch('http://localhost:3000/api/paciente_id/'+idP)
        .then(resp => resp.json())
        .then(resp =>{
            res.render('emergencias/alergias',{
                dataPaciente : resp,
                alergias_list,
                dogEnf: Static.static_data.dogEnf,
                update_Alergia
            });            
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
    })
})

//ruta para poder mostrar la lista de alergias del paciente
router.get('/lista_alergias/:id_paciente', (req,res) => {
    const { id_paciente } = req.params;
    idP = id_paciente;
    fetch('http://localhost:3000/api/alergias_list/'+id_paciente)
        .then(resp => resp.json())
        .then(resp =>{
            alergias_list = resp;      
            res.redirect('/datos_genPaciente_emergencia/pacienteData') ;            
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
    })
})

//ruta para poder mostrar una alergia para que pueda ser actualizado
router.get('/one_alergia/:id', (req,res) => {
    const { id } = req.params;
    fetch('http://localhost:3000/api/One_alergias/'+id)
        .then(resp => resp.json())
        .then(resp =>{
            update_Alergia = resp;      
            res.redirect('/datos_genPaciente_emergencia/lista_alergias/'+idP) ;            
        })
        .catch(error => {
            console.error('Error:', error)
            res.send("no hay coneccion con el servidor");
    })
})


//ruta para poder insertar alergias
router.post('/reg_alergias/:id_paciente', (req,res) => {
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
      res.redirect('/datos_genPaciente_emergencia/lista_alergias/'+id_paciente);
    })
})

router.post('/updateAlergia/:id', (req,res) => {
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
      res.redirect('/datos_genPaciente_emergencia/one_alergia/'+id);
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
    res.redirect('/datos_genPaciente_emergencia/examenFisico')
})

router.get('/examenFisico', (req,res) => {
    fetch('http://localhost:3000/api/paciente_id/'+data_id_paciente)
        .then(resp => resp.json())
        .then(resp =>{
            res.render('emergencias/examenFisico',{
                dataPaciente : resp,
                lis_exFisico,
                dogEnf: Static.static_data.dogEnf,
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
            res.redirect('/datos_genPaciente_emergencia/examenFisico')          
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
            res.redirect('/datos_genPaciente_emergencia/list_exFisico/'+data_id_paciente)          
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
      res.redirect('/datos_genPaciente_emergencia/list_exFisico/'+id_paciente);
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
        res.redirect('/datos_genPaciente_emergencia/one_ExFisico/'+id);
    })
})


module.exports = router;