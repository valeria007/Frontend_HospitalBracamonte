import model from '../models';

const { Salas } = model;

//servicio para insertar salas con id de servicio
class Sala {
    static enviarSala(req, res){
        if(req.body.descripcion == ""){
            res.status(400).send("por favor introdusca una descripcion")
            
        }if(req.body.piso == ""){
            res.status(400).send("posrfavor introdusca un piso")
        }else{
            const { servico, descripcion, piso } = req.body
            return Salas
            .create({
                    servico,
                    descripcion,
                    piso
            })
            .then(data => res.status(200).send({
                success: true,
                message: 'se inserto con exito',
                data
            }))
            .catch(error => res.status(400).send(error));
        }
       
    }
    static listSala(req, res){
        return Salas
        .findAll()
        .then(sala => res.status(200).send(sala));
    }
     //para mostrar solo uno
    static one(req, res){                
       var id = req.params.id;  
       Salas.findAll({
           where: {id: id}
           //attributes: ['id', ['description', 'descripcion']]
         }).then((data) => {
           res.status(200).json(data);
         });     
    }
    //para mostrar que salas tiene un servico
    static oneSala(req, res){                
      var descripcion = req.params.id;  
      Salas.findAll({
          where: {servico : descripcion}
          //attributes: ['id', ['description', 'descripcion']]
        }).then((data) => {
          res.status(200).json(data);
        });     
   }
    
    static update(req, res) {
        const { descripcion, piso } = req.body
        return Salas
          .findByPk(req.params.id)
          .then((data) => {
            data.update({
                descripcion: descripcion || data.descripcion,
                piso: piso || data.piso                    
            })
            .then(update => {
              res.status(200).send({
                message: 'Sala actualizado',
                data: {
                    descripcion: descripcion || update.descripcion,
                    piso: piso || update.piso
                }
              })
            })
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
      static del(req, res) {
        return Salas
          .findByPk(req.params.id)
          .then(data => {
            if(!data) {
              return res.status(400).send({
              message: 'Sala Not Found',
              });
            }
            return data
              .destroy()
              .then(() => res.status(200).send({
                message: 'Sala successfully deleted'
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error))
      }
}

export default Sala