import model from '../models';

const { alergias } = model;

class Alergias{
   static reg_alergias(req,res) {

       const { tipoAlergia,descripcion,familiares,personales_patologicos,personales_no_patologicos,gineco_obstetrico,tipoHabito,descripcionHa,descripcionInte,id_user } = req.body;
       const { id_paciente } = req.params;
       return alergias
       .create({
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
       .then(data => res.status(201).send({
        success: true,  
        msg: "Se inserto una alergia",      
        data
      }))
      .catch(error => res.status(400).send({
        success: false,
        msg:"No se pudo insertar los datos, por un error en la base de datos",
        error
       

      }));
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
        return alergias
          .findByPk(req.params.id)
          .then((data) => {
            data.update({

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
}

export default Alergias