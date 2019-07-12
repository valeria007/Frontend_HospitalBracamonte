import model from '../models';

const { antecedentes } = model

class Antecedentes {
    static reg_antecedente(req,res){
        const { familiares,personales_patologicos,personales_no_patologicos,gineco_obstetrico,descripcion  } = req.body
        const { id_paciente } = req.params
        return antecedentes
        .create({
            familiares,
            personales_patologicos,
            personales_no_patologicos,
            gineco_obstetrico,
            descripcion,
            id_paciente
        })
        .then(data => res.status(201).send({
            success: true,
            data
          }))
    }
    static list_antecedentes(req,res){
        return antecedentes
        .findAll()
        .then(data => res.status(200).json(data))
    }

    //esta ruta me va permitir mostrar todos los antecedente de un determinado paciente
    static antecedentes(req, res){                
        const { id_paciente } = req.params
        antecedentes.findAll({
           where: {id_paciente: id_paciente}
           //attributes: ['id', ['description', 'descripcion']]
         }).then((data) => {
           res.status(200).json(data);
         });     
    }
    //essta ruta me va permitir mostrar un antecedente con su id
    static antecedenteOne(req, res){                
        const { id } = req.params
        antecedentes.findAll({
           where: {id: id}
           //attributes: ['id', ['description', 'descripcion']]
         }).then((data) => {
           res.status(200).json(data);
         });     
    }

    //esta ruta es para poder actulizar en antecedente
    static updateAntecedente(req, res) {
        const { familiares, personales_patologicos,personales_no_patologicos,gineco_obstetrico,descripcion, } = req.body
        return antecedentes
          .findByPk(req.params.id)
          .then((data) => {
            data.update({

                familiares: familiares || data.familiares,
                personales_patologicos: personales_patologicos || data.personales_patologicos,
                personales_no_patologicos: personales_no_patologicos || data.personales_no_patologicos,
                gineco_obstetrico: gineco_obstetrico || data.gineco_obstetrico,
                descripcion: descripcion || data.descripcion
                                  
            })
            .then(update => {
              res.status(200).send({
                message: 'Se nodifico con exito..',
                data: {
                    familiares: familiares || update.familiares,
                    personales_patologicos: personales_patologicos || update.personales_patologicos,
                    personales_no_patologicos: personales_no_patologicos || update.personales_no_patologicos,
                    gineco_obstetrico: gineco_obstetrico || update.gineco_obstetrico,
                    descripcion: descripcion || update.descripcion
                }
              })
            })
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
    }
}

export default Antecedentes;