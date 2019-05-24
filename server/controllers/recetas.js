import model from '../models';

const { Recetas} = model;
class Receta {
    
    static post_receta(req, res) {
        const { id_consulta,farmaco,indicaciones,fecha,unidades} = req.body
        return Recetas
          .create(  {
            id_consulta,
            farmaco,
            indicaciones,
            fecha,
            unidades
          })
           .then(consultaData => res.status(201).send({
              success: true,
              message: 'consulta guardada',
              consultaData
          }))
       }
    static getReceta(req, res) {
        return Recetas
     .findAll()
     .then(Recetas => res.status(200).send(Recetas));
     }
    }
    export default Receta;