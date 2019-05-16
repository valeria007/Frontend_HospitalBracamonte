import model from '../models';

    const { Camas } = model;
    const { Salas } = model;

    class Cama {
        static sendCama(req, res){
            const { descripcion, numeroCama } = req.body
            const  { salaID }  = req.params
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
        // Servicio para para mostrar todas las camas
        static getCamas(req, res) {
            return Camas                
            .findAll()
            .then(data => res.status(200).send(data));                       
        }
        // Servicio para mostar camas segun la sala que le corresponda 
        static only(req, res){                
        var id = req.params.id;  
        Camas.findAll({
           where: {salaID: id}
           //attributes: ['id', ['description', 'descripcion']]
         }).then((data) => {
           res.status(200).json(data);
         });     
        }
        //servcio para mostrar una cama para que sea actualizado
        static onlyCama(req, res){                
            var id = req.params.id;  
            Camas.findAll({
               where: {id: id}
               //attributes: ['id', ['description', 'descripcion']]
             }).then((data) => {
               res.status(200).json(data);
             });     
            }
        //servcio para actualizar una cama    
        static updateCama(req, res) {
            const { descripcion, numeroCama } = req.body
            return Camas
              .findByPk(req.params.id)
              .then((data) => {
                data.update({
                    descripcion: descripcion || data.descripcion,
                    numeroCama: numeroCama || data.numeroCama                    
                })
                .then(update => {
                  res.status(200).send({
                    message: 'Sala actualizado',
                    data: {
                      
                        descripcion: descripcion || update.descripcion,
                        numeroCama: numeroCama || update.numeroCama
                    }
                  })
                })
                .catch(error => res.status(400).send(error));
              })
              .catch(error => res.status(400).send(error));
          }

        //Servicio para elminar una cama
        static delCama(req, res) {
          return Camas
            .findByPk(req.params.id)
            .then(data => {
              if(!data) {
                return res.status(400).send({
                message: 'Cama no existe',
                });
              }
              return data
                .destroy()
                .then(() => res.status(200).send({
                  message: 'Cama se elimino con Exito'
                }))
                .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error))
        }

    }

export default Cama