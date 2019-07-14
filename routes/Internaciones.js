const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var url = require('./url/export');

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                rutas con vue
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/
//listar las salas disponibles de una especialidad
router.get('/Vue_list_salas/:especialidad', (req,res) => {
    const { especialidad } = req.params
    fetch(url.name.url+'/api/ServSalasN/'+especialidad) 
    .then(resp => resp.json())
    .then(resp =>{
        res.status(200).json(resp)
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })    
})

//listar las camas segun la sala
router.get('/VUe_list_camas/:id_Sala', (req,res) => {
    const { id_Sala } = req.params
    fetch(url.name.url+'/api/camaSala/'+id_Sala) 
    .then(resp => resp.json())
    .then(resp =>{
        res.status(200).json(resp)
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
})
/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/
//para renderizar una vista de botones donde esta doctor y enfermera temporalmente
router.get('/viewTemporal', (req,res) => {
    fetch(url.name.cuadernos+'/api/especialidad')
    .then(resp => resp.json())
    .then(resp =>{
        res.render('hospitalizaciones/viewFirst',{
            resp
        })
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    })    
});

//serv para mostrar home hospitalizacion o internacion
router.get('/hospitalizacion/:especialidad',(req, res) => {
    const { especialidad } = req.params
    res.render('hospitalizaciones/homeHospitalizacion',{
        especialidad //esto manda la especialdad
    })       
});


//ser para renderizar lista hospitalizacion mostrando 
//la lista de ordenes de internacion que se mandan desde consulta o emergencia
router.get('/ListInternacion/:especialidad', (req,res) => {
    const { especialidad } = req.params;
    fetch(url.name.url+'/api/PinterTrue/'+especialidad) // esta ruta solo trae los datos de tipo true
    .then(resp => resp.json())
    .then(resp =>{
        //console.log(especialidad, " esto es la especialidad  <>>>>>>>>>>>>>")
        /*var data = resp.map(function(item){
            return { nombre2:item.nombre}
        })
        console.log(data)
        resp.forEach(function(item){
            console.log(item.estado, " >>>>>>>>>>>>>>>>>>>")
        })*/
       // console.log(listFalse)
       
        res.render('hospitalizaciones/listasHospitalizacion',{
            resp,
            listFalse,// lleva la lista de tipo false
            especialidad
        })
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
});

// esta ruta es para traer la lista de internacion de tipo false
var listFalse , especialidad1;
router.get('/ListaInternacionF/:especialidad', (req,res) => {
    const { especialidad } = req.params;
    especialidad1 = especialidad;
    fetch(url.name.url+'/api/PinterFalse/'+especialidad) // esta ruta solo trae los datos de tipo true
    .then(resp => resp.json())
    .then(resp =>{
        listFalse = resp;
        res.redirect('/internaciones/ListInternacion/'+especialidad);
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
});





/*
<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<
            regsitro de internacion
>>>>>>><<<<<<<<<<>>>>>>>>>><<<<>>><>>><<>>><<>>><
<<<<<<<>><<<<><<<>><<<><<<>><<>>><<>>><<>>>><<<>>
*/

//ruta para renderizar el form de internacion
router.get('/renderInternacion', (req,res) => {
    res.render('hospitalizaciones/reg_internacion',{
        Pint,
        especialidad : especialidad1,
        formUpdate_internacion,
        paciente_internacion
    });
});

var paciente_internacion
router.get('/list_internacion_paciente', (req,res) => {
    fetch(url.name.url+'/api/list_internacion_paciente/'+idTipoConsulta.id+"/"+idTipoConsulta.historial) 
    .then(resp => resp.json())
    .then(resp =>{
        paciente_internacion = resp;
        res.redirect('/internaciones/renderInternacion');
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
})

//ruta para poder el formulario de internacion segun su papeleta de internacion
var formUpdate_internacion
router.get('/One_form_Internacion/:id_Pinternacion', (req,res) => {
    const { id_Pinternacion } = req.params;
    fetch(url.name.url+'/api/one_Form_internacion/'+id_Pinternacion) 
    .then(resp => resp.json())
    .then(resp =>{
        //console.log(resp, "  <<<<<<<<<<<<<<<<<<<<  esto es la respuesta que quiero")
        formUpdate_internacion = resp;
        res.redirect('/internaciones/list_internacion_paciente');
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//esta ruta es para poder traer una papeleta de internacion
var Pint, idTipoConsulta;
router.get('/only_pInternacion/:id/:tipoCons/:historial', (req,res) => {
    const { id, tipoCons } = req.params;
    idTipoConsulta = req.params;
    fetch(url.name.url+'/api/one_Pinternacion/'+id+"/"+tipoCons) 
    .then(resp => resp.json())
    .then(resp =>{
        //console.log(resp, "  <<<<<<<<<<<<<<<<<<<<  esto es la respuesta que quiero")
        Pint = resp;
        res.redirect('/internaciones/One_form_Internacion/'+id);
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 

});
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//esta ruta es paca cambiar el estado de la papeleta de internacion
router.get('/estado_pInternacion', (req,res) => {

    fetch(url.name.url+'/api/estado_p_internacion/'+idPint) 
    .then(resp => resp.json())
    .then(resp =>{
       // console.log(resp, " esto es p internacion <<<<<<<<<<<")
        res.redirect('/internaciones/only_pInternacion/'+idTipoConsulta.id+"/"+idTipoConsulta.tipoCons+"/"+idTipoConsulta.historial);
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
})

//esta ruta cambia el estado de la cama a false que es ocupado y ademas que añade al paciente
router.get('/estadoCama/:idCama/:historial', (req,res) => {
    var data = req.params;
    console.log(data , " <<<<<<<<<<<<<<<<<>>><<<>>><<<>>>>><<<<><<<>>><<<<>>><<<>>><<<>>><<<>>><<<<<<<<<")
    fetch(url.name.url+'/api/updateEstadoCama/'+data.idCama+"/"+data.historial) 
    .then(resp => resp.json())
    .then(resp =>{
        //console.log(resp, " <<<<<<<<<<<< esto es cama")
        res.redirect('/internaciones/estado_pInternacion');
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
})


//ROUTA PARA INSERTAR
var idPint;
router.post('/internacion/:idPinternacion', (req,res) => {
    const { idPinternacion } = req.params;
    idPint = idPinternacion;
    var data_body = req.body
    var esto = {
        method: 'POST',
        body: JSON.stringify(data_body),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/internaciones/'+idPinternacion+"/"+data_body.cama,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        //console.log(data , " >>>>>>>>>>>>>>>>>>>>>esto es la respuesta del post<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
        res.redirect('/internaciones/estadoCama/'+data_body.cama+"/"+data_body.historial)         
    }) 
});

/*
<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<
        Actualizar papeleta de internacion
>>>>>>><<<<<<<<<<>>>>>>>>>><<<<>>><>>><<>>><<>>><
<<<<<<<>><<<<><<<>><<<><<<>><<>>><<>>><<>>>><<<>>
*/

//esta ruta cambia el estado de la cama a false que es ocupado y ademas que añade al paciente
router.get('/estadoCama1/:idCama/:historial', (req,res) => {
    var data = req.params;
    fetch(url.name.url+'/api/updateEstadoCama/'+data.idCama+"/"+data.historial) 
    .then(resp => resp.json())
    .then(resp =>{
        console.log(resp, "  2222sdddddddddd")
        res.redirect('/internaciones/only_pInternacion/'+idTipoConsulta.id+"/"+idTipoConsulta.tipoCons+"/"+idTipoConsulta.historial);
    })        
    .catch(error => {
        console.error('Error:', error)
        res.send("no hay coneccion con el servidor");
    }) 
})

router.get('/update_estado_cama/:idCama', (req,res) => {
    const { idCama } = req.params;
     var data = {
        estado: "true",
        historial: "0"
    }
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch(url.name.url+'/api/updateCama_estado/'+idCama,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        res.redirect('/internaciones/estadoCama1/'+datos.cama+"/"+datos.historial);
    }) 
})

//ruta para poder actualizar form internacion
var datos;
router.post('/update_Form_internacion/:id/:id_cama', (req,res) => {
    const { id, id_cama } = req.params;
    var data_update = req.body;
    datos = {
        cama : req.body.cama,
        historial: req.body.historial
    }
    var esto = {
        method: 'POST',
        body: JSON.stringify(data_update),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/update_form_internacion/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        console.log(data, "esto es la respuesta del post" )
        res.redirect('/internaciones/update_estado_cama/'+id_cama)        
    }) 
})

/*
<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<
            Recetas de internacion
>>>>>>><<<<<<<<<<>>>>>>>>>><<<<>>><>>><<>>><<>>><
<<<<<<<>><<<<><<<>><<<><<<>><<>>><<>>><<>>>><<<>>
*/

router.get('/receta_internacion', (req,res) => {
    if(especialidad1 == null){
        res.redirect('/internaciones/viewTemporal')
    }else{
        res.render('hospitalizaciones/receta',{
            especialidad:especialidad1,
            data_internacion,
            One_paciente
        })
    }    
})

var One_paciente
router.get('/paciente_One',(req,res) => {
    fetch('http://localhost:3000/api/onlyPaciente/'+data_internacion[0].historial)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        One_paciente = data;
        res.redirect('/internaciones/receta_internacion')        
    }) 
})

var data_internacion;
router.get('/traerInternacion/:id_internacion', (req,res) => {
    const { id_internacion } = req.params;
    fetch('http://localhost:3000/api/One_Internacion/'+id_internacion)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        data_internacion = data;
        res.redirect('/internaciones/paciente_One')        
    }) 
})

/*router.post('/receta/:id_internacion', (req,res) => {
    const { id_internacion } = req.params
    var med = req.body.medicamentos;
    var data = {
        receta_de:req.body.receta_de,
        historial:req.body.historial,
        fechaEmicion: req.body.fechaEmicion,
        nombre_doctor:req.body.nombre_doctor,
        medicamentos : JSON.stringify(med),
    }

    res.send(data)
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/receta_interncaion/'+id_internacion,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        res.send(data)   
    }) 
})*/

///ruta para enviar receta
router.post('/vuePOstReceta/:id', (req,res) => {
    const { id } = req.params;
    var data = req.body;
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/receta_interncaion/'+id,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
        console.log(data)
        res.status(200).json(data)
    })
})

//prueba
router.get('/alergiasvis', (req,res) => {
    res.render('hospitalizaciones/alergias')
  });
module.exports = router;