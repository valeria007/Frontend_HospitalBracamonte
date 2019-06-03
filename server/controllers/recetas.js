import model from '../models';

const { Recetas} = model;
class Receta {
    
    static post_receta(req, res) {
        const { tipoConsulta,historiaClinica,fecha,posologia,farmaco,viaAdmincion,doctor,indicaciones,unidades } = req.body;
        const { id_consulta } = req.params;
        return Recetas
          .create(  {
            id_consulta,
            tipoConsulta,
            historiaClinica,
            fecha,
            posologia,
            farmaco,
            viaAdmincion,
            doctor,
            indicaciones,
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

    //para mostrar receta segun consulta
    static onlyReceta(req, res){                
      var id = req.params.id;  
      Recetas.findAll({
         where: {id_consulta: id}
         //attributes: ['id', ['description', 'descripcion']]
       }).then((data) => {
         res.status(200).json(data);
       });     
      }
  }
    export default Receta;