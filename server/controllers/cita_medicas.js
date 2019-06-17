import model from '../models';

const { Citas_Medicas } = model;
const { Pacientes } = model;
class Citas_medica {
    
    static reg_cita(req, res) {
        const { estado,codigo_p,turno,medico,especialidad,hora,saldo_total,id_especialidad} = req.body
        const { id_Paciente } = req.params;
        return Citas_Medicas
          .create({
            estado,
            codigo_p,
            turno,
            medico,
            especialidad,
            hora,
            saldo_total,
            id_especialidad,
            id_Paciente
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
      //serv para mostrar una cita medica con su id
      static OnlyCita(req, res){                
        var id = req.params.id;  
        Citas_Medicas.findAll({
            where: {id: id}
            //attributes: ['id', ['description', 'descripcion']]
          }).then((Citas) => {
            res.status(200).json(Citas);
          });     
       }

      //serv que muestra si es consulta medica o solo emergencia
      static citaLugar(req,res){
        var url = req.params.id;
        
        Citas_Medicas.findAll({
          where : { especialidad : url }
        })
        .then((data) => {
          res.status(200).send(data);
        })
      }
      //serv para traer datos de dos tablas cita medica y paciente
      static TwoTables(req,res){
        var url = req.params.id;
        console.log(url,"  <<<<<<<<<<<<<<<<esto quiero")
        Citas_Medicas.findAll({
          where : { especialidad : url, estado: "true" }, // el url es para identificar si es emergencia o consulta medica
          attributes: ['id','estado','codigo_p','hora','especialidad'],
          include: [
            {model: Pacientes, attributes: ['id','nombre', 'apellidop','apellidom'] }
          ]
        }).then(users => {
          res.status(200).send(users)
        })
      }
      //serv para traer datos de dos tablas cita medica y paciente
      static TwoTablesFalse(req,res){
        var url = req.params.id;
        Citas_Medicas.findAll({
          where : { especialidad : url, estado: "false" },
          attributes: ['id','estado','codigo_p','hora','especialidad'],
          include: [
            {model: Pacientes, attributes: ['id','nombre', 'apellidop','apellidom'] }
          ]
        }).then(users => {
          res.status(200).send(users)
        })
      }
      //serv para camviar el estado de cita_medica
      static estado(req,res){
        var estado;
        return Citas_Medicas
        .findByPk(req.params.id)
        .then((data) => {
          data.update({
            estado : estado  || data.estado == false
          })
          .then(update => {
            res.status(200).send({
              message: 'se actualizo el estado',
              data : {
                estado : estado  || update.estado 
              }
            })
            .catch(error => res.status(400).send(error))
          })
          .catch(error => res.status(400).send(error))
        })
        /*var id = req.params.id;
        Citas_Medicas.findAll({
          where : { id : id }
        })
        .then((data) => {
          data.estado = false;
          var estado = data.estado;
          res.send(estado)
        })*/
      }
      
}
export default Citas_medica;
