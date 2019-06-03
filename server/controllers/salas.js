import model from '../models';

const { Salas } = model;
const { Especialidad } = model;

//servicio para insertar salas con id de servicio
class Sala {
    static enviarSala(req, res){
      
        if(req.body.piso == ""){
            res.status(400).send("posrfavor introdusca un piso")
        }else{
          Especialidad.findAll({
            where: {nombre : req.body.nombre}
          })
          .then((datos) => {            
            console.log(datos[0].id)
            var id = datos[0].id;
            const { nombre, descripcionSala, piso } = req.body
            var  especialidadID  = id
            return Salas
            .create({
              nombre, 
              descripcionSala, 
              piso,
              especialidadID
            })
            .then(data => res.status(200).send({
                success: true,
                message: 'se inserto con exito',
                data
            }))
            .catch(error => res.status(400).send(error));
          })
            
        }
       
    }
    static listSala(req, res){
        return Salas
        .findAll()
        .then(sala => res.status(200).send(sala))
        .catch(error => res.status(400).send(error));
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
      var id = req.params.id;  
      Salas.findAll({
          where: {especialidadID : id}
          //attributes: ['id', ['description', 'descripcion']]
        }).then((data) => {
          res.status(200).json(data);
        });     
   }
    
    static update(req, res) {
        const { nombre,descripcionSala, piso } = req.body
        return Salas
          .findByPk(req.params.id)
          .then((data) => {
            data.update({
              nombre: nombre || data.nombre,
              descripcionSala: descripcionSala || data.descripcionSala,
              piso: piso || data.piso                    
            })
            .then(update => {
              res.status(200).send({
                message: 'Sala actualizado',
                data: {
                  nombre: nombre || update.nombre,
                  descripcionSala: descripcionSala || update.descripcionSala,
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