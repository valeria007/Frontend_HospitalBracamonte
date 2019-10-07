const fetch = require('node-fetch');
var expires = require('expires');
var tiem_Tamp = expires.after('10 seconds')
import model from '../models';

const { alergias } = model;


  function update_tiempo(id_alergia){
    var data = {
      estado_update:'false'
    };
    var esto = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-type' : "application/json"
        }
    };
    fetch('http://localhost:3000/api/update_alergia_tiempo/'+id_alergia,esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => { 
      console.log(data, " <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  esto es lo quiero ver")
    })   
  }
class Alergias{
   static reg_alergias(req,res) {
       const { fecha_registro,tipoAlergia,descripcion,familiares,personales_patologicos,personales_no_patologicos,gineco_obstetrico,tipoHabito,descripcionHa,descripcionInte,id_user } = req.body;
       if(fecha_registro == "" || tipoAlergia == ""){
         if(fecha_registro == ""){
           res.status(400).json({
             success:false,
             msg:"Fecha es obligatorio"
           })
         }else if(tipoAlergia == ""){
          res.status(400).json({
            success:false,
            msg:"Tipo de alertgia es obligatorio"
          })
         }
       }else{
        const { id_paciente } = req.params;
        return alergias
        .create({
          fecha_registro,
          tipoAlergia,
          descripcion,
          familiares,
          personales_patologicos,
          personales_no_patologicos,
          gineco_obstetrico,
          tipoHabito,
          descripcionHa,
          descripcionInte,
          id_paciente,
          id_user
        })
        .then(data => {  

          //setTimeout(update_tiempo(), 3000)         

          res.status(201).json({
            success: true,  
            msg: "Se inserto una alergia",      
            data
          })
        })
       .catch(error => {
         console.log(error)
         res.status(500).json({
          success: false,
          msg:"No se pudo insertar los datos, por un error en la base de datos",
          error
         })
       });
      }
      
   }
   static list_alergias(req,res){
        return alergias
        .findAll()
        .then(data => res.status(200).json(data))
    }

    //lista de de alergias del paciente
    static alergias_list(req, res){                
        const { id_paciente } = req.params
        alergias.findAll({
           where: {id_paciente: id_paciente}
           //attributes: ['id', ['description', 'descripcion']]
         }).then((data) => {
           res.status(200).json(data);
         });     
    }

    //mostrar una alergia para poder actualizar
    static antecedenteOne(req, res){                
        const { id } = req.params
        alergias.findAll({
           where: {id: id}
           //attributes: ['id', ['description', 'descripcion']]
         }).then((data) => {
           res.status(200).json(data);
         });     
    }
    //ruta para poder actulizar una alergias
    
    static update_alergia(req, res) {
        const { tipoAlergia,descripcion,familiares,personales_patologicos,personales_no_patologicos,gineco_obstetrico,tipoHabito,descripcionHa,descripcionInte } = req.body
        var estado_update = 'false'
        return alergias
          .findByPk(req.params.id)
          .then((data) => {
            data.update({

              estado_update:estado_update || data.estado_update,
              tipoAlergia: tipoAlergia || data.tipoAlergia,
              descripcion: descripcion || data.descripcion,
              familiares: familiares || data.familiares,
              personales_patologicos: personales_patologicos || data.personales_patologicos,
              personales_no_patologicos: personales_no_patologicos || data.personales_no_patologicos,
              gineco_obstetrico: gineco_obstetrico || data.gineco_obstetrico,
              tipoHabito: tipoHabito || data.tipoHabito,
              descripcionHa: descripcionHa || data.descripcionHa,
              descripcionInte: descripcionInte || data.descripcionInte
                                  
            })
            .then(update => {
              res.status(200).send({
                success:true,
                msg: 'Se modifico con exito..',
                data: {
                  
                  estado_update:estado_update || update.estado_update,
                  tipoAlergia: tipoAlergia || update.tipoAlergia,
                  descripcion: descripcion || update.descripcion,
                  familiares: familiares || update.familiares,
                  personales_patologicos: personales_patologicos || update.personales_patologicos,
                  personales_no_patologicos: personales_no_patologicos || update.personales_no_patologicos,
                  gineco_obstetrico: gineco_obstetrico || update.gineco_obstetrico,
                  tipoHabito: tipoHabito || update.tipoHabito,
                  descripcionHa: descripcionHa || update.descripcionHa,
                  descripcionInte: descripcionInte || update.descripcionInte
                }
              })
            })
            .catch(error => res.status(400).json({
              success:false,
              error,
              msg:"No se pudo actualizar los datos"
            }));
          })
          .catch(error => res.status(400).json({
            success:false,
            error,
            msg:"No se pudo actualizar los datos"
          }));
    }
    static update_alergia_tiempo(req, res) {
      const { estado_update } = req.body
      return alergias
        .findByPk(req.params.id)
        .then((data) => {
          data.update({
            estado_update:estado_update || data.estado_update,     
          })
          .then(update => {
            res.status(200).send({
              success:true,
              msg: 'Se modifico con exito..',
              data: {
                estado_update:estado_update || update.estado_update,
              }
            })
          })
          .catch(error => res.status(400).json({
            success:false,
            error,
            msg:"No se pudo actualizar los datos"
          }));
        })
        .catch(error => res.status(400).json({
          success:false,
          error,
          msg:"No se pudo actualizar los datos"
        }));
  }
}


export default Alergias