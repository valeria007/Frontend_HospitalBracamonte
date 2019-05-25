import model from '../models';

const { Consultas} = model;
class Consulta {
    
    static reg_consulta(req, res) {
        const { anamnesis,diagnostico,tratamiento,observaciones} = req.body
        const { id_cita } = req.params
        return Consultas
          .create({
            id_cita,
            anamnesis,
            diagnostico,
            tratamiento,
            observaciones
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


    