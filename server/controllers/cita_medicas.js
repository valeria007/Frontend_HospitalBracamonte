import model from '../models';

const { Citas_Medicas } = model;
class Citas_medica {
    
    static reg_cita(req, res) {
        const { codigo_p,turno,medico,especialidad,id_especialidad,hora,saldo_total} = req.body
        return Citas_Medicas
          .create({
            codigo_p,
            turno,
            medico,
            especialidad,
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

     //rescatar cita medica segun historial
      static oneCita(req, res){                
       var id = req.params.id;  
       Citas_Medicas.findAll({
           where: {codigo_p: id}
           //attributes: ['id', ['description', 'descripcion']]
         }).then((Citas) => {
           res.status(200).json(Citas);
         });     
      }
    }
    export default Citas_medica;
