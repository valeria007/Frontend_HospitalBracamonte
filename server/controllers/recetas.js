import model from '../models';

const { Recetas} = model;
const { emergencia } = model;
const { Citas_Medicas } = model;
const { Pacientes } = model;
class Receta {
    
    static post_receta(req, res) {
      const { id_emergencia } = req.params;
      Recetas.findAll({
         where: {id_emergencia: id_emergencia},
         //attributes: ['id', ['description', 'descripcion']]
         include:[
           {model : emergencia, attributes:['id'],
          include:[{
            model : Citas_Medicas, attributes:['id'],
            include:[{
              model : Pacientes, attributes:['id','nombre', 'apellidop','apellidom']
            }]
          }]}
         ]
       }).then((data) => {
         if (data != ""){
          res.status(400).json({
            success: false,
            message: 'Al paciente  '+data[0].emergencium.Citas_Medica.Paciente.nombre+'  '+data[0].emergencium.Citas_Medica.Paciente.apellidop+ " ya se le dio una receta en esta consulta medica" ,
            data
          })
         }else {
          const { tipoConsulta,historiaClinica,fecha,posologia,farmaco,viaAdmincion,doctor,indicaciones,unidades } = req.body;
          const { id_consulta } = req.params;
          const { id_emergencia } = req.params;
          return Recetas
            .create(  {
              id_consulta,
              id_emergencia,
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
          
       });   
      
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
    //receta segun emergencia
    static RecetaEmergencia(req, res){                
      var id = req.params.id;  
      Recetas.findAll({
         where: {id_emergencia: id}
         //attributes: ['id', ['description', 'descripcion']]
       }).then((data) => {
         res.status(200).json(data);
       });     
    }
    //mostar recetas solo de emergencia
    static recOfEmg(req, res){    
      const { id } = req.params;            
      Recetas.findAll({
         where: { tipoConsulta : null, historiaClinica : id }
         //attributes: ['id', ['description', 'descripcion']]
       }).then((data) => {
         res.status(200).json(data);
       });   
    }
    static updateReceta(req, res) {
      const { historiaClinica, fecha,posologia,farmaco,viaAdmincion,doctor,indicaciones,unidades } = req.body
      return Recetas
        .findByPk(req.params.id)
        .then((data) => {
          data.update({
            historiaClinica: historiaClinica || data.historiaClinica,
            fecha: fecha || data.fecha,  
            posologia: posologia || data.posologia,  
            farmaco: farmaco || data.farmaco,  
            viaAdmincion: viaAdmincion || data.viaAdmincion,  
            doctor: doctor || data.doctor,  
            indicaciones: indicaciones || data.indicaciones,  
            unidades: unidades || data.unidades      

          })
          .then(update => {
            res.status(200).send({
              message: 'Sala actualizado',
              data: {
                
                historiaClinica: historiaClinica || update.historiaClinica,
                fecha: fecha || update.fecha,  
                posologia: posologia || update.posologia,  
                farmaco: farmaco || update.farmaco,  
                viaAdmincion: viaAdmincion || update.viaAdmincion,  
                doctor: doctor || update.doctor,  
                indicaciones: indicaciones || update.indicaciones,  
                unidades: unidades || update.unidades   
              }
            })
          })
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
  }
    
  }
    export default Receta;