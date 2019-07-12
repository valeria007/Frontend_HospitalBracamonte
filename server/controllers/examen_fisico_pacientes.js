import model from '../models';

const { examen_fisico } = model;

class Examen_Fisico{
    static reg_examen_fisico(req,res){
        const { estado_general,facies,precion_arterial,estado_nutricional,peso,frecuencia_cardiaca,saturacion_oxigeno,fecha_revision } = req.body;
        const { id_paciente } = req.params; 
        return examen_fisico
        .create({
            estado_general,
            facies,
            precion_arterial,
            estado_nutricional,
            peso,
            frecuencia_cardiaca,
            saturacion_oxigeno,
            fecha_revision,
            id_paciente 
        })
        .then(data => res.status(201).json({
            success: true,
            message: " Registrado ",
            data
        }))
        .catch(error => res.status(400).send(error));
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
        const { estado_general,facies,precion_arterial,estado_nutricional,peso,frecuencia_cardiaca,saturacion_oxigeno,fecha_revision } = req.body
        return examen_fisico
          .findByPk(req.params.id)
          .then((data) => {
            data.update({

                estado_general: estado_general || data.estado_general,
                facies: facies || data.facies,
                precion_arterial: precion_arterial || data.precion_arterial,
                estado_nutricional: estado_nutricional|| data.estado_nutricional,
                peso: peso || data.peso,
                frecuencia_cardiaca: frecuencia_cardiaca || data.frecuencia_cardiaca,
                saturacion_oxigeno: saturacion_oxigeno || data.saturacion_oxigeno,
                fecha_revision: fecha_revision || data.fecha_revision
                                  
            })
            .then(update => {
              res.status(200).send({
                message: 'Se nodifico con exito..',
                data: {
                   
                    estado_general: estado_general || update.estado_general,
                    facies: facies || update.facies,
                    precion_arterial: precion_arterial || update.precion_arterial,
                    estado_nutricional: estado_nutricional|| update.estado_nutricional,
                    peso: peso || update.peso,
                    frecuencia_cardiaca: frecuencia_cardiaca || update.frecuencia_cardiaca,
                    saturacion_oxigeno: saturacion_oxigeno || update.saturacion_oxigeno,
                    fecha_revision: fecha_revision || update.fecha_revision
                }
              })
            })
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
    }
}
export default Examen_Fisico