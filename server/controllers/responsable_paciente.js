import model from '../models';

const { responsables } = model

class Responsables {
    static respRegsitro(req,res) {
        const{ nombre,apellido1,apellido2,direccion,ci,telefono } = req.body
        const { id_paciente } = req.params
        return responsables
        .create({
            nombre,
            apellido1,
            apellido2,
            direccion,
            ci,
            telefono,
            id_paciente
        })
        .then(data => res.status(201).json({
            success: true,
            message: " Registrado ",
            data
        }))
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
                message: 'Se nodifico con exito..',
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

export default Responsables;