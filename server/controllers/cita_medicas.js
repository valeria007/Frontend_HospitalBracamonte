import model from '../models';

const { Citas_Medicas} = model;
class Citas_medica {
    
    static reg_cita(req, res) {
        const { codigo_p,turno,medico,id_especialidad,hora,saldo_total} = req.body
        return Citas_Medicas
          .create({
            codigo_p,
            turno,
            medico,
            id_especialidad,
            hora,
            saldo_total
          })
           .then(cita_pData => res.status(201).send({
              success: true,
              message: 'cita  creado',
              cita_pData
          }))
       }
    static getCitas(req, res) {
        return Citas_Medicas
     .findAll()
     .then(Citas_Medicas => res.status(200).send(Citas_Medicas));
     }
    }
    export default Citas_medica;
