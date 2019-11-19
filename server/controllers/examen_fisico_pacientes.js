import model from '../models';

const { examen_fisico } = model;

class Examen_Fisico{
    static reg_examen_fisico(req,res){
      if(req.body.peso == "" || req.body.talla == "" || req.body.temperatura == "" || req.body.fecha_revision == ""){
        if(req.body.peso == ""){
          res.status(400).json({
            success :  false ,
            msg : "Por favor inserte peso"
          })
        }else if(req.body.talla == ""){
          res.status(400).json({
            success :  false ,
            msg : "Por favor talla"
          })
        }else if (req.body.temperatura == ""){
          res.status(400).json({
            success :  false ,
            msg : "Por favor inserte temperatura"
          })
        }else if (req.body.fecha_revision == ""){
          res.status(400).json({
            success :  false ,
            msg : "Por favor inserte fecha"
          })
        }
      }else{
        const { peso,talla,temperatura,frecuencia_cardiaca,respiracion,presion,saturacion_oxigeno,fecha_revision,otros,id_user } = req.body;
        const { id_paciente } = req.params; 
        return examen_fisico
        .create({
          peso,
          talla,
          temperatura,
          frecuencia_cardiaca,
          respiracion,
          presion,
          saturacion_oxigeno,
          fecha_revision,
          otros,
          id_paciente,
          id_user 
        })
        .then(data => res.status(201).json({
            success: true,
            msg: " Registrado ",
            data
        }))
        .catch(error => res.status(400).send(error));
      }id_paciente,
      id_user 
        
    }
    static list_tesponsable(req,res){
        return examen_fisico
        .findAll()
        .then(data => res.status(200).json(data))
    }
    //lista de de examenes fisicos del paciente
    static exFisco_list(req, res){                
        const { id_paciente } = req.params
        examen_fisico.findAll({
           where: {id_paciente: id_paciente}
           //attributes: ['id', ['description', 'descripcion']]
        }).then((data) => {
          res.status(200).json(data);
        });     
    }

    //mostrar un examen fisico para poder actualizar
    static one_exFisco(req, res){                
        const { id } = req.params
        examen_fisico.findAll({
           where: {id: id}
           //attributes: ['id', ['description', 'descripcion']]
         }).then((data) => {
           res.status(200).json(data);
         });     
    }
    //ruta para poder actulizar una los examenes fisicos
    static update_exFisico(req, res) {
        const { peso,talla,temperatura,frecuencia_cardiaca,respiracion,presion,saturacion_oxigeno,fecha_revision,otros } = req.body
        var estado_update = 'false'
        return examen_fisico
          .findByPk(req.params.id)
          .then((data) => {
            data.update({
              estado_update:estado_update||data.estado_update,
              peso: peso || data.peso,
              talla: talla || data.talla,
              temperatura: temperatura || data.temperatura,
              frecuencia_cardiaca: frecuencia_cardiaca|| data.frecuencia_cardiaca,
              respiracion: respiracion || data.respiracion,
              presion: presion || data.presion,
              saturacion_oxigeno: saturacion_oxigeno || data.saturacion_oxigeno,
              fecha_revision: fecha_revision || data.fecha_revision,
              otros: otros|| data.otros
                                  
            })
            .then(update => {
              res.status(200).send({
                success: true,
                msg: 'Se modifico con exito...',
                data: {
                  estado_update:estado_update||update.estado_update,
                  peso: peso || update.peso,
                  talla: talla || update.talla,
                  temperatura: temperatura || update.temperatura,
                  frecuencia_cardiaca: frecuencia_cardiaca|| update.frecuencia_cardiaca,
                  respiracion: respiracion || update.respiracion,
                  presion: presion || update.presion,
                  saturacion_oxigeno: saturacion_oxigeno || update.saturacion_oxigeno,
                  fecha_revision: fecha_revision || update.fecha_revision,
                  otros: otros || update.otros
                }
              })
            })
            .catch(error => res.status(400).send({
              success:false,
              msg: "No se pudo actualziar los datos",
              error
            }));
          })
          .catch(error => res.status(400).send({
            success:false,
            msg: "No se pudo actualziar los datos",
            error
          }));
    }
}
export default Examen_Fisico