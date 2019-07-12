import model from '../models';

const { alergias } = model;

class Alergias{
   static reg_alergias(req,res) {
       const { tipoAlergia,descripcion } = req.body;
       const { id_paciente } = req.params;
       return alergias
       .create({
        tipoAlergia,
        descripcion,
        id_paciente
       })
       .then(data => res.status(201).send({
        success: true,        
        data
      }))
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
        const { tipoAlergia,descripcion } = req.body
        return alergias
          .findByPk(req.params.id)
          .then((data) => {
            data.update({

                tipoAlergia: tipoAlergia || data.tipoAlergia,
                descripcion: descripcion || data.descripcion
                                  
            })
            .then(update => {
              res.status(200).send({
                message: 'Se nodifico con exito..',
                data: {
                   
                    tipoAlergia: tipoAlergia || update.tipoAlergia,
                    descripcion: descripcion || update.descripcion
                }
              })
            })
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
    }
}

export default Alergias