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
}

export default Alergias