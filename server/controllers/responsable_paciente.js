import model from '../models';

const { responsables } = model

class Responsables {
    static respRegsitro(req,res) {
      if(req.body.nombre == "" || req.body.apellido1 == "" || req.body.direccion == "" || req.body.ci == "" || req.body.telefono == "" || isNaN(req.body.telefono)){
        if(req.body.nombre == ""){
          res.status(400).json({
            success: false,
            msg: "Por favor inserte un nombre"
          })
        }else if(req.body.apellido1 == ""){
          res.status(400).json({
            success: false,
            msg: "Por favor inserte su primer apellido"
          })
        }else if(req.body.direccion == ""){
          res.status(400).json({
            success: false,
            msg: "Por favor inserte direccion del responsable"
          })
        }else if(req.body.ci == "" || isNaN(req.body.ci)){
          if(req.body.ci == ""){
            res.status(400).json({
              success: false,
              msg: "Por favor inserte su cedula de indentada del responsable"
            })
          }else if(isNaN(req.body.ci)){
            res.status(400).json({
              success: false,
              msg: "Por favor C.I. solo puede contener numeros"
            })
          }
        }else if( req.body.telefono == ""){
          
            res.status(400).json({
              success: false,
              msg: "Por favor inserte su numeor de telefono del responsable"
            })
          
        }else if( isNaN(req.body.telefono) ){
          res.status(400).json({
            success: false,
            msg: "Por favor telefono solo puede contener numeros"
          })
        }
      }else{
        responsables.findAll({
          where: {ci: req.body.ci}
          //attributes: ['id', ['description', 'descripcion']]
       }).then((data) => {
         if(data != ""){
           res.status(400).json({
             success:false,
             msg:"C.I. ya existe"
           })
         }else{
          const{ nombre,apellido1,apellido2,direccion,ci,telefono,id_register } = req.body
          const { id_paciente } = req.params
          return responsables
          .create({
              nombre,
              apellido1,
              apellido2,
              direccion,
              ci,
              telefono,
              id_paciente,
              id_register
          })
          .then(data => res.status(201).json({
              success: true,
              msg: "Registrado",
              data
          }))
          .catch(error => res.status(400).json({
            error,
            success:false,
            msg: "No se pudo guardar los datos"
          }));
         }
       });  
        
      }
        
    }
    static list_tesponsable(req,res){
        return responsables
        .findAll()
        .then(data => res.status(200).json(data))
    }
    //lista de todos los responsables del paciente 
    static responsable_list(req, res){                
        const { id_paciente } = req.params
        responsables.findAll({
           where: {id_paciente: id_paciente}
           //attributes: ['id', ['description', 'descripcion']]
        }).then((data) => {
          res.status(200).json(data);
        });     
    }

    //mostrar un resposable para que sea actualizado
    static one_Responsables(req, res){                
        const { id } = req.params
        responsables.findAll({
           where: {id: id}
           //attributes: ['id', ['description', 'descripcion']]
         }).then((data) => {
           res.status(200).json(data);
         });     
    }
    //ruta para poder actulizar las datos de un responsable
    static update_Responsable(req, res) {
      if(req.body.ci == "" || isNaN(req.body.ci) || req.body.telefono == "" || isNaN(req.body.telefono)){
        if(req.body.ci == ""){
          res.status(400).json({
            success: false,
            msg :"C.I. No puede estar vacío"
          })
        }else if(isNaN(req.body.ci)) {
          res.status(400).json({
            success: false,
            msg :"C.I. Solo puede contener numeros"
          })
        }else if(req.body.telefono == ""){
          res.status(400).json({
            success: false,
            msg :"Telefono no puede estar vacío"
          })
        }else if(isNaN(req.body.telefono)){
          res.status(400).json({
            success: false,
            msg :"Telefono solo puede contener numeros"
          })
        }
      }else{
        const {nombre,apellido1,apellido2,direccion,ci,telefono  } = req.body
        return responsables
          .findByPk(req.params.id)
          .then((data) => {
            data.update({

                nombre: nombre || data.nombre,
                apellido1: apellido1 || data.apellido1,
                apellido2: apellido2 || data.apellido2,
                direccion: direccion|| data.direccion,
                ci: ci || data.ci,
                telefono: telefono || data.telefono                                  
            })
            .then(update => {
              res.status(200).send({
                success:true,
                msg: 'Se Modifico con exito..',
                data: {
                    nombre: nombre || update.nombre,
                    apellido1: apellido1 || update.apellido1,
                    apellido2: apellido2 || update.apellido2,
                    direccion: direccion|| update.direccion,
                    ci: ci || update.ci,
                    telefono: telefono || update.telefono    
                }
              })
            })
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
        
    }
}

export default Responsables;