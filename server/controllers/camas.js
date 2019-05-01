import model from '../models';

    const { Camas } = model;

    class Cama {
        static sendCama(req, res){
            const { id_salas, descripcion } = req.body
            
            return Camas
            .create({
                id_salas,
                descripcion                
            })
            .then(data => res.status(200).send({
                success: true,
                message: "se introdujo una cama",
                data
            }))
        }
        static getCamas(req, res) {
            return Camas
              .findAll()
              .then(data => res.status(200).send(data));
          }
    }

export default Cama