import model from '../models';

    const { Camas } = model;

    class Cama {
        static sendCama(req, res){
            const { descripcion, numeroCama } = req.body
            const { salaID } = req.params
            return Camas
            .create({
                descripcion,
                numeroCama,
                salaID               
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