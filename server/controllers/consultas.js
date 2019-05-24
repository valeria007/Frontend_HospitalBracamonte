import model from '../models';

const { Consultas} = model;
class Consulta {
    
    static reg_consulta(req, res) {
        const { id_cita,diagnostico,tratamiento} = req.body
        return Consultas
          .create({
            id_cita,
            diagnostico,
            tratamiento
          })
           .then(consultaData => res.status(201).send({
              success: true,
              message: 'consulta guardada',
              consultaData
          }))
       }
    static getConsulta(req, res) {
        return Consultas
     .findAll()
     .then(Consultas => res.status(200).send(Consultas));
     }
    }
    export default Consulta;
